//=============================================================================
// RPG Maker MZ - Fix Equipo 2H Left Hand
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Arreglar equipar un arma a 2 manos mano izquierda
 * @author oma012
 *
 * @param Arma
 * @type number
 * @desc seleccionael Id del tipo de slot de equipo a duplicar (Arma) 
 * @min 1
 * @default 1
 *
 * @param Escudo
 * @type number
 * @desc selecciona el Id del tipo de slot de equipo a sustituir (Escudo)
 * @min 1
 * @default 2
 *
 * @help FixEquipo2HLH.js
 *
 * Previene que al tener un arma principal equipada cuando tienes la habilidad
 * de equipar 2 armas puedas equipar un arma de 2 manos como arma secundaria
 * utiliza la funcion de sellar escudo, al momento de crear un arma si esta
 * quieres que sea de 2 manos dale la funcion de sellar el escudo, y con esto
 * al tratar de equiparla en la segunda mano se regresara al inventario por
 * que revisara si el arma sella el escudo y si lo hace desabilitara el usar
 * 2 armas con lo que estaras intentando equipar en el escudo, recuperas de
 * inmediato tu habilidad de tener 2 armas al desequiparse la arma de 2 manos.
 * si el personaje por si solo tiene la habilidad, al equipar un arma de 2 manos
 * como principal desabilitara el arma secundaria y dejara el escudo sellado
 * al desequiparla recuperas el poder usar 2 armas.
 *
 * nota: NOOO!! poner un numero mayor al de tipos de equipamiento en su base de datos
 * o explotara el programa ademas la funcion de cambiar arma y escudo podria afectar otras
 * funciones pero, podrian utilizarlo, por ejemplo para poder equipar 2 escudos creando un tipo 
 * de equipamiento nuevo y darle el nombre de escudo y usar la habilidad de usar 2 armas
 * para poder usar 2 escudos
 * 
 */

Game_Actor.prototype.equipSlots = function() {
    const slots = [];
    for (let i = 1; i < $dataSystem.equipTypes.length; i++) {
        slots.push(i);
    }
    var Parametros2= PluginManager.parameters('FixEquipo2HLH');
    var X2 = Parametros2["Escudo"];
    var X1 = Parametros2["Arma"];
    if (slots.length >= 2 && this.isDualWield() && !(this.isEquipTypeSealed(parseInt(X2)))) {
        slots[parseInt(X2)-1] = parseInt(X1);
    }	
    return slots;
};