class Weapon
{
    constructor()
    {
        if(this.constructor === Weapon)
        throw new Error("Can't instantiate weapon base class.");
    }

    //abstract classes
    equip()
    {
        throwAbstractionError("equip");
    }

    unequip()
    {
        throwAbstractionError("unequip");
    }

    getInventoryStats()
    {
        throwAbstractionError("getInventoryStats");
    }
}