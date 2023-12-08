const spritesheet_GreenSlime = addImage("images/enemies/slime/green_slime.png");

class GreenSlime extends Enemy
{
    static defaultAnimationFrames = [
        {
            "cutFrom": { "x": 0, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 250
        },
        {
            "cutFrom": { "x": 0, "y": 32},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 250
        }
    ];

    static onHitAnimationFrames = [
        {
            "cutFrom": { "x": 0, "y": 64},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 100
        }
    ];

    static deathAnimationFrames = [
        {
            "cutFrom": { "x": 0, "y": 96},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        },
        {
            "cutFrom": { "x": 0, "y": 128},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 150
        },
        {
            "cutFrom": { "x": 0, "y": 160},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 500
        }
    ];

    constructor(x, y)
    {
        super(
            x, y, 24, 24, 3, 
            { //drawData
                width: 32,
                height: 32,
                offset: {x: -4 , y: -4}
            }
        );
        this.spritesheet = spritesheet_GreenSlime;

        this.tx = this.x;
        this.ty = this.y;
    
        this.speed = 32 /60; // divide by 60 to get pixels per second in speed
        this.velX = 0;
        this.velY = 0;
    
        this.direction = "right";
        this.damage = 1;

    
        this.targetDestination = {};
        
    
        this.hasColission = true;
        this.dead = false;
        this.destinationReached = false;

        //animation
        this.animations = {
            move: new Animation(this, 'move', GreenSlime.defaultAnimationFrames, true),
            onHit: new Animation(this, 'onHit', GreenSlime.onHitAnimationFrames, false),
            death: new Animation(this, 'death', GreenSlime.deathAnimationFrames, false)
        };
        this.currentAnimation = this.animations.move; //set start animation

        this.state = this.states.walking;

        this.init();
    }

    init()
    {
        this.currentAnimation.play();
        this.setDestination();
    }

    setDestination()
    {
        let min = 50;
        let max = 200;
        let num = Math.floor(Math.random()*(max-min)+min); // get number between max + min
        num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
        this.targetDestination.x = this.x + num;

        num = Math.floor(Math.random()*(max-min)+min); // get number between max + min
        num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
        this.targetDestination.y = this.y + num;

        let dx = this.targetDestination.x - this.x;
        let dy = this.targetDestination.y - this.y;


        let magnitude = Math.sqrt(dx*dx + dy*dy);
        this.velX = (dx/magnitude) * this.speed;
        this.velY = (dy/magnitude) * this.speed;
    }

    // render()
    // {
    //     let sourceY = this.anim*this.width;
    //     ctx.drawImage(this.renderData.spritesheet, 0,sourceY,32,32,this.x,this.y,32,32);
    // }

    // animate()
    // {
    //     this.animationInterval = setTimeout(() => {
    //         this.anim++;
    //         if(this.anim >= 2)
    //             this.anim = 0;
    //         this.animate();
    //     }, 400);
    // }
    onAnimationEnd(animationName)
    {
        switch(animationName)
        {
            case 'onHit':
                this.animations.move.play();
                break;
            case 'death':
                this.removeFromMap();
        }
        
    }

    onHit(dmg, dmgType = "none")
    {
        if(this.health.current > 0 && !this.iframes.active)
        {          
            this.toggleIframes();
            this.takeDmg(dmg);
            console.log(this.health.current);
            if(this.health.current <= 0)
            {
                this.state = this.states.dead;
                this.onDeath();
                return;
            }
            this.animations.onHit.play();
            // this.anim = 2;
            // setTimeout(() => {
            //     this.anim = 0;
            //     this.iframesActive = false;
            //     this.animate();
            // }, 150);
        }
    }


    onDeath()
    {
        this.dead = true;
        this.anim = 3;
        this.hasColission = false;
        this.animations.death.play();
    }

    update()
    {

        if(!this.dead)
        {
            let range = 10; //the range for target destination
            if(this.x > this.targetDestination.x-range && this.x < this.targetDestination.x+range
            && this.y > this.targetDestination.y-range && this.y < this.targetDestination.y+range)
            {
                this.setDestination();
            }

            if(!this.iframesActive)
            {
                this.move();
            }
            
            this.checkColission();
        }
    }

    //MOVEMENT: This makes the character moving based on the keys etc.
    move()
    {  
        this.tx = this.x + this.velX;
        this.ty = this.y + this.velY;
    }

    checkColission()
    {

        let map = mapHandler.map;

        let tlTile = map.getTileId(this.tx, this.ty);
        let trTile = map.getTileId(this.tx + this.width, this.ty);
        //middle left, middle right
        let mlTile = map.getTileId(this.tx, this.ty + (this.height/2));
        let mrTile = map.getTileId(this.tx + this.width, this.ty + (this.height/2));
        //bottom left, bottom right
        let blTile = map.getTileId(this.tx, this.ty + this.height);
        let brTile = map.getTileId(this.tx + this.width, this.ty + this.height);

        if(!tlTile.solid && !trTile.solid 
        && !mlTile.solid && !mrTile.solid 
        && !blTile.solid && !brTile.solid)
        {
            this.setXY(this.tx, this.ty);
            // this.x = this.tx;
            // this.y = this.ty;
        }
        else
        {
            this.setDestination(); //randomize new target destination upon col
        }

    }




}