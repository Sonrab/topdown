const backgroundimg = addImage("images/background.png");
const scifiSheet = addImage("images/tilesheets/scifi_tileset.png");
class GameMap
{
    constructor(mapname, tileset, audio, passages, interactables, enemies, objects, backgroundLayer, foregroundLayer, collissionLayer)
    {
        this.name = mapname;
        this.tileset = tileset;
        this.tilesetTilesPerRow = this.tileset.width/tileWidth;


        this.audio = audio;
        this.passages = passages; 
        this.interactables = interactables;
        this.enemies = enemies;
        this.objects = objects;
        this.background = backgroundimg;

        this.backgroundLayer = backgroundLayer;
        this.foregroundLayer = foregroundLayer;
        this.collissionLayer = collissionLayer;

        this.mapsize = {width : this.backgroundLayer[0].length*tileWidth, height : this.backgroundLayer.length*tileWidth}
        console.log(this.name);
        this.lootOnGround = [];

        this.init();
    }

    init()
    {
        this.createMapBuffer();
    }


    createMapBuffer() 
    {
        //this function creates a buffer for the background layers of the tilemap. Since they are always at the bottom there's no need
        //to redraw every tile by itself every loop, and instead they are drawn once on a separate canvas, and then the viewport can be 
        //cropped from that separate canvas and drawn on the main canvas

        let loopRowsFrom = 0;
        let loopColsFrom = 0;
        let loopRowsTo = this.mapsize.height/tileWidth;
        let loopColsTo = this.mapsize.width/tileWidth;

        let mapIndexOffset = -1;
         
        //loops through every tile in the grid, checks it's id and draws the matching 32x32 piece from the tilesheet
        for (let row = loopRowsFrom; row < loopRowsTo; row++)
        {
            for (let col = loopColsFrom; col < loopColsTo; col++)
            {
                let tile = this.backgroundLayer[row][col];
                if(tile[0] === 0 && tile[1] === 0)  
                    continue;

                for(let i = 0; i < 2; i++)
                {
                    let tileId = tile[i]+mapIndexOffset;
                    let sourceX = Math.floor(tileId % this.tilesetTilesPerRow) *tileWidth;
                    let sourceY = Math.floor(tileId / this.tilesetTilesPerRow) *tileWidth;
                    mapBufferCtx.drawImage(scifiSheet, sourceX, sourceY, tileWidth, tileWidth, col*tileWidth, row*tileWidth, tileWidth, tileWidth);
                }
                    // mapBufferCtx.strokeRect(col*tileWidth, row*tileWidth, (col+1)*tileWidth, (row+1)*tileWidth);
                    // mapBufferCtx.textAlign="center";
                    // mapBufferCtx.font = "8px Arial"; 
                    // mapBufferCtx.fillText("y: " + row, col*tileWidth+8, row*tileWidth + 16);
                    // mapBufferCtx.fillText("x: " + col, col*tileWidth+8, row*tileWidth + 24);
                
            }
        }
    }

    render()
    {
        let loopRowsFrom = Math.floor(player.camera.y/tileWidth);
        if(loopRowsFrom < 0) 
        {
            loopRowsFrom = 0;
        }
    
        let loopColsFrom = Math.floor(player.camera.x/tileWidth);
        if(loopColsFrom < 0)
        {
            loopColsFrom = 0;
        }
    
        let loopRowsTo = Math.floor(player.camera.y/tileWidth) + Math.floor(player.camera.viewport.height/tileWidth)+2;
        if(loopRowsTo > this.mapsize.height/tileWidth)
        {
            loopRowsTo = this.mapsize.height/tileWidth;
        }    
    
        let loopColsTo = Math.floor(player.camera.x/tileWidth) + Math.floor(player.camera.viewport.width/tileWidth)+2;
        if(loopColsTo > this.mapsize.width/tileWidth)
        {
            loopColsTo = this.mapsize.width/tileWidth;
        }
        
        let mapIndexOffset = -1;
        //loops through every tile in the grid, checks it's id and draws the matching 32x32 piece from the tilesheet
    

        this.renderObjects();
        this.renderInteractables();
        this.renderEnemies();
        this.renderLoot();
    }

    renderLoot()
    {
        for(let i = 0; i < this.lootOnGround.length; i++)
        {
            this.lootOnGround[i].render();
        }
    }

    renderObjects()
    {
        for(let i = 0; i < this.objects.length; i++)
        {
            this.objects[i].render();
        }
    }

    renderForeground()
    {
        let drawPlayer = true;
        if(this.getForegroundTileId(player.x, player.y))
        {
            player.render();
            drawPlayer = false;
        }

        let loopRowsFrom = Math.floor(player.camera.y/tileWidth);
        if(loopRowsFrom < 0) 
        {
            loopRowsFrom = 0;
        }

        let loopColsFrom = Math.floor(player.camera.x/tileWidth);
        if(loopColsFrom < 0)
        {
            loopColsFrom = 0;
        }

        let loopRowsTo = Math.floor(player.camera.y/tileWidth) + Math.floor(player.camera.viewport.height/tileWidth)+2;
        if(loopRowsTo > this.mapsize.height/tileWidth)
        {
            loopRowsTo = this.mapsize.height/tileWidth;
        }    

        let loopColsTo = Math.floor(player.camera.x/tileWidth) + Math.floor(player.camera.viewport.width/tileWidth)+2;
        if(loopColsTo > this.mapsize.width/tileWidth)
        {
            loopColsTo = this.mapsize.width/tileWidth;
        }

        let mapIndexOffset = -1;
        for (let row = loopRowsFrom; row < loopRowsTo; row++)
        {
            for (let col = loopColsFrom; col < loopColsTo; col++)
            {
                if(this.foregroundLayer[row][col] === 0)
                    continue;

                let tileId = this.foregroundLayer[row][col]+mapIndexOffset;

                let sourceX = Math.floor(tileId % this.tilesetTilesPerRow) *tileWidth;
                let sourceY = Math.floor(tileId / this.tilesetTilesPerRow) *tileWidth;
                //ctx.globalAlpha = 
                ctx.drawImage(this.tileset, sourceX, sourceY, tileWidth, tileWidth, col*tileWidth, row*tileWidth, tileWidth, tileWidth);       
            }
        }

        if(drawPlayer)
        {
            player.render();
        }
    }

    getForegroundTileId(x, y)
    {
        let gridX = Math.floor(x/tileWidth); 
        let gridY = Math.floor(y/tileWidth);

        return this.foregroundLayer[gridY][gridX];
        // if(!this.foregroundLayer[gridY]) 
        //     return 0;
        // else if(!this.foregroundLayer[gridY][gridX])
        //     return 0;
        // else if(!this.foregroundLayer[gridY][gridX][2]) //check if foreground-layer tile exists
        //     return 0;
        // else
        // {
        //     return this.foregroundLayer[gridY][gridX][2];
        // }
    }

    getCollissionTileId(x, y)
    {
        let gridX = Math.floor(x/game.collissionTilesize); 
        let gridY = Math.floor(y/game.collissionTilesize);

        return this.collissionLayer[gridY][gridX]; //get tile from position in collissionlayer
    }



    renderInteractables()
    {
        for(let i = 0; i < this.interactables.length; i++)
        {
            this.interactables[i].render();
        }
    }

    renderEnemies()
    {
        for(let i = 0; i < this.enemies.length; i++)
        {
            this.enemies[i].render();
        }
    }



    generateMap()
    {
        let mapname = "aaaa";
        let audio = "overworld";
        let passages = [];
        let interactables = [];
        let enemies = [];

        let map = new GameMap();
        mapname, audio, passages, interactables, enemies, grid
        // [1, 1, 1]
        // [1, 3, 1]
        // [1, 1, 1]


        // [1, 1, 1, 0, 0, 0]
        // [1, 3, 1, 0, 0, 0]
        // [1, 1, 1, 0, 0, 0]
        // [0, 0, 0, 0, 0, 0]
        // [0, 0, 0, 0, 0, 0]
        // [0, 0, 0, 0, 0, 0]
    }

    LosBetweenPoints(x1, y1, x2, y2)
    {
        let pixelStep = 6;
        
    }

}

