var swordimg = new Image();
swordimg.src = "images/weapons/sword.png";

var swingimg = new Image();
swingimg.src = "images/weapons/swing.png";




function CSword()
{
    this.damage = 1;
    this.img = swordimg;
    this.height = 5;
    this.x = 0;
    this.y = 0;
    this.swingActive = false;

    this.range = 10;
}

CSword.prototype.render = function()
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
var projectiles = new Array();
CSword.prototype.swing = function()
{
    let dx = mouse.x - (player.center.x);
    let dy = mouse.y - (player.center.y);
    let magnitude = Math.sqrt(dx*dx + dy*dy);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);

    if(angle < 0)
    {
        angle = 360 - (-angle);
    }
    console.log(player.center.x);
    console.log(mouse.x);

    projectiles.push(new CArrow(player.center.x, player.center.y, dx, dy, magnitude, angle, 1, "player"));

    console.log(projectiles);



    //old swing code
    // if(!this.swingActive)
    // {
    //     this.swingActive = true;
    //     setTimeout(function(){
    //         sword.swingActive = false;
    //     }, 1000);
    // }
}

var sword = new CSword();



