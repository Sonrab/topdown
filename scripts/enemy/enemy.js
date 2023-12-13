//base class for enemy
//any function which needs a special case for a certain enemy can be overridden in that enemys script
class Enemy
{
    constructor(x, y, width, height, health, drawData, iframeDuration = 250)
    {
        if(this.constructor === Enemy)
            throw new Error("Can't instantiate enemy base class.");

        this.renderData = {
            spritesheet: null,
            cutFromX: 0,
            cutFromY: 0 
        };

        this.x = x;
        this.y = y;
        this.center = {
            x: this.x + (this.width/2),
            y: this.y + (this.height/2)
        };

        this.drawData = drawData;


        this.width = width;
        this.height = height;

        this.health = {
            max: health,
            current: health
        };


        this.iframes = {
            active: false,
            duration: iframeDuration
        };

        //resistances in 0-1. 0 = no dmg reduction. 1 = full damage reduction(immunity), 0.75 means damage is reduced by 75%
        this.resistances = { 
            physical: 0.1
        };

        this.states = Object.freeze({
            idle: Symbol("idle"),
            walking: Symbol("walking"),
            attacking: Symbol("attacking"),
            chasing: Symbol("chasing"),
            dead: Symbol("dead")
        });
    }

    setXY(x, y)
    {
        this.x = x;
        this.y = y;
        this.center.x = this.x + (this.width/2);
        this.center.y = this.y + (this.height/2);
    }


    render()
    {
        let frame = this.currentAnimation.frames[this.currentAnimation.currentFrame];
        //console.log(frame);
        //ctx.drawImage(this.spritesheet, frame.cutFrom.x, frame.cutFrom.y, frame.sourceFrameSize.w, frame.sourceFrameSize.h, this.x + this.drawData.offset.x, this.y + this.drawData.offset.y, this.drawData.width, this.drawData.height);
        ctx.drawImage(this.spritesheet, frame.cutFrom.x, frame.cutFrom.y, frame.sourceFrameSize.w-2, frame.sourceFrameSize.h-2, Math.floor(this.x + this.drawData.offset.x), Math.floor(this.y + this.drawData.offset.y -1), this.drawData.width, this.drawData.height);
    }

    toggleIframes()
    {
        this.iframes.active = true;
        setTimeout(() => {
            this.iframes.active = false;
        }, this.iframes.duration);
    }

    takeDmg(dmg, dmgType = "none")
    {
        let finalDmg = dmg;
        if(dmgType = "physical")
        {
            finalDmg = dmg * (1 - this.resistances.physical);
        }
        this.health.current -= finalDmg;
        console.log(this.health.current);
    }

    applyStatusEffect(type)
    {
        if(type === "fire")
        {
            
        }
    }

    removeFromMap()
    {
        let i = mapHandler.map.enemies.indexOf(this);
        mapHandler.map.enemies.splice(i, 1);
    }


    //abstract classes
    onHit()
    {
        throwAbstractionError("onHit");
    }

    onDeath()
    {
        throwAbstractionError("onDeath");
    }

    update()
    {
        throwAbstractionError("update");
    }
}