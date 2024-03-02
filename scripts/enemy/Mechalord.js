const imgMechalord = addImage("images/enemies/mechalord/default.png");

class Mechalord extends Enemy
{
    static defaultFrames = [
        {
            "cutFrom": { "x": 0, "y": 0},
            "sourceFrameSize": { "w": 48, "h": 64},
            "duration": 10000
        }
    ];

    static aggroFrames = [
        {
            "cutFrom": { "x": 0, "y": 0},
            "sourceFrameSize": { "w": 48, "h": 64},
            "duration": 150
        },
        {
            "cutFrom": { "x": 48, "y": 0},
            "sourceFrameSize": { "w": 48, "h": 64},
            "duration": 150
        }
    ];

    // static onHitAnimationFrames = [
    //     {
    //         "cutFrom": { "x": 0, "y": 64},
    //         "sourceFrameSize": { "w": 32, "h": 32},
    //         "duration": 100
    //     }
    // ];

    // static deathAnimationFrames = [
    //     {
    //         "cutFrom": { "x": 0, "y": 96},
    //         "sourceFrameSize": { "w": 32, "h": 32},
    //         "duration": 150
    //     },
    //     {
    //         "cutFrom": { "x": 0, "y": 128},
    //         "sourceFrameSize": { "w": 32, "h": 32},
    //         "duration": 150
    //     },
    //     {
    //         "cutFrom": { "x": 0, "y": 160},
    //         "sourceFrameSize": { "w": 32, "h": 32},
    //         "duration": 500
    //     }
    // ];

    constructor(x, y)
    {
        super(x, y, 48, 64, 50,
            { //drawData
                width: 48,
                height: 64,
                offset: {x: 0 , y: 0}
            }
        );
        this.spritesheet = imgMechalord;


        this.tx = this.x;
        this.ty = this.y;
    
        this.speed = 32 /game.targetFPS; // divide by 60 to get pixels per second in speed
        this.velX = 0;
        this.velY = 0;
    
        this.direction = "right";
        this.damage = 2;

        this.expYield = 75;
        this.aggroRange = 500;

        this.lastFire = 0;
    
        this.targetDestination = {};
        this.angleSpan = 5;
    
        this.hasColission = true;
        this.dead = false;
        this.destinationReached = false;

        //animation
        this.animations = {
            default: new Animation(this, 'default', Mechalord.defaultFrames, true),
            aggro: new Animation(this, 'aggro', Mechalord.aggroFrames, true),
        };
        this.currentAnimation = this.animations.default; //set start animation

        this.state = this.states.walking;

        this.init();
    }

    init()
    {
        this.currentAnimation.play();
        this.setRandomDestination();
    }

    setRandomDestination()
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


        let magnitude = pythagorean(dx, dy);
        this.velX = (dx/magnitude) * this.speed;
        this.velY = (dy/magnitude) * this.speed;
    }

    setDestination(tx, ty)
    {
        this.targetDestination.x = tx;
        this.targetDestination.y = ty;

        let dx = this.targetDestination.x - this.x;
        let dy = this.targetDestination.y - this.y;

        let magnitude = pythagorean(dx, dy);
        this.velX = (dx/magnitude) * (this.speed*1.5);
        this.velY = (dy/magnitude) * (this.speed*1.5);
    }

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
            //this.animations.onHit.play();
        }
    }


    onDeath()
    {
        this.dead = true;
        this.hasColission = false;
        
        // this.animations.death.play();
        player.onEnemyKill(this);
        objectList.push(new BombExplosion(this.center.x, this.center.y));
        this.removeFromMap();
    }

    update()
    {

        if(!this.dead)
        {
            if(distBetweenPoints(this.center.x, this.center.y, player.center.x, player.center.y) <= this.aggroRange)
            {
                if(this.state !== this.states.chasing)
                {
                    this.speed = 16 /game.targetFPS; // divide by 60 to get pixels per second in speed
                    this.state = this.states.chasing;
                    this.animations.aggro.play();
                }
                
                this.setDestination(player.center.x, player.center.y);
                this.fireWeapon();
            }
            else if(this.state === this.states.chasing)
            {
                this.speed = 32 /game.targetFPS; // divide by 60 to get pixels per second in speed
                this.state = this.states.walking;
                this.animations.default.play();
                this.setRandomDestination();
            }
            let range = 10; //the range for target destination
            if(this.x > this.targetDestination.x-range && this.x < this.targetDestination.x+range
            && this.y > this.targetDestination.y-range && this.y < this.targetDestination.y+range)
            {
                this.setRandomDestination();
            }

            if(!this.iframesActive)
            {
                this.move();
            }
            
            this.checkColission();
        }
    }


    fireWeapon()
    {
        if(this.lastFire + 200 <= currentTime)
        {
            this.lastFire = currentTime;

            // let dx = this.center.x - player.center.x;
            // let dy = this.center.y - player.center.y;

            let dx = player.center.x - this.center.x;
            let dy = player.center.y - this.center.y;


            let angle = Math.atan2(dy, dx) * (180 / Math.PI);
            let b1Angle = angle + randomFloat(-this.angleSpan, this.angleSpan);
            let b2Angle = angle + randomFloat(-this.angleSpan, this.angleSpan);
            // angle = angle + randomFloat(-this.angleSpan, this.angleSpan);
            if(b1Angle < 0)
            {
                b1Angle = 360 - (-b1Angle);
            }     

            if(b2Angle < 0)
            {
                b2Angle = 360 - (-b2Angle);
            }     

            let b1rad = b1Angle * (Math.PI / 180);
            let b2rad = b2Angle * (Math.PI / 180);

            let b1Delta = {
                x: Math.cos(b1rad),
                y: Math.sin(b1rad)
            }

            let b2Delta = {
                x: Math.cos(b2rad),
                y: Math.sin(b2rad)
            }
            // dx = Math.cos(rad);
            // dy = Math.sin(rad);

            let b1Mag = pythagorean(b1Delta.x, b1Delta.y);
            let b2Mag = pythagorean(b2Delta.x, b2Delta.y);
        
            let magnitude = pythagorean(dy, dx);

            let offsetX = 0;
            let offsetY = 0;
            switch(get4WayRotationFromAngle(angle))
            {
                case 'up':
                    offsetX = 10;
                    break;

                case 'down':
                    offsetX = 10;
                    break;

                case 'left':
                    offsetY = 10;
                    break;

                case 'right':
                    offsetY = 10;
                    break;
            }

            console.log(angle);
            let b1 = new RifleBullet(this.center.x - offsetX, this.center.y - offsetY, b1Delta.x, b1Delta.y, b1Mag, b1Angle, this.damage);
            b1.firedBy = this;
            
            let b2 = new RifleBullet(this.center.x + offsetX, this.center.y + offsetY, b2Delta.x, b2Delta.y, b2Mag, b2Angle, this.damage);
            b2.firedBy = this;

            g_projectiles.push(b1);
            g_projectiles.push(b2);
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

        let map = game.currentMap;
        let col = {x: false, y: false};


        //check col in x-axis
        let tlTile = map.getCollissionTileId(this.tx, this.y);
        let trTile = map.getCollissionTileId(this.tx + this.width, this.y);
        //middle left, middle right
        let mlTile = map.getCollissionTileId(this.tx, this.y + (this.height/2));
        let mrTile = map.getCollissionTileId(this.tx + this.width, this.y + (this.height/2));
        //bottom left, bottom right
        let blTile = map.getCollissionTileId(this.tx, this.y + this.height);
        let brTile = map.getCollissionTileId(this.tx + this.width, this.y + this.height);

        if(tlTile.solid || trTile.solid 
        || mlTile.solid || mrTile.solid 
        || blTile.solid || brTile.solid)
        {
            this.tx = this.x;
            col.x = true;
        }

        //check col in y-axis
        tlTile = map.getCollissionTileId(this.x, this.ty);
        trTile = map.getCollissionTileId(this.x + this.width, this.ty);
        //middle left, middle right
        mlTile = map.getCollissionTileId(this.x, this.ty + (this.height/2));
        mrTile = map.getCollissionTileId(this.x + this.width, this.ty + (this.height/2));
        //bottom left, bottom right
        blTile = map.getCollissionTileId(this.x, this.ty + this.height);
        brTile = map.getCollissionTileId(this.x + this.width, this.ty + this.height);

        if(tlTile.solid || trTile.solid 
        || mlTile.solid || mrTile.solid 
        || blTile.solid || brTile.solid)
        {
            this.ty = this.y;
            col.y = true;
        }
        
        if(col.x && col.y)
        {
            this.setRandomDestination(); //randomize new target destination upon col
        }
        else if( (col.x || col.y) && this.state != this.states.chasing)
        {
            this.setXY(this.tx, this.ty);
            this.setRandomDestination();
        }
        else if(!col.x || !col.y)
        {
            //console.log(this.state);
            this.setXY(this.tx, this.ty);
        }


    }

}