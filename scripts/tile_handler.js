//BACKGROUND/IMAGES: This imports my tileSheet (picture) so I can use it in my game.
class TileHandler
{
    constructor()
    {
        this.tiles = new Map();
        this.tileWidth = tileWidth;
        this.loadTiles();
    }

    getTileById(id)
    {
        return this.tiles.get(id);
    }

    isWalkable()
    {
        speed = getSpeed(tileId);
        player.speed = speed;
        return speed;
    }

    loadTiles()
    {
        let basic_solid_tiles = [134, 135, 136, 137, 138, 150, 151, 152, 153, 154, 167, 168, 169, 170, 177, 178, 179, 183, 184, 185, 186, 193, 195, 209, 210, 211, 225, 226, 227];

        console.log(basic_solid_tiles);
    
        let solidTilePreset = new Tile(
            true,
            1,
            1,
            0
        );
        
        for(let i = 0; i < basic_solid_tiles.length; i++)
        {
            this.tiles.set(basic_solid_tiles[i], solidTilePreset);
        }
    
        let nonsolidTilePreset = new Tile(
            false,
            0.2,
            1,
            0
        );
    
        //id 0 is used as a "fake block" for when the player jumps or walks out of bounds at intended places such as walking towards a screen transition
        let basic_nonsolid_tiles = [0];
        for(let i = 0; i < basic_nonsolid_tiles.length; i++)
        {
            this.tiles.set(basic_nonsolid_tiles[i], nonsolidTilePreset);
        }

    
        let solidBombablePreset = new Tile(
            true,
            1,
            1,
            0,
            true
        );
    
        let nonsolidBombablePreset = new Tile(
            false,
            1,
            1,
            0,
            true
        );
    
    
        let solidSplitTile32Preset = new Tile(
            true,
            1,
            1,
            0,
            false,
            32,
            32
        );
    
        let nonsolidSplitTile32Preset = new Tile(
            false,
            1,
            1,
            0,
            false,
            32,
            32
        );
    
        let solidSplitTile16Preset = new Tile(
            true,
            1,
            1,
            0,
            false,
            16,
            16
        );
    
        let nonsolidSplitTile16Preset = new Tile(
            false,
            1,
            1,
            0,
            false,
            16,
            16
        );
    
        let nonsolidSplitTile8Preset = new Tile(
            false,
            1,
            1,
            0,
            false,
            8,
            8
        );
    
        let solidSplitTile8Preset = new Tile(
            true,
            1,
            1,
            0,
            false,
            8,
            8
        );
    
        //doorway
        //topleft doorway
        this.tiles.set(133, new SplitTile(
            solidSplitTile16Preset,
            solidSplitTile16Preset,
            nonsolidSplitTile16Preset,
            nonsolidSplitTile16Preset
        ));
    
        //topleft doorway
        this.tiles.set(134, new SplitTile(
            solidSplitTile16Preset,
            solidSplitTile16Preset,
            nonsolidSplitTile16Preset,
            nonsolidSplitTile16Preset
        ));
    
        //bottomleft doorway
        this.tiles.set(149, new SplitTile(
            solidSplitTile16Preset,
            nonsolidSplitTile16Preset,
            solidSplitTile16Preset,
            nonsolidSplitTile16Preset
        ));
    
        //bottomright doorway
        this.tiles.set(150, new SplitTile(
            nonsolidSplitTile16Preset,
            solidSplitTile16Preset,
            nonsolidSplitTile16Preset,
            solidSplitTile16Preset
        ));
    
        //left stairs 129, 145, 161, 131, 147, 163
        //right stairs 130, 146, 162, 132, 148, 164
    
        let stairs_left = [129, 131, 145, 147, 161, 163];
        let stairs_right = [130, 132, 146, 148, 162, 164];
    
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
    }
}