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
 * @help este pruging hace que te saltes el intro del juego para que puedas crear
 * tu propio intro nota para que se mire bien tienes que hacer los siguientes pasos
 * 1- en la base de datos, en Sistema, en Opciones palomea iniciar trasparente
 * 2- crea un evento automatico en el mapa donde inicia el jugador donde crees tu 
 * intro custom
 * 3- llena tu evento custom con las herramientas de RPG maker
 * 4- al finalizar todos tu intro en el evento crea un contenido
 * avanzado de la pagina 3 llamado Script y se abrira un 
 * cuadro para escribir ahi pega esto :
 * "$dataSystem.startMapId = 1; SceneManager.goto(Scene_Title);"
 * el 1 representa el mapa en el que iniciara el jugador al poner new game
 * siendo el 1 MAP001, el 2 el MAP002 etc, no pongas el mapa donde tienes 
 * tu Inicio custom por que si no, se hara un loop y nunca podras jugar por ejemplo
 * yo en mi mapa 3 cree un codigo custom para intro, de ahi ya termino,
 * el codigo script que esta arriba hace que el juego sepa que el mapa inicial 
 * ahora es el 1 y no el 3 y que me mande a la pantalla de titulo, asi al
 * poner new game no me mandara al mapa 3 donde tengo la pocicion inicial del 
 * heroe si no al 1 ahora en el mapa donde inicia el new game tenemos que crear 
 * otro evento automatico para señalar que la trasparencia del jugador esta 
 * apagada, o si tambien tienes un inicio de juego custom pudes diseñarlo ahi,
 * NOTA importante el jugador aparecera en las mismcas cordenadas que en donde
 * este en el mapa de inicio ejemplo si en tu mapa de inicio el heroe esta en 
 * (5,5) cuando hagas new game y te manden a el otro mapa el heroe aparecera en el
 * (5,5) del nuevo mapa.
 * 
 * por si ponen videos agrege que si precionas cancel el video se salta
 * y despues de X tiempo de espera repite el intro
 */

    var miParametro = PluginManager.parameters('CustomIntro');
    var MaxTime = (miParametro["TiempoEspera"]*60);
    var timeintittle = 0;

Scene_Title.prototype.update = function() {
    timeintittle = timeintittle+1;
    if (timeintittle > MaxTime)
	{
		AudioManager.stopBgm();
    		AudioManager.stopBgs();
    		AudioManager.stopMe();
		AudioManager.stopSe();
		timeintittle = 0;
		$dataSystem.startMapId = 0;
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

Graphics.isVideoPlaying = function() {
    if (Input.isPressed('cancel'))
    { 
      this._videoLoading = false;
      this._updateVisibility(false);
      this._video.pause();
      return false;
    }
    else
    return this._videoLoading || this._isVideoVisible();
};