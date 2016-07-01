/*-------Перемещение по кругу--------*/
function Planet(planet, radius, center, speed){
	var space = {
		planetName: planet,
		radius: radius,
		spinCenter: center,
		speedSpin: speed
	};

	if(space.planetName == 'moon') {
		var earth = document.getElementById('earth');
		var div = document.createElement('div');
		div.id = space.planetName;
		earth.appendChild(div);		
	} else {
		var div = document.createElement('div');
		div.id = space.planetName;
		sun.appendChild(div);
	}

	var L = 30;

	console.log(space.planetName);

	return setInterval(function() {
		L += 1;

		div.style.left = space.radius * Math.cos(L * Math.PI / 180) + space.spinCenter + "px";
		div.style.top = space.radius * Math.sin(L * Math.PI / 180) + space.spinCenter + "px";

	}, space.speedSpin);
}

var mercury = new Planet('mercury', 140, 128, 36),
	venus = new Planet('venus', 175, 128, 29),
 	earth = new Planet('earth', 230, 128, 23),
 	moon = new Planet('moon', 27, 17, 7),
	mars = new Planet('mars', 275, 128, 20),
	jupiter = new Planet('jupiter', 340, 128, 19),
	saturn = new Planet('saturn', 435, 128, 45),
	uranus = new Planet('uranus', 499, 128, 17),
	neptune = new Planet('neptune', 555, 128, 57),
	pluton = new Planet('pluton', 590, 128, 62);

// STARS
Math.rand = function(n, m) {
	return Math.round(Math.random() * (m - n) + n);
}

function Stars(size, color) {
	this.size = size || 3;
	this.color = color || "#fdfdfd";

	this.div = document.createElement('div');
			
	var s = "width: " + this.size + "px;";
		s += "height: " + this.size + "px;";
		s += "background: " + this.color + ";";
		s += "border-radius: 50%;";
		s += "position: absolute;";
		s += "top: " + Math.rand(0, window.innerHeight - this.size) + "px;";
		s += "left: " + Math.rand(0, window.innerWidth - this.size) + "px;";

	this.div.style.cssText = s;

	document.body.appendChild(this.div);
}

var circles = [];

for(var i = 0; i < 300; i++){
	circles[i] = new StarLight(Math.rand(1, 3), "rgb(" + Math.rand(240,255) + "," + Math.rand(240,255) + "," + Math.rand(240,255) + ")", Math.rand(5000, 10000));
}

function StarLight(size, color, interval){
	this.base = new Stars(size, color);
	this.interval = interval;

	var self = this;

	this.move = function() {
		this.base.div.style.left = Math.rand(0, window.innerWidth - this.base.size) + "px";
		this.base.div.style.top = Math.rand(0, window.innerHeight - this.base.size) + "px";
	}

	setInterval(function(){ self.move() }, this.interval);
}