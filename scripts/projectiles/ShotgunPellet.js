const imgShotgunPellet = addImage("images/weapons/shotgun_pellet.png");

class ShotgunPellet extends Projectile
{
    static defaultAnimationFrames = [
        {
            "cutFrom": { "x": 0, "y": 0},
            "sourceFrameSize": { "w": 6, "h": 6},
            "duration": 10000
        }
    ];
    constructor(x, y, dx, dy, magnitude, angle, damage)
    {
        super(x, y, angle, damage);
        this.spritesheet = imgShotgunPellet;
        this.width = 6;
        this.height = 6;
        this.magnitude = magnitude;
        this.speed = randomFloat(14, 18);
        this.velX = (dx/magnitude) * this.speed;
        this.velY = (dy/magnitude) * this.speed;
        this.animations = {
            default: new Animation(this, 'default', ShotgunPellet.defaultAnimationFrames, true)
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
        if(this.velX < 3 && this.velX > -3 && this.velY < 3 && this.velY > -3)
        {
            this.removeFromMap();
            return;
        }
        this.setXY(this.x + this.velX, this.y + this.velY);

        this.velX *= 0.95;
        this.velY *= 0.95;
    }
}