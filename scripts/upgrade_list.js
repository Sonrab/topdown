class Upgrade
{
    constructor(name, imgsrc, upgradeFunc)
    {
        this.name = name;
        this.execute = upgradeFunc; //stored function that will execute and apply the upgrade
        this.img = new Image();
        this.img.src = "images/item_icons/" + imgsrc;
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

// function CUpgradeList()
// {
//     this.list = new Map();
//     this.loadUpgradeList();
// };

// CUpgradeList.prototype.getUpgradeByName = function(name)
// {
//     return this.list.get(name);
// };

// CUpgradeList.prototype.loadUpgradeList = function()
// {
//     this.list.set("upgrade_health_5", new CUpgrade(
//         name = "upgrade_health_5",
//         imgsrc = "icon_health_upgrade_5.png",
//         upgrade = function()
//         {
//             player.maxHealth += 5;
//             player.health += 5;
//         }
//     ));

//     this.list.set("upgrade_health_10", new CUpgrade(
//         name = "upgrade_health_10",
//         imgsrc = "icon_health_upgrade_10.png",
//         upgrade = function()
//         {
//             player.maxHealth += 10;
//             player.health += 10;
//         }
//     ));

//     this.list.set("upgrade_grappler", new CUpgrade(
//         name = "upgrade_grappler",
//         imgsrc = "icon_grappler_upgrade.png",
//         upgrade = function()
//         {
//             player.grappler.upgradeGrappler();
//         }
//     ));

//     this.list.set("bow_damage_upgrade", new CUpgrade(
//         name = "bow_damage_upgrade",
//         imgsrc = "icon_arrow_dmg.png",
//         upgrade = function()
//         {
//             player.bow.damage++;
//         }
//     ));

//     this.list.set("unlock_bomb", new CUpgrade(
//         name = "unlock_bomb",
//         imgsrc = "icon_bomb.png",
//         upgrade = function()
//         {
//             player.bombData.unlocked = true;
//         }
//     ));

//     this.list.set("unlock_dodgeRoll", new CUpgrade(
//         name = "unlock_dodgeRoll",
//         imgsrc = "icon_roll.png",
//         upgrade = function()
//         {
//             player.dodgeRollData.unlocked = true;
//         }
//     ));
// };


