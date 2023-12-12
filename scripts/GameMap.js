const backgroundimg = addImage("images/background.png");

class GameMap
{
    constructor(mapname, audio, passages, interactables, enemies, grid)
    {
        this.name = mapname;
        this.audio = audio;
        this.passages = passages; 
        this.interactables = interactables;
        this.enemies = enemies;
        this.grid = grid;
        this.background = backgroundimg;
        console.log(enemies);
        this.mapsize = {width : grid[0].length*tileWidth, height : grid.length*tileWidth}
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
        //console.log(`Rows: ${loopRowsFrom} -> ${loopRowsTo}, Cols: ${loopColsFrom} -> ${loopColsTo}`);
    
        //console.log(`Rows: ${player.camera.viewport.width} -> ${loopRowsTo}, Cols: ${loopColsFrom} -> ${loopColsTo}`);
        
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        ctx.translate(-player.camera.x*scaling, -player.camera.y*scaling);
        ctx.drawImage(this.background, 0, 0);
        ctx.scale(scaling, scaling);
        ctx.imageSmoothingEnabled = false;
        
        let mapIndexOffset = -1;
        //loops through every tile in the grid, checks it's id and draws the matching 32x32 piece from the tilesheet
    
    
        for (let row = loopRowsFrom; row < loopRowsTo; row++)
        {
            for (let col = loopColsFrom; col < loopColsTo; col++)
            {
                for(let layer = 0; layer < 2; layer++)
                {
                    
                    //console.log(this.grid[row][col][layer]);
                    if(this.grid[row][col][layer] === 0)
                    {
                        // ctx.textAlign="center";
                        // ctx.font = "10px Arial"; 
                        // ctx.fillText("y: " + row, col*32+15, row*32 + 10);
                        // ctx.fillText("x: " + col, col*32+15, row*32 + 20);
                        continue;
                    }
                    let tileId = this.grid[row][col][layer]+mapIndexOffset;
        
                    let sourceX = Math.floor(tileId % imgPerRowTilesheet) *tileWidth;
                    let sourceY = Math.floor(tileId / imgPerRowTilesheet) *tileWidth;
    
                    ctx.drawImage(tilesheet, sourceX, sourceY, tileWidth, tileWidth, col*tileWidth, row*tileWidth, tileWidth, tileWidth);
    
                }
                //write out coordinates on screen
                // ctx.textAlign="center";
                // ctx.font = "8px Arial"; 
                // ctx.fillText("y: " + row, col*tileWidth+8, row*tileWidth + 16);
                // ctx.fillText("x: " + col, col*tileWidth+8, row*tileWidth + 24);
            }
        }
    
    
        this.renderInteractables();
        this.renderEnemies();
    }

    renderForeground()
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

        for (let row = loopRowsFrom; row < loopRowsTo; row++)
        {
            for (let col = loopColsFrom; col < loopColsTo; col++)
            {
                if(this.grid[row][col][2] === 0)
                {
                    continue;
                }
                let tileId = this.grid[row][col][2]+mapIndexOffset;

                let sourceX = Math.floor(tileId % imgPerRowTilesheet) *tileWidth;
                let sourceY = Math.floor(tileId / imgPerRowTilesheet) *tileWidth;
                //ctx.globalAlpha = 
                ctx.drawImage(tilesheet, sourceX, sourceY, tileWidth, tileWidth, col*tileWidth, row*tileWidth, tileWidth, tileWidth);       
            }
        }
    }

    getForegroundTileId(x, y)
    {
        let gridX = Math.floor(x/tileWidth); 
        let gridY = Math.floor(y/tileWidth);
        if(!this.grid[gridY]) 
            return 0;
        else if(!this.grid[gridY][gridX])
            return 0;
        else if(!this.grid[gridY][gridX][2]) //check if foreground-layer tile exists
            return 0;
        else
        {
            return this.grid[gridY][gridX][2];
        }
    }

    getTileId(x, y)
    {
        let gridX = Math.floor(x/tileWidth); 
        let gridY = Math.floor(y/tileWidth);

        if(!this.grid[gridY]) //means player in a hopefully intended way, such as walking towards a passage
            return tileHandler.getTileById(0);
        else if(!this.grid[gridY][gridX])
            return tileHandler.getTileById(0);
        else if(!this.grid[gridY][gridX][1]) //check if mainlayer-tile exists
            return tileHandler.getTileById(0);
        else
        {
            let tile = tileHandler.getTileById(this.grid[gridY][gridX][1]); //get mainlayer tile
            if(tile.splitTile) 
            {
                let overlapOnTileX = x - gridX*tileWidth;
                let overlapOnTileY = y - gridY*tileWidth;
                let corner;
                let val = this.getSplitTileCorner(tile, overlapOnTileX, overlapOnTileY, tileWidth);
                tile = val[0];
                corner = val[1];
                
                if(tile.splitTile)
                {
                    if(corner === "tr" || corner === "br")
                        overlapOnTileX -= tileWidth/2;

                    if(corner === "bl" || corner === "br")
                        overlapOnTileY -= tileWidth/2;

                    tile = this.getSplitTileCorner(tile, overlapOnTileX, overlapOnTileY, tileWidth/2)[0];
                    return tile;
                }     

            } 
            return tile;
        }    
    };


    getSplitTileCorner(tile, overlapX, overlapY, w)
    {
        if(overlapX <= w/2 && overlapY <= w/2) //top left
            return [tile.topLeft, "tl"];

        else if(overlapX <= w && overlapY <= w/2) //top right
            return [tile.topRight, "tr"];

        else if(overlapX <= w/2 && overlapY <= w) //bottom left
            return [tile.bottomLeft, "bl"];

        else if(overlapX <= w && overlapY <= w) //bottom right
            return [tile.bottomRight, "br"];
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
}

