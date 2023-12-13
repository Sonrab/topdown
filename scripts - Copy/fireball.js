const spritesheet_Fireball = addImage("images/weapons/fireball.png");

class Fireball extends Projectile
{
    static defaultAnimationFrames = [
        {
            "cutFrom": { "x": 0, "y": 0},
            "sourceFrameSize": { "w": 64, "h": 64},
            "duration": 100
        },
        {
            "cutFrom": { "x": 64, "y": 0},
            "sourceFrameSize": { "w": 64, "h": 64},
            "duration": 100
        },
        {
            "cutFrom": { "x": 128, "y": 0},
            "sourceFrameSize": { "w": 64, "h": 64},
            "duration": 100
        }
    ];
    constructor(x, y, dx, dy, magnitude, angle, damage, firedBy)
    {
        super(x, y, angle, damage, firedBy);
        this.spritesheet = spritesheet_Fireball;
        this.width = 32;
        this.height = 32;
        this.magnitude = magnitude;
        this.speed = 6;
        this.velX = (dx/magnitude) * this.speed;
        this.velY = (dy/magnitude) * this.speed;
        this.animations = {
            default: new Animation(this, 'default', Fireball.defaultAnimationFrames, true)
        };
        this.currentAnimation = this.animations.default;
        this.init();
    }

    init()
    {
        this.currentAnimation.play();
    }

    update(projectileIndex)
    {
        this.x += this.velX;
        this.y += this.velY;
    
        this.checkCollision(projectileIndex);
    }
}