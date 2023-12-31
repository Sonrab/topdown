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
        // this.center.x = this.x + this.width/2;
        // this.center.y = this.y + this.height/2;
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
    }

    render()
    {
        let frame = this.currentAnimation.getCurrentFrame();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.radians);
        ctx.drawImage(this.spritesheet, frame.cutFrom.x, frame.cutFrom.y, frame.sourceFrameSize.w, frame.sourceFrameSize.h, 0, -this.height/2, this.width, this.height);
        ctx.rotate(-this.radians);
        ctx.translate(-this.x, -this.y);

        // renderer.bufferCtx.translate(this.x, this.y);
        // renderer.bufferCtx.rotate(this.radians);
        // renderer.bufferCtx.drawImage(this.spritesheet, frame.cutFrom.x, frame.cutFrom.y, frame.sourceFrameSize.w, frame.sourceFrameSize.h, 0, -this.height/2, this.width, this.height);
        // renderer.bufferCtx.rotate(-this.radians);
        // renderer.bufferCtx.translate(-this.x, -this.y);
    }

    removeFromMap()
    {
        let i = g_projectiles.indexOf(this);
        g_projectiles.splice(i, 1);
    }

    checkCollision(projectileIndex)
    {
        let map = mapHandler.map;
        let len = map.enemies.length; 
    
        // x1 = x cos(radians) - y sin(radians)
        // y1 = x sin(radians) + y cos(radians)

        let x1 = this.width*Math.cos(this.radians) - 0*Math.sin(this.radians);
        let y1 = this.width*Math.sin(this.radians) + 0*Math.cos(this.radians);

        let x2 = this.width*Math.cos(this.radians) - this.height*Math.sin(this.radians);
        let y2 = this.width*Math.sin(this.radians) + this.height*Math.cos(this.radians);

        let x3 = 0*Math.cos(this.radians) - this.height*Math.sin(this.radians);
        let y3 = 0*Math.sin(this.radians) + this.height*Math.cos(this.radians);


        this.x1 = this.x + x1;
        this.y1 = this.y + y1;

        this.x2 = this.x + x2;
        this.y2 = this.y + y2;

        this.x3 = this.x + x3;
        this.y3 = this.y + y3;
        



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

        let tile = mapHandler.map.getTileId(this.x, this.y);
        if(tile.solid)
        {
            this.removeFromMap();
            //g_projectiles.splice(projectileIndex, 1);
        }
    }
}