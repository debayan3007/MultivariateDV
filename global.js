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

function tickGenerator(num1, num2, smart) {

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
	ticks.push(counter);
	while (counter < num2) {
		counter = counter + div;
		ticks.push(counter);
	}
	// var len=ticks.length;
	return ticks;

}