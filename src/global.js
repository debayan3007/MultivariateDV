function rangeBeautifier(num1, num2) {

	bufferMin = num1;
	bufferMax = num2;
	var opMAX = 0,
		opMIN = 0;
	var noDig = 0;
	var bufferV = Math.abs(bufferMax - bufferMin);
	var diff = bufferV;
	var newBeautyN = 0;
	while (bufferV > 0) {
		bufferV = Math.floor(bufferV / 10);
		noDig = noDig + 1;
	}
	var beautyN = 5 * Math.pow(10, (noDig - 2));

	//=====MIN===== 

	opMIN = beautyN * (Math.floor(bufferMin / beautyN));
	//minARRAY.push(opMIN);
	//=============
	//=====MAX===== 

	if ((diff / bufferMax) < 0.1) {
		noDig = 0;
		bufferV = bufferMin;
		while (bufferV != 0) {
			bufferV = Math.floor(bufferV / 10);
			noDig++;
		}
		newBeautyN = 5 * Math.pow(10, (noDig - 2));
		if (beautyN < newBeautyN) {
			beautyN = newBeautyN;
		}
	}
	opMAX = beautyN * (Math.ceil(bufferMax / beautyN));
	console.log("running");
	return [opMIN, opMAX];
}

function tickGenerator(num1, num2, smart, shrink) {

	if (smart === true) {
		num1 = rangeBeautifier(num1, num2)[0];
		num2 = rangeBeautifier(num1, num2)[1];
	}

	var bufferMin = num1; //opMax;
	var bufferMax = num2; //opMin;
	var counter = 0;
	var differBuffer = 0;
	var div = 0;
	var ticks = [];
	while (bufferMax > 99) {
		bufferMax = Math.floor(bufferMax / 10);
		counter++;
	}
	bufferMin = Math.floor(bufferMin / (Math.pow(10, counter)));

	differBuffer = bufferMax - bufferMin;

	if (differBuffer > 0 && differBuffer <= 1) {
		div = 0.25 * (Math.pow(10, counter));
	} else if (differBuffer <= 3) {
		div = 0.5 * (Math.pow(10, counter));
	} else if (differBuffer <= 6) {
		div = 1 * (Math.pow(10, counter));
	} else if (differBuffer <= 12) {
		div = 2 * (Math.pow(10, counter));
	} else if (differBuffer <= 20) {
		div = 4 * (Math.pow(10, counter));
	} else if (differBuffer <= 30) {
		div = 5 * (Math.pow(10, counter));
	} else if (differBuffer <= 40) {
		div = 7 * (Math.pow(10, counter));
	} else if (differBuffer <= 70) {
		div = 15 * (Math.pow(10, counter));
	} else if (differBuffer <= 90) {
		div = 20 * (Math.pow(10, counter));
	} else {
		div = 10 * (Math.pow(10, counter));
	}
	counter = num1;
	if (shrink == true) {
		ticks.push((counter / 1000) + "K");
	} else {
		ticks.push(counter)
	}

	while (counter < num2) {
		counter = counter + div;
		if (shrink == true) {
			ticks.push((counter / 1000) + "K");
		} else {
			ticks.push(counter)
		}
	}
	// var len=ticks.length;
	return ticks;
}

function colorBars(clr1, clr2, minProfit, maxProfit, valueToEvaluate) {

	var color1,
		color2,
		ratio,
		r,
		g,
		v,
		colorOfBar;

	if (valueToEvaluate > 0) {
		color1 = clr1.substring(1, clr1.length);
		color2 = clr2.substring(1, clr2.length);
		ratio = valueToEvaluate / maxProfit;
	} else {
		color2 = "FF7777";
		color1 = "FF2222";
		ratio = valueToEvaluate / minProfit;
	}


	var hex = function (x) {
		x = x.toString(16);
		return (x.length == 1) ? '0' + x : x;
	};

	r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
	g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
	b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));

	colorOfBar = hex(r) + hex(g) + hex(b);
	return "#" + colorOfBar;
}

function attachBoundary(target, top, down, left, right) {
	var renderingTool = new renderTool(),
		X = target.getAttribute("width"),
		Y = target.getAttribute("height");

	if (top === true) {
		target.appendChild(renderingTool.drawLine(0, X, 0, 0, "svgAxis"));
	}
	if (down === true) {
		target.appendChild(renderingTool.drawLine(0, X, Y, Y, "svgAxis"));
	}
	if (left === true) {
		target.appendChild(renderingTool.drawLine(0, 0, 0, Y, "svgAxis"));
	}
	if (right === true) {
		target.appendChild(renderingTool.drawLine(X, X, 0, Y, "svgAxis"));
	}
}

function minmax(dataset, tag) {

	// var length = Object.keys(dataset).length;
	var max = -Infinity;
	var min = Infinity;
	var compare;
	for (var i in dataset) {
		compare = dataset[i][tag + ""];
		if (compare > max)
			max = compare;
		if (compare < min)
			min = compare;
	}
	return {
		"max": max,
		"min": min
	};

};

function interpolate(x1, x2, divs) {
	var interpolatedX = [];
	var bufferDivX = (x2 - x1) / divs;
	var bufferValX = x1;
	for (var i = 0; i < divs - 1; i++) {
		bufferValX += bufferDivX;
		interpolatedX.push((Math.round(bufferValX * 1000)) / 1000);
	}
	return interpolatedX;
}

function animateColumn(column, direction, duration) {

	var XY;
	if(direction.toLowerCase() == "vertical"){
		direction = "height";
		XY = 'y';
	}
	else if(direction.toLowerCase() == "horizantal"){
		direction = "width";
		XY = 'x';
	}

	var div = Number(column.getAttribute(direction)) / 200;
	var Y = Number(column.getAttribute(XY));
	duration = duration / 100;
	column.setAttribute(XY, Y + Number(column.getAttribute(XY)));
	column.setAttribute(direction, -100);

	for (var i = 0; i < 200; i++) {
		function a(j) {
			if(direction.toLowerCase() == "vertical")
				column.setAttribute(XY, (Y + (200 - j) * div));
			
			column.setAttribute(direction, j * div);
		}
		setTimeout(a.bind(this, i), duration * i);
	}

	return column;



}