"use strict";
crossChartDemo.prototype = Object.create(columnChart.prototype);
crossChartDemo.prototype.constructor = crossChartDemo;

function crossChartDemo(ObjectRecieve) {
	this.dataob = ObjectRecieve.dataob;
	this.width = ObjectRecieve.width + 100;
	this.height = ObjectRecieve.height;
	this.colorStart = ObjectRecieve.colorStart;
	this.colorEnd = ObjectRecieve.colorEnd;
	this.minProfit = ObjectRecieve.minProfit;
	this.maxProfit = ObjectRecieve.maxProfit;
	this.ticks = ObjectRecieve.ticks;
	ObjectRecieve.direction = "horizontal";
	attachBoundary(ObjectRecieve.svg, true, true, true, true);
	var ex = this.coordinateCalculationCrossTab();
	ObjectRecieve.coordinateOb = ex; // || this.coordinateCalculationCrossTab();
	columnChart.call(this, ObjectRecieve);
}
crossChartDemo.prototype.coordinateCalculationCrossTab = function () {
	var count = 0;
	var coordinateOb = [];
	for (var j in this.dataob) {
		if (this.dataob[j] == undefined)
			continue;
		var a = this.ticks[0];
		var b = this.ticks[this.ticks.length - 1] + this.ticks[1];
		var c = 30;
		var d = this.height;
		var y = this.dataob[j].sos;
		var yCoordinate = (((y - a) / (b - a)) * (d - c));
		var xCoordinate;
		xCoordinate = 15 + Number(j) * 34;
		coordinateOb.push({
			x: xCoordinate,
			y: yCoordinate,
			color: colorBars(this.colorStart, this.colorEnd, this.minProfit, this.maxProfit, this.dataob[j].sop)
		});
	}


	return coordinateOb;

};