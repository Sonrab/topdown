//handling for when the player enters an "open" passage between two maps which carries the position over from the earlier map
class Passage
{
    constructor(passageTo, playerSpawnPoint, entrance)
    {
        this.passageTo = passageTo;
        this.playerSpawnPoint = playerSpawnPoint;
        this.entrance = entrance;
    }
}
