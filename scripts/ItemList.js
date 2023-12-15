class Item
{
    constructor(name, itemType, imgsrc, item)
    {
        this.name = name;
        this.itemType = itemType;
        this.img = addImage("images/item_icons/" + imgsrc);
        this.item = item;
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
        new Armor('legs')
    )
);

itemList.set("chof_shirt",
    new Item(
        "Chof's running shirt",
        "chest",
        "icon_shirt.png",
        new Armor('chest')
    )
);

itemList.set("chof_business_shirt",
    new Item(
        "Chof's business shirt",
        "chest",
        "icon_business_shirt.png",
        new Armor('chest')
    )
);

itemList.set("leather_gloves",
    new Item(
        "Leather Gloves",
        "hands",
        "icon_gloves.png",
        new Armor('hands')
    )
);

itemList.set("leather_boots",
    new Item(
        "Leather Boots",
        "boots",
        "icon_boots.png",
        new Armor('boots')
    )
);

itemList.set("chof_hat",
    new Item(
        "Chof's winter hat",
        "helm",
        "icon_hat.png",
        new Armor('helm')
    )
);