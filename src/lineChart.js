var lineChart = function (RenderGraph, coordinateOb, dataob, pathString, width, height) {

	this.RenderGraph = RenderGraph;
	this.coordinateOb = coordinateOb;
	this.dataob = dataob;
	this.pathString = pathString;
	this.width = width;
	this.height = height;
	this.drawPath();


}

lineChart.prototype.drawPath = function () {

	var _this = this;
	var renderingTool = new renderTool();
	var bufferPath = "";
	var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
	var svgLine = renderingTool.drawPath("", "line-graph");
	var buffer;
	this.RenderGraph.appendChild(svgLine);
	for (var i in this.pathString.split(" ")) {

		function a(j) {
			buffer = (_this.pathString.split(" ")[j]);
			bufferPath += buffer + " ";
			svgLine.setAttribute("d", bufferPath);
		}
		setTimeout(a.bind(this, i), 200 * i);

	}

	this.drawAnchorPoints();
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