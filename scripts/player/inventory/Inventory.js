const inventoryElement = document.getElementById('inventory');

class Inventory
{
    static sourceItemSlot;
    static targetItemSlot;
    static slots = [];
    static equipment = {};
    constructor()
    {
        Inventory.equipment = {
            helm : new EquipmentSlot(document.getElementById("helm"), "helm"),
            weapon : new EquipmentSlot(document.getElementById("weapon"), "weapon"),
            chest : new EquipmentSlot(document.getElementById("chest"), "chest"),
            hands : new EquipmentSlot(document.getElementById("hands"), "hands"),
            legs : new EquipmentSlot(document.getElementById("legs"), "legs"),
            boots : new EquipmentSlot(document.getElementById("boots"), "boots")
        }

        // this.slots = [];
        this.items = [];
        game.initList.push(this);
        // this.init();
    }

    init()
    {
        let inventorySlots = document.querySelectorAll(".inventory-slot");
        for(let i = 0; i < inventorySlots.length; i++)
        {
            inventorySlots[i].addEventListener("drop", dropHandler);
            inventorySlots[i].addEventListener("dragover", dragOverHandler);
            inventorySlots[i].id = `invslot_${i+1}`;
            Inventory.slots.push(new InventorySlot(inventorySlots[i]));
        }

        this.addItem(itemList.get("sture_rifle"));
    }

    addItem(item)
    {
        for(let i = 0; i < Inventory.slots.length; i++)
        {
            if(Inventory.slots[i].item === null)
            {
                Inventory.slots[i].setSlotContent(new InventoryItem(item, Inventory.slots[i].element));
                return;
            }
        }
    }

    static moveItemLocation(fromSlot, toSlot)
    {
        if(fromSlot === toSlot)
        {
            console.log("Cannot move items from and to itself");
            return;
        }

        if(fromSlot.slotType === 'equipment') //if moving an equipment item to inventory we unequip item
        {
            fromSlot.item.item.unequip()
        }
        //Swap images between slots
        fromSlot.element.removeChild(fromSlot.item.imageElement);
        toSlot.element.appendChild(fromSlot.item.imageElement)

        
        //move the item data and set fromslot item to null
        toSlot.item = fromSlot.item;
        fromSlot.item = null;

        
    }

    static swapItemLocations(fromSlot, toSlot)
    {
        if(fromSlot === toSlot)
        {
            console.log("Cannot move items from and to itself");
            return;
        }
        else if(fromSlot.slotType === 'equipment' && toSlot.slotType === 'equipment') //every equip goes to unique slot. If both are equip the move is invalid.
        //should probably be moved to equipment slot later
        {
            console.log("Invalid equipment slot.");
            return;
        }

        //remove images from both slots
        fromSlot.element.removeChild(fromSlot.item.imageElement);
        toSlot.element.removeChild(toSlot.item.imageElement);
        
        //add images to eachother
        fromSlot.element.appendChild(toSlot.item.imageElement);
        toSlot.element.appendChild(fromSlot.item.imageElement);

        //swap the item data between slots
        [fromSlot.item, toSlot.item] = [toSlot.item, fromSlot.item];
    }

    static moveToEquipment(fromSlot, toSlot)
    {
        if(fromSlot.item.itemType !== toSlot.slotItemType)
        {
            console.log("Invalid equipment type.");
            return;
        }
            
        //Swap images between slots
        fromSlot.element.removeChild(fromSlot.item.imageElement);
        toSlot.element.appendChild(fromSlot.item.imageElement)

        //move the item data and set fromslot item to null
        toSlot.item = fromSlot.item;
        fromSlot.item = null;

        console.log(toSlot.item.item);
        if(!toSlot.item.item)
        {
            console.log("failed");
        }
        else
        {
            toSlot.item.item.equip()
        }
    }

    static swapEquipmentLocations(fromSlot, toSlot)
    {
        if(fromSlot.item.itemType !== toSlot.item.itemType)
        {
            console.log("Cannot move items from and to itself");
            return;
        }

        //remove images from both slots
        fromSlot.element.removeChild(fromSlot.item.imageElement);
        toSlot.element.removeChild(toSlot.item.imageElement);
        
        //add images to eachother
        fromSlot.element.appendChild(toSlot.item.imageElement);
        toSlot.element.appendChild(fromSlot.item.imageElement);

        //swap the item data between slots
        [fromSlot.item, toSlot.item] = [toSlot.item, fromSlot.item];

        console.log(toSlot.item.item);
        toSlot.item.item.equip();
    }

    //identifies and returns a js inventory slot based on html inventory slot element
    static getInventorySlotByElement(element)
    {
        return Inventory.slots[element.id.split('_')[1] -1];
    }

    static getEquipmentSlotByElement(element)
    {
        switch(element.id)
        {
            case 'helm':
                return Inventory.equipment.helm;
            case 'weapon':
                return Inventory.equipment.weapon;
            case 'chest':
                return Inventory.equipment.chest;
            case 'gloves':
                return Inventory.equipment.gloves;
            case 'legs':
                return Inventory.equipment.legs;
            case 'boots':
                return Inventory.equipment.boots;
        }
    }

}

function inventoryRmbClick(e)
{
    e.preventDefault();

    console.log(e.srcElement);
}

function dragStartHandler(e)
{
    if(!(Inventory.sourceItemSlot = Inventory.getInventorySlotByElement(e.target.parentNode))) //if fetching inventoryslot returns false we are fetch from equipslot
    {
        Inventory.sourceItemSlot = Inventory.getEquipmentSlotByElement(e.target.parentNode); //get the equipment slot we are fetching from
    }
}

function dropHandler(e) 
{
    if(e.target.nodeName === 'IMG')
    {
        Inventory.targetItemSlot = Inventory.getInventorySlotByElement(e.target.parentNode);
        if(Inventory.sourceItemSlot.slotType === 'equipment')
        {
            Inventory.swapEquipmentLocations(Inventory.sourceItemSlot, Inventory.targetItemSlot);
        }
        else if(Inventory.sourceItemSlot.slotType === 'inventory')
        {
            Inventory.swapItemLocations(Inventory.sourceItemSlot, Inventory.targetItemSlot);
        }
        
        
    }
    else
    {
        Inventory.targetItemSlot = Inventory.getInventorySlotByElement(e.target);
        Inventory.moveItemLocation(Inventory.sourceItemSlot, Inventory.targetItemSlot);
    }
}

function equipmentDropHandler(e)
{
    
    if(e.target.nodeName === 'IMG')
    {
        Inventory.targetItemSlot = Inventory.getEquipmentSlotByElement(e.target.parentNode);
        Inventory.swapEquipmentLocations(Inventory.sourceItemSlot, Inventory.targetItemSlot);
    }
    else
    {
        console.log(e.target);
        Inventory.targetItemSlot = Inventory.getEquipmentSlotByElement(e.target);
        console.log(Inventory.targetItemSlot);
        //Inventory.moveItemLocation(Inventory.sourceItemSlot, Inventory.targetItemSlot);
        Inventory.moveToEquipment(Inventory.sourceItemSlot, Inventory.targetItemSlot);
    }
}

function dragOverHandler(e) 
{
    e.preventDefault();
}

