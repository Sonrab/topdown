class Armor
{
    constructor(type)
    {
        this.type = type;
        //resistances in 0-1. 0 = no dmg reduction. 1 = full damage reduction(immunity), 0.75 means damage is reduced by 75%
        this.resistances = { 
            physical: 0,
            fire: 0,
        };
    }
        

}