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
 * @help CambiarCritico.js
 *
 * @param UsarHabil
 * @type number
 * @desc el valor que pongas es el numero de habilidades que quieres tener para modificar el modificador de critico (max 3) 
 * @min 0
 * @max 3
 * @default 0
 * @help CambiarCritico.js
 *
 * @param Habilidad
 * @type number
 * @desc La Habilidad que se debe tener para mejorar el critico
 * @min 1
 * @max 1000
 * @default 5
 * @help CambiarCritico.js
 * 
 * @param MejoraMulti
 * @type number
 * @desc Numero que se suma al critico basico para el nuevo critico
 * @min 0
 * @max 1000
 * @default 10
 * @help CambiarCritico.js
 *
 *
 * @param Habilidad2
 * @type number
 * @desc La segunda Habilidad que se debe tener para mejorar el critico
 * @min 1
 * @max 1000
 * @default 6
 * @help CambiarCritico.js
 * 
 * @param MejoraMulti2
 * @type number
 * @desc Numero que se suma al critico basico para el nuevo critico la segunda habilidad
 * @min 0
 * @max 100
 * @default 1000
 * @help CambiarCritico.js
 *
 * @param Habilidad3
 * @type number
 * @desc La tercera Habilidad que se debe tener para mejorar el critico
 * @min 1
 * @max 1000
 * @default 7
 * @help CambiarCritico.js
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

/*
*Game_Action.prototype.apply = function(target) {
*    const result = target.result();
*    this.subject().clearResult();
*    result.clear();
*    result.used = this.testApply(target);
*    result.missed = result.used && Math.random() >= this.itemHit(target);
*    result.evaded = !result.missed && Math.random() < this.itemEva(target);
*    result.physical = this.isPhysical();
*    result.drain = this.isDrain();
*    if (result.isHit()) {
*        if (this.item().damage.type > 0) {
*            result.critical = Math.random() < this.itemCri(target);
*            const value = this.makeDamageValue(target, result.critical);
*            this.executeDamage(target, value);
*        }
*        for (const effect of this.item().effects) {
*            this.applyItemEffect(target, effect);
*        }
*        this.applyItemUserEffect(target);
*    }
*    this.updateLastTarget(target);
*};
*Game_Action.prototype.makeDamageValue = function(target, critical) {
*    const item = this.item();
*    const baseValue = this.evalDamageFormula(target);
*    let value = baseValue * this.calcElementRate(target);
*    if (this.isPhysical()) {
*        value *= target.pdr;
*    }
*    if (this.isMagical()) {
*        value *= target.mdr;
*    }
*    if (baseValue < 0) {
*        value *= target.rec;
*    }
*    if (critical) {
*        value = this.applyCritical(value);
*    }
*   value = this.applyVariance(value, item.damage.variance);
*    value = this.applyGuard(value, target);
*   value = Math.round(value);
*    return value;
*};
*
*Game_Action.prototype.evalDamageFormula = function(target) {
*    try {
*        const item = this.item();
*        const a = this.subject(); // eslint-disable-line no-unused-vars
*        const b = target; // eslint-disable-line no-unused-vars
*        const v = $gameVariables._data; // eslint-disable-line no-unused-vars
*        const sign = [3, 4].includes(item.damage.type) ? -1 : 1;
*        const value = Math.max(eval(item.damage.formula), 0) * sign;
*        return isNaN(value) ? 0 : value;
*    } catch (e) {
*        return 0;
*    }
*};
*
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
