class EquipmentSlot
{
    constructor(element, slotItemType)
    {
        this.slotType = 'equipment';
        this.element = element; //Reference to the corresponding html inventory element
        this.slotItemType = slotItemType;
        this.item = null;

        this.element.addEventListener("drop", equipmentDropHandler);
        this.element.addEventListener("dragover", dragOverHandler);
    }

    setSlotContent(item)
    {

        this.item = item.item;
        this.element.appendChild(this.item.imageElement);
    }
}


