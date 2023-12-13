class Inventory
{
    constructor()
    {
        this.slots = new Array();
        this.helm = null;
        this.chest = null;
        this.gloves = null;
        this.legs = null;
        this.boots = null;


        this.init();
    }

    init()
    {
        for(let i = 0; i < 5; i++)
        {
            for(let j = 0; j < 6; j++)
            {
                this.slots.push(new InventorySlot());
            }
        }
    }
}