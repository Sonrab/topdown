class Upgrade
{
    constructor(name, imgsrc, upgradeFunc)
    {
        this.name = name;
        this.execute = upgradeFunc; //stored function that will execute and apply the upgrade
        this.img = addImage("images/item_icons/" + imgsrc);
    }
}

class UpgradeList
{
    constructor()
    {
        this.list = new Map();
        this.loadUpgradeList();
    }

    getUpgradeByName(name)
    {
        return this.list.get(name);
    }

    loadUpgradeList()
    {
        this.list.set("upgrade_health_5", new Upgrade(
            "upgrade_health_5",
            "icon_health_upgrade_5.png",
            function()
            {
                player.addHealthUpgrade(5);
            }
        ));
    
        this.list.set("upgrade_health_10", new Upgrade(
            "upgrade_health_10",
            "icon_health_upgrade_10.png",
            function()
            {
                player.addHealthUpgrade(10);
            }
        ));
    
        this.list.set("upgrade_grappler", new Upgrade(
            "upgrade_grappler",
            "icon_grappler_upgrade.png",
            function()
            {
                player.grappler.upgradeGrappler();
            }
        ));
    
        this.list.set("bow_damage_upgrade", new Upgrade(
            "bow_damage_upgrade",
            "icon_arrow_dmg.png",
            function()
            {
                player.bow.damage++;
            }
        ));
    
        this.list.set("unlock_bomb", new Upgrade(
            "unlock_bomb",
            "icon_bomb.png",
            function()
            {
                player.bombData.unlocked = true;
            }
        ));
    
        this.list.set("unlock_dodgeRoll", new Upgrade(
            "unlock_dodgeRoll",
            "icon_roll.png",
            function()
            {
                player.dodgeRollData.unlocked = true;
            }
        ));
    }
}