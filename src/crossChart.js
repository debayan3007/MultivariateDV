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
	attachBoundary(this.RenderGraph, true, true, true, true);
	this.coordinateCalculationCrossTab();
	this.drawColumns();

};
crossChart.prototype.drawColumns = function () {

	var lengthTemp = this.coordinateOb.length;
	this.svgColumn = [];

	var renderingTool = new renderTool();
	var columns;
	for (var i = 0; i < lengthTemp; i++) {

		columns = renderingTool.drawRect(0, this.coordinateOb[i].x, this.coordinateOb[i].y, 15, "svgColumn");
		columns.setAttribute("style", "fill:" + this.coordinateOb[i].color);

		this.RenderGraph.appendChild(columns);

	}
};

crossChart.prototype.coordinateCalculationCrossTab = function () {
	var count = 0;
	var bufferCoordinateOb = [];

	for (var j in this.dataob) {
		if (this.dataob[j] == undefined)
			continue;
		var a = this.ticks[0];
		var b = this.ticks[this.ticks.length - 1] + this.ticks[1];
		var c = 30;
		var d = this.width;
		var y = this.dataob[j].sos;
		var yCoordinate = (((y - a) / (b - a)) * (d - c));
		var xCoordinate;
		xCoordinate = 15 + Number(j) * 34;
		bufferCoordinateOb.push({
			x: xCoordinate,
			y: yCoordinate,
			color: colorBars(this.colorStart, this.colorEnd, this.minProfit, this.maxProfit, this.dataob[j].sop)
		});
	}
	this.coordinateOb = (bufferCoordinateOb);
	console.log("=\n=\n=\n=\n=\n=\n=", this.coordinateOb);
};