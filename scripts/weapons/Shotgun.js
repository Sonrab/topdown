const imgShotgun = addImage("images/weapons/shotgun.png");

class Shotgun extends Weapon
{
    constructor(damage = 1, pellets = 8, spread = 30, fireRate = 0.75, fireRateIncrease = 1)
    {
        super();
        this.img = imgShotgun;
        this.x = 0;
        this.y = 0;

        this.damage = damage; //Damage of each pellet
        this.pellets = pellets; //number of shots to fire

        this.spread = spread; //spread in degrees. 30 = pellets will fire with direction between -(spread/2) and (spread/2) degrees of mouse position

        this.fireRate = fireRate; //fires per second
        this.fireRateIncrease = fireRateIncrease; //percentage increase of firerate (1 = 100%, default)

        this.mouseDownAutoUse = true;
        this.lastFire = 0;
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

            for(let i = 0; i < this.pellets; i++)
            {
                let accuracyAdjustedAngle = angle + randomInt(-this.spread/2, this.spread/2);
                if(accuracyAdjustedAngle < 0)
                {
                    accuracyAdjustedAngle = 360 - (-accuracyAdjustedAngle);
                }     
                let rad = accuracyAdjustedAngle * (Math.PI / 180);
                dx = Math.cos(rad);
                dy = Math.sin(rad);
            
                let magnitude = pythagorean(dy, dx);
    
                g_projectiles.push(new ShotgunPellet(player.center.x, player.center.y, dx, dy, magnitude, angle, this.damage, "player"));
            }

        }
    }

    render()
    {
        this.x = player.x;
        this.y = player.y;
        switch(player.direction)
        {   
            case player.directions.left:
                ctx.drawImage(this.img, 22, 0, 22, 9, player.x-10, player.y-25, 22, 9);

                break;
    
            case player.directions.right:
                ctx.drawImage(this.img, 0, 0, 22, 9, player.x+10, player.y-25, 22, 9);
                break;
        }   
    }

    getInventoryStats()
    {
        return {
            damage: `Damage: ${this.damage}x${this.pellets}`,
            spread: `Spread: ${this.spread}`,
            fireRate: `Rate of fire: ${this.fireRate * this.fireRateIncrease}` 
        };
    }
}



