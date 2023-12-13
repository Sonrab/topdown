//cavedoor = new Image();
//cavedoor.src = "images/cavedoor.png";

class Door
{
    constructor(x, y, exitTo, spawn)
    {
        this.x = x;
        this.y = y;
        this.type = "cave";
        this.exitTo = exitTo;
        this.spawn = spawn;
        //this.img = cavedoor;
    }

    render()
    {
        ctx.drawImage(this.img, this.x*tileHandler.tileWidth, this.y*tileHandler.tileWidth);
    }

    onInteract()
    {
        mapHandler.setMap(maps.get(this.exitTo), this.spawn);
    }
}