var parsingDataset = function(dataset){  //parser()
		// this.optimizedTick=[];
		this.dataset = dataset;
		this.dataob={};
		this.getWindowSize();
		this.dataParse();
		this.chartParse();    
		this.fillUps();
		// this.orderingData();
		this.minmax();
		// this.rangeOptimizer();
		// this.tickGenerator();
		// this.svgPlot();
		this.evokingRender();
		// this.height = (this.dataset.data.length)*50 + 50;//Number(chartHeight)+70;
  //     	this.width = 100;//Number(chartWidth)+65;
};

parsingDataset.prototype.svgPlot=function(dataCarr){

      var renderingTool= new renderTool();
      var height = this.height;
      console.log("dataCarr",Object.keys(dataCarr));
      dataCarr = Object.keys(dataCarr).length;
      console.log("dataCarr length",dataCarr);
      this.svgCanvas = renderingTool.drawSVG(280,dataCarr*37.5,"svgGraph");
      document.getElementById("container").appendChild(this.svgCanvas);
      return this.svgCanvas;
}

parsingDataset.prototype.dataParse = function(){

		var objData = this.dataset.data;
		
		for(var i in objData)
		{
			 var oBuffer = objData[i];
			 var product_type;
			 
			 for(var j in oBuffer) 
			 {
			 	var oBufferAttribute;
			 	if(j != "values")
			 	{	
			 		product_type=oBuffer[j];// console.log("Product Type:"+oBuffer[j]);
			 		this.dataob[product_type] = {};
			 	}
			 	else
			 	{
					oBufferAttribute=oBuffer[j];
					var count=0;
					for(var k in oBufferAttribute)
					{
						// console.log(oBufferAttribute[k].zone);
						var sosTotal = 0;var sopTotal=0;
						for(var l in oBufferAttribute[k].zoneValues)
						{
							oBufferAttribute[k].zoneValues[l].sos = Number(oBufferAttribute[k].zoneValues[l].sos);
							sosTotal +=Number(oBufferAttribute[k].zoneValues[l].sos);
							var temp = (oBufferAttribute[k].zoneValues[l].sop);
							if(Number(oBufferAttribute[k].zoneValues[l].sop) == NaN)
							{

								temp = temp.replace("(","");
								temp = temp.replace(")","");
								temp = Number(temp);
								oBufferAttribute[k].zoneValues[l].sop = temp;//Number(-temp);
								// console.log(temp);
								// sopTotal -= temp;
							}
							else
							{
								sopTotal += Number(temp);
								// console.log("profit");
								oBufferAttribute[k].zoneValues[l].sop = (temp);
							}
							

						}
						oBufferAttribute[k].zoneValues.push({"product":"Total","sos":sosTotal+"","sop":sopTotal+""});
						// console.log("SoS Total:->"+sosTotal);
						// console.log("SoP Total:_>"+sopTotal);
						// console.log("Here:->",Object.keys(productArray));

						this.dataob[product_type][count++]=(oBufferAttribute[k].zoneValues);
					}
			 	}
					 
			 }

		}
		this.productArray = {};

		for(var i in objData)
		{
			 var oBuffer = objData[i];
			 var product_type;
			 
			 for(var j in oBuffer) 
			 {
			 	var oBufferAttribute;
				var productType;
			 	if(j != "values")
			 	{	
			 		productType=oBuffer[j]
			 		console.log("Product Type:"+productType);
			 		this.productArray[productType] = {};
				}
			 	else
			 	{
					oBufferAttribute=oBuffer[j];
					
					for(var k in oBufferAttribute)
					{
						
						console.log(oBufferAttribute[k].zone);
						var sosTotal = 0;var sopTotal=0;

						for(var l in oBufferAttribute[k].zoneValues)
						{
							if(this.productArray[productType][oBufferAttribute[k].zoneValues[l].product] == undefined && oBufferAttribute[k].zoneValues[l].product!="Total")
							{
								this.productArray[productType][oBufferAttribute[k].zoneValues[l].product]=1;
							}

						}
						this.productArray[productType]["Total"] = 1;
					}
					console.log("Here:->",Object.keys(this.productArray[productType]));
			 	}
					 
			 }
		}




		// console.log(Object.keys(this.productArray));
		// console.log(objData);
		// this.dataob = objData;
}

parsingDataset.prototype.fillUps = function()
{

	var productTypeArray = (Object.keys(this.productArray));
	var count = 0;
	for(var i in this.dataob)
	{
		// console.log(this.dataob[i].product_type);
		var tempDataobObj = this.dataob[i];
		// console.log(tempDataobObj);
		
		var temp = this.productArray[productTypeArray[count++]];
		temp = temp || {};
		for(var j in tempDataobObj)
		{
			
			var productArray = (Object.keys(temp));
			for(var k in tempDataobObj[j])
			{
				
				// console.log(productArray);
				// console.log(tempDataobObj[j][k].product+"");

				productArray = productArray.filter(function(val) {
				 return [tempDataobObj[j][k].product+""].indexOf(val) == -1;
				});
				
			}
			if(productArray.length != 0)
			{
				console.log(productArray);
				for(var q in productArray)
				{
					this.dataob[i][j].push({"product":productArray[q]+"","sos":"0","sop":0});
					// console.log(this.dataob[i][j]);
				}
			}

			for(var z in tempDataobObj[j])
			{
				console.log("unsorted::",tempDataobObj[j][z]);

			}
			tempDataobObj[j].sort(function(a, b){
					if(a.product === "Total"){
						return 1;
					}
					if(b.product === "Total"){
						return -1;
					}
				    return a.product > b.product;
				});
			console.log("===============================================");

			for(var z in tempDataobObj[j])
			{
				console.log("sorted::",tempDataobObj[j][z]);

			}


		}

		

	}




}


parsingDataset.prototype.chartParse = function(){

		var objChart = this.dataset.chart;
		for(var i in objChart)
		{
			 // var oBuffer = objChart[i];
			 // var oBufferAttribute=oBuffer[j];
			 if(i=='height')
			 {
					this.height = Number(objChart[i]);
			 }
			 else if(i=='width')
			 {
					this.width = Number(objChart[i]);
			 }
			 else if(i=='chartType')
			 {
					this.chartType = objChart[i];
			 }
			 else if(i=='ordering')
			 {
					this.ordering = objChart[i];
			 }
			 else if(i=='caption')
			 {
					// document.getElementById("caption").innerHTML=objChart[i];
			 }
			 else if(i=='subcaption')
			 {
					// document.getElementById("subcaption").innerHTML=objChart[i];
			 }
			 
		}
}

parsingDataset.prototype.orderingData = function(){
			var totalValue;
			var average = [];
			var count = 0;
			var tempDataOb={};
			for(var i in this.dataob)
			{
				var tempObj = this.dataob[i];
				totalValue=0;
				for(var j in tempObj)
				{
					totalValue+=tempObj[j].value;
				}
				average.push({key:i,average:(totalValue/j)});
					
				count++;
			}
			this.average=average;

			var temp={};
			for(var i in average)
			{
				for(var j=i;j<average.length;j++)
				{
					if(average[i].average>average[j].average && this.ordering=="ascending")
					{
						temp = average[i];
						average[i] = average[j];
						average[j] = temp;
					}
					else if(average[i].average<average[j].average && this.ordering=="descending")
					{
						temp = average[i];
						average[i] = average[j];
						average[j] = temp;
					}
					else  if(this.ordering=="default")
						break;
				}
				// console.log(average[i].key,dataob[average[i].key]);
				
			}
			// console.log(average);
			// console.log(tempDataOb);
			for(var i=0;i<average.length;i++)
			{
				// console.log(average[i].key);
				// console.log(this.dataob[average[i].key]);
				tempDataOb[(average[i].key)]=this.dataob[average[i].key];
			}
			this.dataob=tempDataOb;
}

parsingDataset.prototype.minmax = function(){

		var length=Object.keys(this.dataob).length;
		this.max=Array(length).fill(-1*(1/0));
		this.min=Array(length).fill(1/0);
		var count=0;
		// var date=[];
		// var value=[];
		// var minPass;
		// var maxPass;

		for(var i in this.dataob)
		{
				var kx=this.dataob[i];
				//console.log(i);
				for(var m in kx)
				{
						var sos=kx[m].sos;
						// var time = kx[m].time;
						// date.push(time2);
						//console.log(time);
						// value.push(value2);
						//coordinateCalculationX(time2,value2,counter2++);
						if(sos>this.max[count])
						{
								this.max[count]=sos;
						}
						if(sos<this.min[count])
						{
								this.min[count]=sos;
						} 
						//coordinateCalculationX(time2,value2);
						// var objSend=[];objSend[0]=optimizerRange(min[count],max[count]);objSend[1]=(value2);
						//        coordinateCalculationY(objSend);//,optimizerRange(min[count],max[count]));
				} 
				// minPass=min[count];
				// maxPass=max[count];

				count++; 
		}
		// console.log(this.max);
};

parsingDataset.prototype.getWindowSize = function(){
   var d= document, root= d.documentElement, body= d.body;
   this.wid= window.innerWidth || root.clientWidth || body.clientWidth;
   this.numberOfAxisTick = this.wid/this.width;
   // hi= window.innerHeight || root.clientHeight || body.clientHeight ;
   // return [wid,hi]
}



parsingDataset.prototype.rangeOptimizer = function()
{
			this.minOptimized=[];
			this.maxOptimized=[];
			var length = this.min.length;
			var bufferMin,bufferMax;
			// var minARRAY=[];
			// var maxARRAY=[];
			var bufferArray=[];
			for(var i=0;i<length;i++)
			{
				bufferMin = this.min[i];
				bufferMax = this.max[i];
				var opMAX=0,opMIN=0;
				var noDig=0;
				var buffer = bufferMax - bufferMin;
				var diff = bufferMax - bufferMin;
				var newBeautyN = 0;
				while(buffer > 0)
				{
						buffer = Math.floor(buffer/10);
						noDig=noDig+1;
				}
				var beautyN = 5*Math.pow(10,(noDig-2));

				//=====MIN===== 

				opMIN = beautyN*(Math.floor(bufferMin/beautyN));
				this.minOptimized.push(opMIN);
				//minARRAY.push(opMIN);
				//=============
				//=====MAX===== 

				if((diff/bufferMax) < 0.1)
				{
						noDig = 0;
						buffer = bufferMin;
						while(buffer != 0)
						{   
								buffer = Math.floor(buffer/10);
								noDig++;
						}
						newBeautyN = 5*Math.pow(10,(noDig-2));
						if(beautyN<newBeautyN)
						{
								beautyN = newBeautyN;
						}
				}
				opMAX = beautyN*(Math.ceil(bufferMax/beautyN));

				
				this.maxOptimized.push(opMAX);
				//bufferArray = optimizerTick(opMIN,opMAX);
				//optimizedTick.push(bufferArray);
			}
			this.max = this.maxOptimized;
			this.min = this.minOptimized;
};

parsingDataset.prototype.evokingRender=function(){

		var count =0;
		var length = (this.max).length;
		// console.log("test",Math.floor(this.wid/this.width));
		this.optimizedTick =[];
		for(var i in this.dataob)
		{

			// this.productArray[this.productArray.length] = ""
			console.log("productArray:>"+Object.keys(this.productArray[i]));
			var renderingTool = new renderTool();
			var svgCanvas = this.svgPlot(this.productArray[i]);
			this.crosschartTable = new crossChartTable(svgCanvas,i,Object.keys(this.productArray[i]));
			for(var j in this.dataob[i])
			{
				// this.optimizedTick[count+1] ={};
				// console.log(length-count,"mark");
				// if(length-count < Math.floor(this.wid/this.width))
				this.dataRender = new renderGraph(this.dataob[i][j], i ,this.height, this.width, this.optimizedTick[count++],this.chartType,1,null,this.productArray[i]);
				// else
					// this.dataRender = new renderGraph(this.dataob[i], i ,this.height, this.width, this.optimizedTick[count++],this.chartType,0);
			}
			var br = document.createElement('br');
			document.getElementById("container").appendChild(br);
		}

}

parsingDataset.prototype.tickGenerator = function(){

		this.optimizedTick = [];
		for(var i=0;i<this.max.length;i++)
		{

				//var MINIMUM = this.minOptmimized;// opMin;
				var bufferMax = this.max[i];//opMax;
				var bufferMin = this.min[i];//opMin;
				var counter = 0;
				var differBuffer = 0;
				var div = 0;
				var ticks = [];
				while(bufferMax>99)
				{
						bufferMax = Math.floor(bufferMax/10);
						counter++;
				}
				bufferMin = Math.floor(bufferMin/(Math.pow(10,counter)));

				differBuffer = bufferMax - bufferMin;

				if (differBuffer > 0 && differBuffer<=1) 
				{
						div = 0.25*(Math.pow(10,counter));
				} else if(differBuffer <=3)
				{
						div = 0.5*(Math.pow(10,counter));
				} else if(differBuffer <= 6)
				{
						div = 1*(Math.pow(10,counter));
				}else if(differBuffer <= 12)
				{
						div = 2*(Math.pow(10,counter));
				}else if(differBuffer <= 20)
				{
						div = 4*(Math.pow(10,counter));
				}else if(differBuffer <= 30)
				{
						div = 5*(Math.pow(10,counter));
				}else if(differBuffer <= 40)
				{
						div = 7*(Math.pow(10,counter));
				}else
				{
						div = 10*(Math.pow(10,counter));
				}
				
				counter = this.min[i];
				ticks.push(counter);
				while(counter<this.max[i])
				{
						counter = counter + div;
						ticks.push(counter);
				}
				var len=ticks.length;
				//noTickG.push(ticks[len-1]-ticks[0] + div);
				//coordinateCalculationY(ticks);    
				//console.log(ticks);
				this.optimizedTick.push(ticks);
		}
};