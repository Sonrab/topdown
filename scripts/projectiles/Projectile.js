const img_arrow = new Image();
img_arrow.src = "images/weapons/laserbeam.png";


class Projectile
{
    constructor(x, y, angle, damage, firedBy)
    {
        if(this.constructor === Projectile)
            throw new Error("Can't instantiate enemy base class.");
        this.x = x;
        this.y = y;
        this.center = {};
        // this.center.x = this.x + this.width/2;
        // this.center.y = this.y + this.height/2;

        this.collidesWith = [1];
        this.hitbox = {};
        this.firedBy = firedBy;
        this.angle = angle;
        this.radians = this.angle * (Math.PI/180);
        this.damage = damage;
    }

    update()
    {
        throwAbstractionError("update");
    }

    setXY(x, y)
    {
        this.x = x;
        this.y = y;
        this.center.x = this.x + this.width/2;
        this.center.y = this.y + this.height/2;

        this.updateHitbox()
        this.checkCollision();
    }

    updateHitbox()
    {
        this.hitbox.topLeft = {
            x: this.x,
            y: this.y
        };

        this.hitbox.topMid = {
            x: this.x + this.width/2*Math.cos(this.radians) - 0*Math.sin(this.radians),
            y: this.y + this.width/2*Math.sin(this.radians) + 0*Math.cos(this.radians)
        };

        this.hitbox.topRight = {
            x: this.x + this.width*Math.cos(this.radians),// - 0*Math.sin(this.radians);
            y: this.y + this.width*Math.sin(this.radians)// + 0*Math.cos(this.radians);
        };

        this.hitbox.bottomRight = {
            x: this.x + this.width*Math.cos(this.radians) - this.height*Math.sin(this.radians),
            y: this.y + this.width*Math.sin(this.radians) + this.height*Math.cos(this.radians)
        };

        this.hitbox.bottomMid = {
            x: this.x + this.width/2*Math.cos(this.radians) - this.height*Math.sin(this.radians),
            y: this.y + this.width/2*Math.sin(this.radians) + this.height*Math.cos(this.radians)
        };

        this.hitbox.bottomLeft = {
            x: this.x + /*0*Math.cos(this.radians)*/ - this.height*Math.sin(this.radians),
            y: this.y + /*0*Math.sin(this.radians)*/ + this.height*Math.cos(this.radians)
        };
    }

    render()
    {
        let frame = this.currentAnimation.getCurrentFrame();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.radians);
        ctx.drawImage(this.spritesheet, frame.cutFrom.x, frame.cutFrom.y, frame.sourceFrameSize.w, frame.sourceFrameSize.h, 0, 0, this.width, this.height);
        ctx.rotate(-this.radians);
        ctx.translate(-this.x, -this.y);
    }

    removeFromMap()
    {
        let i = g_projectiles.indexOf(this);
        g_projectiles.splice(i, 1);
    }

    checkCollision()
    {
        let map = game.currentMap;
        let len = map.enemies.length; 

        for(let i = 0; i < len; i++)
        {
            let enemy = map.enemies[i];
            if(enemy.health.current <= 0 || enemy === this.firedBy)
                continue;

            if(this.x > enemy.x && this.x < enemy.x+enemy.width
            && this.y > enemy.y && this.y < enemy.y+enemy.height)
            {
                //g_projectiles.splice(projectileIndex, 1);
                this.removeFromMap();
                enemy.onHit(this.damage);
                return;
            }

        }
        
        let tlTile = map.getCollissionTileId(this.hitbox.topLeft.x, this.hitbox.topLeft.y);
        let tmTile = map.getCollissionTileId(this.hitbox.topMid.x, this.hitbox.topMid.y);
        let trTile = map.getCollissionTileId(this.hitbox.topRight.x, this.hitbox.topRight.y);
        let brTile = map.getCollissionTileId(this.hitbox.bottomRight.x, this.hitbox.bottomRight.y);
        let bmTile = map.getCollissionTileId(this.hitbox.bottomMid.x, this.hitbox.bottomMid.y);
        let blTile = map.getCollissionTileId(this.hitbox.bottomLeft.x, this.hitbox.bottomLeft.y);

        for(let i = 0; i < this.collidesWith.length; i++)
        {
            let id = this.collidesWith[i];
            if(tlTile === id || tmTile === id || trTile === id || brTile === id || bmTile === id|| blTile === id)
            {
                this.removeFromMap();
            }
        }
    }
}