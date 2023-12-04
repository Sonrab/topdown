function checkInput()
{

    const standingTile = player.getStandingTile()

    if (65 in keysDown || 37 in keysDown) //vänster
    {
        player.move(37);
    }   
 
    if (87 in keysDown || 38 in keysDown) // upp 
        player.move(38);


    if (83 in keysDown || 40 in keysDown) // ner 
        player.move(40); 
    
    
    if (68 in keysDown || 39 in keysDown) //höger
    {
        player.move(39);
    }

    if(mouse.down)
    {
        if(player.equippedWep.mouseDownAutoUse)
            player.equippedWep.use();
    }
}


function onMouseClick()
{
    if(!player.equippedWep.mouseDownAutoUse)
            player.equippedWep.use();
}



var firstClick = true;
function checkKeyPress(e)
{
    let key = e.keyCode;
    console.log(key);
    if(firstClick)
    {
        firstClick = false;
        musicHandler.currentSong.play();
        // world1.play();
        // world1_loop();
    }

    if(e.keyCode === 49)
    {
        
        if(player.equippedWep != player.grappler)
            //player.equippedWep = player.grappler;
            player.equipWeapon(player.grappler);
        else
            player.equipWeapon(player.bow);
    }

    if(e.keyCode === 32 && player.dodgeRollData.unlocked) // space
    {
        player.dodgeRoll();
    }

    
    if(e.keyCode === 50) // 2
    {
        player.castFireOrbs();
    }

    if(key === 27) //escape, pause & toggle instructions
    {
        e.preventDefault();
        pause();
        console.log(instructionTextbox.style.display);
        instructionTextbox.style.display = (instructionTextbox.style.display === "block") ? "none" : "block";
        // if(textarea.style.display ===  "none")
        // {
        //     textarea.setAttribute("style", "display:block;");
        // } 
        // else
        // {
        //     textarea.setAttribute("style", "display:none;");
        // }
    }

    if(key === 9) //tab, bring up statscreen
    {
        e.preventDefault();
        statscreenTextbox.innerHTML=`
        <p title="Player health" class="unselectable">Health: ${player.health}/${player.maxHealth}</p>
        <p title="Player mana" class="unselectable">Mana: ${player.mana}/${player.maxMana}</p>
        <p title="Player movement speed" class="unselectable">Speed: ${player.speed}</p>
        <p title="Raw bow damage (Before resistances)" class="unselectable">Bow Damage: ${player.bow.damage}</p>
        `;

        console.log(-statscreenTextbox.style.width);
        //statscreenTextbox.style.display = (statscreenTextbox.style.display === "block") ? "none" : "block";
        statscreenTextbox.style.left = (statscreenTextbox.style.left === "0px") ? -statscreenTextbox.offsetWidth : "0px";
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
    console.log(e);
}