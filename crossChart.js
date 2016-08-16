var crossChart = function (CrossTabObject) {

	this.productSeq = CrossTabObject.productSeq;
	this.RenderGraph = CrossTabObject.svg;
	this.ticks = CrossTabObject.ticks;
	console.log("TIcks::", this.ticks);
	this.dataob = CrossTabObject.dataob;
	this.width = CrossTabObject.width;
	this.height = CrossTabObject.height;
	this.minProfit = CrossTabObject.minProfit;
	this.maxProfit = CrossTabObject.maxProfit;

	this.colorStart = CrossTabObject.colorStart;
	this.colorEnd = CrossTabObject.colorEnd;
	this.coordinateCalculationCrossTab();
	this.drawColumns();
	console.log("dataob::::", this.dataob);
	console.log("colors:::::::----", this.colorStart, this.colorEnd);
	// var renderingTool = new renderTool();
	// this.RenderGraph.appendChild(renderingTool.drawCircle(40, 50, "anchorpoint"));



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

	var renderingTool = new renderTool();
	var columns;
	for (var i = 0; i < lengthTemp; i++) {

		columns = renderingTool.drawRect(20, this.coordinateOb[i].x, this.coordinateOb[i].y, 15, "svgColumn");
		columns.setAttribute("style", "fill:" + this.coordinateOb[i].color);

		this.RenderGraph.appendChild(columns);

	}
};

crossChart.prototype.coordinateCalculationCrossTab = function () {
	var count = 0;
	// this.coordinateOb=[];
	console.log("TICKS:::", this.ticks);
	// for (var i in this.dataob) {
	// 	var tempObj = this.dataob;
	// 	var temptickobYj = this.ticks; //[count];
	var bufferCoordinateOb = [];
	// 	var count = 0;

	for (var j in this.dataob) {
		if (this.dataob[j] == undefined)
			continue;
		var a = this.ticks[0];
		var b = this.ticks[this.ticks.length - 1] + this.ticks[1];
		var c = 30;
		var d = this.width;
		var y = this.dataob[j].sos;
		console.log("a::", a);
		console.log("SOP::", this.dataob[j].sop);
		console.log("colors::::::   ", this.colorStart, this.colorEnd);
		var yCoordinate = (((y - a) / (b - a)) * (d - c));
		// console.log(tempObj[j].value+"-->"+yCoordinate);
		var xCoordinate;
		// if (this.dataob.length == 4)
		xCoordinate = Number(j) * 37; //+(0.1*wh[0]);
		// else if (this.dataob.length == 5)
		// xCoordinate = 10 + Number(j) * 35;
		// console.log(tempObj[j].time+"-->"+xCoordinate);
		bufferCoordinateOb.push({
			x: xCoordinate,
			y: yCoordinate,
			// color: "#456445"
			color: colorBars(this.colorStart, this.colorEnd, this.minProfit, this.maxProfit, this.dataob[j].sop)
		});
	}
	//console.log(bufferCoordinateOb);
	this.coordinateOb = (bufferCoordinateOb);
	// }
	console.log("=\n=\n=\n=\n=\n=\n=", this.coordinateOb);
};