function CTile(solid, friction, speed, jumpPenalty, bombable = false, width = tileWidth, height = tileWidth)
{
    this.solid = solid;
    this.friction = friction;
    this.speed = speed; //tile acts as multiplier. 1 = player moves at player speed
    this.jumpPenalty = jumpPenalty;
    this.bombable = bombable;
    this.width = width;
    this.height = height;
    this.splitTile = false;
    this.grappleable = true;
};

function CTriangleTile(a, b, c, slopeDir)
{
    this.solid = false;
    this.triangle = true;
    this.tilt = 45;
    this.slopeDir = slopeDir;
    this.a = a;
    this.b = b;
    this.c = c;
}

function CSplitTile(topLeft, topRight, bottomLeft, bottomRight)
{
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;
    this.splitTile = true;
};

CSplitTile.prototype.isSolid = function()
{
    
};