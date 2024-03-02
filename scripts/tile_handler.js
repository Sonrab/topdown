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
        //Tile ID 1 = SOLID WALLS
        //Tile ID 2 = "Low walls", flying objects such as flying enemies and projectiles get passed, but not ground bound entities
        //Tile ID 3 = "PIT", Same as ID 2 but this one can also be grappled over by the player

        this.tiles.set("1", new Tile(
            true, //solid
            1, //speed
        ));

        this.tiles.set("2", new Tile(
            true, //solid
            1, //speed
        ));

        this.tiles.set("3", new Tile(
            false, //solid
            1, //speed
        ));
    }
}

