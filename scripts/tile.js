class Tile
{
    constructor(solid, speed, grappleable = true, bombable = false,)
    {
        this.solid = solid;
        this.speed = speed; //tile acts as multiplier. 1 = player moves at player speed
        this.grappleable = grappleable;
        this.bombable = bombable;
    }
}