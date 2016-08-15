var parsingDataset = function (dataset) { //parser()
	// this.optimizedTick=[];
	this.dataset = dataset;
	this.jsonData = [];
	this.jsonData = this.dataset.data;
	this.dataob = {};
	this.getWindowSize();
	this.chartParse();
	if (this.chartType == "line" || this.chartType == "column") {
		this.jsonData = this.detect(this.jsonData, "time");
		this.dataParseLineColumn(this.jsonData);
		this.orderingData();
		this.minmax();
		this.tickMaker();
		this.evokingRender();
	} else if (this.chartType == "crosstab") {
		this.jsonData = this.detect(this.jsonData, "category");
		this.jsonData = this.dataCruncherCrosstab(this.jsonData);
		this.dataParseCrosstab(this.jsonData);
		this.fillUps();
		this.evokingRender();
	}
	console.log(this.jsonData, this.jsonData.length);

};

parsingDataset.prototype.svgPlot = function (dataCarr) {

	var renderingTool = new renderTool();
	var height = this.height;
	console.log("dataCarr", Object.keys(dataCarr));
	dataCarr = Object.keys(dataCarr).length;
	console.log("dataCarr length", dataCarr);
	this.svgCanvas = renderingTool.drawSVG(280, dataCarr * 37.5, "svgGraph");
	document.getElementById("container").appendChild(this.svgCanvas);
	return this.svgCanvas;
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
	this.pureTicks = tickGenerator(0,maxSales,true);
	// console.log("PURE TICKS:::",this.pureTicks);
	this.categories = categories;

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
				console.log(productArray);
				for (var q in productArray) {
					this.dataob[i][j].push({
						"product": productArray[q] + "",
						"sos": "0",
						"sop": 0
					});
				}
			}

			for (var z in tempDataobObj[j]) {
				console.log("unsorted::", tempDataobObj[j][z]);

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
			console.log("===============================================");

			for (var z in tempDataobObj[j]) {
				console.log("sorted::", tempDataobObj[j][z]);
			}

			console.log("-=-=-==-=-=-=-=-==-==-=-==-=-==-=-==-==-=-=-");
		}
	}
}

/*parsingDataset.prototype.evokingRenderCrosstab = function () {

	var count = 0;
	// var length = (this.max).length;

	// console.log("test",Math.floor(this.wid/this.width));
	this.optimizedTick = [];
	this.header();

	for (var i in this.dataob) {

		// this.productArray[this.productArray.length] = ""
		console.log("productArray:>" + Object.keys(this.productArray[i]));
		var renderingTool = new renderTool();
		var svgCanvas = this.svgPlot(this.productArray[i]);
		this.crosschartTable = new crossChartTable(svgCanvas, i, Object.keys(this.productArray[i]), this.maxP, this.minP);
		for (var j in this.dataob[i]) {
			// this.optimizedTick[count+1] ={};
			// console.log(length-count,"mark");
			// if(length-count < Math.floor(this.wid/this.width))
			this.dataRender = new renderGraph(this.dataob[i][j], i, this.height, this.width, this.optimizedTick[count++], this.chartType, 1, null, this.productArray[i], this.colorRange, this.colorRangeLoss);
			// else
			// this.dataRender = new renderGraph(this.dataob[i], i ,this.height, this.width, this.optimizedTick[count++],this.chartType,0);
		}
		var br = document.createElement('br');
		document.getElementById("container").appendChild(br);
	}

	this.footer();
}*/


parsingDataset.prototype.dataParseLineColumn = function (jsonData) {

	var objData = jsonData;
	for (var i in objData) {
		var oBuffer = objData[i];
		var time;
		for (var j in oBuffer) {
			var oBufferAttribute = oBuffer[j];
			if (j == 'time') {
				time = oBufferAttribute;
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

	var objChart = this.dataset.chart;
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
			document.getElementById("caption").innerHTML = objChart[i];
		} else if (i == 'subcaption') {
			document.getElementById("subcaption").innerHTML = objChart[i];
		}

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
			RenderObject.axisName = 1;
			RenderObject.dataObject = this.dataob[i];
			RenderObject.height = this.height;
			RenderObject.width = this.width;
			RenderObject.ticks = this.optimizedTick[count++];
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

		for (var i in this.dataob) {
			RenderObject.dataObject = this.dataob[i];
			RenderObject.height = 37.5 * Object.keys(this.productArray[i]);
			RenderObject.width = 280;
			RenderObject.ticks = this.ticks;
			RenderObject.chart = this.chartType;
			RenderObject.pureTicks = this.pureTicks;
			console.log("PURE TICKS:::",this.pureTicks);
			// this.productArray[this.productArray.length] = ""
			console.log("productArray:>" + Object.keys(this.productArray[i]));
			var renderingTool = new renderTool();
			var svgCanvas = this.svgPlot(this.productArray[i]);
			this.crosschartTable = new crossChartTable(svgCanvas, i, Object.keys(this.productArray[i]), this.maxP, this.minP);
			for (var j in this.dataob[i]) {
				this.optimizedTick[count + 1] = {};
				console.log(length - count, "mark");
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
	// textType.textContent = "Product Type";
	footerSVG.appendChild(textType);



	var textProduct = document.createElementNS("http://www.w3.org/2000/svg", "text");
	textProduct.setAttribute("x", 150);
	textProduct.setAttribute("fill", "black");
	textProduct.setAttribute("font-family", "Verdana");
	textProduct.setAttribute("size", "23px");
	textProduct.setAttribute("y", 30);
	// textProduct.textContent = "Product";
	footerSVG.appendChild(textProduct);
	var zoneX = 330;
	var xTicks = 330;
	for (var i in this.zones) {

		for (var j = 0; j < 5; j++) {
			var textProduct =
				document.createElementNS("http://www.w3.org/2000/svg", "text");
			textProduct.setAttribute("x", (xTicks + 30));
			xTicks += 40;
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
	var zoneX = 330;
	for (var i in this.zones) {
		var textZones = document.createElementNS("http://www.w3.org/2000/svg", "text");
		textZones.setAttribute("x", zoneX);
		zoneX += 220;
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