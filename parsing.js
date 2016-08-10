var parsingDataset = function(dataset){  //parser()
		// this.optimizedTick=[];
		this.dataset = dataset;
		this.dataob={};
		this.getWindowSize();
		this.dataParse();
		this.chartParse();    
		this.orderingData();
		this.minmax();
		this.tickMaker();
		this.evokingRender();
};

parsingDataset.prototype.dataParse = function(){

		var objData = this.dataset.data;
		for(var i in objData)
		{
			 var oBuffer = objData[i];
			 var time;
			 for(var j in oBuffer) 
			 {
					 var oBufferAttribute=oBuffer[j];
					 if(j=='time')
					 {
								time = oBufferAttribute;
					 }
					 else
					 {
								if(this.dataob[j]==undefined)
								{
									this.dataob[j]=[];
									this.dataob[j].push({time:time,value:oBufferAttribute});
								}
								else
								{
									this.dataob[j].push({time:time,value:oBufferAttribute});
								}
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
					this.height = objChart[i];
			 }
			 else if(i=='width')
			 {
					this.width = objChart[i];
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
					document.getElementById("caption").innerHTML=objChart[i];
			 }
			 else if(i=='subcaption')
			 {
					document.getElementById("subcaption").innerHTML=objChart[i];
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
			}
			for(var i=0;i<average.length;i++)
			{
				tempDataOb[(average[i].key)]=this.dataob[average[i].key];
			}
			this.dataob=tempDataOb;
}

parsingDataset.prototype.minmax = function(){

		var length=Object.keys(this.dataob).length;
		this.max=Array(length).fill(-1*(1/0));
		this.min=Array(length).fill(1/0);
		var count=0;
		for(var i in this.dataob)
		{
				var kx=this.dataob[i];
				for(var m in kx)
				{
						var value=kx[m].value;
						var time = kx[m].time;
						if(value>this.max[count])
						{
								this.max[count]=value;
						}
						if(value<this.min[count])
						{
								this.min[count]=value;
						} 
				} 
				count++; 
		}
};

parsingDataset.prototype.getWindowSize = function(){
   var d= document, root= d.documentElement, body= d.body;
   this.wid= window.innerWidth || root.clientWidth || body.clientWidth;
   this.numberOfAxisTick = this.wid/this.width;
}

parsingDataset.prototype.evokingRender=function(){

		var count =0;
		var length = (this.max).length;
		console.log("test",Math.floor(this.wid/this.width));
		for(var i in this.dataob)
		{
			console.log(length-count,"mark");
			if(length-count < Math.floor(this.wid/this.width))
				this.dataRender = new renderGraph(this.dataob[i], i ,this.height, this.width, this.optimizedTick[count++],null,this.chartType,1);
			else
				this.dataRender = new renderGraph(this.dataob[i], i ,this.height, this.width, this.optimizedTick[count++],null,this.chartType,0);
		}

}

parsingDataset.prototype.tickMaker = function(){

		this.optimizedTick = [];
		for(var i=0;i<this.max.length;i++)
		{
				var bufferMax = this.max[i];//opMax;
				var bufferMin = this.min[i];//opMin;
				this.optimizedTick.push(tickGenerator(bufferMin,bufferMax,true));
		}
};