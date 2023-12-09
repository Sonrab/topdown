const userInterface = document.getElementById('userInterface');
const hurtVignette = document.getElementById('hurtVignette');
const blackScreen = document.getElementById('blackScreen');
const xpBar = document.getElementById('xpBar');
const healthBar = document.getElementById('healthBar');
const manaBar = document.getElementById('manaBar');

const healthText = document.getElementById('healthText');
const manaText = document.getElementById('manaText');

const displayLevel = document.getElementById('displayLevel');

const actionBar = document.querySelectorAll('.invetoryslot')

const testButtons = document.querySelectorAll('.testBtn');



let maxHealth = 240;
let currentHealth = 240;

let maxMana = 90;
let currentMana = 90;

let currentLevel = 1;
let currentXP = 0;
let experienceToNextLevel = 100;

let isPaused = false;

updateUI();

function updateUI(){
    displayLevel.textContent = currentLevel;
    healthBar.style.width = `${(currentHealth / maxHealth) * 100}%`
    manaBar.style.width = `${(currentMana / maxMana) * 100}%`
    xpBar.style.width = `${(currentXP / experienceToNextLevel) * 100}%`
    healthText.textContent = `${currentHealth}/${maxHealth}`;
    manaText.textContent = `${currentMana}/${maxMana}`;
}

document.addEventListener('keydown', (event) =>{
    if(event.key === "Escape" && !isPaused){
        isPaused = true;
        blackScreen.classList.toggle('show-blackscreen');
    }
    else if(event.key === "Escape" && isPaused){
        isPaused = false;
        blackScreen.classList.toggle('show-blackscreen');

    }
});

document.addEventListener('keydown', (event) =>{
    if(!isPaused){
      switch (event.key.toLowerCase()){
            case "q":
                triggerAnimation(actionBar[1]);
                break;
            case "r":
                triggerAnimation(actionBar[2]);
                break;
            case "t":
                triggerAnimation(actionBar[3]);
                break;
            case "f":
                triggerAnimation(actionBar[4]);
                break;
            case " ":
                triggerAnimation(actionBar[5]);
                break;
            default:
        }  
    }
    

});
document.addEventListener('click', (event) =>{
    if(!isPaused){
        triggerAnimation(actionBar[0]);
    }
});

function triggerAnimation(element){
    element.classList.add('inv-trans');
    element.classList.add('inv-anim');

   setTimeout(function(){
    element.classList.remove('inv-trans');
    element.classList.remove('inv-anim');
   }, 500)
}


testButtons.forEach((btn) =>{
    btn.addEventListener('click', (event) =>{
        switch(btn.name){
            case "dmg":
                handleDamage(70);
                break;
            case "mana":
                handleMana(14);
                break;
            case "exp":
                handleExp(13);
                break;
            default:
                console.log("något gick snett");
        }
    });
});


function handleDamage(dmg){
    currentHealth -= dmg;
    if (currentHealth <= 0){
        currentHealth = 0;
        handleDeath();
    }
    healthBar.classList.add('hurtflash');
    hurtVignette.style.opacity = 1;
    setTimeout(function(){
        healthBar.classList.remove('hurtflash');
        hurtVignette.style.opacity = 0;
       }, 200)
    
    updateUI();
}
function handleMana(mana){
    currentMana -= mana;
    if(currentMana <= 0){
        currentMana = 0;
    }
    manaBar.classList.add('hurtflash');
    setTimeout(function(){
        manaBar.classList.remove('hurtflash');
       }, 200)

    updateUI();
}
function handleExp(exp){
    currentXP += exp;
    if (currentXP >= experienceToNextLevel){
        console.log(currentXP);
        newXP = currentXP - experienceToNextLevel;
        currentXP = newXP;
        currentLevel++;
        experienceToNextLevel = Math.floor(experienceToNextLevel * 1.2);
    }
    updateUI();
}
function handleDeath(){
    isPaused =  true;
    console.log("Du dog.....")
}
