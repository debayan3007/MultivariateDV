var crossChart = function (CrossTabObject) {

	this.productSeq = CrossTabObject.productSeq;
	this.RenderGraph = CrossTabObject.svg;
	this.ticks = CrossTabObject.ticks;
	console.log("TIcks::",this.ticks);
	this.dataob = CrossTabObject.dataob;
	this.width = CrossTabObject.width;
	this.height = CrossTabObject.height;
	this.coordinateCalculationCrossTab();
	// this.drawColumns();
	console.log(this.coordinateOb);
	// this.minP = +minP;
	// this.maxP = maxP;
	// console.log(maxP);
	// this.colorRange = colorRange;
	// this.colorRangeLoss = colorRangeLoss;

};
crossChart.prototype.drawColumns = function () {

	var lengthTemp = this.coordinateOb.length;
	// console.log(lengthTemp);
	this.svgColumn = [];
	for (var i = 0; i < lengthTemp; i++) {
		this.columnWidth = (this.width - 45) / (2 * 10 - 1);
		this.svgColumn[i] = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.svgColumn[i].setAttribute("x", 50); //(this.coordinateOb[i].x)-this.columnWidth/2);
		this.svgColumn[i].setAttribute("y", (this.coordinateOb[i].y - 60) * 0.7);
		this.svgColumn[i].setAttribute("height", "20px");
		this.svgColumn[i].setAttribute("width", (this.coordinateOb[i].x * 1.8));
		this.svgColumn[i].setAttribute("class", "svgColumn");
		// var color = this.dataob[i].color;
		// this.svgColumn[i].setAttribute("fill", color);
		console.log(this.dataob[i].sop);
		this.RenderGraph.appendChild(this.svgColumn[i]);
		
	}
};

crossChart.prototype.coordinateCalculationCrossTab = function () {
	var count = 0;
	// this.coordinateOb=[];
	console.log("TICKS:::",this.ticks);
	for (var i in this.dataob) {
		var tempObj = this.dataob;
		var temptickobYj = this.ticks; //[count];
		var bufferCoordinateOb = []; var count =0;
		
		for (var j in tempObj) {
			if(tempObj[i][j] == undefined)
				continue;
			count++;
			var a = this.ticks[0];
			var b = this.ticks[this.ticks.length - 1]+this.ticks[1];
			var c = 30;
			var d = this.width;
			var y = tempObj[i][j].sos;
			console.log("a::",a);
			console.log("Y::",tempObj[i][j].sos);
			var yCoordinate = (((y - a) / (b - a)) * (d - c));
			// console.log(tempObj[j].value+"-->"+yCoordinate);
			console.log(count);
			var xCoordinate = Math.floor(45 + (((this.width - 60) / 10) * count++)); //+(0.1*wh[0]);
			// console.log(tempObj[j].time+"-->"+xCoordinate);
			bufferCoordinateOb.push({
				x: xCoordinate,
				y: yCoordinate
			});
		}
		//console.log(bufferCoordinateOb);
		this.coordinateOb = (bufferCoordinateOb);
		count++;
	}
};