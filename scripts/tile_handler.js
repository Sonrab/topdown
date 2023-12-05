//BACKGROUND/IMAGES: This imports my tileSheet (picture) so I can use it in my game.

function CTileHandler()
{
    this.tiles = new Map();
    this.tileWidth = tileWidth;
    this.loadTiles();
};

CTileHandler.prototype.getTileById = function(id)
{
    return this.tiles.get(id);
};

CTileHandler.prototype.overWorldPlainsTiles = function()
{

};

//COLLISION DETECTION: This checks if the blocks my character is touching is having collision or not (if its walkable):
CTileHandler.prototype.loadTiles = function()
{
    let basic_solid_tiles = [133, 134, 135, 136, 137, 138, 149, 150, 151, 152, 153, 154, 177, 178, 179, 193, 195, 209, 210, 211, 225, 226, 227];
    // for(let i = 0; i < basic_solid_tiles.length; i++)
    // {
    //         basic_solid_tiles.push(i);
    // }



    console.log(basic_solid_tiles);

    let solidTilePreset = new Tile(
        solid = true,
        friction = 1,
        speed = 1,
        jumpPenalty = 0
    );
    
    for(let i = 0; i < basic_solid_tiles.length; i++)
    {
        this.tiles.set(basic_solid_tiles[i], solidTilePreset);
    }

    let nonsolidTilePreset = new Tile(
        solid = false,
        friction = 0.2,
        speed = 1,
        jumpPenalty = 0
    );

    //id 0 is used as a "fake block" for when the player jumps or walks out of bounds at intended places such as walking towards a screen transition
    let basic_nonsolid_tiles = [0];
    for(let i = 0; i < basic_nonsolid_tiles.length; i++)
    {
        this.tiles.set(basic_nonsolid_tiles[i], nonsolidTilePreset);
    }

    // let solid_bombable_tiles = [191];
    // let nonsolid_bombable_tiles = [];

    let solidBombablePreset = new Tile(
        solid = true,
        friction = 1,
        speed = 1,
        jumpPenalty = 0,
        bombable = true
    );

    let nonsolidBombablePreset = new Tile(
        solid = false,
        friction = 1,
        speed = 1,
        jumpPenalty = 0,
        bombable = true
    );

    // for(let i = 0; i < solid_bombable_tiles.length; i++)
    // {
    //     this.tiles.set(solid_bombable_tiles[i], solidBombablePreset);
    // }

    // for(let i = 0; i < nonsolid_bombable_tiles.length; i++)
    // {
    //     this.tiles.set(nonsolid_bombable_tiles[i], nonsolidBombablePreset);
    // }


    solidSplitTile32Preset = new Tile(
        solid = true,
        friction = 1,
        speed = 1,
        jumpPenalty = 0,
        bombable = false,
        width = 32,
        height = 32
    );

    nonsolidSplitTile32Preset = new Tile(
        solid = false,
        friction = 1,
        speed = 1,
        jumpPenalty = 0,
        bombable = false,
        width = 32,
        height = 32
    );

    solidSplitTile16Preset = new Tile(
        solid = true,
        friction = 1,
        speed = 1,
        jumpPenalty = 0,
        bombable = false,
        width = 16,
        height = 16
    );

    nonsolidSplitTile16Preset = new Tile(
        solid = false,
        friction = 1,
        speed = 1,
        jumpPenalty = 0,
        bombable = false,
        width = 16,
        height = 16
    );

    solidSplitTile16Preset = new Tile(
        solid = true,
        friction = 1,
        speed = 1,
        jumpPenalty = 0,
        bombable = false,
        width = 8,
        height = 8
    );

    nonsolidSplitTile8Preset = new Tile(
        solid = false,
        friction = 1,
        speed = 1,
        jumpPenalty = 0,
        bombable = false,
        width = 8,
        height = 8
    );

    solidSplitTile8Preset = new Tile(
        solid = true,
        friction = 1,
        speed = 1,
        jumpPenalty = 0,
        bombable = false,
        width = 8,
        height = 8
    );

    //left stairs 129, 145, 161, 131, 147, 163
    //right stairs 130, 146, 162, 132, 148, 164

    stairs_left = [129, 131, 145, 147, 161, 163];
    stairs_right = [130, 132, 146, 148, 162, 164];

    //split tile goes topleft, topright, bottomleft, bottomright
    for(let i = 0; i < stairs_left.length; i++)
    {
        this.tiles.set(stairs_left[i], 
            new SplitTile( 
                new SplitTile(
                    solidSplitTile8Preset,
                    nonsolidSplitTile8Preset,
                    solidSplitTile8Preset,
                    nonsolidSplitTile8Preset
                ),
                nonsolidSplitTile16Preset,
                new SplitTile(
                    solidSplitTile8Preset,
                    nonsolidSplitTile8Preset,
                    solidSplitTile8Preset,
                    nonsolidSplitTile8Preset
                ),
                nonsolidSplitTile16Preset
            )
        );
    }


    //split tile goes topleft, topright, bottomleft, bottomright
    for(let i = 0; i < stairs_right.length; i++)
    {
        this.tiles.set(stairs_right[i], 
            new SplitTile( 
                nonsolidSplitTile16Preset,
                new SplitTile(
                    nonsolidSplitTile8Preset,
                    solidSplitTile8Preset,
                    nonsolidSplitTile8Preset,
                    solidSplitTile8Preset
                ),
                nonsolidSplitTile16Preset,
                new SplitTile(
                    nonsolidSplitTile8Preset,
                    solidSplitTile8Preset,
                    nonsolidSplitTile8Preset,
                    solidSplitTile8Preset
                )
            )
        );
    }



    //split tile goes topleft, topright, bottomleft, bottomright
    //top fence tile
    this.tiles.set(178, new SplitTile(
        new SplitTile( 
            solidSplitTile8Preset,
            solidSplitTile8Preset,
            nonsolidSplitTile8Preset,
            nonsolidSplitTile8Preset
        ),
        new SplitTile( 
            solidSplitTile8Preset,
            solidSplitTile8Preset,
            nonsolidSplitTile8Preset,
            nonsolidSplitTile8Preset
        ),
        nonsolidSplitTile16Preset,
        nonsolidSplitTile16Preset
    ));

    //left fence
    this.tiles.set(193, new SplitTile(
        new SplitTile( 
            solidSplitTile8Preset,
            nonsolidSplitTile8Preset,
            solidSplitTile8Preset,
            nonsolidSplitTile8Preset
        ),
        nonsolidSplitTile16Preset,
        new SplitTile( 
            solidSplitTile8Preset,
            nonsolidSplitTile8Preset,
            solidSplitTile8Preset,   
            nonsolidSplitTile8Preset
        ),      
        nonsolidSplitTile16Preset
    ));

    //topleft fence
    this.tiles.set(177, new SplitTile(
        new SplitTile( 
            solidSplitTile8Preset,
            solidSplitTile8Preset,
            solidSplitTile8Preset,
            nonsolidSplitTile8Preset
        ),
        new SplitTile( 
            solidSplitTile8Preset,
            solidSplitTile8Preset,
            nonsolidSplitTile8Preset,
            nonsolidSplitTile8Preset
        ),
        new SplitTile( 
            solidSplitTile8Preset,
            nonsolidSplitTile8Preset,
            solidSplitTile8Preset,   
            nonsolidSplitTile8Preset
        ),      
        nonsolidSplitTile16Preset
    ));


    //topright fence
    this.tiles.set(179, new SplitTile(
        new SplitTile( 
            solidSplitTile8Preset,
            solidSplitTile8Preset,
            nonsolidSplitTile8Preset,
            nonsolidSplitTile8Preset
        ),
        new SplitTile( 
            solidSplitTile8Preset,
            solidSplitTile8Preset,
            nonsolidSplitTile8Preset,
            solidSplitTile8Preset
        ),
        nonsolidSplitTile16Preset,
        new SplitTile( 
            nonsolidSplitTile8Preset,
            solidSplitTile8Preset,
            nonsolidSplitTile8Preset,   
            solidSplitTile8Preset
        )  
    ));

    //right fence
    this.tiles.set(195, new SplitTile(
        nonsolidSplitTile16Preset,
        new SplitTile( 
            nonsolidSplitTile8Preset,
            solidSplitTile8Preset,
            nonsolidSplitTile8Preset,
            solidSplitTile8Preset
        ),
        nonsolidSplitTile16Preset,
        new SplitTile( 
            nonsolidSplitTile8Preset,
            solidSplitTile8Preset,
            nonsolidSplitTile8Preset,   
            solidSplitTile8Preset
        )  
        
    ));


    // //split tile goes topleft, topright, bottomleft, bottomright
    //staircase bl -> tr
    // this.tiles.set(131, new CSplitTile(
    //     nonsolidSplitTile32Preset, 
        
    //     new CSplitTile( 
    //         nonsolidSplitTile16Preset,
    //         solidSplitTile16Preset,
    //         solidSplitTile16Preset,
    //         solidSplitTile16Preset
    //     ),
    //     new CSplitTile(
    //         nonsolidSplitTile16Preset,
    //         solidSplitTile16Preset,
    //         solidSplitTile16Preset,
    //         solidSplitTile16Preset
    //     ),
    //     //solidSplitTile32Preset,
    //     solidSplitTile32Preset
    // ));



    // this.tiles.set(131, new CSplitTile(
    //     nonsolidSplitTile32Preset,
        
    //     new CSplitTile(
    //         nonsolidSplitTile16Preset,
    //         solidSplitTile16Preset,
    //         solidSplitTile16Preset,
    //         solidSplitTile16Preset
    //     ),
    //     new CSplitTile(
    //         nonsolidSplitTile16Preset,
    //         solidSplitTile16Preset,
    //         solidSplitTile16Preset,
    //         solidSplitTile16Preset
    //     ),
    //     //solidSplitTile32Preset,
    //     solidSplitTile32Preset
    // ));

    // //split tile goes topleft, topright, bottomleft, bottomright
    // this.tiles.set(17, new CSplitTile(
    //     new CTile(
    //         solid = true,
    //         friction = 1,
    //         speed = 0,
    //         jumpPenalty = 0,
    //         bombable = true,
    //         width = 16,
    //         height = 16
    //     ),
    //     new CTile(
    //         solid = true,
    //         friction = 1,
    //         speed = 0,
    //         jumpPenalty = 0,
    //         bombable = true,
    //         width = 16,
    //         height = 16
    //     ),
    //     new CTile(
    //         solid = false,
    //         friction = 1,
    //         speed = 0,
    //         jumpPenalty = 0,
    //         bombable = true,
    //         width = 16,
    //         height = 16
    //     ),
    //     new CTile(
    //         solid = false,
    //         friction = 1,
    //         speed = 0,
    //         jumpPenalty = 0,
    //         bombable = true,
    //         width = 16,
    //         height = 16
    //     ))
    // );

    // //split tile goes topleft, topright, bottomleft, bottomright
    // this.tiles.set(18, new CSplitTile(
    //     new CTile(
    //         solid = true,
    //         friction = 1,
    //         speed = 0,
    //         jumpPenalty = 0,
    //         bombable = true,
    //         width = 16,
    //         height = 16
    //     ),
    //     new CTile(
    //         solid = false,
    //         friction = 1,
    //         speed = 0,
    //         jumpPenalty = 0,
    //         bombable = true,
    //         width = 16,
    //         height = 16
    //     ),
    //     new CTile(
    //         solid = false,
    //         friction = 1,
    //         speed = 0,
    //         jumpPenalty = 0,
    //         bombable = true,
    //         width = 16,
    //         height = 16
    //     ),
    //     new CTile(
    //         solid = false,
    //         friction = 1,
    //         speed = 0,
    //         jumpPenalty = 0,
    //         bombable = true,
    //         width = 16,
    //         height = 16
    //     ))
    // );
};
CTileHandler.prototype.isWalkable = function(tileId)
{
   speed = getSpeed(tileId);
   player.speed = speed;
   return speed;
};