//=============================================================================
// RPG Maker MV - Custom Intro
//=============================================================================
/*:
 * @plugindesc Inicia el juego sin intro en el mapa donde inicia el jugador para intro custom
 * @author oma012
 *
 * @param TiempoEspera
 * @type number
 * @desc El tiempo a esperar si no se presiona nada para repetir del intro en seg.
 * @min 10
 * @max 6000
 * @default 15
 *
 * @param MapaIntro
 * @type number
 * @desc El mapa que usaras para crear el custom intro y solo para eso
 * @min 1
 * @max 100
 * @default 3
 *
 * @param MapaIncial
 * @type number
 * @desc El mapa donde iniciara tu juego.
 * @min 1
 * @max 100
 * @default 1
 *
 * @param ActiveFull16:X
 * @type boolean
 * @desc Permite que los videos se miren a resolucion 16:9 en fullscreen
 * @default true
 *
 * @param Ratio9or10
 * @type number
 * @min 9
 * @max 10
 * @desc selecciona si tu ratio es 16:9 o 16:10
 * @default 9
 *
 * @help este pruging hace que te saltes el intro del juego para que puedas crear
 * tu propio intro nota para que se mire bien tienes que hacer los siguientes pasos
 * 1- en la base de datos, en Sistema, en Opciones palomea iniciar trasparente
 * 2- crea un evento automatico en el mapa donde inicia el jugador donde crees tu 
 * intro custom (lo especificas en los parametros del script)
 * 3- llena tu evento custom con las herramientas de RPG maker
 * 4- al finalizar todos tu intro en el evento crea un contenido
 * avanzado de la pagina 3 llamado Script y se abrira un 
 * cuadro para escribir ahi pega esto :
 * "SceneManager.goto(Scene_Title);"
 * 5- listo ya tienes tu intro, al poner new game te mandara al mapa definido
 * como mapa inicial en los parametros del script
 * para los mapas sepan que el mapa 1 correspondria al mapa
 * MAP001, el 2 el MAP002 etc, no pongan el mapa de intro y el custom en el mismo
 * mapa por que se hara un loop y nunca podras jugar.
 * NOTA importante el jugador aparecera en las mismcas cordenadas que en donde
 * este en el mapa del intro ejemplo si en tu mapa de intro el heroe esta en 
 * (5,5) cuando hagas new game y te manden a el otro mapa el heroe aparecera en el
 * (5,5) del nuevo mapa.
 * 
 * por si ponen videos agrege que si precionas cancel el video se salta
 * y despues de X tiempo de espera repite el intro
 */

    var miParametro = PluginManager.parameters('CustomIntro');
    var MaxTime = (miParametro["TiempoEspera"]*60);
    var timeintittle = 0;
    
Scene_Title.prototype.commandNewGame = function() {
    $dataSystem.startMapId = miParametro["MapaIncial"];
    DataManager.setupNewGame();
    this._commandWindow.close();
    this.fadeOutAll();     
    SceneManager.goto(Scene_Map);
};


Scene_Title.prototype.update = function() {
    timeintittle = timeintittle+1;
    if (timeintittle > MaxTime)
	{
		$dataSystem.startMapId = miParametro["MapaIntro"];
    		DataManager.setupNewGame();
    		this._commandWindow.close();
    		this.fadeOutAll();
		AudioManager.stopBgm();
    		AudioManager.stopBgs();
    		AudioManager.stopMe();
		AudioManager.stopSe();
		timeintittle = 0;   		
		SceneManager.goto(Scene_Map);
	}
    if (TouchInput.isPressed()||Input.isPressed('cancel')||Input.isPressed('dash')||Input.isPressed('menu')||Input.isPressed('ok')||Input.isPressed('up')||Input.isPressed('down')||Input.isPressed('left')||Input.isPressed('right'))
    {
	timeintittle = 0;
    }
    if (!this.isBusy()) {
        this._commandWindow.open();
    }
    Scene_Base.prototype.update.call(this);
};
 
Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        Window_TitleCommand.initCommandPosition();
	SceneManager.goto(Scene_Map);
    }
    this.updateDocumentTitle();
};

Graphics._updateVideo = function() {
    if(miParametro["ActiveFull16:X"]&&!this._isFullScreen())
    {
    	this._video.width = (this._height/parseInt(miParametro["Ratio9or10"]))*16;
    	this._video.height = this._height;
    }
    else
    {
    	this._video.width = this._width;
    	this._video.height = this._height;
    }
    this._video.style.zIndex = 2;
    this._centerElement(this._video);
};

Graphics.isVideoPlaying = function() {
    if (Input.isTriggered('cancel'))
    { 
      this._videoLoading = false;
      this._updateVisibility(false);
      this._video.pause();
      Input.clear();
      return false;
    }
    else
    return this._videoLoading || this._isVideoVisible();
};
