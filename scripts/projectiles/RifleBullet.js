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

    static width = 12;
    static height = 4;
    static halfWidth = RifleBullet.width/2;
    static halfHeight = RifleBullet.height/2;

    constructor(x, y, dx, dy, magnitude, angle, damage)
    {
        super(x, y, angle, damage);
        this.spritesheet = imgRifleBullet;
        this.width = RifleBullet.width;
        this.height = RifleBullet.height;
        this.magnitude = magnitude;
        this.speed = 16;
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

    update()
    {
        this.setXY(this.x + this.velX, this.y + this.velY);
    }
}