const spritesheet_bow = new Image();
spritesheet_bow.src = "images/weapons/bow.png";


class Bow extends Weapon
{
    constructor()
    {
        super();
        this.arrowSpeed = 10;
        this.fireRate = 5; //arrows per sec
        this.fireRateIncrease = 1; //percentage increase of firerate (1 = 100%, default)
        this.img = spritesheet_bow;
        this.height = 5;
        this.damage = 1;
        this.mouseDownAutoUse = true;
        this.lastFire = 0;
        this.x = 0;
        this.y = 0;
        this.accuracy = 0.9;
        //calc accuracy by base 60 -> 60 * (1-this.accuracy)
        //angle = angle + randomInt(-(this.accuracy/2), this.accuracy/2)
        //0.9 accuracy gives 6 deg span
        //0.8 gives 12 and so on
    
        this.range = 10;
    }

    equip()
    {
        player.equippedWep = this;
    }

    unequip()
    {

    }

    use()
    {
        if(this.lastFire + (1/(this.fireRate*this.fireRateIncrease) * 1000) <= currentTime)
        {
            this.lastFire = currentTime;
            userInterface.triggerActionBarAnimation(userInterface.actionBar.primary.element);
            
            // let x = mouse.transX - randomInt(-25, 25);
            // let y = mouse.transY - randomInt(-25, 25);

            console.log(`${mouse.transX}, ${x}`)
            console.log(`${mouse.transY}, ${y}`)

            // let dx = x - player.center.x;
            // let dy = y - player.center.y;

            

            let dx = mouse.transX - player.center.x;
            let dy = mouse.transY - player.center.y;

            
            //console.log(magnitude);
            let angle = Math.atan2(dy, dx) * (180 / Math.PI);
            // angle = angle + randomInt(-5, 5);
            if(angle < 0)
            {
                angle = 360 - (-angle);
            }     
            let rad = angle * (Math.PI / 180);
            dx = Math.cos(rad);
            dy = Math.sin(rad);
        
            let magnitude = pythagorean(dy, dx);

            g_projectiles.push(new Arrow(player.center.x, player.center.y, dx, dy, magnitude, angle, this.damage, "player"));
        }
    }

    render()
    {
        {
            this.x = player.center.x;
            this.y = player.center.y;
            // ctx.translate(projectiles[i].x + projectiles[i].width/2, projectiles[i].y + projectiles[i].height/2);
            // ctx.rotate(projectiles[i].angle*(Math.PI/180));
            // ctx.drawImage(projectiles[i].name, -projectiles[i].width/2, -projectiles[i].height/2);
        
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
    }
}



