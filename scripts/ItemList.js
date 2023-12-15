class Item
{
    constructor(name, itemType, imgsrc, item)
    {
        this.name = name;
        this.itemType = itemType;
        this.img = addImage("images/item_icons/" + imgsrc);
        this.imgSrc = "images/item_icons/" + imgsrc;
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