const spritesheet_Arrow = addImage("images/weapons/arrow.png");

class Arrow extends Projectile
{
    static defaultAnimationFrames = [
        {
            "cutFrom": { "x": 0, "y": 0},
            "sourceFrameSize": { "w": 22, "h": 5},
            "duration": 10000
        }
    ];
    constructor(x, y, dx, dy, magnitude, angle, damage)
    {
        super(x, y, angle, damage);
        this.spritesheet = spritesheet_Arrow;
        this.width = 22;
        this.height = 5;
        this.magnitude = magnitude;
        this.speed = 9;
        this.velX = (dx/magnitude) * this.speed;
        this.velY = (dy/magnitude) * this.speed;
        this.animations = {
            default: new Animation(this, 'default', Arrow.defaultAnimationFrames, true)
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