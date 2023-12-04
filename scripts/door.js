cavedoor = new Image();
cavedoor.src = "images/cavedoor.png";

function CDoor(x, y, exitTo, spawn)
{
    this.x = x;
    this.y = y;
    this.type = "cave";
    this.exitTo = exitTo;
    this.spawn = spawn;
    this.img = cavedoor;
};

CDoor.prototype.render = function()
{
    ctx.drawImage(this.img, this.x*tileHandler.tileWidth, this.y*tileHandler.tileWidth);
};

CDoor.prototype.onInteract = function()
{
    mapHandler.setMap(maps.get(this.exitTo), this.spawn);
};