class Camera
{
    constructor()
    {
        this.x = 0;
        this.tx = 0;
        this.y = 0;
        this.ty = 0;
        this.velX = 0;
        this.velY = 0;
        this.locked = true;
        this.speed = 8;

        //stores the width and height of the camera viewport
        this.viewport = {
            width : window.innerWidth/game.scaling.x, 
            height : window.innerHeight/game.scaling.y,
            halfWidth: window.innerWidth/game.scaling.x/2,
            halfHeight: window.innerHeight/game.scaling.y/2,
            unscaledWidth: window.innerWidth,
            unscaledHeight: window.innerHeight
        };
    }

    update()
    {
        let mapsize = game.currentMap.mapsize;

        //set target viewport coordinates to be centered on player
        this.tx = Math.floor(player.center.x - this.viewport.halfWidth);
        this.ty = Math.floor(player.center.y - this.viewport.halfHeight);
       
        //check if target viewport is outside any map edge
        if(this.tx < 0 || this.viewport.width >= mapsize.width) //occurs if camera hits left edge or if map width is smaller than viewport width
            this.tx = 0; //stop camera at left edge
        else if(this.tx + this.viewport.width > mapsize.width) //occurs if camera hits right edge
            this.tx = mapsize.width - this.viewport.width; //stop camera at right edge
    
        if(this.ty < 0 || this.viewport.height > mapsize.height) //occurs if camera hits top edge or if map height is smaller than viewport height
            this.ty = 0; //stop camera at top edge
        else if(this.ty + this.viewport.height > mapsize.height) //occurs if camera hits bottom edge
            this.ty = mapsize.height - this.viewport.height; //stop camera at bottom edge


        //CODE FOR MAKING CAMERA MOVE SLOWER TOWARDS PLAYER    
        // let dx = Math.floor(this.tx - this.x);
        // let dy = Math.floor(this.ty - this.y);  
        // let magnitude = pythagorean(dy, dx);
        // this.velX = (dx/magnitude) * this.speed;
        // this.velY = (dy/magnitude) * this.speed;

        // if(this.tx - this.x > this.speed || this.tx - this.x < -this.speed)
        // {
        //     this.tx = this.x + this.velX;
        // }

        // if(this.ty - this.y > this.speed || this.ty - this.y < -this.speed)
        // {
        //     this.ty = this.y + this.velY;
        // }

        this.x = this.tx;
        this.y = this.ty;
    }

    refreshViewport() //if screen is resized this needs to be called, otherwise game is operating at previous size
    {
        this.viewport = {
            width : window.innerWidth/game.scaling.x, 
            height : window.innerHeight/game.scaling.x,
            halfWidth: window.innerWidth/game.scaling.y/2,
            halfHeight: window.innerHeight/game.scaling.y/2
        };
    }
}