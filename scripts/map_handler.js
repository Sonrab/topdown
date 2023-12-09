class MapHandler
{
    constructor(map, spawn)
    {
        this.map = map;
        this.foregroundAlpha = 1.0;
        this.setMap(map, spawn);
    }

    clearMap()
    {
        for(let i = 0; i < this.map.enemies.length; i++)
        {
            clearTimeout(this.map.enemies[i].animationInterval);
        }
    }

    setMap(map, spawn)
    {
        console.log(spawn);
        this.clearMap();
        
        this.map = map;
        game.musicPlayer.changeAudio(map.audio);
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


        player.setXY(spawn.x*tileWidth, spawn.y*tileWidth);
    }
}