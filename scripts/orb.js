const spritesheet_orb = addImage("images/weapons/orb.png");
const imgEnergyOrb = addImage("images/weapons/energy_orb.png");

class Orb
{
    static defaultFrames = [];

    static damageInfo = {
        damage: 2,
        type: "fire",
        triggerIFrames: false
    }
    constructor(startPosInDeg)
    {
        for(let i = 0; i < 8; i++)
        {
            for(let j = 0; j < 8; j++)
            {
                if(i === 7 && j > 1)
                    break;

                Orb.defaultFrames.push({
                    "cutFrom": { "x": j*32, "y": i*32},
                    "sourceFrameSize": { "w": 32, "h": 32},
                    "duration": 25
                });
            }
        }

        this.spritesheet = spritesheet_orb;
        this.x = 0;
        this.y = 0;

        this.draw = {
            width: 32,
            height: 32,
            halfWidth: 16,
            halfHeight: 16
        }
        this.width = 16;
        this.height = 16; 

        this.damage = 2;
        this.angle = 0;

        this.homingRange = 250;

        this.radius = 35; //pixels from player center to rotate

        this.orbiting = true;
        this.velX = 0;
        this.velY = 0;
        this.updateClosestEnemyTimeout = false;
        this.speed = 8;

        this.timers = {
            updateClosestEnemy: false,
            removeFromMap: false
        };

        this.modes = Object.freeze({ 
            orbit: Symbol("orbit"),
            attack: Symbol("attack")
        });

        this.mode = this.modes.orbit;

        //magic radian code. 1 rad = 180deg / pi = 57,3deg
        this.posOnCircumference = (startPosInDeg*Math.PI) / 180; //position on the circumference around the player
        this.posIncrease = 0.05; //increase in radians per update


        this.animations = {
            default: new Animation(this, 'default', Orb.defaultFrames, true, imgEnergyOrb)
        };
        this.currentAnimation = this.animations.default;
        this.init();
    }


    init()
    {
        this.currentAnimation.play();
    }

    launch()
    {
        this.mode = this.modes.attack;
        this.setInitialTrajectory();
       // this.updateClosestEnemy();
        this.timers.updateClosestEnemy = setTimeout(() => {
            this.updateClosestEnemy();
        }, 150);
        this.timers.removeFromMap = setTimeout(() => {
            console.log("REMOVE");
            this.removeFromMap();
        }, 1500);
    }

    update()
    {
        if(this.mode === this.modes.orbit)
        {
            this.posOnCircumference += this.posIncrease;
            this.x = player.center.x + (this.radius * Math.sin(this.posOnCircumference));
            this.y = player.center.y + (this.radius * Math.cos(this.posOnCircumference));
        }
        else
        {
            this.x += this.velX;
            this.y += this.velY;
        }
        
        this.checkCollision();
    }

    setInitialTrajectory()
    {
        let dx = mouse.transX - (this.x);
        let dy = mouse.transY - (this.y);

        let magnitude = Math.sqrt(dx*dx + dy*dy);
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);

        if(angle < 0)
            angle = 360 - (-angle);
        this.angle = angle;


        this.velX = (dx/magnitude) * this.speed;
        this.velY = (dy/magnitude) * this.speed;
    }

    updateClosestEnemy()
    {
        let map = mapHandler.map;
        let len = map.enemies.length;
        let minDist = this.homingRange;
        let closestEnemy = false;
        for(let i = 0; i < len; i++)
        {
            let enemy = map.enemies[i];
            if(enemy.state === enemy.states.dead)
                continue;

            let dist = distBetweenPoints(this.x, this.y, enemy.center.x, enemy.center.y);
            if(minDist >= dist)
            {
                minDist = dist;
                closestEnemy = enemy;
            }       
        }

        if(closestEnemy)
        {
            let dx = closestEnemy.center.x - (this.x);
            let dy = closestEnemy.center.y - (this.y);
            let magnitude = Math.sqrt(dx*dx + dy*dy);
            //console.log(magnitude);
            let targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
            if(targetAngle < 0)
                targetAngle = 360 - (-targetAngle);

            if(Math.abs(this.angle - targetAngle) > 75)
            {
                let vx = Math.cos(this.angle * (Math.PI / 180));
                let vy = Math.sin(this.angle * (Math.PI / 180));

                console.log(vx);
                console.log(vy);

                this.velX = vx * this.speed;
                this.velY = vy * this.speed;
            }
            else if(Math.abs(this.angle - targetAngle) > 10)
            {
                if(this.angle > targetAngle)
                    this.angle -=10;
                else if(this.angle < targetAngle)
                    this.angle += 10;
                console.log(this.angle);
                console.log(targetAngle);

                //get velocity x and y based on the new angle
                let vx = Math.cos(this.angle * (Math.PI / 180));
                let vy = Math.sin(this.angle * (Math.PI / 180));

                console.log(vx);
                console.log(vy);

                this.velX = vx * this.speed;
                this.velY = vy * this.speed;
                
            }
            else
            {
                this.angle = targetAngle;
                this.velX = (dx/magnitude) * this.speed;
                this.velY = (dy/magnitude) * this.speed;
            }

            console.log(this.velX);
            console.log(this.velY);

            
            // console.log(Math.abs(this.angle - angle));
            // if(Math.abs(this.angle - angle) > 10)
            // {
            //     console.log("aaaa");
            // }
            
            //console.log( this.angle * (Math.PI * 180));
            //console.log( (dx/magnitude) * this.speed);
            
        }
        this.timers.updateClosestEnemy = setTimeout(() => {
            this.updateClosestEnemy();
        }, 50);
    }

    checkCollision()
    {
        let map = game.currentMap;
        let len = map.enemies.length;

        for(let i = 0; i < len; i++)
        {
            let enemy = map.enemies[i];
            if(enemy.health.current <= 0)
                continue;

            if(this.x > enemy.x && this.x < enemy.x+enemy.width
            && this.y > enemy.y && this.y < enemy.y+enemy.height)
            {
                
                enemy.onHit(this.damage);
                this.removeFromMap();
            }

        }
    }

    removeFromMap()
    {
        let i = player.orbs.indexOf(this);
        clearTimeout(this.timers.removeFromMap);
        clearTimeout(this.timers.updateClosestEnemy);
        player.orbs.splice(i, 1);
    }

    render()
    {
        let frame = this.currentAnimation.getCurrentFrame();
        ctx.drawImage(this.currentAnimation.spritesheet, frame.cutFrom.x, frame.cutFrom.y, frame.sourceFrameSize.w, frame.sourceFrameSize.h, this.x-this.draw.halfWidth, this.y-this.draw.halfHeight, this.draw.width, this.draw.height);
    }
}