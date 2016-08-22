var columnChart = function (ObjectR) {
	//RenderGraph, coordinateOb, dataob, width, height
	this.RenderGraph = ObjectR.svg;
	this.coordinateOb = ObjectR.coordinateOb;
	this.dataob = ObjectR.dataob;
	this.width = ObjectR.width;
	this.height = ObjectR.height;
	this.drawColumns("horizontal");

}

columnChart.prototype.drawColumns = function (direction) {
	var _this = this;
	var lengthTemp = this.coordinateOb.length;
	var widthC, lengthC, X, Y;
	// console.log(lengthTemp);
	this.svgColumn = [];

	for (var i = 0; i < lengthTemp; i++) {
		this.toolBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.toolText = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.columnWidth = (this.width - 45) / (2 * this.dataob.length - 1);
		this.svgColumn[i] = document.createElementNS("http://www.w3.org/2000/svg", "rect");


		//variable
		if (direction == "vertical") {
			this.svgColumn[i].setAttribute("y", this.coordinateOb[i].y);
			this.svgColumn[i].setAttribute("x", (this.coordinateOb[i].x) - this.columnWidth / 2);
			this.svgColumn[i].setAttribute("height", (this.height - 40) - (this.coordinateOb[i].y));
			this.svgColumn[i].setAttribute("width", 15);
			animateColumn(this.svgColumn[i], "vertical", 200);
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

		this.toolBox.setAttribute("height", 20);
		this.toolBox.setAttribute("width", 25);
		this.toolBox.setAttribute("style", "fill:#fed8ca;stroke:brown;stroke-width:1;opacity:0.7");
		this.svgColumn[i].addEventListener("mousemove", onMouseMove);
		this.svgColumn[i].addEventListener("mouseout", onMouseOut);

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