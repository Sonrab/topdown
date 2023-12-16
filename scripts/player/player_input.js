function checkInput()
{
    if ('KeyA' in keysDown || 'ArrowLeft' in keysDown) //vänster
    {
        player.move('left');
    }   
 
    if ('KeyW' in keysDown || 'ArrowUp' in keysDown) // upp 
        player.move('up');


    if ('KeyS' in keysDown || 'ArrowDown' in keysDown) // ner 
        player.move('down'); 
    
    
    if ('KeyD' in keysDown || 'ArrowRight' in keysDown) //höger
    {
        player.move('right');
    }

    if(mouse.down && !player.cursor.castModeActive)
    {
        if(player.equippedWep.mouseDownAutoUse)
            player.usePrimary();
    }
}


function onMouseClick()
{
    if(player.cursor.castModeActive)
    {
        player.firestorm();
        player.cursor.exitCastMode();
    }
    else if(!player.equippedWep.mouseDownAutoUse)
    {
        player.usePrimary();
    }           
}

function checkKeyPress(e)
{
    //console.log(e);

    let key = e.keyCode;

    if(e.keyCode === 49)
    {
        
        if(player.equippedWep != player.grappler)
            //player.equippedWep = player.grappler;
            player.equipWeapon(player.grappler);
        else
            player.equipWeapon(player.bow);
    }

    if(e.keyCode === 32) // space
    {
        player.dodge();
    }

    
    if(e.keyCode === 50) // 2
    {
        player.castFireOrbs();
    }

    if(e.keyCode === 51) // 3
    {
        player.castFirestorm();
    }

    if(key === 27) //escape, pause & toggle instructions
    {
        e.preventDefault();
        if(game.isPaused)
        {
            game.unpause();
        }
        else
        {
            game.pause();
        }
    }

    if(key === 9) //tab, toggle inventory
    {
        e.preventDefault();
        userInterface.toggleInventory();
    }

    // if(key === 81)
    // {
    //     player.grappler.use();
    // }

    if(key === 70)
    {
        player.dropBomb();
    } 

    if(key === 37 || key === 39 || key === 38 || key === 40)
    {
        e.preventDefault();
    }

    if(key === 69) //e
    {
        player.interact();
    }
    
    if(key === 32 ||  key === 87) //jump on space, w or up-arrow
    {
        e.preventDefault();
        //player.move(32);        
    }
}

function checkKeyRelease(e)
{
    //console.log(e);
}