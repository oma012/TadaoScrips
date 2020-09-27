//=============================================================================
// RPG Maker MV - Custom Cursor
//=============================================================================
/*:
 * @plugindesc Cambia el cursor del juego
 * @author oma012
 *
 * @help Cambia el cursor del juego
 * solo crea una carpeta donde tienes el ejecutable
 * del juego que se llame Cursor y pon las 5 imagenes
 * para hacer la animacion de tu cursor y que sean
 * 32X32, cuando tenga tiempo lo paso a un archivo 
 * prite y/o que tu puedas poner las imagenes
 * que quieras y cuantos frames quiers que esten
 * cada imagen en pantalla
 */

var imagesmycursor = [
'Cursors/0001.png',
'Cursors/0002.png',
'Cursors/0003.png',
'Cursors/0004.png',
'Cursors/0005.png'
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
