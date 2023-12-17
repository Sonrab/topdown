class Armor
{
    constructor(type, stats = {}, resistances = {})
    {
        this.type = type;
        //resistances in 0-1. 0 = no dmg reduction. 1 = full damage reduction(immunity), 0.75 means damage is reduced by 75%
        this.resistance = resistances;
        this.stats = stats;
    }

    processStats()
    {
        for (const [stat, value] of Object.entries(this.stats)) 
        {
            this[stat] = value;
            console.log(this[stat]);
        }
    }

    equip()
    {
        for (const [stat, value] of Object.entries(this.stats)) 
        {
            if(stat === 'health')
            {
                player.addMaxHealth(value);
            }
            else if(stat === 'mana')
            {
                player.addMaxMana(value);
            }
            else if(stat === 'speed')
            {
                player.addSpeed(value);
            }
            else
            {
                player[stat] += value;
                console.log(player.manaRegen);
            }       
        }

        UserInterface.updateInventoryStats();
    }

    unequip()
    {
        for (const [stat, value] of Object.entries(this.stats)) 
        {
            if(stat === 'health')
            {
                player.removeMaxHealth(value);
            }
            else if(stat === 'mana')
            {
                player.removeMaxMana(value);
            }
            else if(stat === 'speed')
            {
                player.removeSpeed(value);
            }
            else
            {
                player[stat] -= value;
            }
        }

        UserInterface.updateInventoryStats();
    }

    getInventoryStats()
    {
        let obj = {};

        for (const [stat, value] of Object.entries(this.stats)) 
        {
            switch(stat)
            {
                case 'health':
                    obj[stat] = `Health: ${value}`;
                    break;
                case 'mana':
                    obj[stat] = `Mana: ${value}`;
                    break;
                case 'manaRegen':
                    obj[stat] = `Mana regen: ${value}`;
                    break;
                case 'speed':
                    obj[stat] = `Movement Speed: ${value}`;
                    break;

            }
        }

        for (const [stat, value] of Object.entries(this.resistance)) 
        {
            if(value === 0)
                continue;
            
            switch(stat)
            {
                case 'physical':
                    obj[stat] = `Physical resistance: ${Math.floor(value*100)}%`;
                    break;

                case 'fire':
                    obj[stat] = `Fire resistance: ${Math.floor(value*100)}%`;
                    break;

                case 'frost':
                    obj[stat] = `Frost resistance: ${Math.floor(value*100)}%`;
                    break;
            }
        }
        return obj;
    }
}