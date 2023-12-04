function CMapHandler(map, spawn)
{
    this.map = map;
    this.foregroundAlpha = 1.0;
    this.setMap(map, spawn);
};

CMapHandler.prototype.clearMap = function()
{
    for(let i = 0; i < this.map.enemies.length; i++)
    {
        clearTimeout(this.map.enemies[i].animationInterval);
    }
};

//changes map
CMapHandler.prototype.setMap = function(map, spawn)
{
    
    this.clearMap();
    
    this.map = map;
    musicHandler.changeAudio(map.audio);
    this.spawn = spawn;
    console.log(this.spawn);
    //sets the canvas height and width to the correct size for current map.
    //let mapsize = {width : this.map.grid[0].length*tileWidth, height : this.map.grid.length*tileWidth};
    let mapsize = this.map.mapsize;
    // canvas.width = this.map.grid[0].length*32;
    // canvas.height = this.map.grid.length*32;
    if(this.map.mapsize.width * scaling > window.innerWidth)
        canvas.width = Math.floor(window.innerWidth); //offset scrollbar
    else
        canvas.width = this.map.mapsize.width * scaling;


    if(this.map.mapsize.height * scaling > window.innerHeight)
        canvas.height = window.innerHeight;
    else
        canvas.height = this.map.mapsize.height * scaling;



    //update player values
    if(this.spawn.x || this.spawn.x === 0)
    {

        player.x = (spawn.x*tileHandler.tileWidth) + tileHandler.tileWidth - player.width;
        //console.log(player.x);
        player.tx = player.x;
    }
    player.bomb = false;
    player.dashing = false;
    console.log(player.x);
    console.log(player.y);
    if(this.spawn.y || this.spawn.y === 0)
    {
        console.log(player.y);
        player.y = (spawn.y*tileHandler.tileWidth) + tileHandler.tileWidth - player.height;
        player.ty = player.y;
    }

    // for(let i = 0; i < this.map.enemies.length; i++)
    // {
    //     let enemy = this.map.enemies[i];
    //     // if(enemy.dead)
    //     //     this.map.enemies.splice(i, 1)
    //     // else
    //         enemy.animate();
    // }
};


