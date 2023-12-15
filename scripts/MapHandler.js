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
        this.clearMap();

        //uncomment to enable music
        //game.musicPlayer.changeAudio(map.audio);


        this.map = map;
        this.spawn = spawn;

        //calculate canvas width and height
        let canvaswidth = 0;
        let canvasHeight = 0;
        
        if(this.map.mapsize.width * game.scaling.x > window.innerWidth)
        {
            canvaswidth = Math.floor(window.innerWidth); //offset scrollbar
        }
        else
        {
            canvaswidth = this.map.mapsize.width * game.scaling.x;
        }
            
        if(this.map.mapsize.height * game.scaling.y > window.innerHeight)
        {
            canvasHeight = window.innerHeight;
        }
        else
        {
            canvasHeight = this.map.mapsize.height * game.scaling.y;
        }

        resizeCanvas(canvaswidth, canvasHeight);

        updateBufferSize(this.map.mapsize);
        this.map.createMapBuffer();

        player.setXY(spawn.x*tileWidth, spawn.y*tileWidth);
        canvasBoundingRect = canvas.getBoundingClientRect(); //used for adjusting mouse pos on canvas on maps smaller than screensize
    }
}