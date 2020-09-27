//=============================================================================
// RPG Maker MZ - Cambiar Critico
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Modificar el multiplicador del daño Critico
 * @author oma012
 *
 * @param CritMulti
 * @type number
 * @desc Numero por el cual se multiplicara el daño al ser critico
 * @min 1
 * @max 1000
 * @default 2
 *
 * @param UsarHabil
 * @type number
 * @desc el valor que pongas es el numero de habilidades que quieres tener para modificar el modificador de critico (max 3) 
 * @min 0
 * @max 3
 * @default 0
 *
 * @param Habilidad
 * @type number
 * @desc La Habilidad que se debe tener para mejorar el critico
 * @min 1
 * @max 1000
 * @default 5
 * 
 * @param MejoraMulti
 * @type number
 * @desc Numero que se suma al critico basico para el nuevo critico
 * @min 0
 * @max 1000
 * @default 10
 *
 * @param Habilidad2
 * @type number
 * @desc La segunda Habilidad que se debe tener para mejorar el critico
 * @min 1
 * @max 1000
 * @default 6
 * 
 * @param MejoraMulti2
 * @type number
 * @desc Numero que se suma al critico basico para el nuevo critico la segunda habilidad
 * @min 0
 * @max 100
 * @default 1000
 *
 * @param Habilidad3
 * @type number
 * @desc La tercera Habilidad que se debe tener para mejorar el critico
 * @min 1
 * @max 1000
 * @default 7
 * 
 * @param MejoraMulti3
 * @type number
 * @desc Numero que se suma al critico basico para el nuevo critico la tercer habilidad
 * @min 0
 * @max 1000
 * @default 1000
 *
 * @help CambiarCritico.js
 *
 * Este plugin proporciona un parametro para modificar el
 * multiplicador del daño critico, asi como la posibilidad 
 * de agregar una habilidad que al poseerla el personaje que
 * la tenga mejorara su multiplicador de critico.
 * ejemplo: personaje/enemigo que ataca tiene la habilidad
 * critico mejorado lo que hace que su multiplicador pase de
 * un basico X2 a un X4 (2 seria el valor requerido en MejoraMulti
 * ya que un basico 2+2 = a 4 que seria el nuevo multiplicador)
 * si usan mas de una habilidad se seguran sumando ejemplo
 * si tienes las 3 habilidades y cada la primera es 1 y la segunda es 3
 * y la tercera 2 con una base de critico de 2 el critico resultaria
 * (2+1+3+2) lo que dara 8 de multiplicador de daño si solo activas
 * 2 hablidades el calculo seria (2+1+3) con un total de 6 en el
 * multiplicador teniendo estas 2 habilidades.
 */

Game_Action.prototype.applyCritical = function(damage) {
    var Parametros= PluginManager.parameters('CambiarCritico');
    var Xin = Parametros["CritMulti"];
    var Ain = Parametros["UsarHabil"];
    if (Ain > 0)
    {
	var Yin = Parametros["Habilidad"];
    	var Zin = Parametros["MejoraMulti"];
	if (Ain > 1)
	{
		var Yan = Parametros["Habilidad2"];
        	var Zan = Parametros["MejoraMulti2"];
 		if (Ain > 2)
		{
			var Yun = Parametros["Habilidad3"];
        		var Zun = Parametros["MejoraMulti3"];
    			if (this.subject().skills().contains($dataSkills[Yun]))
    			{
				Xin = parseInt(Xin) + parseInt(Zun);
    			}				
		}
		if (this.subject().skills().contains($dataSkills[Yan]))
    		{
			Xin = parseInt(Xin) + parseInt(Zan);
    		}
	}
    	if (this.subject().skills().contains($dataSkills[Yin]))
    		{
			Xin = parseInt(Xin) + parseInt(Zin)
    		}
    }
    return damage * Xin;
}
