class Game
{
    constructor()
    {
        this.musicPlayer = new MusicHandler();
        this.userInterface;
        this.loop;
        this.isPaused = false;
        this.targetFPS = 40;

        this.currentMap;
        this.spawn;

        this.collissionTilesize = 8;
        //set game scaling.
        this.scaling = {
            x: 2*(window.innerWidth/1920), 
            y: 2*(window.innerHeight/1080)
        };

        console.log(this.scaling);

        
        this.initList = [];
    }

    setup()
    {
        upgradeList = new UpgradeList();
        loadMaps();
        tileHandler = new TileHandler(); //create tilehandler object
        
        renderer = new Renderer();
        player = new Player(); // Create player object
        userInterface = new UserInterface();
        this.setMap("scifi", {x: 3, y: 5}); 
        //this.setMap("scifi", {x: 20, y: 30}); //teleporter spawn
        //this.setMap("scifi", {x: 12, y: 25}); //switch spawn
        //this.setMap("scifi", {x: 33, y: 18}); //bossroom spawn
        //this.setMap("scifi", {x: 33, y: 45}); //after teleport spawn

        updateEnd = performance.now();
        
        for(let i = 0; i < this.initList.length; i++)
        {
            this.initList[i].init();
        }

        requestAnimationFrame(renderer.renderScene);        
    }

    update(d)
    {
        delta = d;

        player.update();
        for(let i = 0; i < game.currentMap.enemies.length; i++)
        {
            game.currentMap.enemies[i].update();
        }
    
        for(let i = g_projectiles.length-1; i >= 0; i--) //do loop backwards since projectiles can be removed in update checks
        {
            
            g_projectiles[i].update(i);
        }
        for(let i = 0; i < game.currentMap.objects.length; i++)
        {
            
            game.currentMap.objects[i].update(i);
        }
    }

    tick()
    {
        currentTime = Date.now();
        
        updateStart = performance.now();
        
        game.update((updateStart - updateEnd) / (1000/game.targetFPS));
        
        if(Date.now() >= TimeNow)
        {
            TimeNow = Date.now() + 1000;
            FPS = count;
            count = 0;
    
        }
        count++;
        // debugOutput.innerHTML = "FPS: " + FPS;
        // debugOutput.innerHTML += "<br>FPS Render: " + FPSR;
        updateEnd = performance.now();
        lastUpdate = performance.now();
    }

    start()
    {
        this.loop = setInterval(this.tick, (1000/this.targetFPS));
    }

    pause()
    {
        this.isPaused = true;
        blackScreen.classList.toggle('show-blackscreen');
        clearInterval(this.loop);
    }

    unpause()
    {
        this.isPaused = false;
        blackScreen.classList.toggle('show-blackscreen');
        this.start();
    }

    setMap(mapName, spawn)
    {
        g_projectiles = [];
        this.currentMap = maps.get(mapName);
        this.spawn = spawn;
        console.log(this.currentMap);
        // for(let i = 0; i < this.currentMap.enemies.length; i++)
        // {

        //     //clearTimeout(this.currentMap.enemies[i].animationInterval);
        // }

        

        //calculate canvas width and height
        let canvaswidth = 0;
        let canvasHeight = 0;
        
        if(this.currentMap.mapsize.width * game.scaling.x > window.innerWidth)
        {
            canvaswidth = Math.floor(window.innerWidth); //offset scrollbar
        }
        else
        {
            canvaswidth = this.currentMap.mapsize.width * game.scaling.x;
        }
            
        if(this.currentMap.mapsize.height * game.scaling.y > window.innerHeight)
        {
            canvasHeight = window.innerHeight;
        }
        else
        {
            canvasHeight = this.currentMap.mapsize.height * game.scaling.y;
        }

        resizeCanvas(canvaswidth, canvasHeight);

        updateBufferSize(this.currentMap.mapsize);
        this.currentMap.createMapBuffer();

        player.setXY(spawn.x*tileWidth, spawn.y*tileWidth);
        canvasBoundingRect = canvas.getBoundingClientRect(); //used for adjusting mouse pos on canvas on maps smaller than screensize
    }
}