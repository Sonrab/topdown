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
    
        this.speed = 2; // divide by 60 to get pixels per second in speed
        this.velX = 0;
        this.velY = 0;
    
        this.direction = "right";
        this.damage = 2;

        this.expYield = 20;
        this.aggroRange = 350;

        this.resistances = { 
            physical: 0.5,
            fire: 0,
        };

        this.targetDestination = {};
        
        this.collidesWith = [1];
    
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

        let dx = this.targetDestination.x - this.x+this.width/2;
        let dy = this.targetDestination.y - this.y+this.height/2;

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

    onCollission(collInfo)
    {

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
}