function renderGraph (RenderObject) {

	var CrossChartObject = {};
	this.tickboolean = RenderObject.tickboolean;
	this.dataob = RenderObject.dataObject;
	this.height = RenderObject.height;
	this.width = RenderObject.width + 80;
	this.tag = RenderObject.tag || "value";
	// Window.height = this.height
	// Window.width = this.width;
	this.axisName = RenderObject.axisName;
	this.chartType = (RenderObject.chart).toString();
	// this.chartType = chartType;
	this.tickobY = RenderObject.ticks || [];
	this.tickobX = RenderObject.ticksXaxis || ["test", "test", "test", "test", "test", "test", "test", "test"];
	this.numberOfGraph = Object.keys(this.dataob).length;
	this.currentIteration = 0;
	var numberOfInterations = this.numberOfGraph;
	this.getWindowSize();
	this.coordinateCalculation();
	this.pathStringBuilder();



	// this.xAxisPlot();
	var renderingTool = new renderTool();

	// this.circleDemo = this.renderingTool.drawCircle(this.height/2,this.height/2,this.svgCanvas,"anchorpoint");
	// this.svgCanvas.appendChild(this.circleDemo);
	// console.log(typeof chartType, chartType, chartType == 'line');
	if (this.chartType.toString() == "line") {
		this.svgCanvas = this.svgPlot(this.width, this.height);
		document.getElementById("container").appendChild(this.svgCanvas);
		var ObjectSendAxis = {
			"RenderGraphI": this.svgCanvas,
			"width": this.width,
			"height": this.height,
			"tickArray": this.tickobY,
			"tickBoolean": this.tickBoolean
		};
		this.addAxisLabel();
		this.mouseDragSelector();
		this.yaxisDraw = new yAxis(ObjectSendAxis);
		ObjectSendAxis.tickArray = this.tickobX;
		ObjectSendAxis.tickBoolean = this.tickBoolean;
		// ObjectSendAxis.tickOffset = 10;
		this.xaxisDraw = new xAxis(ObjectSendAxis);
		var ObjectLine = {};
		ObjectLine.svg = this.svgCanvas;
		ObjectLine.coordinateOb = this.coordinateOb;
		ObjectLine.dataob = this.dataob;
		ObjectLine.pathString = this.pathString;
		ObjectLine.width = this.width;
		ObjectLine.height = this.height;
		ObjectLine.tag = this.tag;
		this.lineChart = new lineChart(ObjectLine);
		this.anchorPoints = [];
		this.anchorPoints = this.lineChart.anchorPoints;
		this.hairLine = this.lineChart.hairLine;

	} else if (this.chartType.toString() == "column") {
		this.svgCanvas = this.svgPlot(this.width, this.height);
		document.getElementById("container").appendChild(this.svgCanvas);
		var ObjectSendAxis = {
			"RenderGraphI": this.svgCanvas,
			"width": this.width,
			"height": this.height,
			"tickArray": this.tickobY,
			"tickBoolean": this.tickBoolean,
			"axisBoolean": 'y'
		};
		this.addAxisLabel();
		this.mouseDragSelector();
		this.yaxisDraw = new yAxis(ObjectSendAxis);

		ObjectSendAxis.tickArray = this.tickobX;
		ObjectSendAxis.tickBoolean = this.tickBoolean;
		ObjectSendAxis.axisBoolean = 'x';
		this.xaxisDraw = new xAxis(ObjectSendAxis);

		var ObjectColumn = {};
		ObjectColumn.svg = this.svgCanvas;
		ObjectColumn.coordinateOb = this.coordinateOb;
		ObjectColumn.dataob = this.dataob;
		ObjectColumn.width = this.width;
		ObjectColumn.height = this.height;
		ObjectColumn.tag = this.tag;

		this.columnChart = new columnChart(ObjectColumn);
		this.svgColumn = [];
		this.svgColumn = this.columnChart.svgColumn;
	} else if (this.chartType.toString() == "crosstab") {
		this.svgCanvas = this.svgPlot(this.width - 150, this.height);
		document.getElementById("container").appendChild(this.svgCanvas);
		CrossChartObject.svg = this.svgCanvas;
		CrossChartObject.colorStart = RenderObject.colorStart;
		CrossChartObject.colorEnd = RenderObject.colorEnd;
		CrossChartObject.dataob = this.dataob;
		CrossChartObject.minProfit = RenderObject.minProfit;
		CrossChartObject.maxProfit = RenderObject.maxProfit;
		CrossChartObject.width = this.width - 85;
		CrossChartObject.height = this.height;
		CrossChartObject.ticks = RenderObject.pureTicks;
		this.crossChart = new crossChartDemo(CrossChartObject);
		//(RenderGraph, coordinateOb, dataob, width, height, productSeq, maxP, minP, colorRange, colorRangeLoss)


		// this.coordinateCalculationCrosstab();
		//RenderGraph, coordinateOb, dataob, width, height, productSeq, maxP, minP, colorRange, colorRangeLoss
		//(this.svgCanvas,this.coordinateOb,this.dataob,this.width,this.height,this.productSeq,this.maxP,this.minP,this.colorRange,this.colorRangeLoss)
		// this.crossChart = new crossChart(this.svgCanvas, this.coordinateOb, this.dataob, this.width, this.height, this.productSeq, this.maxP, this.minP, this.colorRange, this.colorRangeLoss);
	}
};

renderGraph.prototype.getWindowSize = function () {
	var d = document,
		root = d.documentElement,
		body = d.body;
	this.wid = window.innerWidth || root.clientWidth || body.clientWidth;
	// hi= window.innerHeight || root.clientHeight || body.clientHeight ;
	// return [wid,hi]
}

renderGraph.prototype.svgPlot = function (width, height) {

	var renderingTool = new renderTool();
	this.svgCanvas = renderingTool.drawSVG(width + 20, height, "svgGraph");
	// document.getElementById("container").appendChild(this.svgCanvas);
	return this.svgCanvas;
}


renderGraph.prototype.addAxisLabel = function () {

	var renderingTool = new renderTool();

	var labelRect = renderingTool.drawRect(40, 0, this.width - 35, 28, "labelRectStyle");
	this.svgCanvas.appendChild(labelRect);

	var labelY = document.createElementNS("http://www.w3.org/2000/svg", "text");
	labelY.setAttributeNS(null, "x", 45 + (this.width - 45) / 2);
	labelY.setAttributeNS(null, "y", 18);
	labelY.setAttribute("class", "labelYtext")
	// labelY.setAttributeNS(null,"text-anchor","middle");
	labelY.textContent = "" + this.axisName;
	// labelY.setAttributeNS(null,"font-family","Verdana");
	this.svgCanvas.appendChild(labelY); //----chart labels appended----
}

renderGraph.prototype.mouseDragSelector = function () {
	var flag;
	var _this = this;
	this.dragBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	this.svgCanvas.addEventListener("mousedown", function (event) {
		flag = 1;
		_this.startX = (event.pageX - 10) % (_this.width + 20);
		_this.startY = (event.pageY - 70);
		// _this.dragBox.setAttribute("x",_this.startX);
		// _this.dragBox.setAttribute("y",_this.startY);
		if (_this.chartType == "line") {
			_this.svgCanvas.removeChild(_this.hairLine);
		}

		// console.log("startX:"+(_this.startX-10)+"startY:"+(_this.startY-70));
	}, false);
	this.svgCanvas.addEventListener("mousemove", function (event) {
		if (flag == 1) {
			// console.log("drag   x:"+event.pageX+"    y:"+event.pageY);
			// console.log("startX:"+(_this.startX-10)+"startY:"+(_this.startY-70));
			_this.endPointX = (event.pageX) % (_this.width + 20);
			_this.endPointY = (event.pageY - 50) % (_this.height + 70);
			if (_this.chartType == "line") {
				_this.svgCanvas.removeChild(_this.hairLine);
			}
			if (_this.endPointX > _this.startX && _this.endPointY > _this.startY) {
				_this.dragBox.setAttribute("x", _this.startX);
				_this.dragBox.setAttribute("y", ((_this.startY - 80) % (_this.height)));
			} else if (_this.endPointX > _this.startX && _this.endPointY < _this.startY) {
				_this.dragBox.setAttribute("x", _this.startX);
				_this.dragBox.setAttribute("y", ((event.pageY - 80) % (_this.height)));
			} else if (_this.endPointX < _this.startX && _this.endPointY > _this.startY) {
				_this.dragBox.setAttribute("y", ((_this.startY - 80) % (_this.height)));
				_this.dragBox.setAttribute("x", ((event.pageX) % (_this.width + 20)));
			} else if (_this.endPointX < _this.startX && _this.endPointY < _this.startY) {
				_this.dragBox.setAttribute("x", ((event.pageX) % (_this.width + 20)));
				_this.dragBox.setAttribute("y", ((event.pageY - 80) % (_this.height)));
			}

			// _this.dragBox.setAttribute("x",_this.startX);
			// _this.dragBox.setAttribute("y",_this.startY);

			_this.dragBox.setAttribute("width", Math.abs(((event.pageX - 8) % (_this.width + 20)) - _this.startX));
			_this.dragBox.setAttribute("height", Math.abs(_this.endPointY - _this.startY));
			_this.dragBox.setAttribute("class", "selectionBox");
			_this.svgCanvas.appendChild(_this.dragBox);

		}

	}, false);

	this.svgCanvas.addEventListener("mouseup", function (event) {
		if (flag == 1)


			_this.svgCanvas.removeChild(_this.dragBox);
		if (_this.chartType == "line") {
			_this.svgCanvas.appendChild(_this.hairLine);
		}

		flag = 0;
	}, false);

	this.svgCanvas.addEventListener("mousemove", function (event) {
		_this.beginX = (_this.startX - 10);
		_this.endX = (_this.endPointX - 10);
		_this.beginY = (_this.startY - 70);
		_this.endY = (_this.endPointY);
		onSelectBox(_this.beginX, _this.endX, _this.beginY, _this.endY);
	}, false);

	document.addEventListener("onSelect", function (event) {

		beginX = event.detail.beginX;
		beginY = (event.detail.beginY - 20) % (_this.height + 70);
		endX = event.detail.endX;
		endY = (event.detail.endY - 120) % (_this.height + 70);
		// console.log()

		for (var i in _this.coordinateOb) {
			var renderingTool = new renderTool();
			var temp = _this.coordinateOb[i];
			if (temp.x > beginX && temp.x < endX && ((temp.y) % (_this.height + 70)) > beginY && ((temp.y) % (_this.height + 70)) < endY) {
				// console.log(_this.height);
				// console.log(temp.x,((temp.y+30)%(_this.height+100)));
				// _this.anchorPoints[i].setAttribute("fill","rgb(243,90,90)");
				if (_this.chartType == "line") {
					//      var cx = _this.anchorPoints[i].getAttribute("cx");
					//      var cy = _this.anchorPoints[i].getAttribute("cy");
					//      var bufferPoint = renderingTool.drawCircle(Number(cx),Number(cy),"anchorpointHighlight");
					//     _this.svgCanvas.appendChild(bufferPoint);
					// _this.anchorPoints[i].setAttribute("class","anchorpointHighlight");
					_this.anchorPoints[i].style.fill = "red";
					// console.log(_this.anchorPoints[i].getAttribute("class"));
				} else {

					_this.svgColumn[i].setAttribute("class", "svgColumnHighlight");

				}

			} else {
				// _this.anchorPoints[i].style.fill ="white";
			}
		}

	}, false);
}

function onSelectBox(beginX, endX, beginY, endY) {
	// console.log((event.pageX)%Window.width);
	var event = new CustomEvent(
		"onSelect", {
			detail: {
				beginX: beginX,
				beginY: beginY,
				endX: endX,
				endY: endY
			},
			bubbles: true,
			cancelable: true
		}
	);
	document.dispatchEvent(event);
};

function onMouseMove(event) {
	// console.log((event.pageX)%Window.width);
	var event = new CustomEvent(
		"onHighlight", {
			detail: {
				x: (event.pageX),
				y: (event.pageY)
			},
			bubbles: true,
			cancelable: true
		}
	);
	document.dispatchEvent(event);
};



function onMouseOut(event) {
	// console.log((event.pageX)%Window.width);
	var event = new CustomEvent(
		"onNormal", {
			detail: {
				x: (event.pageX),
			},
			bubbles: true,
			cancelable: true
		}
	);
	document.dispatchEvent(event);
};


renderGraph.prototype.coordinateCalculation = function () {
	var count = 0;
	// this.coordinateOb=[];

	for (var i in this.dataob) {
		var tempObj = this.dataob;
		var temptickobYj = this.tickobY; //[count];
		var bufferCoordinateOb = [];
		var count = 0;
		var xCoordinate = 65;
		var div = (this.width - 40) / (this.tickobX.length);
		for (var j in tempObj) {
			count++;
			var a = isNaN(temptickobYj[0]) ? +temptickobYj[0].replace("K", "") * 1000 : +temptickobYj[0];
			var b = isNaN(temptickobYj[temptickobYj.length - 1]) ? +temptickobYj[temptickobYj.length - 1].replace("K", "") * 1000 : +temptickobYj[temptickobYj.length - 1];
			var c = 30;
			var d = this.height - 40;
			var y = tempObj[j][this.tag];
			var yCoordinate = d - (((y - a) / (b - a)) * (d - c));

			bufferCoordinateOb.push({
				x: xCoordinate,
				y: yCoordinate
			});
			xCoordinate += div;

		}
		this.coordinateOb = (bufferCoordinateOb);
		count++;
	}
};


renderGraph.prototype.pathStringBuilder = function () {

	var bufferArray = this.coordinateOb;
	// console.log(bufferArray);
	var coordinate = 'M';
	for (var j in bufferArray) {

		var bufferObject = bufferArray[j];
		coordinate = coordinate + (bufferObject.x + "," + bufferObject.y + " L");

		// console.log(bufferObject);
	}
	coordinate = coordinate.slice(0, coordinate.length - 2);
	var keyBuffer = Object.keys(this.dataob);
	this.pathString = coordinate;

};
function renderGraph (RenderObject) {

	var CrossChartObject = {};
	this.tickboolean = RenderObject.tickboolean;
	this.dataob = RenderObject.dataObject;
	this.height = RenderObject.height;
	this.width = RenderObject.width + 80;
	this.tag = RenderObject.tag || "value";
	// Window.height = this.height
	// Window.width = this.width;
	this.axisName = RenderObject.axisName;
	this.chartType = (RenderObject.chart).toString();
	// this.chartType = chartType;
	this.tickobY = RenderObject.ticks || [];
	this.tickobX = RenderObject.ticksXaxis || ["test", "test", "test", "test", "test", "test", "test", "test"];
	this.numberOfGraph = Object.keys(this.dataob).length;
	this.currentIteration = 0;
	var numberOfInterations = this.numberOfGraph;
	this.getWindowSize();
	this.coordinateCalculation();
	this.pathStringBuilder();



	// this.xAxisPlot();
	var renderingTool = new renderTool();

	// this.circleDemo = this.renderingTool.drawCircle(this.height/2,this.height/2,this.svgCanvas,"anchorpoint");
	// this.svgCanvas.appendChild(this.circleDemo);
	// console.log(typeof chartType, chartType, chartType == 'line');
	if (this.chartType.toString() == "line") {
		this.svgCanvas = this.svgPlot(this.width, this.height);
		document.getElementById("container").appendChild(this.svgCanvas);
		var ObjectSendAxis = {
			"RenderGraphI": this.svgCanvas,
			"width": this.width,
			"height": this.height,
			"tickArray": this.tickobY,
			"tickBoolean": this.tickBoolean
		};
		this.addAxisLabel();
		this.mouseDragSelector();
		this.yaxisDraw = new yAxis(ObjectSendAxis);
		ObjectSendAxis.tickArray = this.tickobX;
		ObjectSendAxis.tickBoolean = this.tickBoolean;
		// ObjectSendAxis.tickOffset = 10;
		this.xaxisDraw = new xAxis(ObjectSendAxis);
		var ObjectLine = {};
		ObjectLine.svg = this.svgCanvas;
		ObjectLine.coordinateOb = this.coordinateOb;
		ObjectLine.dataob = this.dataob;
		ObjectLine.pathString = this.pathString;
		ObjectLine.width = this.width;
		ObjectLine.height = this.height;
		ObjectLine.tag = this.tag;
		this.lineChart = new lineChart(ObjectLine);
		this.anchorPoints = [];
		this.anchorPoints = this.lineChart.anchorPoints;
		this.hairLine = this.lineChart.hairLine;

	} else if (this.chartType.toString() == "column") {
		this.svgCanvas = this.svgPlot(this.width, this.height);
		document.getElementById("container").appendChild(this.svgCanvas);
		var ObjectSendAxis = {
			"RenderGraphI": this.svgCanvas,
			"width": this.width,
			"height": this.height,
			"tickArray": this.tickobY,
			"tickBoolean": this.tickBoolean,
			"axisBoolean": 'y'
		};
		this.addAxisLabel();
		this.mouseDragSelector();
		this.yaxisDraw = new yAxis(ObjectSendAxis);

		ObjectSendAxis.tickArray = this.tickobX;
		ObjectSendAxis.tickBoolean = this.tickBoolean;
		ObjectSendAxis.axisBoolean = 'x';
		this.xaxisDraw = new xAxis(ObjectSendAxis);

		var ObjectColumn = {};
		ObjectColumn.svg = this.svgCanvas;
		ObjectColumn.coordinateOb = this.coordinateOb;
		ObjectColumn.dataob = this.dataob;
		ObjectColumn.width = this.width;
		ObjectColumn.height = this.height;
		ObjectColumn.tag = this.tag;

		this.columnChart = new columnChart(ObjectColumn);
		this.svgColumn = [];
		this.svgColumn = this.columnChart.svgColumn;
	} else if (this.chartType.toString() == "crosstab") {
		this.svgCanvas = this.svgPlot(this.width - 150, this.height);
		document.getElementById("container").appendChild(this.svgCanvas);
		CrossChartObject.svg = this.svgCanvas;
		CrossChartObject.colorStart = RenderObject.colorStart;
		CrossChartObject.colorEnd = RenderObject.colorEnd;
		CrossChartObject.dataob = this.dataob;
		CrossChartObject.minProfit = RenderObject.minProfit;
		CrossChartObject.maxProfit = RenderObject.maxProfit;
		CrossChartObject.width = this.width - 85;
		CrossChartObject.height = this.height;
		CrossChartObject.ticks = RenderObject.pureTicks;
		this.crossChart = new crossChartDemo(CrossChartObject);
		//(RenderGraph, coordinateOb, dataob, width, height, productSeq, maxP, minP, colorRange, colorRangeLoss)


		// this.coordinateCalculationCrosstab();
		//RenderGraph, coordinateOb, dataob, width, height, productSeq, maxP, minP, colorRange, colorRangeLoss
		//(this.svgCanvas,this.coordinateOb,this.dataob,this.width,this.height,this.productSeq,this.maxP,this.minP,this.colorRange,this.colorRangeLoss)
		// this.crossChart = new crossChart(this.svgCanvas, this.coordinateOb, this.dataob, this.width, this.height, this.productSeq, this.maxP, this.minP, this.colorRange, this.colorRangeLoss);
	}
};

renderGraph.prototype.getWindowSize = function () {
	var d = document,
		root = d.documentElement,
		body = d.body;
	this.wid = window.innerWidth || root.clientWidth || body.clientWidth;
	// hi= window.innerHeight || root.clientHeight || body.clientHeight ;
	// return [wid,hi]
}

renderGraph.prototype.svgPlot = function (width, height) {

	var renderingTool = new renderTool();
	this.svgCanvas = renderingTool.drawSVG(width + 20, height, "svgGraph");
	// document.getElementById("container").appendChild(this.svgCanvas);
	return this.svgCanvas;
}


renderGraph.prototype.addAxisLabel = function () {

	var renderingTool = new renderTool();

	var labelRect = renderingTool.drawRect(40, 0, this.width - 35, 28, "labelRectStyle");
	this.svgCanvas.appendChild(labelRect);

	var labelY = document.createElementNS("http://www.w3.org/2000/svg", "text");
	labelY.setAttributeNS(null, "x", 45 + (this.width - 45) / 2);
	labelY.setAttributeNS(null, "y", 18);
	labelY.setAttribute("class", "labelYtext")
	// labelY.setAttributeNS(null,"text-anchor","middle");
	labelY.textContent = "" + this.axisName;
	// labelY.setAttributeNS(null,"font-family","Verdana");
	this.svgCanvas.appendChild(labelY); //----chart labels appended----
}

renderGraph.prototype.mouseDragSelector = function () {
	var flag;
	var _this = this;
	this.dragBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	this.svgCanvas.addEventListener("mousedown", function (event) {
		flag = 1;
		_this.startX = (event.pageX - 10) % (_this.width + 20);
		_this.startY = (event.pageY - 70);
		// _this.dragBox.setAttribute("x",_this.startX);
		// _this.dragBox.setAttribute("y",_this.startY);
		if (_this.chartType == "line") {
			_this.svgCanvas.removeChild(_this.hairLine);
		}

		// console.log("startX:"+(_this.startX-10)+"startY:"+(_this.startY-70));
	}, false);
	this.svgCanvas.addEventListener("mousemove", function (event) {
		if (flag == 1) {
			// console.log("drag   x:"+event.pageX+"    y:"+event.pageY);
			// console.log("startX:"+(_this.startX-10)+"startY:"+(_this.startY-70));
			_this.endPointX = (event.pageX) % (_this.width + 20);
			_this.endPointY = (event.pageY - 50) % (_this.height + 70);
			if (_this.chartType == "line") {
				_this.svgCanvas.removeChild(_this.hairLine);
			}
			if (_this.endPointX > _this.startX && _this.endPointY > _this.startY) {
				_this.dragBox.setAttribute("x", _this.startX);
				_this.dragBox.setAttribute("y", ((_this.startY - 80) % (_this.height)));
			} else if (_this.endPointX > _this.startX && _this.endPointY < _this.startY) {
				_this.dragBox.setAttribute("x", _this.startX);
				_this.dragBox.setAttribute("y", ((event.pageY - 80) % (_this.height)));
			} else if (_this.endPointX < _this.startX && _this.endPointY > _this.startY) {
				_this.dragBox.setAttribute("y", ((_this.startY - 80) % (_this.height)));
				_this.dragBox.setAttribute("x", ((event.pageX) % (_this.width + 20)));
			} else if (_this.endPointX < _this.startX && _this.endPointY < _this.startY) {
				_this.dragBox.setAttribute("x", ((event.pageX) % (_this.width + 20)));
				_this.dragBox.setAttribute("y", ((event.pageY - 80) % (_this.height)));
			}

			// _this.dragBox.setAttribute("x",_this.startX);
			// _this.dragBox.setAttribute("y",_this.startY);

			_this.dragBox.setAttribute("width", Math.abs(((event.pageX - 8) % (_this.width + 20)) - _this.startX));
			_this.dragBox.setAttribute("height", Math.abs(_this.endPointY - _this.startY));
			_this.dragBox.setAttribute("class", "selectionBox");
			_this.svgCanvas.appendChild(_this.dragBox);

		}

	}, false);

	this.svgCanvas.addEventListener("mouseup", function (event) {
		if (flag == 1)


			_this.svgCanvas.removeChild(_this.dragBox);
		if (_this.chartType == "line") {
			_this.svgCanvas.appendChild(_this.hairLine);
		}

		flag = 0;
	}, false);

	this.svgCanvas.addEventListener("mousemove", function (event) {
		_this.beginX = (_this.startX - 10);
		_this.endX = (_this.endPointX - 10);
		_this.beginY = (_this.startY - 70);
		_this.endY = (_this.endPointY);
		onSelectBox(_this.beginX, _this.endX, _this.beginY, _this.endY);
	}, false);

	document.addEventListener("onSelect", function (event) {

		beginX = event.detail.beginX;
		beginY = (event.detail.beginY - 20) % (_this.height + 70);
		endX = event.detail.endX;
		endY = (event.detail.endY - 120) % (_this.height + 70);
		// console.log()

		for (var i in _this.coordinateOb) {
			var renderingTool = new renderTool();
			var temp = _this.coordinateOb[i];
			if (temp.x > beginX && temp.x < endX && ((temp.y) % (_this.height + 70)) > beginY && ((temp.y) % (_this.height + 70)) < endY) {
				// console.log(_this.height);
				// console.log(temp.x,((temp.y+30)%(_this.height+100)));
				// _this.anchorPoints[i].setAttribute("fill","rgb(243,90,90)");
				if (_this.chartType == "line") {
					//      var cx = _this.anchorPoints[i].getAttribute("cx");
					//      var cy = _this.anchorPoints[i].getAttribute("cy");
					//      var bufferPoint = renderingTool.drawCircle(Number(cx),Number(cy),"anchorpointHighlight");
					//     _this.svgCanvas.appendChild(bufferPoint);
					// _this.anchorPoints[i].setAttribute("class","anchorpointHighlight");
					_this.anchorPoints[i].style.fill = "red";
					// console.log(_this.anchorPoints[i].getAttribute("class"));
				} else {

					_this.svgColumn[i].setAttribute("class", "svgColumnHighlight");

				}

			} else {
				// _this.anchorPoints[i].style.fill ="white";
			}
		}

	}, false);
}

function onSelectBox(beginX, endX, beginY, endY) {
	// console.log((event.pageX)%Window.width);
	var event = new CustomEvent(
		"onSelect", {
			detail: {
				beginX: beginX,
				beginY: beginY,
				endX: endX,
				endY: endY
			},
			bubbles: true,
			cancelable: true
		}
	);
	document.dispatchEvent(event);
};

function onMouseMove(event) {
	// console.log((event.pageX)%Window.width);
	var event = new CustomEvent(
		"onHighlight", {
			detail: {
				x: (event.pageX),
				y: (event.pageY)
			},
			bubbles: true,
			cancelable: true
		}
	);
	document.dispatchEvent(event);
};



function onMouseOut(event) {
	// console.log((event.pageX)%Window.width);
	var event = new CustomEvent(
		"onNormal", {
			detail: {
				x: (event.pageX),
			},
			bubbles: true,
			cancelable: true
		}
	);
	document.dispatchEvent(event);
};


renderGraph.prototype.coordinateCalculation = function () {
	var count = 0;
	// this.coordinateOb=[];

	for (var i in this.dataob) {
		var tempObj = this.dataob;
		var temptickobYj = this.tickobY; //[count];
		var bufferCoordinateOb = [];
		var count = 0;
		var xCoordinate = 65;
		var div = (this.width - 40) / (this.tickobX.length);
		for (var j in tempObj) {
			count++;
			var a = isNaN(temptickobYj[0]) ? +temptickobYj[0].replace("K", "") * 1000 : +temptickobYj[0];
			var b = isNaN(temptickobYj[temptickobYj.length - 1]) ? +temptickobYj[temptickobYj.length - 1].replace("K", "") * 1000 : +temptickobYj[temptickobYj.length - 1];
			var c = 30;
			var d = this.height - 40;
			var y = tempObj[j][this.tag];
			var yCoordinate = d - (((y - a) / (b - a)) * (d - c));

			bufferCoordinateOb.push({
				x: xCoordinate,
				y: yCoordinate
			});
			xCoordinate += div;

		}
		this.coordinateOb = (bufferCoordinateOb);
		count++;
	}
};


renderGraph.prototype.pathStringBuilder = function () {

	var bufferArray = this.coordinateOb;
	// console.log(bufferArray);
	var coordinate = 'M';
	for (var j in bufferArray) {

		var bufferObject = bufferArray[j];
		coordinate = coordinate + (bufferObject.x + "," + bufferObject.y + " L");

		// console.log(bufferObject);
	}
	coordinate = coordinate.slice(0, coordinate.length - 2);
	var keyBuffer = Object.keys(this.dataob);
	this.pathString = coordinate;

};
var renderTool = function(){

	this.svgLink = "http://www.w3.org/2000/svg";

}

renderTool.prototype.drawSVG = function(width,height,className){

	var SVG = document.createElementNS(this.svgLink, "svg");
	SVG.setAttribute("class",className);
	SVG.setAttribute("width",width);
	SVG.setAttribute("height",height);
	// container.appendChild(SVG);
	return SVG;

}

renderTool.prototype.drawLine = function(x1,x2,y1,y2,className){

	var svgLine = document.createElementNS(this.svgLink, "line");
	svgLine.setAttribute("x1",x1);
	svgLine.setAttribute("x2",x2);
	svgLine.setAttribute("y1",y1);
	svgLine.setAttribute("y2",y2);
	svgLine.setAttribute("class",className);
	// container.appendChild(svgLine);
	return svgLine;
}

renderTool.prototype.drawCircle = function(cx,cy,className){

	var svgCircle = document.createElementNS(this.svgLink,"circle");
	svgCircle.setAttribute("cx",cx);
	svgCircle.setAttribute("cy",cy);
	svgCircle.setAttribute("class",className);
	// container.appendChild(svgCircle);
	return svgCircle;
}

renderTool.prototype.drawRect = function(x,y,width,height,className){

	var svgRect = document.createElementNS(this.svgLink,"rect");
	svgRect.setAttribute("x",x);
	svgRect.setAttribute("y",y);
	svgRect.setAttribute("width",width);
	svgRect.setAttribute("height",height);
	svgRect.setAttribute("class",className);
	// container.appendChild(svgRect);
	return svgRect;

}
renderTool.prototype.drawPath = function(d,className){

	var svgPath = document.createElementNS(this.svgLink,"path");
	svgPath.setAttribute("d",d);
	svgPath.setAttribute("container",container);
	svgPath.setAttribute("class",className);
	// container.appendChild(svgPath);
	return svgPath;
}
renderTool.prototype.drawText = function(x,y,className){

	var svgText = document.createElementNS(this.drawText,"text");
	svgText.setAttribute("x",100);
	svgText.setAttribute("y",100);
	svgText.setAttribute("class",className);
	// svgText.textContent = content;
	// svgText.textContent=""+content;
	return svgText;
}
var renderTool = function(){

	this.svgLink = "http://www.w3.org/2000/svg";

}

renderTool.prototype.drawSVG = function(width,height,className){

	var SVG = document.createElementNS(this.svgLink, "svg");
	SVG.setAttribute("class",className);
	SVG.setAttribute("width",width);
	SVG.setAttribute("height",height);
	// container.appendChild(SVG);
	return SVG;

}

renderTool.prototype.drawLine = function(x1,x2,y1,y2,className){

	var svgLine = document.createElementNS(this.svgLink, "line");
	svgLine.setAttribute("x1",x1);
	svgLine.setAttribute("x2",x2);
	svgLine.setAttribute("y1",y1);
	svgLine.setAttribute("y2",y2);
	svgLine.setAttribute("class",className);
	// container.appendChild(svgLine);
	return svgLine;
}

renderTool.prototype.drawCircle = function(cx,cy,className){

	var svgCircle = document.createElementNS(this.svgLink,"circle");
	svgCircle.setAttribute("cx",cx);
	svgCircle.setAttribute("cy",cy);
	svgCircle.setAttribute("class",className);
	// container.appendChild(svgCircle);
	return svgCircle;
}

renderTool.prototype.drawRect = function(x,y,width,height,className){

	var svgRect = document.createElementNS(this.svgLink,"rect");
	svgRect.setAttribute("x",x);
	svgRect.setAttribute("y",y);
	svgRect.setAttribute("width",width);
	svgRect.setAttribute("height",height);
	svgRect.setAttribute("class",className);
	// container.appendChild(svgRect);
	return svgRect;

}
renderTool.prototype.drawPath = function(d,className){

	var svgPath = document.createElementNS(this.svgLink,"path");
	svgPath.setAttribute("d",d);
	svgPath.setAttribute("container",container);
	svgPath.setAttribute("class",className);
	// container.appendChild(svgPath);
	return svgPath;
}
renderTool.prototype.drawText = function(x,y,className){

	var svgText = document.createElementNS(this.drawText,"text");
	svgText.setAttribute("x",100);
	svgText.setAttribute("y",100);
	svgText.setAttribute("class",className);
	// svgText.textContent = content;
	// svgText.textContent=""+content;
	return svgText;
}
var Axis = function (ObjectInput) {

	this.RenderGraphI = ObjectInput.RenderGraphI;
	this.width = ObjectInput.width;
	this.height = ObjectInput.height;
	this.tickArray = ObjectInput.tickArray || ["a", "b", "c", "d", "e"];
	this.tickBoolean = ObjectInput.tickBoolean;
	this.axisBoolean = ObjectInput.axisBoolean;
	this.tickOffset = ObjectInput.tickOffset || 0;
	this.getWindowSize();
	this.RenderGraphI.appendChild(this.drawAxis());
	this.drawTicks();
}

Axis.prototype.drawAxis = function () {

	var renderingTool = new renderTool();
	if (this.axisBoolean == 'y') {
		this.svgAxis = renderingTool.drawLine(45, 45, 30, (this.height - 40), "svgAxis");
	} else if (this.axisBoolean == 'x') {
		this.svgAxis = renderingTool.drawLine(45, (this.width), (this.height - 40), (this.height - 40), "svgAxis");
	}

	// this.RenderGraphI.appendChild(this.svgAxis);
	return this.svgAxis;
}

Axis.prototype.drawTicks = function () {

	var renderingTool = new renderTool();

	if (this.axisBoolean == 'y') {
		this.div = (this.height - 70) / (this.tickArray.length - 1); //height,tickArray,

		for (var i = 0; i < this.tickArray.length; i++) {
			var svgAxisTickY = renderingTool.drawLine(42, 45, ((this.height - 40) - this.div * (i)), ((this.height - 40) - this.div * (i)), null); //height,
			svgAxisTickY.setAttributeNS(null, "style", "stroke:rgb(0,0,0);stroke-width:1.5"); //
			this.svgTickLineY = renderingTool.drawRect(45, ((this.height - 40) - this.div * (i)), this.width - 45, this.div, null);
			this.svgTickLineY.setAttributeNS(null, "style", "stroke:rgb(0,0,0);stroke-width:0");
			if (i % 2 == 0 && i != 0)
				this.svgTickLineY.setAttributeNS(null, "class", "svgTickRectEven");
			else
				this.svgTickLineY.setAttributeNS(null, "class", "svgTickRectOdd");
			this.RenderGraphI.appendChild(this.svgTickLineY);
			this.TicksY = document.createElementNS("http://www.w3.org/2000/svg", "text");
			this.TicksY.setAttributeNS(null, "x", 40);
			this.TicksY.setAttributeNS(null, "y", ((this.height - 40) - this.div * (i)));
			this.TicksY.setAttributeNS(null, "fill", "black");
			this.TicksY.setAttributeNS(null, "text-anchor", "end");
			this.TicksY.setAttributeNS(null, "dominant-baseline", "central");
			this.TicksY.setAttributeNS(null, "font-family", "Verdana");
			this.TicksY.setAttribute("size", "10px");
			this.TicksY.textContent = "" + this.tickArray[i];
			// console.log(Math.floor(this.wid / Window.width));
			this.RenderGraphI.appendChild(this.TicksY);
		}
	} else if (this.axisBoolean == 'x') {

		var div = (this.width - 70) / (this.tickArray.length - 1);
		for (var j = 0; j < this.tickArray.length; j++) {
			var svgAxisTickX = renderingTool.drawLine(25 + this.tickOffset + (div * (j + 1)), 25 + this.tickOffset + (div * (j + 1)), (this.height - 37), (this.height - 39), null);
			svgAxisTickX.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:2");
			this.RenderGraphI.appendChild(svgAxisTickX);
			var TicksX = document.createElementNS("http://www.w3.org/2000/svg", "text");
			//renderingTool.drawText(47+(div*j),this.height-40,((20+j)+"-06"),null);
			document.createElementNS("http://www.w3.org/2000/svg", "text");
			TicksX.setAttributeNS(null, "x", 47 + (div * j));
			TicksX.setAttributeNS(null, "y", this.height - this.tickOffset - 50);
			TicksX.setAttribute("fill", "black");
			TicksX.setAttribute("size", "10px");
			TicksX.textContent = this.tickArray[j];
			TicksX.setAttribute("dominant-baseline", "text-after-edge");
			TicksX.setAttribute("transform", "rotate(90 " + (45 + (div * j)) + "," + (this.height - 40) + ")");
			TicksX.setAttribute("font-family", "Verdana");
			console.log(this.tickBoolean);
			if (this.tickBoolean != 0)
				this.RenderGraphI.appendChild(TicksX);
		}
	}
}

Axis.prototype.getWindowSize = function () {
	var d = document,
		root = d.documentElement,
		body = d.body;
	this.wid = window.innerWidth || root.clientWidth || body.clientWidth;
}
var Axis = function (ObjectInput) {

	this.RenderGraphI = ObjectInput.RenderGraphI;
	this.width = ObjectInput.width;
	this.height = ObjectInput.height;
	this.tickArray = ObjectInput.tickArray || ["a", "b", "c", "d", "e"];
	this.tickBoolean = ObjectInput.tickBoolean;
	this.axisBoolean = ObjectInput.axisBoolean;
	this.tickOffset = ObjectInput.tickOffset || 0;
	this.getWindowSize();
	this.RenderGraphI.appendChild(this.drawAxis());
	this.drawTicks();
}

Axis.prototype.drawAxis = function () {

	var renderingTool = new renderTool();
	if (this.axisBoolean == 'y') {
		this.svgAxis = renderingTool.drawLine(45, 45, 30, (this.height - 40), "svgAxis");
	} else if (this.axisBoolean == 'x') {
		this.svgAxis = renderingTool.drawLine(45, (this.width), (this.height - 40), (this.height - 40), "svgAxis");
	}

	// this.RenderGraphI.appendChild(this.svgAxis);
	return this.svgAxis;
}

Axis.prototype.drawTicks = function () {

	var renderingTool = new renderTool();

	if (this.axisBoolean == 'y') {
		this.div = (this.height - 70) / (this.tickArray.length - 1); //height,tickArray,

		for (var i = 0; i < this.tickArray.length; i++) {
			var svgAxisTickY = renderingTool.drawLine(42, 45, ((this.height - 40) - this.div * (i)), ((this.height - 40) - this.div * (i)), null); //height,
			svgAxisTickY.setAttributeNS(null, "style", "stroke:rgb(0,0,0);stroke-width:1.5"); //
			this.svgTickLineY = renderingTool.drawRect(45, ((this.height - 40) - this.div * (i)), this.width - 45, this.div, null);
			this.svgTickLineY.setAttributeNS(null, "style", "stroke:rgb(0,0,0);stroke-width:0");
			if (i % 2 == 0 && i != 0)
				this.svgTickLineY.setAttributeNS(null, "class", "svgTickRectEven");
			else
				this.svgTickLineY.setAttributeNS(null, "class", "svgTickRectOdd");
			this.RenderGraphI.appendChild(this.svgTickLineY);
			this.TicksY = document.createElementNS("http://www.w3.org/2000/svg", "text");
			this.TicksY.setAttributeNS(null, "x", 40);
			this.TicksY.setAttributeNS(null, "y", ((this.height - 40) - this.div * (i)));
			this.TicksY.setAttributeNS(null, "fill", "black");
			this.TicksY.setAttributeNS(null, "text-anchor", "end");
			this.TicksY.setAttributeNS(null, "dominant-baseline", "central");
			this.TicksY.setAttributeNS(null, "font-family", "Verdana");
			this.TicksY.setAttribute("size", "10px");
			this.TicksY.textContent = "" + this.tickArray[i];
			// console.log(Math.floor(this.wid / Window.width));
			this.RenderGraphI.appendChild(this.TicksY);
		}
	} else if (this.axisBoolean == 'x') {

		var div = (this.width - 70) / (this.tickArray.length - 1);
		for (var j = 0; j < this.tickArray.length; j++) {
			var svgAxisTickX = renderingTool.drawLine(25 + this.tickOffset + (div * (j + 1)), 25 + this.tickOffset + (div * (j + 1)), (this.height - 37), (this.height - 39), null);
			svgAxisTickX.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:2");
			this.RenderGraphI.appendChild(svgAxisTickX);
			var TicksX = document.createElementNS("http://www.w3.org/2000/svg", "text");
			//renderingTool.drawText(47+(div*j),this.height-40,((20+j)+"-06"),null);
			document.createElementNS("http://www.w3.org/2000/svg", "text");
			TicksX.setAttributeNS(null, "x", 47 + (div * j));
			TicksX.setAttributeNS(null, "y", this.height - this.tickOffset - 50);
			TicksX.setAttribute("fill", "black");
			TicksX.setAttribute("size", "10px");
			TicksX.textContent = this.tickArray[j];
			TicksX.setAttribute("dominant-baseline", "text-after-edge");
			TicksX.setAttribute("transform", "rotate(90 " + (45 + (div * j)) + "," + (this.height - 40) + ")");
			TicksX.setAttribute("font-family", "Verdana");
			console.log(this.tickBoolean);
			if (this.tickBoolean != 0)
				this.RenderGraphI.appendChild(TicksX);
		}
	}
}

Axis.prototype.getWindowSize = function () {
	var d = document,
		root = d.documentElement,
		body = d.body;
	this.wid = window.innerWidth || root.clientWidth || body.clientWidth;
}
yAxis.prototype = Object.create(Axis.prototype);
yAxis.prototype.constructor = yAxis;

function yAxis(ObjectRecieve) {
	ObjectRecieve.axisBoolean = 'y';
	Axis.call(this, ObjectRecieve);
}
xAxis.prototype = Object.create(Axis.prototype);
xAxis.prototype.constructor = xAxis;

function xAxis(ObjectRecieve) {
	ObjectRecieve.axisBoolean = 'x';
	Axis.call(this, ObjectRecieve);
}
xAxis.prototype = Object.create(Axis.prototype);
xAxis.prototype.constructor = xAxis;

function xAxis(ObjectRecieve) {
	ObjectRecieve.axisBoolean = 'x';
	Axis.call(this, ObjectRecieve);
}
var parsingDataset = function (dataset) { //the json dataset recieved
	this.dataset = dataset;
	this.jsonData = [];
	this.jsonData = this.dataset.data; // the data part of the dataset is seperated which contains the data to be plotted
	this.dataob = {};
	this.getWindowSize();
	this.chartParse();
	if (this.forcefulCrosstab == true) { // this segment is used to determine whether the user wants
		//line/column to be plotted using crosstab data
		this.dataCruncherCrosstab(this.detect(this.jsonData, "category"));
		//the json data is sent for relevant crunching required for filtering
		var numericPlots = ["sosSum", "sopSum"];
		this.jsonData = this.detect(this.jsonData, "category"); // the dataset being filtered for respective plotting
		this.jsonData = this.detect(this.jsonData, "zone"); // first done for category, whatever remained is further filtered for zone,
		//as these are the field that will be used to plot
		this.jsonData = this.dataCruncherForceful(this.jsonData); //the remaining dataset being crunched
		var minSOP = minmax(this.jsonData[0], "sopSum").min; //the data being sent to a global function 
		var maxSOP = minmax(this.jsonData[0], "sopSum").max; //for returning min and max; the function returns a object containing min  and max
		this.ticks = (tickGenerator(minSOP, maxSOP, true, false)); //the min and max value is used to generate ticks
		var ticksXBuffer = [this.categories, this.zones];
		var axisName = ["Category vs SOP", "Category vs SOS", "Zone vs SOP", "Zone vs SOS"];

		var RenderObject = {};
		var count = 0;
		for (var i in this.jsonData) {
			RenderObject.dataObject = this.jsonData[i];
			RenderObject.height = this.height;
			RenderObject.width = this.width;
			RenderObject.ticksXaxis = ticksXBuffer[i];
			for (var j in numericPlots) {
				RenderObject.tag = numericPlots[j];
				var min = minmax(this.jsonData[0], numericPlots[j]).min;
				var max = minmax(this.jsonData[0], numericPlots[j]).max;
				RenderObject.ticks = (tickGenerator(min, max, true, true));
				RenderObject.pureTicks = (tickGenerator(min, max, true, false));
				RenderObject.chart = this.chartType;
				RenderObject.axisName = axisName[count++];
				this.dataRender = new renderGraph(RenderObject);
			}

		}

	} else if (this.chartType == "line" || this.chartType == "column") {
		this.jsonData = this.detect(this.jsonData, "time");
		this.dataParseLineColumn(this.jsonData);
		this.orderingData();
		this.minmax();
		this.tickMaker();
		this.evokingRender();
	} else if (this.chartType == "crosstab") {
		this.jsonData = this.detect(this.jsonData, "category");
		this.jsonData = this.detect(this.jsonData, "subcategory");
		this.jsonData = this.dataCruncherCrosstab(this.jsonData);
		this.dataParseCrosstab(this.jsonData);
		this.fillUps();
		this.evokingRender();
	}
};

parsingDataset.prototype.svgPlot = function (dataCarr) {

	var renderingTool = new renderTool();
	var height = this.height;
	dataCarr = Object.keys(dataCarr).length;
	this.svgCanvas = renderingTool.drawSVG(280, dataCarr * 37.5, "svgGraph");
	document.getElementById("container").appendChild(this.svgCanvas);
	return this.svgCanvas;
}

//dat
parsingDataset.prototype.dataCruncherForceful = function (dataset) {
	var zones = [],
		categories = [],
		zonesObject = [],
		categoriesObject = [],
		buffersop,
		buffersos;
	for (var i in dataset) {
		buffersos = dataset[i].sos;
		if (dataset[i].sop.charAt(0) == "(") {
			buffersop = dataset[i].sop.replace("(", "");
			buffersop = dataset[i].sos.replace(")", "");
			buffersop = +buffersop;
			buffersop *= -1;
		} else {
			buffersop = +dataset[i].sop;
		}


		if (zones.indexOf(dataset[i].zone) == -1) {
			zones.push(dataset[i].zone);

			zonesObject.push({
				"zone": dataset[i].zone,
				"sosSum": +buffersos,
				"sopSum": +buffersop
			});
		} else {
			zonesObject[zones.indexOf(dataset[i].zone)].sosSum += +buffersos;
			zonesObject[zones.indexOf(dataset[i].zone)].sopSum += buffersop;
		}

		if (categories.indexOf(dataset[i].category) == -1) {
			categories.push(dataset[i].category);

			categoriesObject.push({
				"category": dataset[i].category,
				"sosSum": +buffersos,
				"sopSum": +buffersop
			});
		} else {
			categoriesObject[categories.indexOf(dataset[i].category)].sosSum += +buffersos;
			categoriesObject[categories.indexOf(dataset[i].category)].sopSum += buffersop;
		}
	}
	return [zonesObject, categoriesObject];
}

parsingDataset.prototype.dataCruncherCrosstab = function (dataset) {

	var categories = [],
		subcategories = [],
		zones = [],
		maxProfit = -Infinity,
		minProfit = Infinity,
		maxSales = -Infinity,
		minSales = Infinity,
		bufferProfit,
		bufferSales;
	for (var i in dataset) {
		if (categories.indexOf(dataset[i].category) == -1) {
			{
				categories.push(dataset[i].category);
			}
		}

		if (zones.indexOf(dataset[i].zone) == -1) {
			zones.push(dataset[i].zone);
		}

		/*if (subcategories.indexOf(dataset[i].subcategory) == -1) {
			subcategories.push(dataset[i].subcategory);
		}*/
	}

	var jsonData = [];
	for (var i in categories) {
		jsonData[i] = {};
		jsonData[i].category = categories[i];
		jsonData[i].values = [];
		for (var j in zones) {
			jsonData[i].values[j] = {};
			jsonData[i].values[j].zone = zones[j];
			jsonData[i].values[j].zoneValues = [];
		}
	}

	for (var i in dataset) {
		for (var j in jsonData) {
			for (var k in jsonData[j].values) {
				if (jsonData[j].category == dataset[i].category && jsonData[j].values[k].zone == dataset[i].zone) {
					// console.log(Number((dataset[i].sop.replace("(", "")).replace(")", "")));
					bufferSales = Number(dataset[i].sos);
					bufferProfit = dataset[i].sop;
					bufferProfit = (dataset[i].sop[0] == "(") ? Number(bufferProfit.replace("(", "").replace(")", "")) * -1 : Number(bufferProfit);
					if (bufferProfit > maxProfit) maxProfit = bufferProfit;
					if (bufferProfit < minProfit) minProfit = bufferProfit;
					if (bufferProfit > maxSales) maxSales = bufferSales;
					if (bufferProfit < minSales) minSales = bufferSales;
					subcategories.push(dataset[i].subcategory);
					jsonData[j].values[k].zoneValues.push({
						"product": dataset[i].subcategory,
						"sos": bufferSales,
						"sop": bufferProfit
					});

				}
			}
		}
	}
	this.ticks = tickGenerator(0, maxSales, true, true);
	this.pureTicks = tickGenerator(0, maxSales, true);
	// console.log("PURE TICKS:::",this.pureTicks);
	this.categories = categories;
	this.minProfit = minProfit;
	this.maxProfit = maxProfit;
	// console.log("categories:-", categories);
	// console.log("subcategories:-", subcategories);
	// console.log("zones:-", zones);
	this.zones = zones;
	// console.log("jsonData:-", jsonData);

	return jsonData;

}

parsingDataset.prototype.dataParseCrosstab = function (jsonData) {
	var objData = this.jsonData;
	for (var i in objData) {
		var oBuffer = objData[i];
		var product_type;

		for (var j in oBuffer) {
			var oBufferAttribute;
			if (j != "values") {
				product_type = oBuffer[j]; // console.log("Product Type:"+oBuffer[j]);
				this.dataob[product_type] = {};
			} else {
				oBufferAttribute = oBuffer[j];
				var count = 0;
				for (var k in oBufferAttribute) {
					// console.log(oBufferAttribute[k].zone);

					var sosTotal = 0;
					var sopTotal = 0;
					for (var l in oBufferAttribute[k].zoneValues) {
						oBufferAttribute[k].zoneValues[l].sos = Number(oBufferAttribute[k].zoneValues[l].sos);
						sosTotal += Number(oBufferAttribute[k].zoneValues[l].sos);
						var temp = (oBufferAttribute[k].zoneValues[l].sop);
						if (Number(oBufferAttribute[k].zoneValues[l].sop) == NaN) {
							temp = temp.replace("(", "");
							temp = temp.replace(")", "");
							temp = Number(temp);
							sopTotal += Number(temp);
						} else {
							sopTotal += Number(temp);
						}

					}

					if (oBufferAttribute[k].zone == this.zones[count]) {
						this.dataob[product_type][count] = (oBufferAttribute[k].zoneValues);
					} else {
						this.dataob[product_type][count++] = [];
						this.dataob[product_type][count] = (oBufferAttribute[k].zoneValues);
					}
					count++;
				}
			}

		}

	}
	this.productArray = {};

	for (var i in objData) {
		var oBuffer = objData[i];
		var product_type;

		for (var j in oBuffer) {
			var oBufferAttribute;
			var productType;
			if (j != "values") {
				productType = oBuffer[j]
				// console.log("Product Type:" + productType);
				this.productArray[productType] = {};
			} else {
				oBufferAttribute = oBuffer[j];

				for (var k in oBufferAttribute) {

					// console.log(oBufferAttribute[k].zone);
					var sosTotal = 0;
					var sopTotal = 0;

					for (var l in oBufferAttribute[k].zoneValues) {
						if (this.productArray[productType][oBufferAttribute[k].zoneValues[l].product] == undefined && oBufferAttribute[k].zoneValues[l].product != "Total") {
							this.productArray[productType][oBufferAttribute[k].zoneValues[l].product] = 1;
						}

					}
					// this.productArray[productType]["Total"] = 1;
				}
				// console.log("Here:->", Object.keys(this.productArray[productType]));

			}

		}
	}
}

parsingDataset.prototype.fillUps = function () {

	var productTypeArray = (Object.keys(this.productArray));
	var count = 0;
	for (var i in this.dataob) {
		var tempDataobObj = this.dataob[i];

		var temp = this.productArray[productTypeArray[count++]];
		temp = temp || {};
		for (var j in tempDataobObj) {

			var productArray = (Object.keys(temp));
			for (var k in tempDataobObj[j]) {

				productArray = productArray.filter(function (val) {
					return [tempDataobObj[j][k].product + ""].indexOf(val) == -1;
				});

			}
			if (productArray.length != 0) {
				for (var q in productArray) {
					this.dataob[i][j].push({
						"product": productArray[q] + "",
						"sos": "0",
						"sop": 0
					});
				}
			}

			tempDataobObj[j].sort(function (a, b) {
				if (a.product === "Total") {
					return 1;
				}
				if (b.product === "Total") {
					return -1;
				}
				return a.product > b.product;
			});

		}
	}
}



parsingDataset.prototype.dataParseLineColumn = function (jsonData) {

	var objData = jsonData,
		ticksXaxis = [];
	for (var i in objData) {
		var oBuffer = objData[i];
		var time;
		for (var j in oBuffer) {
			var oBufferAttribute = oBuffer[j];
			if (j == 'time') {
				time = oBufferAttribute;
				if (ticksXaxis.indexOf(time) == -1) {
					ticksXaxis.push(time);
				}

			} else {
				if (this.dataob[j] == undefined) {
					this.dataob[j] = [];
					this.dataob[j].push({
						time: time,
						value: oBufferAttribute
					});
				} else {
					this.dataob[j].push({
						time: time,
						value: oBufferAttribute
					});
				}
			}
		}
	}
	this.ticksXaxis = ticksXaxis
}
parsingDataset.prototype.detect = function (objDatalet, checkerAttribute) {
	var bufferObj = [];
	for (var i in objDatalet) {
		if (objDatalet[i][checkerAttribute + ""] !== undefined) {
			bufferObj.push(objDatalet[i]);
		}
	}
	return bufferObj;
}

parsingDataset.prototype.chartParse = function () {

	var objChart = this.dataset.chart,
		caption,
		subcaption;
	for (var i in objChart) {
		// var oBuffer = objChart[i];
		// var oBufferAttribute=oBuffer[j];
		if (i == 'height') {
			this.height = objChart[i];
		} else if (i == 'width') {
			this.width = objChart[i];
		} else if (i == 'chartType') {
			this.chartType = objChart[i];
		} else if (i == 'ordering') {
			this.ordering = objChart[i];
		} else if (i == 'caption') {
			caption = objChart[i];
		} else if (i == 'subcaption') {
			subcaption = objChart[i];
		} else if (i == "colorStart") {
			this.colorStart = objChart[i];
		} else if (i == "colorEnd") {
			this.colorEnd = objChart[i];
		} else if (i == "forceMapping") {
			this.forcefulCrosstab = objChart[i];
		}

	}
	if (this.chartType !== "crosstab") {
		document.getElementById("caption").innerHTML = caption;
		document.getElementById("subcaption").innerHTML = subcaption;

	}

}

parsingDataset.prototype.orderingData = function () {
	var totalValue;
	var average = [];
	var count = 0;
	var tempDataOb = {};
	for (var i in this.dataob) {
		var tempObj = this.dataob[i];
		totalValue = 0;
		for (var j in tempObj) {
			totalValue += tempObj[j].value;
		}
		average.push({
			key: i,
			average: (totalValue / j)
		});

		count++;
	}
	this.average = average;

	var temp = {};
	for (var i in average) {
		for (var j = i; j < average.length; j++) {
			if (average[i].average > average[j].average && this.ordering == "ascending") {
				temp = average[i];
				average[i] = average[j];
				average[j] = temp;
			} else if (average[i].average < average[j].average && this.ordering == "descending") {
				temp = average[i];
				average[i] = average[j];
				average[j] = temp;
			} else if (this.ordering == "default")
				break;
		}
	}
	for (var i = 0; i < average.length; i++) {
		tempDataOb[(average[i].key)] = this.dataob[average[i].key];
	}
	this.dataob = tempDataOb;
}

parsingDataset.prototype.minmax = function () {

	var length = Object.keys(this.dataob).length;
	this.max = Array(length).fill(-1 * (1 / 0));
	this.min = Array(length).fill(1 / 0);
	var count = 0;
	for (var i in this.dataob) {
		var kx = this.dataob[i];
		for (var m in kx) {
			var value = kx[m].value;
			var time = kx[m].time;
			if (value > this.max[count]) {
				this.max[count] = value;
			}
			if (value < this.min[count]) {
				this.min[count] = value;
			}
		}
		count++;
	}
};



parsingDataset.prototype.getWindowSize = function () {
	var d = document,
		root = d.documentElement,
		body = d.body;
	this.wid = window.innerWidth || root.clientWidth || body.clientWidth;
	this.numberOfAxisTick = this.wid / this.width;
}

parsingDataset.prototype.evokingRender = function () {
	var count = 0,
		length,
		RenderObject = {};
	if (this.chartType == "line" || this.chartType == "column") {

		length = (this.max).length;
		console.log("test", Math.floor(this.wid / this.width));
		for (var i in this.dataob) {
			console.log(length - count, "mark");
			RenderObject.axisName = i;
			RenderObject.dataObject = this.dataob[i];
			RenderObject.height = this.height;
			RenderObject.width = this.width;
			RenderObject.ticks = this.optimizedTick[count++];
			RenderObject.ticksXaxis = this.ticksXaxis;
			RenderObject.chart = this.chartType;

			if (length - count < Math.floor(this.wid / this.width)) {
				RenderObject.tickboolean = 1;
			} else {
				RenderObject.tickboolean = 0;
			}
			this.dataRender = new renderGraph(RenderObject);
		}
	} else if (this.chartType == "crosstab") {
		// var length = (this.max).length;

		// console.log("test",Math.floor(this.wid/this.width));
		this.optimizedTick = [];
		this.header();
		for (var i in this.dataob) {
			RenderObject.maxProfit = this.maxProfit;
			RenderObject.minProfit = this.minProfit;
			RenderObject.colorStart = this.colorStart;
			RenderObject.colorEnd = this.colorEnd;
			RenderObject.width = 280;
			RenderObject.ticks = this.ticks;
			RenderObject.chart = this.chartType;
			RenderObject.pureTicks = this.pureTicks;

			var renderingTool = new renderTool();
			var svgCanvas = this.svgPlot(this.productArray[i]);
			RenderObject.height = svgCanvas.getAttribute("height");
			attachBoundary(svgCanvas, true, true, false, true);
			this.crosschartTable = new crossChartTable(svgCanvas, i, Object.keys(this.productArray[i]), this.maxP, this.minP);
			for (var j in this.dataob[i]) {
				RenderObject.dataObject = this.dataob[i][j];
				this.optimizedTick[count + 1] = {};
				this.dataRender = new renderGraph(RenderObject);
			}
			var br = document.createElement('br');
			document.getElementById("container").appendChild(br);
		}

		this.footer()
	}

}

parsingDataset.prototype.footer = function () {

	var renderingTool = new renderTool();
	var footerSVG = renderingTool.drawSVG(null, 70, "svgGraph");
	document.getElementById("container").appendChild(footerSVG);
	var textType = document.createElementNS("http://www.w3.org/2000/svg", "text");
	textType.setAttribute("x", 50);
	textType.setAttribute("y", 15);
	textType.setAttribute("fill", "black");
	textType.setAttribute("font-family", "Verdana");
	textType.setAttribute("size", "23px");
	footerSVG.appendChild(textType);



	var textProduct = document.createElementNS("http://www.w3.org/2000/svg", "text");
	textProduct.setAttribute("x", 150);
	textProduct.setAttribute("fill", "black");
	textProduct.setAttribute("font-family", "Verdana");
	textProduct.setAttribute("size", "23px");
	textProduct.setAttribute("y", 30);
	footerSVG.appendChild(textProduct);
	var zoneX = 330;
	var xTicks = 277;
	for (var i in this.zones) {

		for (var j = 0; j < 5; j++) {
			var textProduct =
				document.createElementNS("http://www.w3.org/2000/svg", "text");
			textProduct.setAttribute("x", (xTicks + 30));
			xTicks += 42;
			textProduct.setAttribute("fill", "black");
			textProduct.setAttribute("font-family", "Verdana");
			// textProduct.setAttribute("size","px");
			textProduct.setAttribute("y", 50);
			textProduct.setAttribute("transform", "rotate(90 " + xTicks + "," + 13 + ")");
			textProduct.textContent = this.ticks[j];
			footerSVG.appendChild(textProduct);

		}

		xTicks += 19;
		var textZones = document.createElementNS("http://www.w3.org/2000/svg", "text");
		textZones.setAttribute("x", zoneX);
		zoneX += 220;
		textZones.setAttribute("fill", "black");
		textZones.setAttribute("font-family", "Verdana");
		textZones.setAttribute("size", "23px");
		textZones.setAttribute("y", 70);
		textZones.textContent = "Sum of Sales";
		footerSVG.appendChild(textZones);


	}



	var br = document.createElement('br');
	document.getElementById("container").appendChild(br);

}

parsingDataset.prototype.header = function () {

	var renderingTool = new renderTool();
	var headerSVG = renderingTool.drawSVG(null, 35, "svgGraph");
	document.getElementById("container").appendChild(headerSVG);
	var textType = document.createElementNS("http://www.w3.org/2000/svg", "text");
	textType.setAttribute("x", 50);
	textType.setAttribute("y", 15);
	textType.setAttribute("fill", "black");
	textType.setAttribute("font-family", "Verdana");
	textType.setAttribute("size", "23px");
	textType.textContent = "Product Type";
	headerSVG.appendChild(textType);

	var textProduct = document.createElementNS("http://www.w3.org/2000/svg", "text");
	textProduct.setAttribute("x", 150);
	textProduct.setAttribute("fill", "black");
	textProduct.setAttribute("font-family", "Verdana");
	textProduct.setAttribute("size", "23px");
	textProduct.setAttribute("y", 15);
	textProduct.textContent = "Product";
	headerSVG.appendChild(textProduct);
	var zoneX = 300;
	for (var i in this.zones) {
		var textZones = document.createElementNS("http://www.w3.org/2000/svg", "text");
		textZones.setAttribute("x", zoneX);
		zoneX += 230;
		textZones.setAttribute("fill", "black");
		textZones.setAttribute("font-family", "Verdana");
		textZones.setAttribute("size", "23px");
		textZones.setAttribute("y", 15);
		textZones.textContent = "" + this.zones[i];
		headerSVG.appendChild(textZones);
	}



	var br = document.createElement('br');
	document.getElementById("container").appendChild(br);
}

parsingDataset.prototype.tickMaker = function () {

	this.optimizedTick = [];
	for (var i = 0; i < this.max.length; i++) {
		var bufferMax = this.max[i]; //opMax;
		var bufferMin = this.min[i]; //opMin;
		this.optimizedTick.push(tickGenerator(bufferMin, bufferMax, true));
	}
};
var parsingDataset = function (dataset) { //the json dataset recieved
	this.dataset = dataset;
	this.jsonData = [];
	this.jsonData = this.dataset.data; // the data part of the dataset is seperated which contains the data to be plotted
	this.dataob = {};
	this.getWindowSize();
	this.chartParse();
	if (this.forcefulCrosstab == true) { // this segment is used to determine whether the user wants
		//line/column to be plotted using crosstab data
		this.dataCruncherCrosstab(this.detect(this.jsonData, "category"));
		//the json data is sent for relevant crunching required for filtering
		var numericPlots = ["sosSum", "sopSum"];
		this.jsonData = this.detect(this.jsonData, "category"); // the dataset being filtered for respective plotting
		this.jsonData = this.detect(this.jsonData, "zone"); // first done for category, whatever remained is further filtered for zone,
		//as these are the field that will be used to plot
		this.jsonData = this.dataCruncherForceful(this.jsonData); //the remaining dataset being crunched
		var minSOP = minmax(this.jsonData[0], "sopSum").min; //the data being sent to a global function 
		var maxSOP = minmax(this.jsonData[0], "sopSum").max; //for returning min and max; the function returns a object containing min  and max
		this.ticks = (tickGenerator(minSOP, maxSOP, true, false)); //the min and max value is used to generate ticks
		var ticksXBuffer = [this.categories, this.zones];
		var axisName = ["Category vs SOP", "Category vs SOS", "Zone vs SOP", "Zone vs SOS"];

		var RenderObject = {};
		var count = 0;
		for (var i in this.jsonData) {
			RenderObject.dataObject = this.jsonData[i];
			RenderObject.height = this.height;
			RenderObject.width = this.width;
			RenderObject.ticksXaxis = ticksXBuffer[i];
			for (var j in numericPlots) {
				RenderObject.tag = numericPlots[j];
				var min = minmax(this.jsonData[0], numericPlots[j]).min;
				var max = minmax(this.jsonData[0], numericPlots[j]).max;
				RenderObject.ticks = (tickGenerator(min, max, true, true));
				RenderObject.pureTicks = (tickGenerator(min, max, true, false));
				RenderObject.chart = this.chartType;
				RenderObject.axisName = axisName[count++];
				this.dataRender = new renderGraph(RenderObject);
			}

		}

	} else if (this.chartType == "line" || this.chartType == "column") {
		this.jsonData = this.detect(this.jsonData, "time");
		this.dataParseLineColumn(this.jsonData);
		this.orderingData();
		this.minmax();
		this.tickMaker();
		this.evokingRender();
	} else if (this.chartType == "crosstab") {
		this.jsonData = this.detect(this.jsonData, "category");
		this.jsonData = this.detect(this.jsonData, "subcategory");
		this.jsonData = this.dataCruncherCrosstab(this.jsonData);
		this.dataParseCrosstab(this.jsonData);
		this.fillUps();
		this.evokingRender();
	}
};

parsingDataset.prototype.svgPlot = function (dataCarr) {

	var renderingTool = new renderTool();
	var height = this.height;
	dataCarr = Object.keys(dataCarr).length;
	this.svgCanvas = renderingTool.drawSVG(280, dataCarr * 37.5, "svgGraph");
	document.getElementById("container").appendChild(this.svgCanvas);
	return this.svgCanvas;
}

//dat
parsingDataset.prototype.dataCruncherForceful = function (dataset) {
	var zones = [],
		categories = [],
		zonesObject = [],
		categoriesObject = [],
		buffersop,
		buffersos;
	for (var i in dataset) {
		buffersos = dataset[i].sos;
		if (dataset[i].sop.charAt(0) == "(") {
			buffersop = dataset[i].sop.replace("(", "");
			buffersop = dataset[i].sos.replace(")", "");
			buffersop = +buffersop;
			buffersop *= -1;
		} else {
			buffersop = +dataset[i].sop;
		}


		if (zones.indexOf(dataset[i].zone) == -1) {
			zones.push(dataset[i].zone);

			zonesObject.push({
				"zone": dataset[i].zone,
				"sosSum": +buffersos,
				"sopSum": +buffersop
			});
		} else {
			zonesObject[zones.indexOf(dataset[i].zone)].sosSum += +buffersos;
			zonesObject[zones.indexOf(dataset[i].zone)].sopSum += buffersop;
		}

		if (categories.indexOf(dataset[i].category) == -1) {
			categories.push(dataset[i].category);

			categoriesObject.push({
				"category": dataset[i].category,
				"sosSum": +buffersos,
				"sopSum": +buffersop
			});
		} else {
			categoriesObject[categories.indexOf(dataset[i].category)].sosSum += +buffersos;
			categoriesObject[categories.indexOf(dataset[i].category)].sopSum += buffersop;
		}
	}
	return [zonesObject, categoriesObject];
}

parsingDataset.prototype.dataCruncherCrosstab = function (dataset) {

	var categories = [],
		subcategories = [],
		zones = [],
		maxProfit = -Infinity,
		minProfit = Infinity,
		maxSales = -Infinity,
		minSales = Infinity,
		bufferProfit,
		bufferSales;
	for (var i in dataset) {
		if (categories.indexOf(dataset[i].category) == -1) {
			{
				categories.push(dataset[i].category);
			}
		}

		if (zones.indexOf(dataset[i].zone) == -1) {
			zones.push(dataset[i].zone);
		}

		/*if (subcategories.indexOf(dataset[i].subcategory) == -1) {
			subcategories.push(dataset[i].subcategory);
		}*/
	}

	var jsonData = [];
	for (var i in categories) {
		jsonData[i] = {};
		jsonData[i].category = categories[i];
		jsonData[i].values = [];
		for (var j in zones) {
			jsonData[i].values[j] = {};
			jsonData[i].values[j].zone = zones[j];
			jsonData[i].values[j].zoneValues = [];
		}
	}

	for (var i in dataset) {
		for (var j in jsonData) {
			for (var k in jsonData[j].values) {
				if (jsonData[j].category == dataset[i].category && jsonData[j].values[k].zone == dataset[i].zone) {
					// console.log(Number((dataset[i].sop.replace("(", "")).replace(")", "")));
					bufferSales = Number(dataset[i].sos);
					bufferProfit = dataset[i].sop;
					bufferProfit = (dataset[i].sop[0] == "(") ? Number(bufferProfit.replace("(", "").replace(")", "")) * -1 : Number(bufferProfit);
					if (bufferProfit > maxProfit) maxProfit = bufferProfit;
					if (bufferProfit < minProfit) minProfit = bufferProfit;
					if (bufferProfit > maxSales) maxSales = bufferSales;
					if (bufferProfit < minSales) minSales = bufferSales;
					subcategories.push(dataset[i].subcategory);
					jsonData[j].values[k].zoneValues.push({
						"product": dataset[i].subcategory,
						"sos": bufferSales,
						"sop": bufferProfit
					});

				}
			}
		}
	}
	this.ticks = tickGenerator(0, maxSales, true, true);
	this.pureTicks = tickGenerator(0, maxSales, true);
	// console.log("PURE TICKS:::",this.pureTicks);
	this.categories = categories;
	this.minProfit = minProfit;
	this.maxProfit = maxProfit;
	// console.log("categories:-", categories);
	// console.log("subcategories:-", subcategories);
	// console.log("zones:-", zones);
	this.zones = zones;
	// console.log("jsonData:-", jsonData);

	return jsonData;

}

parsingDataset.prototype.dataParseCrosstab = function (jsonData) {
	var objData = this.jsonData;
	for (var i in objData) {
		var oBuffer = objData[i];
		var product_type;

		for (var j in oBuffer) {
			var oBufferAttribute;
			if (j != "values") {
				product_type = oBuffer[j]; // console.log("Product Type:"+oBuffer[j]);
				this.dataob[product_type] = {};
			} else {
				oBufferAttribute = oBuffer[j];
				var count = 0;
				for (var k in oBufferAttribute) {
					// console.log(oBufferAttribute[k].zone);

					var sosTotal = 0;
					var sopTotal = 0;
					for (var l in oBufferAttribute[k].zoneValues) {
						oBufferAttribute[k].zoneValues[l].sos = Number(oBufferAttribute[k].zoneValues[l].sos);
						sosTotal += Number(oBufferAttribute[k].zoneValues[l].sos);
						var temp = (oBufferAttribute[k].zoneValues[l].sop);
						if (Number(oBufferAttribute[k].zoneValues[l].sop) == NaN) {
							temp = temp.replace("(", "");
							temp = temp.replace(")", "");
							temp = Number(temp);
							sopTotal += Number(temp);
						} else {
							sopTotal += Number(temp);
						}

					}

					if (oBufferAttribute[k].zone == this.zones[count]) {
						this.dataob[product_type][count] = (oBufferAttribute[k].zoneValues);
					} else {
						this.dataob[product_type][count++] = [];
						this.dataob[product_type][count] = (oBufferAttribute[k].zoneValues);
					}
					count++;
				}
			}

		}

	}
	this.productArray = {};

	for (var i in objData) {
		var oBuffer = objData[i];
		var product_type;

		for (var j in oBuffer) {
			var oBufferAttribute;
			var productType;
			if (j != "values") {
				productType = oBuffer[j]
				// console.log("Product Type:" + productType);
				this.productArray[productType] = {};
			} else {
				oBufferAttribute = oBuffer[j];

				for (var k in oBufferAttribute) {

					// console.log(oBufferAttribute[k].zone);
					var sosTotal = 0;
					var sopTotal = 0;

					for (var l in oBufferAttribute[k].zoneValues) {
						if (this.productArray[productType][oBufferAttribute[k].zoneValues[l].product] == undefined && oBufferAttribute[k].zoneValues[l].product != "Total") {
							this.productArray[productType][oBufferAttribute[k].zoneValues[l].product] = 1;
						}

					}
					// this.productArray[productType]["Total"] = 1;
				}
				// console.log("Here:->", Object.keys(this.productArray[productType]));

			}

		}
	}
}

parsingDataset.prototype.fillUps = function () {

	var productTypeArray = (Object.keys(this.productArray));
	var count = 0;
	for (var i in this.dataob) {
		var tempDataobObj = this.dataob[i];

		var temp = this.productArray[productTypeArray[count++]];
		temp = temp || {};
		for (var j in tempDataobObj) {

			var productArray = (Object.keys(temp));
			for (var k in tempDataobObj[j]) {

				productArray = productArray.filter(function (val) {
					return [tempDataobObj[j][k].product + ""].indexOf(val) == -1;
				});

			}
			if (productArray.length != 0) {
				for (var q in productArray) {
					this.dataob[i][j].push({
						"product": productArray[q] + "",
						"sos": "0",
						"sop": 0
					});
				}
			}

			tempDataobObj[j].sort(function (a, b) {
				if (a.product === "Total") {
					return 1;
				}
				if (b.product === "Total") {
					return -1;
				}
				return a.product > b.product;
			});

		}
	}
}



parsingDataset.prototype.dataParseLineColumn = function (jsonData) {

	var objData = jsonData,
		ticksXaxis = [];
	for (var i in objData) {
		var oBuffer = objData[i];
		var time;
		for (var j in oBuffer) {
			var oBufferAttribute = oBuffer[j];
			if (j == 'time') {
				time = oBufferAttribute;
				if (ticksXaxis.indexOf(time) == -1) {
					ticksXaxis.push(time);
				}

			} else {
				if (this.dataob[j] == undefined) {
					this.dataob[j] = [];
					this.dataob[j].push({
						time: time,
						value: oBufferAttribute
					});
				} else {
					this.dataob[j].push({
						time: time,
						value: oBufferAttribute
					});
				}
			}
		}
	}
	this.ticksXaxis = ticksXaxis
}
parsingDataset.prototype.detect = function (objDatalet, checkerAttribute) {
	var bufferObj = [];
	for (var i in objDatalet) {
		if (objDatalet[i][checkerAttribute + ""] !== undefined) {
			bufferObj.push(objDatalet[i]);
		}
	}
	return bufferObj;
}

parsingDataset.prototype.chartParse = function () {

	var objChart = this.dataset.chart,
		caption,
		subcaption;
	for (var i in objChart) {
		// var oBuffer = objChart[i];
		// var oBufferAttribute=oBuffer[j];
		if (i == 'height') {
			this.height = objChart[i];
		} else if (i == 'width') {
			this.width = objChart[i];
		} else if (i == 'chartType') {
			this.chartType = objChart[i];
		} else if (i == 'ordering') {
			this.ordering = objChart[i];
		} else if (i == 'caption') {
			caption = objChart[i];
		} else if (i == 'subcaption') {
			subcaption = objChart[i];
		} else if (i == "colorStart") {
			this.colorStart = objChart[i];
		} else if (i == "colorEnd") {
			this.colorEnd = objChart[i];
		} else if (i == "forceMapping") {
			this.forcefulCrosstab = objChart[i];
		}

	}
	if (this.chartType !== "crosstab") {
		document.getElementById("caption").innerHTML = caption;
		document.getElementById("subcaption").innerHTML = subcaption;

	}

}

parsingDataset.prototype.orderingData = function () {
	var totalValue;
	var average = [];
	var count = 0;
	var tempDataOb = {};
	for (var i in this.dataob) {
		var tempObj = this.dataob[i];
		totalValue = 0;
		for (var j in tempObj) {
			totalValue += tempObj[j].value;
		}
		average.push({
			key: i,
			average: (totalValue / j)
		});

		count++;
	}
	this.average = average;

	var temp = {};
	for (var i in average) {
		for (var j = i; j < average.length; j++) {
			if (average[i].average > average[j].average && this.ordering == "ascending") {
				temp = average[i];
				average[i] = average[j];
				average[j] = temp;
			} else if (average[i].average < average[j].average && this.ordering == "descending") {
				temp = average[i];
				average[i] = average[j];
				average[j] = temp;
			} else if (this.ordering == "default")
				break;
		}
	}
	for (var i = 0; i < average.length; i++) {
		tempDataOb[(average[i].key)] = this.dataob[average[i].key];
	}
	this.dataob = tempDataOb;
}

parsingDataset.prototype.minmax = function () {

	var length = Object.keys(this.dataob).length;
	this.max = Array(length).fill(-1 * (1 / 0));
	this.min = Array(length).fill(1 / 0);
	var count = 0;
	for (var i in this.dataob) {
		var kx = this.dataob[i];
		for (var m in kx) {
			var value = kx[m].value;
			var time = kx[m].time;
			if (value > this.max[count]) {
				this.max[count] = value;
			}
			if (value < this.min[count]) {
				this.min[count] = value;
			}
		}
		count++;
	}
};



parsingDataset.prototype.getWindowSize = function () {
	var d = document,
		root = d.documentElement,
		body = d.body;
	this.wid = window.innerWidth || root.clientWidth || body.clientWidth;
	this.numberOfAxisTick = this.wid / this.width;
}

parsingDataset.prototype.evokingRender = function () {
	var count = 0,
		length,
		RenderObject = {};
	if (this.chartType == "line" || this.chartType == "column") {

		length = (this.max).length;
		console.log("test", Math.floor(this.wid / this.width));
		for (var i in this.dataob) {
			console.log(length - count, "mark");
			RenderObject.axisName = i;
			RenderObject.dataObject = this.dataob[i];
			RenderObject.height = this.height;
			RenderObject.width = this.width;
			RenderObject.ticks = this.optimizedTick[count++];
			RenderObject.ticksXaxis = this.ticksXaxis;
			RenderObject.chart = this.chartType;

			if (length - count < Math.floor(this.wid / this.width)) {
				RenderObject.tickboolean = 1;
			} else {
				RenderObject.tickboolean = 0;
			}
			this.dataRender = new renderGraph(RenderObject);
		}
	} else if (this.chartType == "crosstab") {
		// var length = (this.max).length;

		// console.log("test",Math.floor(this.wid/this.width));
		this.optimizedTick = [];
		this.header();
		for (var i in this.dataob) {
			RenderObject.maxProfit = this.maxProfit;
			RenderObject.minProfit = this.minProfit;
			RenderObject.colorStart = this.colorStart;
			RenderObject.colorEnd = this.colorEnd;
			RenderObject.width = 280;
			RenderObject.ticks = this.ticks;
			RenderObject.chart = this.chartType;
			RenderObject.pureTicks = this.pureTicks;

			var renderingTool = new renderTool();
			var svgCanvas = this.svgPlot(this.productArray[i]);
			RenderObject.height = svgCanvas.getAttribute("height");
			attachBoundary(svgCanvas, true, true, false, true);
			this.crosschartTable = new crossChartTable(svgCanvas, i, Object.keys(this.productArray[i]), this.maxP, this.minP);
			for (var j in this.dataob[i]) {
				RenderObject.dataObject = this.dataob[i][j];
				this.optimizedTick[count + 1] = {};
				this.dataRender = new renderGraph(RenderObject);
			}
			var br = document.createElement('br');
			document.getElementById("container").appendChild(br);
		}

		this.footer()
	}

}

parsingDataset.prototype.footer = function () {

	var renderingTool = new renderTool();
	var footerSVG = renderingTool.drawSVG(null, 70, "svgGraph");
	document.getElementById("container").appendChild(footerSVG);
	var textType = document.createElementNS("http://www.w3.org/2000/svg", "text");
	textType.setAttribute("x", 50);
	textType.setAttribute("y", 15);
	textType.setAttribute("fill", "black");
	textType.setAttribute("font-family", "Verdana");
	textType.setAttribute("size", "23px");
	footerSVG.appendChild(textType);



	var textProduct = document.createElementNS("http://www.w3.org/2000/svg", "text");
	textProduct.setAttribute("x", 150);
	textProduct.setAttribute("fill", "black");
	textProduct.setAttribute("font-family", "Verdana");
	textProduct.setAttribute("size", "23px");
	textProduct.setAttribute("y", 30);
	footerSVG.appendChild(textProduct);
	var zoneX = 330;
	var xTicks = 277;
	for (var i in this.zones) {

		for (var j = 0; j < 5; j++) {
			var textProduct =
				document.createElementNS("http://www.w3.org/2000/svg", "text");
			textProduct.setAttribute("x", (xTicks + 30));
			xTicks += 42;
			textProduct.setAttribute("fill", "black");
			textProduct.setAttribute("font-family", "Verdana");
			// textProduct.setAttribute("size","px");
			textProduct.setAttribute("y", 50);
			textProduct.setAttribute("transform", "rotate(90 " + xTicks + "," + 13 + ")");
			textProduct.textContent = this.ticks[j];
			footerSVG.appendChild(textProduct);

		}

		xTicks += 19;
		var textZones = document.createElementNS("http://www.w3.org/2000/svg", "text");
		textZones.setAttribute("x", zoneX);
		zoneX += 220;
		textZones.setAttribute("fill", "black");
		textZones.setAttribute("font-family", "Verdana");
		textZones.setAttribute("size", "23px");
		textZones.setAttribute("y", 70);
		textZones.textContent = "Sum of Sales";
		footerSVG.appendChild(textZones);


	}



	var br = document.createElement('br');
	document.getElementById("container").appendChild(br);

}

parsingDataset.prototype.header = function () {

	var renderingTool = new renderTool();
	var headerSVG = renderingTool.drawSVG(null, 35, "svgGraph");
	document.getElementById("container").appendChild(headerSVG);
	var textType = document.createElementNS("http://www.w3.org/2000/svg", "text");
	textType.setAttribute("x", 50);
	textType.setAttribute("y", 15);
	textType.setAttribute("fill", "black");
	textType.setAttribute("font-family", "Verdana");
	textType.setAttribute("size", "23px");
	textType.textContent = "Product Type";
	headerSVG.appendChild(textType);

	var textProduct = document.createElementNS("http://www.w3.org/2000/svg", "text");
	textProduct.setAttribute("x", 150);
	textProduct.setAttribute("fill", "black");
	textProduct.setAttribute("font-family", "Verdana");
	textProduct.setAttribute("size", "23px");
	textProduct.setAttribute("y", 15);
	textProduct.textContent = "Product";
	headerSVG.appendChild(textProduct);
	var zoneX = 300;
	for (var i in this.zones) {
		var textZones = document.createElementNS("http://www.w3.org/2000/svg", "text");
		textZones.setAttribute("x", zoneX);
		zoneX += 230;
		textZones.setAttribute("fill", "black");
		textZones.setAttribute("font-family", "Verdana");
		textZones.setAttribute("size", "23px");
		textZones.setAttribute("y", 15);
		textZones.textContent = "" + this.zones[i];
		headerSVG.appendChild(textZones);
	}



	var br = document.createElement('br');
	document.getElementById("container").appendChild(br);
}

parsingDataset.prototype.tickMaker = function () {

	this.optimizedTick = [];
	for (var i = 0; i < this.max.length; i++) {
		var bufferMax = this.max[i]; //opMax;
		var bufferMin = this.min[i]; //opMin;
		this.optimizedTick.push(tickGenerator(bufferMin, bufferMax, true));
	}
};
var lineChart = function (ObjectR) {

	//RenderGraph, coordinateOb, dataob, pathString, width, height
	this.RenderGraph = ObjectR.svg;
	this.coordinateOb = ObjectR.coordinateOb;
	this.dataob = ObjectR.dataob;
	this.pathString = ObjectR.pathString;
	this.width = ObjectR.width;
	this.height = ObjectR.height;
	this.drawPath();


}

lineChart.prototype.drawPath = function () {

	var _this = this;
	var renderingTool = new renderTool();
	var bufferPath = "";
	var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
	var svgLine = renderingTool.drawPath("", "line-graph");
	var buffer, bufferNew;
	this.RenderGraph.appendChild(svgLine);
	var pathArray = this.pathString.split(" ");
	var len = pathArray.length
	console.log(pathArray, "patharray")
	for (var i = 0; i <= len; ++i) {

		function a(j) {
			if (j == len) {
				this.drawAnchorPoints();

			}
			buffer = pathArray[j];
			bufferNew = pathArray[j + 1];
			bufferPath += buffer + " ";
			buffer = ((buffer.replace("M", "")).replace("L", "")).split(",");
			bufferNew = ((bufferNew.replace("M", "")).replace("L", "")).split(",");
			var interX = interpolate(+buffer[0], +bufferNew[0], 100);
			var interY = interpolate(+buffer[1], +bufferNew[1], 100);

			function b(k, bufferP) {
				svgLine.setAttribute("d", bufferP + " L" + interX[k] + "," + interY[k]);
			}
			for (var k = 0; k < interX.length - 1; k++) {
				setTimeout(b.bind(this, k, bufferPath), k * 2);
			}
			svgLine.setAttribute("d", bufferPath);


		}
		setTimeout(a.bind(this, i), 200 * (i + 3));

	}


}



lineChart.prototype.animatePath = function (pathOld) {

	var pathArray = pathOld.split(" ");
	var pathNew;
	var bufferPiece;
	for (var i in pathArray) {
		bufferPiece = pathArray[i].split(1, pathArray[i].length);
	}

}

lineChart.prototype.drawAnchorPoints = function () { //coordinateOb, dataob

	var renderingTool = new renderTool();
	this.anchorPoints = [];
	this.anchorPoints.fill(renderingTool.drawCircle(-100, -100, "anchorpoint"));
	var _this = this;

	for (var i = 0; i < this.coordinateOb.length; i++) {
		if (this.anchorPoints[i] == undefined) {
			this.toolBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			this.toolText = document.createElementNS("http://www.w3.org/2000/svg", "text");


			this.anchorPoints[i] = renderingTool.drawCircle(Math.floor(this.coordinateOb[i].x), Math.floor(this.coordinateOb[i].y), "anchorpoint");


			this.toolBox.setAttribute("height", 20);
			this.toolBox.setAttribute("width", 25);
			this.toolBox.setAttribute("style", "fill:#fed8ca;stroke:brown;stroke-width:1;opacity:0.7");

			this.RenderGraph.appendChild(this.anchorPoints[i]);
			this.hairLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
			this.RenderGraph.addEventListener("mousemove", onMouseMove);
			this.anchorPoints[i].addEventListener("mousemove", onMouseMove);

			function a(j) {

				document.addEventListener('onHighlight', function (event) {
					// var length
					// var temp = (_this.svgColumn[j].getAttribute("width")).trim(0,_this.svgColumn[j].getAttribute("width").length-5);
					// console.log(temp);
					var tempX = ((event.detail.x) % (_this.width + 20)) - 8;
					// console.log(_this.width,tempX);
					_this.hairLine.setAttributeNS(null, "y1", 30);
					_this.hairLine.setAttributeNS(null, "y2", _this.height - 40);
					_this.hairLine.setAttributeNS(null, "x1", tempX);
					_this.hairLine.setAttributeNS(null, "x2", tempX);
					// var xCheck = evt.detail.x - 8;
					_this.hairLine.setAttribute("class", "hairLine");

					_this.RenderGraph.appendChild(_this.hairLine);
					var lowerBoundX = Number(_this.anchorPoints[j].getAttribute("cx"));
					var upperBoundX = Number(_this.anchorPoints[j].getAttribute("cx")) + 12;
					var lowerBoundY = Number(_this.anchorPoints[j].getAttribute("cy")) - 6;
					var upperBoundY = Number(_this.anchorPoints[j].getAttribute("cy")) + 6;
					// console.log(lowerBound,upperBound);
					// var tempX=((event.detail.x)%(_this.width+20)); 
					var tempY = (event.detail.y - 110); //%(_this.height));
					// console.log(tempY,Number(anchorPoints[j].getAttribute("cy")))

					if (tempX >= lowerBoundX && tempX <= upperBoundX) {

						// console.log(tempY,_this.anchorPoints[j].getAttribute("cy"));
						// _this.anchorPoints[j].setAttribute("style","fill:white;stroke:#009688;stroke-width:1;opacity:1");
						// _this.anchorPoints[j].setAttribute("fill","black");
						_this.anchorPoints[j].setAttribute("class", "anchorpointHighlight");
						// console.log(tempX,_this.coordinateOb[j].x,"marker");
						_this.toolText.setAttribute("x", upperBoundX + 3);
						_this.toolText.setAttribute("y", lowerBoundY + 15);

						_this.toolText.setAttribute("fill", "brown");
						_this.toolText.setAttribute("font-size", "15px");


						_this.toolBox.setAttribute("x", upperBoundX);
						_this.toolBox.setAttribute("y", lowerBoundY);

						if (tempX >= (_this.coordinateOb[j].x + 8) && tempX <= (_this.coordinateOb[j].x + 12)) {
							// console.log("abc");
							// console.log(_this.coordinateOb[j].y);
							_this.toolText.textContent = _this.dataob[j].value;
							_this.toolText.setAttribute("x", -100)
							_this.toolText.setAttribute("y", -100);
							_this.toolBox.setAttribute("x", -100);
							_this.toolBox.setAttribute("y", -100);
						}



						_this.RenderGraph.appendChild(_this.toolBox);
						_this.RenderGraph.appendChild(_this.toolText);

					} else {
						// _this.toolText.setAttribute("x",-1);
						_this.anchorPoints[j].setAttribute("class", "anchorpoint");
					}

				}, false);
			}
			a(i);
		}
	}
}
var lineChart = function (ObjectR) {

	//RenderGraph, coordinateOb, dataob, pathString, width, height
	this.RenderGraph = ObjectR.svg;
	this.coordinateOb = ObjectR.coordinateOb;
	this.dataob = ObjectR.dataob;
	this.pathString = ObjectR.pathString;
	this.width = ObjectR.width;
	this.height = ObjectR.height;
	this.drawPath();


}

lineChart.prototype.drawPath = function () {

	var _this = this;
	var renderingTool = new renderTool();
	var bufferPath = "";
	var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
	var svgLine = renderingTool.drawPath("", "line-graph");
	var buffer, bufferNew;
	this.RenderGraph.appendChild(svgLine);
	var pathArray = this.pathString.split(" ");
	var len = pathArray.length
	console.log(pathArray, "patharray")
	for (var i = 0; i <= len; ++i) {

		function a(j) {
			if (j == len) {
				this.drawAnchorPoints();

			}
			buffer = pathArray[j];
			bufferNew = pathArray[j + 1];
			bufferPath += buffer + " ";
			buffer = ((buffer.replace("M", "")).replace("L", "")).split(",");
			bufferNew = ((bufferNew.replace("M", "")).replace("L", "")).split(",");
			var interX = interpolate(+buffer[0], +bufferNew[0], 100);
			var interY = interpolate(+buffer[1], +bufferNew[1], 100);

			function b(k, bufferP) {
				svgLine.setAttribute("d", bufferP + " L" + interX[k] + "," + interY[k]);
			}
			for (var k = 0; k < interX.length - 1; k++) {
				setTimeout(b.bind(this, k, bufferPath), k * 2);
			}
			svgLine.setAttribute("d", bufferPath);


		}
		setTimeout(a.bind(this, i), 200 * (i + 3));

	}


}



lineChart.prototype.animatePath = function (pathOld) {

	var pathArray = pathOld.split(" ");
	var pathNew;
	var bufferPiece;
	for (var i in pathArray) {
		bufferPiece = pathArray[i].split(1, pathArray[i].length);
	}

}

lineChart.prototype.drawAnchorPoints = function () { //coordinateOb, dataob

	var renderingTool = new renderTool();
	this.anchorPoints = [];
	this.anchorPoints.fill(renderingTool.drawCircle(-100, -100, "anchorpoint"));
	var _this = this;

	for (var i = 0; i < this.coordinateOb.length; i++) {
		if (this.anchorPoints[i] == undefined) {
			this.toolBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			this.toolText = document.createElementNS("http://www.w3.org/2000/svg", "text");


			this.anchorPoints[i] = renderingTool.drawCircle(Math.floor(this.coordinateOb[i].x), Math.floor(this.coordinateOb[i].y), "anchorpoint");


			this.toolBox.setAttribute("height", 20);
			this.toolBox.setAttribute("width", 25);
			this.toolBox.setAttribute("style", "fill:#fed8ca;stroke:brown;stroke-width:1;opacity:0.7");

			this.RenderGraph.appendChild(this.anchorPoints[i]);
			this.hairLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
			this.RenderGraph.addEventListener("mousemove", onMouseMove);
			this.anchorPoints[i].addEventListener("mousemove", onMouseMove);

			function a(j) {

				document.addEventListener('onHighlight', function (event) {
					// var length
					// var temp = (_this.svgColumn[j].getAttribute("width")).trim(0,_this.svgColumn[j].getAttribute("width").length-5);
					// console.log(temp);
					var tempX = ((event.detail.x) % (_this.width + 20)) - 8;
					// console.log(_this.width,tempX);
					_this.hairLine.setAttributeNS(null, "y1", 30);
					_this.hairLine.setAttributeNS(null, "y2", _this.height - 40);
					_this.hairLine.setAttributeNS(null, "x1", tempX);
					_this.hairLine.setAttributeNS(null, "x2", tempX);
					// var xCheck = evt.detail.x - 8;
					_this.hairLine.setAttribute("class", "hairLine");

					_this.RenderGraph.appendChild(_this.hairLine);
					var lowerBoundX = Number(_this.anchorPoints[j].getAttribute("cx"));
					var upperBoundX = Number(_this.anchorPoints[j].getAttribute("cx")) + 12;
					var lowerBoundY = Number(_this.anchorPoints[j].getAttribute("cy")) - 6;
					var upperBoundY = Number(_this.anchorPoints[j].getAttribute("cy")) + 6;
					// console.log(lowerBound,upperBound);
					// var tempX=((event.detail.x)%(_this.width+20)); 
					var tempY = (event.detail.y - 110); //%(_this.height));
					// console.log(tempY,Number(anchorPoints[j].getAttribute("cy")))

					if (tempX >= lowerBoundX && tempX <= upperBoundX) {

						// console.log(tempY,_this.anchorPoints[j].getAttribute("cy"));
						// _this.anchorPoints[j].setAttribute("style","fill:white;stroke:#009688;stroke-width:1;opacity:1");
						// _this.anchorPoints[j].setAttribute("fill","black");
						_this.anchorPoints[j].setAttribute("class", "anchorpointHighlight");
						// console.log(tempX,_this.coordinateOb[j].x,"marker");
						_this.toolText.setAttribute("x", upperBoundX + 3);
						_this.toolText.setAttribute("y", lowerBoundY + 15);

						_this.toolText.setAttribute("fill", "brown");
						_this.toolText.setAttribute("font-size", "15px");


						_this.toolBox.setAttribute("x", upperBoundX);
						_this.toolBox.setAttribute("y", lowerBoundY);

						if (tempX >= (_this.coordinateOb[j].x + 8) && tempX <= (_this.coordinateOb[j].x + 12)) {
							// console.log("abc");
							// console.log(_this.coordinateOb[j].y);
							_this.toolText.textContent = _this.dataob[j].value;
							_this.toolText.setAttribute("x", -100)
							_this.toolText.setAttribute("y", -100);
							_this.toolBox.setAttribute("x", -100);
							_this.toolBox.setAttribute("y", -100);
						}



						_this.RenderGraph.appendChild(_this.toolBox);
						_this.RenderGraph.appendChild(_this.toolText);

					} else {
						// _this.toolText.setAttribute("x",-1);
						_this.anchorPoints[j].setAttribute("class", "anchorpoint");
					}

				}, false);
			}
			a(i);
		}
	}
}
var columnChart = function (ObjectR) {
	//RenderGraph, coordinateOb, dataob, width, height
	this.RenderGraph = ObjectR.svg;
	this.coordinateOb = ObjectR.coordinateOb;
	this.dataob = ObjectR.dataob;
	this.width = ObjectR.width;
	this.height = ObjectR.height;
	this.direction = ObjectR.direction || "vertical";
	this.drawColumns(this.direction);

}

columnChart.prototype.drawColumns = function (direction) {
	var _this = this;
	var lengthTemp = this.coordinateOb.length;
	var widthC, lengthC, X, Y;
	// console.log(lengthTemp);
	this.svgColumn = [];

	for (var i = 0; i < lengthTemp; i++) {


		this.columnWidth = (this.width - 45) / (2 * this.dataob.length - 1);
		this.svgColumn[i] = document.createElementNS("http://www.w3.org/2000/svg", "rect");


		//variable
		if (direction == "vertical") {
			this.svgColumn[i].setAttribute("y", this.coordinateOb[i].y);
			this.svgColumn[i].setAttribute("x", (this.coordinateOb[i].x) - this.columnWidth / 2);
			this.svgColumn[i].setAttribute("height", (this.height - 40) - (this.coordinateOb[i].y));
			this.svgColumn[i].setAttribute("width", 15);
			animateColumn(this.svgColumn[i], "vertical", 200);
			this.svgColumn[i].addEventListener("mousemove", onMouseMove);
			this.svgColumn[i].addEventListener("mouseout", onMouseOut);
		} else {
			this.svgColumn[i].setAttribute("y", this.coordinateOb[i].x);
			this.svgColumn[i].setAttribute("x", 0);
			this.svgColumn[i].setAttribute("width", (this.coordinateOb[i].y * 2.8));
			this.svgColumn[i].setAttribute("height", 15);
			this.svgColumn[i].setAttribute("style", "fill:" + this.coordinateOb[i].color);
			animateColumn(this.svgColumn[i], "horizontal", 850);
		}

		//variable
		this.svgColumn[i].setAttribute("class", "svgColumn");

		this.toolText = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.toolBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.toolBox.setAttribute("height", 20);
		this.toolBox.setAttribute("width", 25);
		this.toolBox.setAttribute("style", "fill:#fed8ca;stroke:brown;stroke-width:1;opacity:0.7");


		// animateColumn(this.svgColumn[i], "vertical", 200);
		this.RenderGraph.appendChild(this.svgColumn[i]);

		function a(j) {


			document.addEventListener('onHighlight', function (event) {
				var lowerBound = Number(_this.svgColumn[j].getAttribute("x"));
				var upperBoundY = _this.coordinateOb[j].y + _this.columnWidth;
				// var length
				// var temp = (_this.svgColumn[j].getAttribute("width")).trim(0,_this.svgColumn[j].getAttribute("width").length-5);
				// console.log(temp);
				var upperBound = lowerBound + _this.columnWidth;
				// console.log(lowerBound,upperBound);
				var tempX = ((event.detail.x) % (_this.width + 20));
				if (tempX >= lowerBound && tempX <= (upperBound + 10)) {
					_this.svgColumn[j].setAttribute("class", "svgColumnHighlight");
					_this.toolText.setAttribute("x", upperBound + 5);
					_this.toolBox.setAttribute("x", upperBound + 5);
					_this.toolText.setAttribute("y", (upperBoundY - 15));
					_this.toolBox.setAttribute("y", (upperBoundY - 30));
					// _this.toolText.setAttribute("fill","brown");
					_this.toolText.setAttribute("font-size", "20px");
					if (tempX >= (_this.coordinateOb[j].x - 6) && tempX <= (_this.coordinateOb[j].x + 24)) {
						// console.log("abc");
						// console.log(_this.coordinateOb[j].y);
						_this.toolText.textContent = _this.dataob[j].value;
						_this.RenderGraph.appendChild(_this.toolBox);
						_this.RenderGraph.appendChild(_this.toolText);

					}

				}

			}, false);


			document.addEventListener('onNormal', function (evt) {
				// console.log(this === document,"abc");
				_this.svgColumn[j].setAttribute("class", "svgColumn");
			}, false);
		}
		a(i);
	}
};
var columnChart = function (ObjectR) {
	//RenderGraph, coordinateOb, dataob, width, height
	this.RenderGraph = ObjectR.svg;
	this.coordinateOb = ObjectR.coordinateOb;
	this.dataob = ObjectR.dataob;
	this.width = ObjectR.width;
	this.height = ObjectR.height;
	this.direction = ObjectR.direction || "vertical";
	this.drawColumns(this.direction);

}

columnChart.prototype.drawColumns = function (direction) {
	var _this = this;
	var lengthTemp = this.coordinateOb.length;
	var widthC, lengthC, X, Y;
	// console.log(lengthTemp);
	this.svgColumn = [];

	for (var i = 0; i < lengthTemp; i++) {


		this.columnWidth = (this.width - 45) / (2 * this.dataob.length - 1);
		this.svgColumn[i] = document.createElementNS("http://www.w3.org/2000/svg", "rect");


		//variable
		if (direction == "vertical") {
			this.svgColumn[i].setAttribute("y", this.coordinateOb[i].y);
			this.svgColumn[i].setAttribute("x", (this.coordinateOb[i].x) - this.columnWidth / 2);
			this.svgColumn[i].setAttribute("height", (this.height - 40) - (this.coordinateOb[i].y));
			this.svgColumn[i].setAttribute("width", 15);
			animateColumn(this.svgColumn[i], "vertical", 200);
			this.svgColumn[i].addEventListener("mousemove", onMouseMove);
			this.svgColumn[i].addEventListener("mouseout", onMouseOut);
		} else {
			this.svgColumn[i].setAttribute("y", this.coordinateOb[i].x);
			this.svgColumn[i].setAttribute("x", 0);
			this.svgColumn[i].setAttribute("width", (this.coordinateOb[i].y * 2.8));
			this.svgColumn[i].setAttribute("height", 15);
			this.svgColumn[i].setAttribute("style", "fill:" + this.coordinateOb[i].color);
			animateColumn(this.svgColumn[i], "horizontal", 850);
		}

		//variable
		this.svgColumn[i].setAttribute("class", "svgColumn");

		this.toolText = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.toolBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.toolBox.setAttribute("height", 20);
		this.toolBox.setAttribute("width", 25);
		this.toolBox.setAttribute("style", "fill:#fed8ca;stroke:brown;stroke-width:1;opacity:0.7");


		// animateColumn(this.svgColumn[i], "vertical", 200);
		this.RenderGraph.appendChild(this.svgColumn[i]);

		function a(j) {


			document.addEventListener('onHighlight', function (event) {
				var lowerBound = Number(_this.svgColumn[j].getAttribute("x"));
				var upperBoundY = _this.coordinateOb[j].y + _this.columnWidth;
				// var length
				// var temp = (_this.svgColumn[j].getAttribute("width")).trim(0,_this.svgColumn[j].getAttribute("width").length-5);
				// console.log(temp);
				var upperBound = lowerBound + _this.columnWidth;
				// console.log(lowerBound,upperBound);
				var tempX = ((event.detail.x) % (_this.width + 20));
				if (tempX >= lowerBound && tempX <= (upperBound + 10)) {
					_this.svgColumn[j].setAttribute("class", "svgColumnHighlight");
					_this.toolText.setAttribute("x", upperBound + 5);
					_this.toolBox.setAttribute("x", upperBound + 5);
					_this.toolText.setAttribute("y", (upperBoundY - 15));
					_this.toolBox.setAttribute("y", (upperBoundY - 30));
					// _this.toolText.setAttribute("fill","brown");
					_this.toolText.setAttribute("font-size", "20px");
					if (tempX >= (_this.coordinateOb[j].x - 6) && tempX <= (_this.coordinateOb[j].x + 24)) {
						// console.log("abc");
						// console.log(_this.coordinateOb[j].y);
						_this.toolText.textContent = _this.dataob[j].value;
						_this.RenderGraph.appendChild(_this.toolBox);
						_this.RenderGraph.appendChild(_this.toolText);

					}

				}

			}, false);


			document.addEventListener('onNormal', function (evt) {
				// console.log(this === document,"abc");
				_this.svgColumn[j].setAttribute("class", "svgColumn");
			}, false);
		}
		a(i);
	}
};
//returns beautified num1 and num2 values considering num1 as min and num2 as max
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
	//returns an array of beautified min and max
	return [opMIN, opMAX];
}

//returns ticks for respective min and max, takes boolean values for
// smart numbers and for shrinking big numbers; and returns an array 
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
	return ticks;
}

//returns color of a column according the ratio of the current value to its max or min,
//within a color range
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

//attaches boundary to svgs, takes in the reference of the svg and 
//boolean value for specifying the position of the boundaries
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

//returns min and max from array of objects, takes in
//the array and the tag for which the min and max has to be scanned
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

//interpolates values between two values,
//takes in the two boundary values and the number of interpolated values
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

//animates svg bottom-to-top or right-to-left
//takes in reference of the svg, direction of 
function animateColumn(column, direction, duration) {

	var XY;
	if (direction.toLowerCase() == "vertical") {
		direction = "height";
		XY = 'y';
	} else if (direction.toLowerCase() == "horizontal") {
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
			if (direction.toLowerCase() == "height") {
				column.setAttribute(XY, (Y + (200 - j) * div));

			}
			column.setAttribute(direction, j * div);

		}
		setTimeout(a.bind(this, i), duration * i);
	}

	//returns the reference column with animation
	return column;
}
//returns beautified num1 and num2 values considering num1 as min and num2 as max
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
	//returns an array of beautified min and max
	return [opMIN, opMAX];
}

//returns ticks for respective min and max, takes boolean values for
// smart numbers and for shrinking big numbers; and returns an array 
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
	return ticks;
}

//returns color of a column according the ratio of the current value to its max or min,
//within a color range
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

//attaches boundary to svgs, takes in the reference of the svg and 
//boolean value for specifying the position of the boundaries
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

//returns min and max from array of objects, takes in
//the array and the tag for which the min and max has to be scanned
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

//interpolates values between two values,
//takes in the two boundary values and the number of interpolated values
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

//animates svg bottom-to-top or right-to-left
//takes in reference of the svg, direction of 
function animateColumn(column, direction, duration) {

	var XY;
	if (direction.toLowerCase() == "vertical") {
		direction = "height";
		XY = 'y';
	} else if (direction.toLowerCase() == "horizontal") {
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
			if (direction.toLowerCase() == "height") {
				column.setAttribute(XY, (Y + (200 - j) * div));

			}
			column.setAttribute(direction, j * div);

		}
		setTimeout(a.bind(this, i), duration * i);
	}

	//returns the reference column with animation
	return column;
}
var crossChartTable = function (RenderGraph, productType, productSeq) //,coordinateOb,dataob,width,height,productSeq)
	{

		this.productSeq = productSeq;
		this.RenderGraph = RenderGraph;
		this.productType = productType;
		// this.coordinateOb = coordinateOb;
		// this.dataob = dataob;
		// this.width = width;
		// this.height = height;
		this.drawColumns();

	}

crossChartTable.prototype.drawColumns = function () {

	var textType = document.createElementNS("http://www.w3.org/2000/svg", "text");
	textType.setAttribute("x", 50);
	textType.setAttribute("y", 25);
	textType.setAttribute("fill", "black");
	textType.setAttribute("font-family", "Verdana");
	textType.setAttribute("size", "20px");
	textType.textContent = this.productType;
	this.RenderGraph.appendChild(textType);


	var yCarry = 25;
	for (var i = 0; i < this.productSeq.length; i++) {
		var textProduct = document.createElementNS("http://www.w3.org/2000/svg", "text");
		textProduct.setAttribute("x", 150);
		textProduct.setAttribute("fill", "black");
		textProduct.setAttribute("font-family", "Verdana");
		textProduct.setAttribute("size", "20px");
		textProduct.setAttribute("y", yCarry);
		yCarry += 35;
		textProduct.textContent = this.productSeq[i];
		this.RenderGraph.appendChild(textProduct);

	}

};
var crossChartTable = function (RenderGraph, productType, productSeq) //,coordinateOb,dataob,width,height,productSeq)
	{

		this.productSeq = productSeq;
		this.RenderGraph = RenderGraph;
		this.productType = productType;
		// this.coordinateOb = coordinateOb;
		// this.dataob = dataob;
		// this.width = width;
		// this.height = height;
		this.drawColumns();

	}

crossChartTable.prototype.drawColumns = function () {

	var textType = document.createElementNS("http://www.w3.org/2000/svg", "text");
	textType.setAttribute("x", 50);
	textType.setAttribute("y", 25);
	textType.setAttribute("fill", "black");
	textType.setAttribute("font-family", "Verdana");
	textType.setAttribute("size", "20px");
	textType.textContent = this.productType;
	this.RenderGraph.appendChild(textType);


	var yCarry = 25;
	for (var i = 0; i < this.productSeq.length; i++) {
		var textProduct = document.createElementNS("http://www.w3.org/2000/svg", "text");
		textProduct.setAttribute("x", 150);
		textProduct.setAttribute("fill", "black");
		textProduct.setAttribute("font-family", "Verdana");
		textProduct.setAttribute("size", "20px");
		textProduct.setAttribute("y", yCarry);
		yCarry += 35;
		textProduct.textContent = this.productSeq[i];
		this.RenderGraph.appendChild(textProduct);

	}

};
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
		animateColumn(columns, "horizantal", 850);
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
		animateColumn(columns, "horizantal", 850);
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

