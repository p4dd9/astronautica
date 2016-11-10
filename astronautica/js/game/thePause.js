/****************************************************
 * ASTRONAUTICA '16
 * Major: MultiMediaTechnology - FH Salzburg
 * Project: MultiMediaProject 1
 * Author: Patrick Obermueller
 * Nr.: fhs38596
 ****************************************************/

var gameCanvas = document.getElementById('astronautica');

var loadMenu = function () {
    gameCanvas.innerHTML = "<div id='area-holder'><ul id='menu-list-holder'><li id='continue'>Continue</li><li id='retry'>Retry</li><li id='menu-menu'>MAIN</li></ul><div>";
};

loadMenu();

var areaHolder = document.getElementById('area-holder');

var displayMenu = function () {
    areaHolder.style.display = 'block';
};

var hideMenu = function () {
    areaHolder.style.display = 'none';
};

