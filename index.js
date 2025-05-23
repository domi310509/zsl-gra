/*! Image Map Resizer (imageMapResizer.min.js ) - v1.0.10 - 2019-04-10
*  Desc: Resize HTML imageMap to scaled image.
*  Copyright: (c) 2019 David J. Bradshaw - dave@bradshaw.net
*  License: MIT
*/

!function(){"use strict";function r(){function e(){var r={width:u.width/u.naturalWidth,height:u.height/u.naturalHeight},a={width:parseInt(window.getComputedStyle(u,null).getPropertyValue("padding-left"),10),height:parseInt(window.getComputedStyle(u,null).getPropertyValue("padding-top"),10)};i.forEach(function(e,t){var n=0;o[t].coords=e.split(",").map(function(e){var t=1==(n=1-n)?"width":"height";return a[t]+Math.floor(Number(e)*r[t])}).join(",")})}function t(e){return e.coords.replace(/ *, */g,",").replace(/ +/g,",")}function n(){clearTimeout(d),d=setTimeout(e,250)}function r(e){return document.querySelector('img[usemap="'+e+'"]')}var a=this,o=null,i=null,u=null,d=null;"function"!=typeof a._resize?(o=a.getElementsByTagName("area"),i=Array.prototype.map.call(o,t),u=r("#"+a.name)||r(a.name),a._resize=e,u.addEventListener("load",e,!1),window.addEventListener("focus",e,!1),window.addEventListener("resize",n,!1),window.addEventListener("readystatechange",e,!1),document.addEventListener("fullscreenchange",e,!1),u.width===u.naturalWidth&&u.height===u.naturalHeight||e()):a._resize()}function e(){function t(e){e&&(!function(e){if(!e.tagName)throw new TypeError("Object is not a valid DOM element");if("MAP"!==e.tagName.toUpperCase())throw new TypeError("Expected <MAP> tag, found <"+e.tagName+">.")}(e),r.call(e),n.push(e))}var n;return function(e){switch(n=[],typeof e){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(e||"map"),t);break;case"object":t(e);break;default:throw new TypeError("Unexpected data type ("+typeof e+").")}return n}}"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&"object"==typeof module.exports?module.exports=e():window.imageMapResize=e(),"jQuery"in window&&(window.jQuery.fn.imageMapResize=function(){return this.filter("map").each(r).end()})}(); // Holercia

let players = new Array(4);

const delay = ms => new Promise(res => setTimeout(res, ms));
const currentPlayer = () => players[0];

function showPlayers() {
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const quizIds = Object.keys(player.quizesDone || {});
        const quizesList = quizIds.length > 0
            ? quizIds.map(qid => `${qidToName(qid)}: ${player.quizesDone[qid].toFixed(1)}%`).join("<br>")
            : "Brak ukończonych quizów";
        fitTextToContainer(document.getElementById("player" + i),  "<span>Imię: " + player.name + "</span>" +
            "Rok: " + player.year + "<br>" +
            "Ilość quizów zrobionych: " + quizIds.length + "/3<br>" +
            "Lista ukończonych quizów:<br>" + quizesList);
    }
}

function checkQuizes(playerId){
    let quizes = Object.values(players[playerId].quizesDone);
    if(quizes.length >= 3){
        for(let i = 0; i<quizes.length; i++){
            if(!quizes[i] || quizes[i] < 50) return false;
        }
        return true;
    } else {
        return false;
    }
}

async function nextPlayer(){
    let first = players.shift();
    players.push(first); 

    showPlayers();
    await popUpAsync(`Teraz gracz ${currentPlayer().name}`, 1000)

    if(checkQuizes(0)){
        if(currentPlayer().year == 5){
            endScreen(0);
        } else {
            currentPlayer().year++;
            currentPlayer().quizesDone = [];
            popUp(`Level up`, 1000)
        }
    }
}
