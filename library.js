var parsingDataset = function(dataset){  //parser()
    this.optimizedTick=[];
    var obj = dataset.data;
    var objChart = dataset.chart;
    console.log(objChart);
    var dataob={};
    var height;
    var width;

    for(var i in obj)
    {
       var oBuffer = obj[i];
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
                if(dataob[j]==undefined)
                {
                  dataob[j]=[];
                  dataob[j].push({time:time,value:oBufferAttribute});
                }
                else
                {
                  dataob[j].push({time:time,value:oBufferAttribute});
                }
           }
       }
    }
    this.dataob = dataob;

    for(var i in objChart)
    {
       // var oBuffer = objChart[i];
       // var oBufferAttribute=oBuffer[j];
       if(i=='height')
       {
          height = objChart[i];
       }
       else if(i=='width')
       {
          width = objChart[i];
       }
       
    }
    this.height = height;
    this.width = width;
    this.minmax();
    this.rangeOptimizer();
    this.tickGenerator();
};

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
            var value=kx[m].value;
            var time = kx[m].time;
            // date.push(time2);
            //console.log(time);
            // value.push(value2);
            //coordinateCalculationX(time2,value2,counter2++);
            if(value>this.max[count])
            {
                this.max[count]=value;
            }
            if(value<this.min[count])
            {
                this.min[count]=value;
            } 
            //coordinateCalculationX(time2,value2);
            // var objSend=[];objSend[0]=optimizerRange(min[count],max[count]);objSend[1]=(value2);
            //        coordinateCalculationY(objSend);//,optimizerRange(min[count],max[count]));
        } 
        // minPass=min[count];
        // maxPass=max[count];
        count++; 
    }
};
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
};

parsingDataset.prototype.tickGenerator = function(){

    for(var i=0;i<this.max.length;i++)
    {

        //var MINIMUM = this.minOptmimized;// opMin;
        var bufferMax = this.maxOptimized[i];//opMax;
        var bufferMin = this.minOptimized[i];//opMin;
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
        
        counter = this.minOptimized[i];
        ticks.push(counter);
        while(counter<this.maxOptimized[i])
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
var renderGraph=function(data,chartHeight,chartWidth,tickob){

      this.dataob = data;
      this.height = chartHeight+70;
      this.width = chartWidth+45;
      // this.width = this.width+45;
      // this.height = this.height+50;
      // this.xTickTimes = xTickTimes;
      // this.yTickTimes = yTickTimes;
      // this.tickob = [];
      this.tickob=tickob;
      this.numberOfGraph = Object.keys(this.dataob).length;
      this.currentIteration=0;
      var numberOfInterations = this.numberOfGraph;
      this.coordinateCalculation();
      this.pathStringBuilder();
      for(var i=0;i<numberOfInterations;i++)
      {
          this.currentIteration=i+1;
          this.axisPlot();
      }  
      

};

renderGraph.prototype.axisPlot=function()
{
      //console.log(this.tickob[this.currentIteration-1]);

//----declaring svg----    
      
      var svgCanvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      // svgCanvas.setAttributeNS(null,"id","svgC"+count);
      svgCanvas.setAttribute("class","svgGraph");
      svgCanvas.setAttributeNS(null,"width",this.width+20 );
      svgCanvas.setAttributeNS(null,"height",this.height);
      document.getElementById("container").appendChild(svgCanvas);
//----svg created----

//----rendering y-axis----
      var svgAxisY = document.createElementNS("http://www.w3.org/2000/svg", "line");
      svgAxisY.setAttributeNS(null,"x1","45");
      svgAxisY.setAttributeNS(null,"x2","45");
      svgAxisY.setAttributeNS(null,"y1","30");
      svgAxisY.setAttributeNS(null,"y2",(this.height-40));
      svgAxisY.setAttribute("class","svgAxis");
      //svgAxisY.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:0.5");
      svgCanvas.appendChild(svgAxisY);
//----y-axis rendered----

//----rendering x-axis----
      var svgAxisX = document.createElementNS("http://www.w3.org/2000/svg", "line");
      svgAxisX.setAttributeNS(null,"y1",(this.height-40));
      svgAxisX.setAttributeNS(null,"y2",(this.height-40));
      svgAxisX.setAttributeNS(null,"x1","45");
      svgAxisX.setAttributeNS(null,"x2",(this.width));
      svgAxisX.setAttribute("class","svgAxis");
      svgCanvas.appendChild(svgAxisX);
//----x-axis rendered----

//----append chart labels----
      var labelRect = document.createElementNS("http://www.w3.org/2000/svg","rect");
      labelRect.setAttribute("x",45);
      labelRect.setAttribute("y",0);
      labelRect.setAttribute("width",this.width-45);
      labelRect.setAttribute("height",30)
      svgCanvas.appendChild(labelRect);



      var labelY=document.createElementNS("http://www.w3.org/2000/svg", "text");
      labelY.setAttributeNS(null,"x",45+(this.width-45)/2);
      labelY.setAttributeNS(null,"y",20);
      labelY.setAttributeNS(null,"text-anchor","middle");
      labelY.setAttributeNS(null,"fill","white");
      labelY.textContent="Demo Label";
      // labelY.setAttribute("transform","rotate(270 40,"+(height/2 + 50)+")" );
      labelY.setAttributeNS(null,"font-family","Verdana");
      svgCanvas.appendChild(labelY);
//----chart labels appended----

//----add ticks to axes----
      //----Y-axis----
      var tickArray = this.tickob[this.currentIteration-1];
      for(var i=0;i<tickArray.length;i++)
      {
          var svgAxisTickY = document.createElementNS("http://www.w3.org/2000/svg", "line");
          svgAxisTickY.setAttributeNS(null,"x1","42");
          svgAxisTickY.setAttributeNS(null,"x2","45");
          var div = (this.height-70)/(tickArray.length-1);
          svgAxisTickY.setAttributeNS(null,"y1",((this.height-40)-div*(i)));
          svgAxisTickY.setAttributeNS(null,"y2",((this.height-40)-div*(i)));
          svgAxisTickY.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:1.5");
          svgCanvas.appendChild(svgAxisTickY);


          var svgTickLineY = document.createElementNS("http://www.w3.org/2000/svg", "line");
          svgTickLineY.setAttributeNS(null,"x1","45");
          svgTickLineY.setAttributeNS(null,"x2",this.width);
          svgTickLineY.setAttributeNS(null,"y1",((this.height-40)-div*(i)));
          svgTickLineY.setAttributeNS(null,"y2",(this.height-40-div*(i)));
          svgTickLineY.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:0.3");
          svgCanvas.appendChild(svgTickLineY);


          var TicksY=document.createElementNS("http://www.w3.org/2000/svg", "text");
          TicksY.setAttributeNS(null,"x",40);
          TicksY.setAttributeNS(null,"y",((this.height-40)-div*(i)));
          TicksY.setAttributeNS(null,"fill","black");
          TicksY.setAttributeNS(null,"text-anchor","end");
          TicksY.setAttributeNS(null,"dominant-baseline","central");
          TicksY.setAttributeNS(null,"font-family","Verdana");
          TicksY.textContent=""+tickArray[i];
          svgCanvas.appendChild(TicksY);
      }
      //----Y-axis----

      //----X-axis----
      for(var j=0;j<11;j++)
      {
          // var svgAxisTickX = document.createElementNS("http://www.w3.org/2000/svg", "line");
          // svgAxisTickX.setAttributeNS(null,"y1",(height-15));
          // svgAxisTickX.setAttributeNS(null,"y2",(height-20));
          // svgAxisTickX.setAttributeNS(null,"x1",100+(div*(j+1)));
          // svgAxisTickX.setAttributeNS(null,"x2",100+(div*(j+1)));
          // svgAxisTickX.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:2");
          // svgCanvas.appendChild(svgAxisTickX);

          var TicksX=document.createElementNS("http://www.w3.org/2000/svg", "text");
          var div = (this.width-50)/10;
          TicksX.setAttributeNS(null,"x",45+(div*j));
          TicksX.setAttributeNS(null,"y",this.height-40);
          TicksX.setAttributeNS(null,"fill","black");
          TicksX.textContent=((20+j)+"-06");
          TicksX.setAttributeNS(null,"dominant-baseline","text-after-edge");
          TicksX.setAttribute("transform","rotate(90 "+ (45+(div*j)) +","+(this.height-40)+")" );
          TicksX.setAttributeNS(null,"font-family","Verdana");
          svgCanvas.appendChild(TicksX);

      }
      //----X-axis----
//----ticks added to axes----

//----rendering line----

      // var svgPath = document.createElementNS("http://www.w3.org/2000/svg","path");
      // svgPath.setAttributeNS(null,"stroke","#009688");
      // svgPath.setAttributeNS(null,"fill","none");
      // svgPath.setAttributeNS(null,"stroke-width","7");
      // svgPath.setAttributeNS(null,"d",pathString);
      // svgPath.textContent = "SVG PATH";
      // //console.log(pathString);
      // sgvTempo = svgCanvas[count];
      // svgCanvas.appendChild(svgPath);


};

renderGraph.prototype.coordinateCalculation=function(){
      var count = 0;
      this.coordinateOb=[];
      console.log(this.tickob);


      for(var i in this.dataob){
        var tempObj = this.dataob[i];
        var tempTickObj = this.tickob[count];
        var bufferCoordinateOb=[];
        for(var j in tempObj){
              var a = tempTickObj[0];
              var b = tempTickObj[tempTickObj.length-1];
              var c = 30;
              var d = this.height-40;
              var y = tempObj[j].value;
              var yCoordinate = d-(((y-a)/(b-a))*(d-c));
              // console.log(tempObj[j].value+"-->"+yCoordinate);



              var bufferX = ((tempObj[j].time+"").substring(0,2))%20;
              var xCoordinate = Math.floor(45+(((this.width-45)/10)*bufferX));//+(0.1*wh[0]);
              console.log(tempObj[j].time+"-->"+xCoordinate);

              
              bufferCoordinateOb.push({x:xCoordinate,y:yCoordinate});
              
        }
        //console.log(bufferCoordinateOb);
        this.coordinateOb.push(bufferCoordinateOb);
        count++;
      }
};

renderGraph.prototype.pathStringBuilder = function(){

      this.pathString = [];
      for(var i in this.coordinateOb)
      {
          var bufferArray = this.coordinateOb[i];
          var coordinate = 'M ';
          for(var j in bufferArray)
          {
              
              var bufferObject = bufferArray[j];
              coordinate=coordinate+(bufferObject.x+","+bufferObject.y+" L ");

              // console.log(bufferObject);
          }
          var keyBuffer = Object.keys(this.dataob)[i];
          this.pathString.push({key:keyBuffer,path:coordinate});
          console.log(keyBuffer);
      }

};