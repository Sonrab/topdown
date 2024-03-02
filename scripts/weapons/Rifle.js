const imgRifle = addImage("images/weapons/rifle.png");


class Rifle extends Weapon
{
    constructor()
    {
        super();
        this.fireRate = 5; //arrows per sec
        this.fireRateIncrease = 1; //percentage increase of firerate (1 = 100%, default)
        this.img = imgRifle;
        this.height = 5;
        this.damage = 5;
        this.mouseDownAutoUse = true;
        this.lastFire = 0;
        this.x = 0;
        this.y = 0;
        this.accuracy = 1;
        this.angleSpan = (1-this.accuracy)*60 / 2;
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
        player.equippedWep = player.bow;
    }

    use()
    {
        if(this.lastFire + (1/(this.fireRate*this.fireRateIncrease) * 1000) <= currentTime)
        {
            this.lastFire = currentTime;
            userInterface.triggerActionBarAnimation(userInterface.actionBar.primary.element);

            

            let dx = mouse.transX - player.center.x;
            let dy = mouse.transY - player.center.y;

            let angle = Math.atan2(dy, dx) * (180 / Math.PI);
            // angle = angle + randomFloat(-this.angleSpan, this.angleSpan);
            if(angle < 0)
            {
                angle = 360 - (-angle);
            }     
            let rad = angle * (Math.PI / 180);
            dx = Math.cos(rad);
            dy = Math.sin(rad);
        
            let magnitude = pythagorean(dx, dy);

            g_projectiles.push(new RifleBullet(player.center.x + RifleBullet.halfHeight, player.center.y-RifleBullet.halfHeight, dx, dy, magnitude, angle, this.damage, "player"));
        }
    }

    render()
    {
        this.x = player.x;
        this.y = player.y;
        switch(player.direction)
        {   
            case player.directions.left:
                ctx.drawImage(this.img, 19, 0, 19, 8, player.x, player.y-5, 19, 8);

                break;
    
            case player.directions.right:
                ctx.drawImage(this.img, 0, 0, 19, 8, player.x, player.y-5, 19, 8);
                break;
        }   
    }

    getInventoryStats()
    {
        return {
            damage: `Damage: ${this.damage}`,
            accuracy: `Accuracy: ${this.accuracy}`,
            fireRate: `Rate of fire: ${this.fireRate * this.fireRateIncrease}` 
        };
    }
}



