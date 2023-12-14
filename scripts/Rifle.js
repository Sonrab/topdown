const imgRifle = addImage("images/weapons/rifle.png");


class Rifle
{
    constructor()
    {
        this.arrowSpeed = 10;
        this.fireRate = 5; //arrows per sec
        this.fireRateIncrease = 1; //percentage increase of firerate (1 = 100%, default)
        this.img = imgRifle;
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

            

            let dx = mouse.transX - player.center.x;
            let dy = mouse.transY - player.center.y;

            
            //console.log(magnitude);
            let angle = Math.atan2(dy, dx) * (180 / Math.PI);
            angle = angle + randomInt(-5, 5);
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
        this.x = player.x;
        this.y = player.y;
        console.log(player.direction);
        switch(player.direction)
        {   
            case player.directions.left:
                ctx.drawImage(this.img, 19, 0, 19, 8, player.x-3, player.y, 19, 8);

                break;
    
            case player.directions.right:
                ctx.drawImage(this.img, 0, 0, 19, 8, player.x+3, player.y, 19, 8);
                break;
        }   
    }
}



