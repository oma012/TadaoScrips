//=============================================================================
// RPG Maker MV - Custom Cursor
//=============================================================================
/*:
 * @plugindesc Cambia el cursor del juego
 * @author oma012
 *
 * @help Cambia el cursor del juego
 * pon las 5 imagenes en la carpeta img/system
 * para hacer la animacion de tu cursor y que sean
 * 32X32 y llamalas 0001,0002,0003,0004 y 0005 
 * en el mismo orden te tu animacion, cuando 
 * tenga tiempo lo paso a un archivo 
 * prite y/o que tu puedas poner las imagenes
 * que quieras y cuantos frames quiers que esten
 * cada imagen en pantalla
 */

var imagesmycursor = [
'img/system/0001.png',
'img/system/0002.png',
'img/system/0003.png',
'img/system/0004.png',
'img/system/0005.png'
];
var timeframecursor = 0;
var myframecursor = 0;

Scene_Base.prototype.update = function() {
    this.updateFade();
    this.updateChildren();
    if(timeframecursor == 20)
	{
         timeframecursor=0;
	 myframecursor=0;
	}
    else
	{
         myframecursor=parseInt(timeframecursor/4);
	}
    document.body.style.cursor = 'url("'+imagesmycursor[myframecursor]+'"),default';
    timeframecursor=timeframecursor+1;
};
