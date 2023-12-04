var arrowimg = new Image();
arrowimg.src = "images/weapons/arrow.png";

function CArrow(x, y, dx, dy, magnitude, angle, damage)
{
	this.img = arrowimg;
	this.x = x;
	this.y = y;

    // this.damageInfo = {
    //     damage: damage,
    // }

	this.damage = damage;
	this.width = 22;
	this.height = 5;

	this.angle = angle;
    this.radians = this.angle * (Math.PI/180);
	this.speed = 6;
	this.velX = (dx/magnitude) * this.speed;
	this.velY = (dy/magnitude) * this.speed;
};

CArrow.prototype.render = function()
{
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle*(Math.PI/180));
    ctx.drawImage(this.img, 0, 0);
    ctx.rotate(-this.angle*(Math.PI/180));
    ctx.translate(-this.x, -this.y);


    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.lineTo(this.x3, this.y3);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
};

CArrow.prototype.update = function(projectileIndex)
{
    this.x += this.velX;
    this.y += this.velY;

    this.checkCollision(projectileIndex);
}


CArrow.prototype.checkCollision = function(projectileIndex)
{
    let map = mapHandler.map;
    let len = map.enemies.length; 

    //console.log(this.radians);
 
    //x1 = x cos(radians) - y sin(radians)
    //y1 = x sin(radians) + y cos(radians)

    let x1 = 22*Math.cos(this.radians) - 0*Math.sin(this.radians);
    let y1 = 22*Math.sin(this.radians) + 0*Math.cos(this.radians);

    let x2 = 22*Math.cos(this.radians) - 5*Math.sin(this.radians);
    let y2 = 22*Math.sin(this.radians) + 5*Math.cos(this.radians);

    let x3 = 0*Math.cos(this.radians) - 5*Math.sin(this.radians);
    let y3 = 0*Math.sin(this.radians) + 5*Math.cos(this.radians);


    this.x1 = this.x + x1;
    this.y1 = this.y + y1;

    this.x2 = this.x + x2;
    this.y2 = this.y + y2;

    this.x3 = this.x + x3;
    this.y3 = this.y + y3;
    



    for(let i = 0; i < len; i++)
    {
        let enemy = map.enemies[i];
        if(enemy.health.current <= 0)
            continue;

        if(this.x > enemy.x && this.x < enemy.x+enemy.width
        && this.y > enemy.y && this.y < enemy.y+enemy.height)
        {
            projectiles.splice(projectileIndex, 1);
            enemy.onHit(this.damage);
            return;
        }

    }

    let tile = mapHandler.map.getTileId(this.x, this.y);
    if(tile.solid)
    {
        projectiles.splice(projectileIndex, 1);
    }
};
