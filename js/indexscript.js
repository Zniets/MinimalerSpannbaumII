var tool = 0;
	// 0 leer
	// 1 Knoten erstellen
	// 2 Knoten verschieben
	// 3 Knoten löschen
	// 4 Kante erstellen
	// 5 Kante löschen

var curID = 0;
var curKID = 0;
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

var KnotenArray = new Array();
var KantenArray = new Array();

var mousePosition = [0,0];
var offset = [0,0];
var isDown = false;

var objUmouse = null;
var lastselobj = null;
var exsKante = false;

var result = 0;

var canvas = document.getElementById('gui').appendChild(
	document.createElement('canvas'));
canvas.height = document.getElementById('gui').clientHeight;
canvas.width = document.getElementById('gui').clientWidth;
var context = canvas.getContext('2d');

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
	if (tool == 4) {
		console.log("tool 4 used");
		for(var i = 0; i < curID; i++) {
			let KAx = KnotenArray[i][0];
			let KAy = KnotenArray[i][1];
			if(offset[0] >= KAx && KAx >= offset[0] - 50 && offset[1] >= KAy && KAy >= offset[1] - 50) {
				objUmouse = i;
			}
		}
		if(objUmouse != null) {
			if(lastselobj == null) {
				let objUmouseID = "Knoten" + objUmouse;
				document.getElementById(objUmouseID).src = './img/selKnoten.png';
				lastselobj = objUmouse;
				objUmouse = null;
			} else {
				//KantenArray [Name(ab),ax,ay,bx,by]
				if(KantenArray.length == 0) {
					drawline(lastselobj, objUmouse);
					
					let lastselobjID = "Knoten" + lastselobj;
					document.getElementById(lastselobjID).src = './img/Knoten.png';
					lastselobj = null;
					objUmouse = null;
				} else {
					let lastselobjID = "Knoten" + lastselobj;
					let objUmouseID = "Knoten" + objUmouse;
					
					if (lastselobj < objUmouse) {
						var KantenID = "K" + lastselobj + objUmouse;
					} else {
						var KantenID = "K" + objUmouse + lastselobj;
					}
					
					for(var i = 0; i < curKID; i++) {
						if(KantenArray[i][0] == KantenID) {
							exsKante = true;
						}
					}
					
					if (exsKante == false) {
						drawline(lastselobj, objUmouse);
					} else {
						console.log("zu zeichnende Kante exsistiert schon.");
						exsKante = false;
					}
					
					lastselobjID = "Knoten" + lastselobj;
					document.getElementById(lastselobjID).src = './img/Knoten.png';
					lastselobj = null;
					objUmouse = null;
				}
			}
		} else {
			let lastselobjID = "Knoten" + lastselobj;
			document.getElementById(lastselobjID).src = './img/Knoten.png';
			lastselobj = null;
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
		
		let KnotenBID = "KnotenB"+curID;
		var p = document.getElementById('gui').appendChild(
			document.createElement('p'));
		p.setAttribute("id",KnotenBID);
		p.style.top = offset[1] - 11;
		p.style.left = offset[0] - 3;
		p.innerText = alphabet[curID];
		
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

//Funktion zur Erstellung der Kanten
function drawline(selKnotenA, selKnotenB) {
	let lastselobjID = "Knoten" + lastselobj;
	let objUmouseID = "Knoten" + objUmouse;
	
	if (lastselobj < objUmouse) {
		var KantenID = "K" + lastselobj + objUmouse;
		var KnotenA = document.getElementById(lastselobjID);
		var KnotenB = document.getElementById(objUmouseID);
	} else {
		var KantenID = "K" + objUmouse + lastselobj;
		var KnotenB = document.getElementById(lastselobjID);
		var KnotenA = document.getElementById(objUmouseID);
	}
	
	var KnotenAx = Number(KnotenA.style.left.split("px")[0]);
	var KnotenAy = Number(KnotenA.style.top.split("px")[0]);
	var KnotenBx = Number(KnotenB.style.left.split("px")[0]);
	var KnotenBy = Number(KnotenB.style.top.split("px")[0]);
	
	var ABy = false;
	var ABx = false;
	
	if (KnotenAy > KnotenBy) {
		ABy = true;
	}
	if (KnotenAx > KnotenBx) {
		ABx = true;
	}
	
	context.beginPath();
	context.moveTo(KnotenAx+25, KnotenAy+25);
	context.lineTo(KnotenBx+25, KnotenBy+25);
	context.stroke();
	
	KantenArray[curKID] = new Array(KantenID, KnotenAx, KnotenAy, KnotenBx, KnotenBy);
	
	let KantenGID = "KantenG"+curKID;
	var input = document.getElementById('gui').appendChild(
			document.createElement('input'));
	input.setAttribute("type","text");
	input.setAttribute("id",KantenGID);
	input.setAttribute("size","5");
	if(ABy) {
		input.style.top = KnotenBy + (KnotenAy - KnotenBy)/2;
	} else {
		input.style.top = KnotenAy + (KnotenBy - KnotenAy)/2;
	}
	if(ABx) {
		input.style.left = KnotenBx + (KnotenAx - KnotenBx)/2;
	} else {
		input.style.left = KnotenAx + (KnotenBx - KnotenAx)/2;
	}
	
	curKID++;
}

//Funktion zum berechnen

function berechnen() {
	var berGraph = new Graph();
	for(var i = 0; i < curKID; i++) {
		let Edge = new Array();
		Edge = KantenArray[i][0].split('');
		berGraph.setEdge(alphabet[Edge[1]], alphabet[Edge[2]], Number(document.getElementById(("KantenG"+i)).value));
	}
	result = berGraph.prim("a");
	console.log(result);
	berGraph.prim("a").log();
	
	context.strokeStyle = 'Yellow';
	for(var i = 0; i < curKID; i++) {
		for(var t = 0; t < result.getEdges(alphabet[i]).length; t++) {
			var Edges = result.getEdges(alphabet[i])[t];
			let Efrom = alphabet.indexOf(Edges["from"]);
			let Eto = alphabet.indexOf(Edges["to"]);
			console.log(Edges);
			console.log(Efrom + " " + Eto);
			context.beginPath();
			context.moveTo(KnotenArray[Efrom][0] + 25,KnotenArray[Efrom][1] + 25);
			context.lineTo(KnotenArray[Eto][0] + 25,KnotenArray[Eto][1] + 25);
			context.stroke();
		}
	}
}

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