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

        this.width = width;
        this.height = height;
        
        this.x = x*tileWidth;
        this.y = y*tileWidth;
        this.center = {
            x: this.x + (this.width/2),
            y: this.y + (this.height/2)
        };

        this.tx;
        this.ty;

        this.collidesWith;

        this.drawData = drawData;



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
            physical: 0,
            fire: 0,
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
        ctx.drawImage(this.spritesheet, frame.cutFrom.x, frame.cutFrom.y, frame.sourceFrameSize.w, frame.sourceFrameSize.h, Math.floor(this.x + this.drawData.offset.x), Math.floor(this.y + this.drawData.offset.y -1), this.drawData.width, this.drawData.height);
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
        let i = game.currentMap.enemies.indexOf(this);
        game.currentMap.enemies.splice(i, 1);
    }

    checkColission()
    {
        let map = game.currentMap;
        let tlTile, tmTile, trTile, mlTile, mrTile, blTile, bmTile, brTile;        
        let collissionInfo = {
            x: false,
            y: false
        };
        //top left, top right
        tlTile = map.getCollissionTileId(this.tx, this.y);
        trTile = map.getCollissionTileId(this.tx + this.width, this.y);
        //middle left, middle right
        mlTile = map.getCollissionTileId(this.tx, this.y + (this.height/2));
        mrTile = map.getCollissionTileId(this.tx + this.width, this.y + (this.height/2));
        //bottom left, bottom right
        blTile = map.getCollissionTileId(this.tx, this.y + this.height);
        brTile = map.getCollissionTileId(this.tx + this.width, this.y + this.height);

        let standingTiles = [tlTile, trTile, mlTile, mrTile, blTile, brTile].filter((tileId) => tileId > 0);

        for(let i = 0; i < standingTiles.length; i++)
        {
            if(this.collidesWith.includes(standingTiles[i]))
            {
                if(this.tx - this.x > 0) //colission right
                {
                    while(this.collidesWith.includes(trTile) || this.collidesWith.includes(mrTile) || this.collidesWith.includes(brTile)) //if any tile on right side is solid
                    {      
                        this.tx -=1;   
                        trTile = map.getCollissionTileId(this.tx + this.width, this.y);
                        mrTile = map.getCollissionTileId(this.tx + this.width, this.y + (this.height/2));
                        brTile = map.getCollissionTileId(this.tx + this.width, this.y + this.height);         
                    } 
                }
                else if(this.tx - this.x < 0) //colission left
                {
                    while(this.collidesWith.includes(tlTile) || this.collidesWith.includes(mlTile) || this.collidesWith.includes(blTile)) //if any tile on left side is solid
                    {
                        this.tx +=1;
                        tlTile = map.getCollissionTileId(this.tx, this.y);
                        mlTile = map.getCollissionTileId(this.tx, this.y + (this.height/2));
                        blTile = map.getCollissionTileId(this.tx, this.y + this.height);
                    }
                }
                this.velX = 0;
                collissionInfo.x = true;
                break;
            }
        }

            if(Math.floor(this.tx) === Math.floor(this.x)) //if rounded down numbers are the same there's no need to move player. It will only cause "vibrations"
                this.tx = this.x;

            

        //y-colission
        //top left, top mid, top right
        tlTile = map.getCollissionTileId(this.x, this.ty);
        tmTile = map.getCollissionTileId(this.x + (this.width/2), this.ty);
        trTile = map.getCollissionTileId(this.x + this.width, this.ty);
        // //middle left, middle right
        // mlTile = map.getTileId(this.x, this.ty + (this.height/2));
        // mrTile = map.getTileId(this.x + this.width, this.ty + (this.height/2));
        //bottom left, bottom mid, bottom right
        blTile = map.getCollissionTileId(this.x, this.ty + this.height);
        bmTile = map.getCollissionTileId(this.x + (this.width/2), this.ty + this.height);
        brTile = map.getCollissionTileId(this.x + this.width, this.ty + this.height);

        standingTiles = [tlTile, tmTile, trTile, blTile, bmTile, brTile].filter((tileId) => tileId > 0);

        for(let i = 0; i < standingTiles.length; i++)
        {
            if(this.collidesWith.includes(standingTiles[i])) //coll
            {
                if(this.ty - this.y > 0) //colission down
                {
                    while(this.collidesWith.includes(blTile) || this.collidesWith.includes(bmTile) || this.collidesWith.includes(brTile)) //if any tile below is solid
                    {      
                        this.ty -=1;   
                        blTile = map.getCollissionTileId(this.x, this.ty + this.height);
                        bmTile = map.getCollissionTileId(this.x + (this.width/2), this.ty + this.height);
                        brTile = map.getCollissionTileId(this.x + this.width, this.ty + this.height);         
                    }
                }
                else if(this.ty - this.y < 0) //colission up
                {
                    while(this.collidesWith.includes(tlTile) || this.collidesWith.includes(tmTile) || this.collidesWith.includes(trTile)) //if any tile on left side is solid
                    {
                        this.ty +=1;
                        tlTile = map.getCollissionTileId(this.x, this.ty);
                        tmTile = map.getCollissionTileId(this.x + (this.width/2), this.ty);
                        trTile = map.getCollissionTileId(this.x + this.width, this.ty);
                    }
                }
                this.velY = 0;
                collissionInfo.y = true;
                break;
            }
        }

        if(Math.floor(this.ty) === Math.floor(this.y)) //if rounded down numbers are the same there's no need to move player. It will only cause "vibrations"
            this.ty = this.y;

        this.setXY(this.tx, this.ty);
        
        if(collissionInfo.x || collissionInfo.y)
        {
            this.onCollission(collissionInfo);
        }
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

    onCollission(collissionInfo)
    {
        throwAbstractionError("onCollission");
    }
}