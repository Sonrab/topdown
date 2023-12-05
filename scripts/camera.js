class Camera
{
    constructor()
    {
        this.x = 0;
        this.tx = 0;
        this.y = 0;
        this.ty = 0;
        this.viewport = {width : window.innerWidth/scaling, height : window.innerHeight/scaling};   
        this.cameraCenter;
    }

    update()
    {
        let mapsize = mapHandler.map.mapsize;
        // this.tx = Math.floor(player.x - (this.viewport.width/2));
        // this.ty = Math.floor(player.y - (this.viewport.height/2));
        this.tx = Math.floor((player.x + player.width/2 - (this.viewport.width/2)));
        // this.tx *= scaling;
        this.ty = Math.floor((player.y+player.height/2) - (this.viewport.height/2));
        // this.ty *= scaling;
    
        if(this.tx < 0)
            this.tx = 0;
        else if(this.tx + this.viewport.width > mapsize.width)
            this.tx = mapsize.width - this.viewport.width;
    
        if(this.ty < 0)
            this.ty = 0;
        else if(this.ty + this.viewport.height > mapsize.height)
            this.ty = mapsize.height - this.viewport.height;
    
        this.x = this.tx;
        this.y = this.ty;
    }
}


// function CCamera()
// {
//     this.x = 0;
//     this.tx = 0;
//     this.y = 0;
//     this.ty = 0;
//     this.viewport = {width : window.innerWidth/scaling, height : window.innerHeight/scaling};   
//     this.cameraCenter;
// }

// CCamera.prototype.update = function()
// {
//     let mapsize = mapHandler.map.mapsize;
//     // this.tx = Math.floor(player.x - (this.viewport.width/2));
//     // this.ty = Math.floor(player.y - (this.viewport.height/2));
//     this.tx = Math.floor((player.x + player.width/2 - (this.viewport.width/2)));
//     // this.tx *= scaling;
//     this.ty = Math.floor((player.y+player.height/2) - (this.viewport.height/2));
//     // this.ty *= scaling;

//     if(this.tx < 0)
//         this.tx = 0;
//     else if(this.tx + this.viewport.width > mapsize.width)
//         this.tx = mapsize.width - this.viewport.width;

//     if(this.ty < 0)
//         this.ty = 0;
//     else if(this.ty + this.viewport.height > mapsize.height)
//         this.ty = mapsize.height - this.viewport.height;

//     this.x = this.tx;
//     this.y = this.ty;
// }

