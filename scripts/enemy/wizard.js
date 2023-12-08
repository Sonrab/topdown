const spritesheet_wizard = addImage("images/enemies/wizard/wizard.png");


class Wizard extends Enemy
{
    static idleAnimationFrames = [
        {
            "cutFrom": { "x": 0, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 10000
        }
    ];

    static walkAnimationFrames = [
        {
            "cutFrom": { "x": 0, "y": 32},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 200
        },
        {
            "cutFrom": { "x": 32, "y": 32},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 200
        }
    ];

    static onHitAnimationFrames = [
        {
            "cutFrom": { "x": 32, "y": 0},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 200
        }
    ];

    static fireballChargeUpFrames = [
        {
            "cutFrom": { "x": 0, "y": 64},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 400
        },
        {
            "cutFrom": { "x": 32, "y": 64},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 400
        }
    ];

    static fireballReleaseFrames = [
        {
            "cutFrom": { "x": 64, "y": 64},
            "sourceFrameSize": { "w": 32, "h": 32},
            "duration": 300
        }
    ];

    constructor(x, y)
    {
        super(x, y, 32, 32, 3,             
        { //drawData
            width: 32,
            height: 32,
            offset: {x: -4 , y: -4}
        });

        this.spritesheet = spritesheet_wizard;
        this.damage = 1;
        
        this.animations = {
            idle: new Animation(this, 'idle', Wizard.idleAnimationFrames, true),
            walk: new Animation(this, 'walk', Wizard.walkAnimationFrames, true),
            onHit: new Animation(this, 'onHit', Wizard.onHitAnimationFrames, false),
            fireballChargeUp: new Animation(this, 'fireballChargeUp', Wizard.fireballChargeUpFrames, false),
            fireballRelease: new Animation(this, 'fireballRelease', Wizard.fireballReleaseFrames, false)
        }
        this.currentAnimation = this.animations.idle;
        this.teleportTracker = {
            lastUse: 0,
            cooldown: 5000,
            range: 100
        };

        this.init();
    }

    init()
    {
        this.currentAnimation.play();
    }

    onHit(dmg)
    {
        if(this.health.current > 0 && !this.iframes.active)
        {
            this.toggleIframes();
            this.takeDmg(dmg);
            this.animations.onHit.play();
            
            if(this.health.current <= 0)
            {
                this.state = this.states.dead;
                this.onDeath();
                return;
            }
        }
    }

    onDeath()
    {
        this.currentAnimation.stop();
        this.removeFromMap();
    }

    onAnimationEnd(animationName)
    {
        switch(animationName)
        {
            case 'onHit':
                this.teleport();
                this.animations.fireballChargeUp.play();
                break;
            case 'fireballChargeUp':
                this.animations.fireballRelease.play();
                this.fireball();
                break;
            case 'fireballRelease':
                this.animations.idle.play();
                break;
            // case 'death':
            //     this.removeFromMap();
        }
    }

    fireball()
    {
        let dx = player.center.x - this.center.x;
        let dy = player.center.y - this.center.y;
        let magnitude = Math.sqrt(dx*dx + dy*dy);
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
        if(angle < 0)
        {
            angle = 360 - (-angle);
        }
        console.log(angle);
    
        g_projectiles.push(new Fireball(this.center.x, this.center.y, dx, dy, magnitude, angle, this.damage, this));
    }

    update()
    {
 //movement idea - check angle between wizard and player, randomize angle which is not current angle < -+45
    }

    teleport()
    {
        let x, y;
        let angle = Math.random()*Math.PI*2;
        x = Math.cos(angle)*this.teleportTracker.range;
        y = Math.sin(angle)*this.teleportTracker.range;

        this.setXY(player.center.x + x - this.width/2, player.center.y + y - this.height/2);
    }

}