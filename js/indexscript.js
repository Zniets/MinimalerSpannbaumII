var tool = 0;
	// 0 leer
	// 1 Knoten erstellen
	// 2 Knoten verschieben
	// 3 Knoten löschen
	// 4 Kante erstellen
	// 5 Kante löschen

var curID = 0;
alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

var KnotenArray = new Array();

var mousePosition = [0,0];
var offset = [0,0];
var isDown = false;

var objUmouse = null;

//$(document).ready(function() { 
//	
//	$("#gui").click(function(e) {
//		
//		console.log("used tool ",tool);
//		
//		if(tool == 1) {
//			e.preventDefault();
//			var x = e.pageX - this.offsetLeft - 25;
//			var y = e.pageY - this.offsetTop - 25;
//			var img = $('<img id="Kante'+curID+'">');
//			img.css('top', y);
//			img.css('left', x);
//			img.attr('width', 50);
//			img.attr('height', 50);
//			img.attr('src', './img/Knoten.png');
//			img.appendTo('#gui');
//			
//			curID++;
//		}
//	})
//	
//});

var Elegui = document.getElementById('gui')
Elegui.addEventListener('mousedown',function(e) {
	isDown = true;
	offset = [
		e.clientX - Elegui.offsetLeft,
		e.clientY - Elegui.offsetTop
	];
	
	console.log("offset:",offset);
	
	if (tool == 2) {
		console.log("tool 2 used");
		for(var i = 0; i < curID; i++) {
			let KAx = KnotenArray[i][0];
			let KAy = KnotenArray[i][1];
			if(offset[0] >= KAx && KAx >= offset[0] - 50 && offset[1] >= KAy && KAy >= offset[1] - 50) {
				objUmouse = i;
			}
		}
	}
	
}, true);

Elegui.addEventListener('mouseup',function() {
	isDown = false;
	if (tool == 1) {
		console.log("tool 1 used");
		let KnotenID = "Knoten"+curID;
		var img = document.getElementById('gui').appendChild(
			document.createElement('img'));
		img.setAttribute("id",KnotenID);
		img.style.top = offset[1] - 25;
		img.style.left = offset[0] -25;
		img.width = 50;
		img.height = 50;
		img.src = './img/Knoten.png';
		//--vorher mit JQuery:
		//img.css('top', offset[1] - 25);
		//img.css('left', offset[0] - 25);
		//img.attr('width', 50);
		//img.attr('height', 50);
		//img.attr('src', './img/Knoten.png');
		//img.appendTo('#gui');
		
		let KnotenBID = "KnotenB"+curID;
		var p = document.getElementById('gui').appendChild(
			document.createElement('p'));
		p.setAttribute("id",KnotenBID);
		p.style.top = offset[1] - 11;
		p.style.left = offset[0] - 3;
		p.innerText = alphabet[curID];
		//--vorher mit JQuery:
		//var p = $('<p id="KnotenB'+curID+'">'+alphabet[curID]+'</p>');
		//p.css('top', offset[1] - 11);
		//p.css('left', offset[0] - 3);
		//p.appendTo('#gui');
		
		KnotenArray[curID] = new Array(offset[0] - 25, offset[1] - 25);
		
		curID++;
		objUmouse = null;
	} else if (tool == 2) {
		objUmouse = null;
	}
	
	console.log("mousePosition:",mousePosition);
}, true);

document.addEventListener('mousemove',function(event) {
	event.preventDefault();
	if (isDown) {
		mousePosition = [
			event.clientX - Elegui.offsetLeft,
			event.clientY - Elegui.offsetTop
		];
		
		if (objUmouse != null) {
			let objUmouseID = "Knoten" + objUmouse;
			document.getElementById(objUmouseID).style.left = mousePosition[0] - 25;
			document.getElementById(objUmouseID).style.top = mousePosition[1] - 25;
			let objUmouseB = "KnotenB" + objUmouse;
			document.getElementById(objUmouseB).style.left = mousePosition[0] - 3;
			document.getElementById(objUmouseB).style.top = mousePosition[1] - 11;
			KnotenArray[objUmouse][0]  = mousePosition[0] - 25;
			KnotenArray[objUmouse][1]  = mousePosition[1] - 25;
		}
	
	
	}
}, true);

//Funktionen für Knöpfe im menu
function setCreateKnoten() {
	tool = 1;
	console.log("tool = " + tool);
}
function setMoveKnoten() {
	tool = 2;
	console.log("tool = " + tool);
}
function setDeleteKnoten() {
	tool = 3;
	console.log("tool = " + tool);
}
function setCreateKante() {
	tool = 4;
	console.log("tool = " + tool);
}
function setDeleteKante() {
	tool = 5;
	console.log("tool = " + tool);
}
function setnull() {
	tool = 0;
	console.log("tool = " + tool);
}