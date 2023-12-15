const imgRifleBullet = addImage("images/weapons/rifle_bullet.png");

class RifleBullet extends Projectile
{
    static defaultAnimationFrames = [
        {
            "cutFrom": { "x": 0, "y": 0},
            "sourceFrameSize": { "w": 12, "h": 4},
            "duration": 10000
        }
    ];
    constructor(x, y, dx, dy, magnitude, angle, damage)
    {
        super(x, y, angle, damage);
        this.spritesheet = imgRifleBullet;
        this.width = 12;
        this.height = 4;
        this.magnitude = magnitude;
        this.speed = 15;
        this.velX = (dx/magnitude) * this.speed;
        this.velY = (dy/magnitude) * this.speed;
        this.animations = {
            default: new Animation(this, 'default', RifleBullet.defaultAnimationFrames, true)
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