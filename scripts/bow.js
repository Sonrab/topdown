var swordimg = new Image();
swordimg.src = "images/weapons/sword.png";

var swingimg = new Image();
swingimg.src = "images/weapons/swing.png";




function CBow()
{
    this.arrowSpeed = 10;
    this.fireRate = 0.8; //arrows per sec
    this.fireRateIncrease = 2; //percentage increase of firerate (1 = 100%, default)
    this.img = swordimg;
    this.height = 5;
    this.damage = 1;
    this.mouseDownAutoUse = true;
    this.lastFire = 0;
    this.x = 0;
    this.y = 0;

    this.range = 10;
}

CBow.prototype.equip = function()
{
    player.equippedWep = this;
};

CBow.prototype.unequip = function()
{

};

var projectiles = new Array();
CBow.prototype.use = function()
{
    if(this.lastFire + (1/(this.fireRate*this.fireRateIncrease) * 1000) <= currentTime)
    {
        this.lastFire = currentTime;
        let dx = mouse.transX - (player.center.x);
        let dy = mouse.transY - (player.center.y);
        let magnitude = Math.sqrt(dx*dx + dy*dy);
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
        if(angle < 0)
        {
            angle = 360 - (-angle);
        }
    
    
        projectiles.push(new Arrow(player.center.x, player.center.y, dx, dy, magnitude, angle, this.damage, "player"));
    
        console.log(projectiles);
    }
}

CBow.prototype.render = function()
{
    this.x = player.center.x;
    this.y = player.center.y;
    // ctx.translate(projectiles[i].x + projectiles[i].width/2, projectiles[i].y + projectiles[i].height/2);
    // ctx.rotate(projectiles[i].angle*(Math.PI/180));
    // ctx.drawImage(projectiles[i].name, -projectiles[i].width/2, -projectiles[i].height/2);



    let trans = ctx.getTransform();
    let angle;
    ctx.translate(this.x, this.y);
    switch(player.dir)
    {
        case "down":       
            angle = 90*Math.PI/180.0;
            ctx.rotate(angle);
            ctx.drawImage(this.img, 5, 8);
            if(this.swingActive)
            {
                ctx.drawImage(swingimg, 0, 0);
            }
            ctx.rotate(-angle);
            break;

        case "left":
            angle = 180*Math.PI/180.0;
            ctx.rotate(angle);
            ctx.drawImage(this.img, 0, -8 + (-this.height));
            if(this.swingActive)
            {
                ctx.drawImage(swingimg, 20, 0);
            }
            ctx.rotate(-angle);
            break;

        case "right":
            angle = 0*Math.PI/180.0;
            
            ctx.rotate(angle);
            ctx.drawImage(this.img, 0, 8);
            if(this.swingActive)
            {
                ctx.drawImage(swingimg, 0, 0);
            }
            ctx.rotate(-angle);
            
            break;

        case "up":
            angle = 270*Math.PI/180.0;
            ctx.rotate(angle);
            ctx.drawImage(this.img, -5, 8);
            if(this.swingActive)
            {
                ctx.drawImage(swingimg, 0, 0);
            }
            ctx.rotate(-angle);
            break;
    }   
    ctx.translate(-this.x, -this.y);
    
}



