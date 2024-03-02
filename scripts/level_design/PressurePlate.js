const imgPressurePlate = addImage("images/pressure_plate.png");

class PressurePlate
{
    constructor(x, y)
    {
        this.gridPos = {x: x, y: y};
        this.x = x*tileWidth;
        this.y = y* tileWidth;
        this.activated = false;
        this.width = 32;
        this.height = 32;



    }

    update()
    {
        this.isSteppedOn();
    }

    render()
    {
        if(this.activated)
            ctx.drawImage(imgPressurePlate, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        else
            ctx.drawImage(imgPressurePlate, this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    isSteppedOn()
    {
        this.activated = false;
        for(let i = 0; i < game.currentMap.enemies.length; i++)
        {
            let enemy = game.currentMap.enemies[i];
            if(!enemy.collidesWith.includes(2))
                continue;

            //width
            if(rectanglesOverlap({x: this.x, y: this.y, width: this.width, height: this.height},
                {x: enemy.x, y: enemy.y, width: enemy.width, height: enemy.height}))
            {
                this.activated = true;
                return;
            }
        }
    }
}