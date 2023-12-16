class Item
{
    constructor(name, itemType, imgsrc, item, itemInfo = '')
    {
        this.name = name;
        this.itemType = itemType;
        this.img = addImage("images/item_icons/" + imgsrc);
        this.item = item;
        this.itemInfo = itemInfo;
    } 
}

class LootItem extends Item
{
    constructor(name, itemType, imgsrc, item, itemInfo = '', x, y)
    {
        super(name, itemType, imgsrc, item, itemInfo)
        this.x = x;
        this.y = y;
        this.gravitationRange = 250;
    } 

    render()
    {
        ctx.drawImage(this.img, this.x, this.y);
    }

    update()
    {
        let x1 = this.x + 16;
        let y1 = this.y + 16;
        let x2 = player.center.x;
        let y2 = player.center.y;
        if(distBetweenPoints(x1, y1, x2, y2) > this.gravitationRange)
        {

        }

    }
}

const itemList = new Map()
itemList.set("sture_rifle",
    new Item(
        "Sture's puny pea rifle",
        "weapon",
        "icon_rifle.png",
        new Rifle()
    )
);

itemList.set("barnos_shotgun",
    new Item(
        "Chad Barry's shotgun of insane might",
        "weapon",
        "icon_shotgun.png",
        new Shotgun()
    )
);

itemList.set("chof_pants",
    new Item(
        "Chof's business casual pants",
        "legs",
        "icon_pants.png",
        new Armor('legs', {health: 2})
    )
);

itemList.set("chof_shirt",
    new Item(
        "Chof's running shirt",
        "chest",
        "icon_shirt.png",
        new Armor('chest', {health: 5, speed: 1})
    )
);

itemList.set("chof_business_shirt",
    new Item(
        "Chof's business shirt",
        "chest",
        "icon_business_shirt.png",
        new Armor('chest', {health: 2})
    )
);

itemList.set("leather_gloves",
    new Item(
        "Leather Gloves",
        "hands",
        "icon_gloves.png",
        new Armor('hands', {health: 3})
    )
);

itemList.set("leather_boots",
    new Item(
        "Leather Boots",
        "boots",
        "icon_boots.png",
        new Armor('boots', {health: 10}, {physical: 0.05})
    )
);

itemList.set("chof_hat",
    new Item(
        "Chof's winter hat",
        "helm",
        "icon_hat.png",
        new Armor('helm', {health: 1, mana: 3, manaRegen: 2}, {frost: 0.2})
    )
);



itemList.set("military_shirt",
    new Item(
        "Military Shirt",
        "chest",
        "armor/military/shirt.png",
        new Armor('chest', {health: 10}, {physical: 0.15})
    )
);

itemList.set("military_pants",
    new Item(
        "Military Pants",
        "legs",
        "armor/military/pants.png",
        new Armor('legs', {health: 8}, {physical: 0.1})
    )
);

itemList.set("military_boots",
    new Item(
        "Military Boots",
        "boots",
        "armor/military/boots.png",
        new Armor('boots', {health: 5}, {physical: 0.05, fire: 0.15})
    )
);

// itemList.set("wizard_hat",
//     new Item(
//         "Wizard hat",
//         "helm",
//         "armor/military/boots.png",
//         new Armor('boots', 5, {physical: 0.05, fire: 0.15})
//     )
// );