var parsingDataset = function(dataset){  //parser()
    this.optimizedTick=[];
    var objData = dataset.data;
    var objChart = dataset.chart;
    // console.log(objChart);
    var dataob={};
    var tempDataOb={};
    var height;
    var width;
    
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
       else if(i=='chartType')
       {
          this.chartType = objChart[i];
       }
       else if(i=='ordering')
       {
          this.ordering = objChart[i];
       }
       
    }

    var totalValue;
    var average = [];
    var count = 0;
    for(var i in dataob)
    {
      var tempObj = dataob[i];
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
      console.log(average[i].key);
      console.log(dataob[average[i].key]);
      tempDataOb[(average[i].key)]=dataob[average[i].key];
    }
    dataob = tempDataOb;
    this.dataob=dataob;
    for(var i in dataob)
    {
      console.log(i);
    }

    // console.log(dataob);


    



    this.height = height;
    this.width = width;
    this.minmax();
    this.rangeOptimizer();
    this.tickGenerator();
    var count =0;
    for(var i in this.dataob)
    {
          // console.log(this.dataob[i],i,count);
          this.dataRender = new renderGraph(this.dataob[i], i ,this.height, this.width, this.optimizedTick[count++],this.chartType);  
    }
    

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
var renderGraph=function(data,i,chartHeight,chartWidth,tickob,chartType){

      this.dataob = data;
      this.height = chartHeight+70;
      this.width = chartWidth+65;
      Window.height = this.height
      Window.width = this.width;
      this.axisName = i;
      this.chartType = chartType;
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
      // for(var i=0;i<numberOfInterations;i++)
      // {
          this.currentIteration=i+1;
          this.axisPlot();
          
          // this.drawColumnChart();
      // }  
};




renderGraph.prototype.axisPlot=function()
{
      var _this = this;
      //console.log(this.tickob[this.currentIteration-1]);

//----declaring svg----    
      
      this.svgCanvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      // svgCanvas.setAttributeNS(null,"id","svgC"+count);
      this.svgCanvas.setAttribute("class","svgGraph");
      this.svgCanvas.setAttributeNS(null,"width",this.width+20 );
      this.svgCanvas.setAttributeNS(null,"height",this.height);
      document.getElementById("container").appendChild(this.svgCanvas);

//----svg created----

//----rendering y-axis----
      var svgAxisY = document.createElementNS("http://www.w3.org/2000/svg", "line");
      svgAxisY.setAttributeNS(null,"x1","45");
      svgAxisY.setAttributeNS(null,"x2","45");
      svgAxisY.setAttributeNS(null,"y1","30");
      svgAxisY.setAttributeNS(null,"y2",(this.height-40));
      svgAxisY.setAttribute("class","svgAxis");
      //svgAxisY.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:0.5");
      this.svgCanvas.appendChild(svgAxisY);
//----y-axis rendered----

//----rendering x-axis----
      var svgAxisX = document.createElementNS("http://www.w3.org/2000/svg", "line");
      svgAxisX.setAttributeNS(null,"y1",(this.height-40));
      svgAxisX.setAttributeNS(null,"y2",(this.height-40));
      svgAxisX.setAttributeNS(null,"x1","45");
      svgAxisX.setAttributeNS(null,"x2",(this.width));
      svgAxisX.setAttribute("class","svgAxis");
      this.svgCanvas.appendChild(svgAxisX);
//----x-axis rendered----

//----append chart labels----
      var labelRect = document.createElementNS("http://www.w3.org/2000/svg","rect");
      labelRect.setAttribute("x",40);
      labelRect.setAttribute("y",0);
      labelRect.setAttribute("width",this.width-25);
      labelRect.setAttribute("height",28);
      labelRect.setAttribute("class","labelRectStyle");
      this.svgCanvas.appendChild(labelRect);



      var labelY=document.createElementNS("http://www.w3.org/2000/svg", "text");
      labelY.setAttributeNS(null,"x",45+(this.width-45)/2);
      labelY.setAttributeNS(null,"y",18);
      labelY.setAttribute("class","labelYtext")
      // labelY.setAttributeNS(null,"text-anchor","middle");
      labelY.textContent=""+this.axisName;
      // labelY.setAttributeNS(null,"font-family","Verdana");
      this.svgCanvas.appendChild(labelY); //----chart labels appended----

//----add ticks to axes----
      //----Y-axis----
      var tickArray = this.tickob;
      for(var i=0;i<tickArray.length;i++)
      {
          var svgAxisTickY = document.createElementNS("http://www.w3.org/2000/svg", "line");
          svgAxisTickY.setAttributeNS(null,"x1","42");
          svgAxisTickY.setAttributeNS(null,"x2","45");
          var div = (this.height-70)/(tickArray.length-1);
          svgAxisTickY.setAttributeNS(null,"y1",((this.height-40)-div*(i)));
          svgAxisTickY.setAttributeNS(null,"y2",((this.height-40)-div*(i)));
          svgAxisTickY.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:1.5");

          this.svgCanvas.appendChild(svgAxisTickY);


          var svgTickLineY = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          svgTickLineY.setAttributeNS(null,"x","45");
          // svgTickLineY.setAttributeNS(null,"x2",this.width);
          svgTickLineY.setAttributeNS(null,"y",((this.height-40)-div*(i)));
          // svgTickLineY.setAttributeNS(null,"y2",(this.height-40-div*(i)));
          svgTickLineY.setAttributeNS(null,"height",div)
          svgTickLineY.setAttributeNS(null,"width",this.width-45);
          // svgTickLineY.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:0");
          if(i%2==0 && i!=0)
            svgTickLineY.setAttributeNS(null,"class","svgTickRectEven");
          else
            svgTickLineY.setAttributeNS(null,"class","svgTickRectOdd");
          this.svgCanvas.appendChild(svgTickLineY);


          var TicksY=document.createElementNS("http://www.w3.org/2000/svg", "text");
          TicksY.setAttributeNS(null,"x",40);
          TicksY.setAttributeNS(null,"y",((this.height-40)-div*(i)));
          TicksY.setAttributeNS(null,"fill","black");
          TicksY.setAttributeNS(null,"text-anchor","end");
          TicksY.setAttributeNS(null,"dominant-baseline","central");
          TicksY.setAttributeNS(null,"font-family","Verdana");
          TicksY.textContent=""+tickArray[i];
          this.svgCanvas.appendChild(TicksY);
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
          var div = (this.width-70)/10;
          TicksX.setAttributeNS(null,"x",45+(div*j));
          TicksX.setAttributeNS(null,"y",this.height-40);
          TicksX.setAttributeNS(null,"fill","black");
          TicksX.textContent=((20+j)+"-06");
          TicksX.setAttributeNS(null,"dominant-baseline","text-after-edge");
          TicksX.setAttribute("transform","rotate(90 "+ (45+(div*j)) +","+(this.height-40)+")" );
          TicksX.setAttributeNS(null,"font-family","Verdana");
          this.svgCanvas.appendChild(TicksX);

      }


      if(this.chartType == "line")
      {
          this.drawLineChart(); 
      }
      else if(this.chartType=="column")
      {
          this.drawColumnChart();
      }
      else
      {
          alert("no chart type selected");
      }

      this.mouseDragSelector();
      
};

renderGraph.prototype.mouseDragSelector = function()
{
    var flag;
    var _this = this;
    this.dragBox = document.createElementNS("http://www.w3.org/2000/svg","rect");
    this.svgCanvas.addEventListener("mousedown",function(event){
    flag=1;
    _this.startX = (event.clientX-10) % (_this.width+20);
    _this.startY = (event.clientY-70);
    // _this.dragBox.setAttribute("x",_this.startX);
    // _this.dragBox.setAttribute("y",_this.startY);
    if(_this.chartType == "line")
    {
        _this.svgCanvas.removeChild(_this.hairLine);
    }  
    
    console.log("startX:"+(_this.startX-10)+"startY:"+(_this.startY-70));
  },false);
  this.svgCanvas.addEventListener("mousemove",function(event){
    if(flag==1)
    {
      // console.log("drag   x:"+event.clientX+"    y:"+event.clientY);
      // console.log("startX:"+(_this.startX-10)+"startY:"+(_this.startY-70));
      if(_this.chartType == "line")
      {
          _this.svgCanvas.removeChild(_this.hairLine);
      }
      if(event.clientX > _this.startX && event.clientY > _this.startY){
        _this.dragBox.setAttribute("x",_this.startX);
        _this.dragBox.setAttribute("y",((_this.startY-100)%(_this.height)));
      }else if(event.clientX > _this.startX && event.clientY < _this.startY){
        _this.dragBox.setAttribute("x",_this.startX);
        _this.dragBox.setAttribute("y",((event.clientY-100)%(_this.height)));
      }else if(event.clientX < _this.startX && event.clientY > _this.startY){
        _this.dragBox.setAttribute("y",((_this.startY-100)%(_this.height)));
        _this.dragBox.setAttribute("x",((event.clientX)%(_this.width+20))); 
      }else if(event.clientX < _this.startX && event.clientY < _this.startY){
        _this.dragBox.setAttribute("x",((event.clientX)%(_this.width+20)));
        _this.dragBox.setAttribute("y",((event.clientY-100)%(_this.height)));
      }

      // _this.dragBox.setAttribute("x",_this.startX);
      // _this.dragBox.setAttribute("y",_this.startY);
      _this.dragBox.setAttribute("width",Math.abs(((event.clientX-8)%(_this.width+20)) - _this.startX));
      _this.dragBox.setAttribute("height",Math.abs(event.clientY - _this.startY - 30));
      _this.dragBox.setAttribute("class","selectionBox");
      _this.svgCanvas.appendChild(_this.dragBox);
      _this.endPointX = (event.clientX)  % (_this.width+20);
      _this.endPointY = (event.clientY) %  (_this.height+70);


      
    }

  },false);

  this.svgCanvas.addEventListener("mouseup",function(event){
    if(flag==1)
      

    _this.svgCanvas.removeChild(_this.dragBox);
    if(_this.chartType == "line")
    {
      _this.svgCanvas.appendChild(_this.hairLine);  
    }


    // console.log("endpoint:("+(_this.endPointX-10)+","+(_this.endPointY-70)+")");
    // console.log(_this.coordinateOb);
    // console.log(_this.startY-70);
    // console.log(_this.endPointY);
    flag=0;
  },false);

  this.svgCanvas.addEventListener("mousemove",function(event){
    _this.beginX=(_this.startX-10);
    _this.endX = (_this.endPointX-10);
    _this.beginY = (_this.startY-70);
    _this.endY = (_this.endPointY);
    onSelectBox(_this.beginX,_this.endX,_this.beginY,_this.endY);
  },false);

  document.addEventListener("onSelect",function(event){

    beginX= event.detail.beginX;
    beginY=(event.detail.beginY-20)%(_this.height+70);
    endX=event.detail.endX;
    endY=(event.detail.endY-120)%(_this.height+70);
    // console.log()

    for(var i in _this.coordinateOb)
    {
      var temp = _this.coordinateOb[i];
      if(temp.x>beginX  && temp.x<endX && ((temp.y)%(_this.height+70))>beginY &&  ((temp.y)%(_this.height+70))<endY)
      {
        console.log(_this.height);
        console.log(temp.x,((temp.y+30)%(_this.height+100)));
        // _this.anchorPoints[i].setAttribute("fill","rgb(243,90,90)");
          if(_this.chartType == "line")
          {
              _this.anchorPoints[i].setAttribute("class","anchorpointHighlight");
          }  
          else
          {
              
              _this.svgColumn[i].setAttribute("class","svgColumnHighlight");
          }

      }
    }

  },false);
}

function onSelectBox(beginX,endX,beginY,endY)
{
    // console.log((event.clientX)%Window.width);
    var event = new CustomEvent(
            "onSelect",
            {
              detail: {
                beginX: beginX,
                beginY: beginY,
                endX: endX,
                endY: endY
              },
              bubbles: true,
              cancelable : true
            }
          );
        document.dispatchEvent(event);
};

renderGraph.prototype.drawLineChart=function(){
// ----rendering line----
      var _this = this;
      var svgLine = document.createElementNS("http://www.w3.org/2000/svg","path");
      // svgLine.setAttributeNS(null,"stroke","#000000");
      svgLine.setAttributeNS(null,"fill","none");
      // svgLine.setAttributeNS(null,"stroke-width","1");
      svgLine.setAttribute("class","line-graph");
      svgLine.setAttributeNS(null,"d",this.pathString);
      this.svgCanvas.appendChild(svgLine);

      this.anchorPoints= []; 
      for(var i=0;i<this.coordinateOb.length;i++) {
          if(this.anchorPoints[i]==undefined)     
          {   
              this.toolBox = document.createElementNS("http://www.w3.org/2000/svg","rect");
              this.toolText = document.createElementNS("http://www.w3.org/2000/svg","text");
              this.anchorPoints[i]=document.createElementNS("http://www.w3.org/2000/svg","circle");
              this.anchorPoints[i].setAttribute("cx",Math.floor(this.coordinateOb[i].x));
              this.anchorPoints[i].setAttribute("cy",Math.floor(this.coordinateOb[i].y));
              // console.log(this.coordinateOb[i].x);
              this.anchorPoints[i].setAttribute("class","anchorpoint");
              
              this.toolBox.setAttribute("height",20);
              this.toolBox.setAttribute("width",25);
              this.toolBox.setAttribute("style","fill:#fed8ca;stroke:brown;stroke-width:1;opacity:0.7");
              
              this.svgCanvas.appendChild(this.anchorPoints[i]);
              this.hairLine  = document.createElementNS("http://www.w3.org/2000/svg", "line");
              this.svgCanvas.addEventListener("mousemove",onMouseMove);
              this.anchorPoints[i].addEventListener("mousemove",onMouseMove);
              function a(j){

                  document.addEventListener('onHighlight',function(event){
                        // var length
                        // var temp = (_this.svgColumn[j].getAttribute("width")).trim(0,_this.svgColumn[j].getAttribute("width").length-5);
                        // console.log(temp);
                        var tempX=((event.detail.x)%(_this.width+20))-8;
                        // console.log(_this.width,tempX);
                        _this.hairLine.setAttributeNS(null,"y1",20);
                        _this.hairLine.setAttributeNS(null,"y2",Window.height-20);
                        _this.hairLine.setAttributeNS(null,"x1",tempX);
                        _this.hairLine.setAttributeNS(null,"x2",tempX);
                        // var xCheck = evt.detail.x - 8;
                        _this.hairLine.setAttribute("class","hairLine");

                        _this.svgCanvas.appendChild(_this.hairLine);
                        var lowerBoundX = Number(_this.anchorPoints[j].getAttribute("cx"));
                        var upperBoundX = Number(_this.anchorPoints[j].getAttribute("cx"))+12;
                        var lowerBoundY = Number(_this.anchorPoints[j].getAttribute("cy"))-6;
                        var upperBoundY = Number(_this.anchorPoints[j].getAttribute("cy"))+6;
                        // console.log(lowerBound,upperBound);
                        var tempX=((event.detail.x)%(_this.width+20));
                        var tempY=(event.detail.y-110);//%(_this.height));
                        // console.log(tempY,Number(anchorPoints[j].getAttribute("cy")))

                        if(tempX>=lowerBoundX && tempX<=upperBoundX)
                        {

                            // console.log(tempY,_this.anchorPoints[j].getAttribute("cy"));
                            // _this.anchorPoints[j].setAttribute("style","fill:white;stroke:#009688;stroke-width:1;opacity:1");
                            // _this.anchorPoints[j].setAttribute("fill","black");
                            _this.anchorPoints[j].setAttribute("class","anchorpointHighlight");
                            // console.log(tempX,_this.coordinateOb[j].x,"marker");
                            _this.toolText.setAttribute("x",upperBoundX+3);
                            _this.toolText.setAttribute("y",lowerBoundY+15);
                            if(tempX>=(_this.coordinateOb[j].x+8) && tempX <= (_this.coordinateOb[j].x+12))
                            {
                                  // console.log("abc");
                                  // console.log(_this.coordinateOb[j].y);
                                  _this.toolText.textContent=_this.dataob[j].value; 
                            }

                            
                            _this.toolText.setAttribute("fill","brown");
                            _this.toolText.setAttribute("font-size","15px");


                            _this.toolBox.setAttribute("x",upperBoundX);
                            _this.toolBox.setAttribute("y",lowerBoundY);

                            _this.svgCanvas.appendChild(_this.toolBox);
                            _this.svgCanvas.appendChild(_this.toolText);

                        }
                        else
                        {
                            _this.anchorPoints[j].setAttribute("class","anchorpoint");
                        }
                  
                  },false);


                  
              }
              a(i);
              
          }
      }

};


renderGraph.prototype.drawColumnChart = function(){
      var _this = this;
      var lengthTemp = this.coordinateOb.length;
      // console.log(lengthTemp);
      this.svgColumn=[];
      for(var i=0;i<lengthTemp;i++)
      {
          this.toolBox = document.createElementNS("http://www.w3.org/2000/svg","rect");
          this.toolText = document.createElementNS("http://www.w3.org/2000/svg","text");
          this.columnWidth = (this.width-45)/(2*10-1);
          this.svgColumn[i] = document.createElementNS("http://www.w3.org/2000/svg","rect");
          this.svgColumn[i].setAttribute("x",(this.coordinateOb[i].x)-this.columnWidth/2);
          this.svgColumn[i].setAttribute("y",this.coordinateOb[i].y);
          // this.lowerBound[i] = (this.coordinateOb[i].x)-columnWidth/2;
          // this.upperBound[i] = (this.coordinateOb[i].x)+columnWidth/2;
          this.svgColumn[i].setAttribute("width",this.columnWidth+"px");
          // svgColumn.setAttribute("fill","black");
          this.svgColumn[i].setAttribute("height",(this.height-40)-(this.coordinateOb[i].y));
          // this.svgColumn[i].setAttribute("style","fill:black;stroke:black;stroke-width:1;opacity:1");
          this.svgColumn[i].setAttribute("class","svgColumn");
          
          this.svgCanvas.appendChild(this.svgColumn[i]);

          this.toolBox.setAttribute("height",20);
          this.toolBox.setAttribute("width",25);
          this.toolBox.setAttribute("style","fill:#fed8ca;stroke:brown;stroke-width:1;opacity:0.7");
          this.svgColumn[i].addEventListener("mousemove",onMouseMove);
          this.svgColumn[i].addEventListener("mouseout",onMouseOut);          

          function a(j){

                  document.addEventListener('onHighlight',function(event){
                  var lowerBound = Number(_this.svgColumn[j].getAttribute("x"));
                  var upperBoundY = _this.coordinateOb[j].y+_this.columnWidth;
                  // var length
                  // var temp = (_this.svgColumn[j].getAttribute("width")).trim(0,_this.svgColumn[j].getAttribute("width").length-5);
                  // console.log(temp);
                  var upperBound = lowerBound + _this.columnWidth;
                  // console.log(lowerBound,upperBound);
                  var tempX=((event.detail.x)%(_this.width+20));
                  if(tempX>=lowerBound && tempX<=(upperBound+10) )
                  {
                      _this.svgColumn[j].setAttribute("class","svgColumnHighlight");
                      _this.toolText.setAttribute("x",upperBound+5);
                      _this.toolBox.setAttribute("x",upperBound+5);
                      _this.toolText.setAttribute("y",(upperBoundY-15));
                      _this.toolBox.setAttribute("y",(upperBoundY-30));
                      // _this.toolText.setAttribute("fill","brown");
                      _this.toolText.setAttribute("font-size","20px");
                      if(tempX>=(_this.coordinateOb[j].x-6)  &&  tempX <= (_this.coordinateOb[j].x+24))
                      {
                            console.log("abc");
                            console.log(_this.coordinateOb[j].y);
                            _this.toolText.textContent=_this.dataob[j].value;
                            _this.svgCanvas.appendChild(_this.toolBox);
                            _this.svgCanvas.appendChild(_this.toolText);
                            
                      }
                    
                  }
                  
              },false);


                  document.addEventListener('onNormal',function(evt){
                  // console.log(this === document,"abc");
                    _this.svgColumn[j].setAttribute("class","svgColumn");
                  },false);
          }
          a(i);
      }
};

function onMouseMove(event)
{
    // console.log((event.clientX)%Window.width);
    var event = new CustomEvent(
            "onHighlight",
            {
              detail: {
                x: (event.pageX),
                y: (event.pageY)
              },
              bubbles: true,
              cancelable : true
            }
          );
        document.dispatchEvent(event);
};



function onMouseOut(event)
{
    // console.log((event.clientX)%Window.width);
    var event = new CustomEvent(
            "onNormal",
            {
              detail: {
                x: (event.clientX),
              },
              bubbles: true,
              cancelable : true
            }
          );
        document.dispatchEvent(event);
};


renderGraph.prototype.coordinateCalculation=function(){
      var count = 0;
      // this.coordinateOb=[];
      // console.log(this.tickob);


      for(var i in this.dataob){
        var tempObj = this.dataob;
        var tempTickObj = this.tickob;//[count];
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
              var xCoordinate = Math.floor(45+(((this.width-60)/10)*bufferX));//+(0.1*wh[0]);
              // console.log(tempObj[j].time+"-->"+xCoordinate);
              bufferCoordinateOb.push({x:xCoordinate,y:yCoordinate});
        }
        //console.log(bufferCoordinateOb);
        this.coordinateOb=(bufferCoordinateOb);
        count++;
      }
};

renderGraph.prototype.pathStringBuilder = function(){

      // this.pathString=;
      // for(var i in this.coordinateOb)
      // {
          var bufferArray = this.coordinateOb;
          // console.log(bufferArray);
          var coordinate = 'M ';
          for(var j in bufferArray)
          {
              
              var bufferObject = bufferArray[j];
              coordinate=coordinate+(bufferObject.x+","+bufferObject.y+" L ");

              // console.log(bufferObject);
          }
          coordinate = coordinate.slice(0,coordinate.length-2);
          var keyBuffer = Object.keys(this.dataob);
          this.pathString=coordinate;
          // console.log(keyBuffer);
      // }

};
