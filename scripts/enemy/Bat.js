const spritesheet_Bat = addImage("images/enemies/bat.png");

class Bat extends Enemy
{
    static defaultAnimationFrames = [
        {
            "cutFrom": { "x": 0, "y": 0},
            "sourceFrameSize": { "w": 16, "h": 16},
            "duration": 10000
        }
    ];

    static onHitAnimationFrames = [
        {
            "cutFrom": { "x": 16, "y": 0},
            "sourceFrameSize": { "w": 16, "h": 16},
            "duration": 100
        }
    ];

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
        super(x, y, 16, 16, 3,
            { //drawData
                width: 16,
                height: 16,
                offset: {x: 0 , y: 0}
            }
        );
        this.spritesheet = spritesheet_Bat;

        this.tx = this.x;
        this.ty = this.y;
    
        this.speed = 64 /game.targetFPS; // divide by 60 to get pixels per second in speed
        this.velX = 0;
        this.velY = 0;
    
        this.direction = "right";
        this.damage = 2;

        this.expYield = 20;
        this.aggroRange = 250;

    
        this.targetDestination = {};
        
    
        this.hasColission = true;
        this.dead = false;
        this.destinationReached = false;

        //animation
        this.animations = {
            idle: new Animation(this, 'idle', Bat.defaultAnimationFrames, true),
            onHit: new Animation(this, 'onHit', Bat.onHitAnimationFrames, false),
            // death: new Animation(this, 'death', Bat.deathAnimationFrames, false)
        };
        this.currentAnimation = this.animations.idle; //set start animation

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


        let magnitude = Math.sqrt(dx*dx + dy*dy);
        this.velX = (dx/magnitude) * this.speed;
        this.velY = (dy/magnitude) * this.speed;
    }

    setDestination(tx, ty)
    {
        this.targetDestination.x = tx;
        this.targetDestination.y = ty;

        let dx = this.targetDestination.x - this.x;
        let dy = this.targetDestination.y - this.y;

        let magnitude = Math.sqrt(dx*dx + dy*dy);
        this.velX = (dx/magnitude) * (this.speed*1.5);
        this.velY = (dy/magnitude) * (this.speed*1.5);
    }

    onAnimationEnd(animationName)
    {
        switch(animationName)
        {
            case 'onHit':
                this.animations.idle.play();
                break;
            // case 'death':
            //     this.removeFromMap();
            //     break;
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
        }
    }


    onDeath()
    {
        this.dead = true;
        this.hasColission = false;
        player.onEnemyKill(this);
        this.removeFromMap();
        // this.animations.death.play();
        
    }

    update()
    {

        if(!this.dead)
        {
            if(distBetweenPoints(this.center.x, this.center.y, player.center.x, player.center.y) <= this.aggroRange)
            {
                this.state = this.states.chasing;
                this.setDestination(player.center.x, player.center.y);
            }
            else if(this.state === this.states.chasing)
            {
                this.state = this.states.walking;
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

    //MOVEMENT: This makes the character moving based on the keys etc.
    move()
    {  
        
        this.tx = this.x + this.velX;
        this.ty = this.y + this.velY;
    }

    checkColission()
    {

        // let map = mapHandler.map;
        // let col = {x: false, y: false};


        // //check col in x-axis
        // let tlTile = map.getTileId(this.tx, this.y);
        // let trTile = map.getTileId(this.tx + this.width, this.y);
        // //middle left, middle right
        // let mlTile = map.getTileId(this.tx, this.y + (this.height/2));
        // let mrTile = map.getTileId(this.tx + this.width, this.y + (this.height/2));
        // //bottom left, bottom right
        // let blTile = map.getTileId(this.tx, this.y + this.height);
        // let brTile = map.getTileId(this.tx + this.width, this.y + this.height);

        // if(tlTile.solid || trTile.solid 
        // || mlTile.solid || mrTile.solid 
        // || blTile.solid || brTile.solid)
        // {
        //     this.tx = this.x;
        //     col.x = true;
        // }

        // //check col in y-axis
        // tlTile = map.getTileId(this.x, this.ty);
        // trTile = map.getTileId(this.x + this.width, this.ty);
        // //middle left, middle right
        // mlTile = map.getTileId(this.x, this.ty + (this.height/2));
        // mrTile = map.getTileId(this.x + this.width, this.ty + (this.height/2));
        // //bottom left, bottom right
        // blTile = map.getTileId(this.x, this.ty + this.height);
        // brTile = map.getTileId(this.x + this.width, this.ty + this.height);

        // if(tlTile.solid || trTile.solid 
        // || mlTile.solid || mrTile.solid 
        // || blTile.solid || brTile.solid)
        // {
        //     this.ty = this.y;
        //     col.y = true;
        // }
        
        // if(col.x && col.y)
        // {
        //     this.setRandomDestination(); //randomize new target destination upon col
        // }
        // else if( (col.x || col.y) && this.state != this.states.chasing)
        // {
        //     this.setXY(this.tx, this.ty);
        //     this.setRandomDestination();
        // }
        // else if(!col.x || !col.y)
        // {
        //     //console.log(this.state);
        //     this.setXY(this.tx, this.ty);
        // }

        this.setXY(this.tx, this.ty);
    }

}