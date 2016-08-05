var renderGraph=function(data,i,chartHeight,chartWidth,tickob,chartType,tickboolean,svgCanvas,productArray){

      // console.log(productArray);
      if(productArray == undefined)
        productArray = {};
      this.svgCanvas = svgCanvas;
      this.tickboolean = 0;
      this.dataob = data;
      this.height =(data.length)*37.5;
      this.width =  200;//Number(chartWidth)+65;
      Window.height = this.height
      Window.width = this.width;
      this.axisName = i;
      this.renderingTool= new renderTool();
      this.chartType = chartType.toString() ;
      
      // this.tickob = [];
      this.tickob=tickob;
      this.numberOfGraph = Object.keys(this.dataob).length;
      this.currentIteration=0;
      var numberOfInterations = this.numberOfGraph;
      this.getWindowSize();
      this.coordinateCalculation();
      this.pathStringBuilder();
      this.svgCanvas = this.svgPlot();

      // console.log("Sorted:->>  ",Object.keys(productArray).sort());
      this.productSeq = (Object.keys(productArray)).sort();
      var group = document.createElementNS(this.svgLink,"g");
      group.setAttribute("stroke","green");
      // group.setAttribute("fill",none);
      // return group;
      
      // console.log("tickboolean",this.tickboolean);
      // this.yaxisDrawDEMO = new yAxis(this.svgCanvas,this.width,this.height,this.tickob);
      // this.xAxisDrawDEMO = new xAxis(this.svgCanvas,this.width,this.height,this.dataob,this.tickboolean);
      
      // this.lineChart = new lineChart();
      // yaxisDrawDEMO.draw();
      // console.log(Object.keys(yaxisDrawDEMO));
      // this.yAxisPlot();
      document.getElementById("container").appendChild(this.svgCanvas);
      this.svgCanvas.appendChild(group);
      // this.xAxisPlot();
      // this.addAxisLabel();
      // this.mouseDragSelector();



      // this.circleDemo = this.renderingTool.drawCircle(this.height/2,this.height/2,this.svgCanvas,"anchorpoint");
      // this.svgCanvas.appendChild(this.circleDemo);
      // console.log(typeof chartType, chartType, chartType == 'line');
      if(chartType.toString() == "line")
      {
          this.yaxisDrawDEMO = new yAxis(this.svgCanvas,this.width,this.height,this.tickob);
          this.xAxisDrawDEMO = new xAxis(this.svgCanvas,this.width,this.height,this.dataob,this.tickboolean);
          this.lineChart = new lineChart(this.svgCanvas,this.coordinateOb,this.dataob,this.pathString,this.width,this.height);
          this.anchorPoints = [];
          this.anchorPoints = this.lineChart.anchorPoints;
          this.hairLine = this.lineChart.hairLine;
          // console.log(this.anchorPoints[0].getAttribute("cx"));
      }  else if(chartType.toString() == "column"){
          // this.yaxisDrawDEMO = new yAxis(this.svgCanvas,this.width,this.height,this.tickob);
          // this.xAxisDrawDEMO = new xAxis(this.svgCanvas,this.width,this.height,this.dataob,this.tickboolean);
          // this.columnChart = new columnChart(this.svgCanvas,this.coordinateOb,this.dataob,this.width,this.height);
          // this.svgColumn = [];
          // this.svgColumn = this.columnChart.svgColumn;
      } else if(chartType.toString() == "crosschart"){


          // this.yaxisDrawDEMO = new yAxis(this.svgCanvas,this.width,this.height,this.productSeq);
          this.crossChart = new crossChart(this.svgCanvas,this.coordinateOb,this.dataob,this.width,this.height,this.productSeq);
          // this.svgColumn = [];
          // this.svgColumn = this.crossChart.svgColumn;
      }
      
};

renderGraph.prototype.getWindowSize = function(){
   var d= document, root= d.documentElement, body= d.body;
   this.wid= window.innerWidth || root.clientWidth || body.clientWidth;
   // hi= window.innerHeight || root.clientHeight || body.clientHeight ;
   // return [wid,hi]
}

renderGraph.prototype.svgPlot=function(){

      var renderingTool= new renderTool();
      this.svgCanvas = renderingTool.drawSVG(this.width+20,this.height,"svgGraph");
      document.getElementById("container").appendChild(this.svgCanvas);
      return this.svgCanvas;
}

renderGraph.prototype.makingGroups = function(){

      var renderTool = new renderTool();
      this.group = renderTool.drawGroup();
      this.svgCanvas.appendChild(this.group);
}


renderGraph.prototype.addAxisLabel=function()
{

      var renderingTool= new renderTool();

      var labelRect = renderingTool.drawRect(40,0,this.width-35,28,"labelRectStyle");
      this.svgCanvas.appendChild(labelRect);

      var labelY=document.createElementNS("http://www.w3.org/2000/svg", "text");
      labelY.setAttributeNS(null,"x",45+(this.width-45)/2);
      labelY.setAttributeNS(null,"y",18);
      labelY.setAttribute("class","labelYtext")
      // labelY.setAttributeNS(null,"text-anchor","middle");
      labelY.textContent=""+this.axisName;
      // labelY.setAttributeNS(null,"font-family","Verdana");
      this.svgCanvas.appendChild(labelY); //----chart labels appended----
}

renderGraph.prototype.mouseDragSelector = function()
{
    var flag;
    var _this = this;
    this.dragBox = document.createElementNS("http://www.w3.org/2000/svg","rect");
    this.svgCanvas.addEventListener("mousedown",function(event){
    flag=1;
    _this.startX = (event.pageX-10) % (_this.width+20);
    _this.startY = (event.pageY-70);
    // _this.dragBox.setAttribute("x",_this.startX);
    // _this.dragBox.setAttribute("y",_this.startY);
    if(_this.chartType == "line")
    {
        _this.svgCanvas.removeChild(_this.hairLine);
    }  
    
    // console.log("startX:"+(_this.startX-10)+"startY:"+(_this.startY-70));
  },false);
  this.svgCanvas.addEventListener("mousemove",function(event){
    if(flag==1)
    {
      // console.log("drag   x:"+event.pageX+"    y:"+event.pageY);
      // console.log("startX:"+(_this.startX-10)+"startY:"+(_this.startY-70));
      _this.endPointX = (event.pageX)  % (_this.width+20);
      _this.endPointY = (event.pageY-50) %  (_this.height+70);
      if(_this.chartType == "line")
      {
          _this.svgCanvas.removeChild(_this.hairLine);
      }
      if(_this.endPointX > _this.startX && _this.endPointY > _this.startY){
        _this.dragBox.setAttribute("x",_this.startX);
        _this.dragBox.setAttribute("y",((_this.startY-80)%(_this.height)));
      }else if(_this.endPointX > _this.startX && _this.endPointY < _this.startY){
        _this.dragBox.setAttribute("x",_this.startX);
        _this.dragBox.setAttribute("y",((event.pageY-80)%(_this.height)));
      }else if(_this.endPointX < _this.startX && _this.endPointY > _this.startY){
        _this.dragBox.setAttribute("y",((_this.startY-80)%(_this.height)));
        _this.dragBox.setAttribute("x",((event.pageX)%(_this.width+20))); 
      }else if(_this.endPointX < _this.startX && _this.endPointY < _this.startY){
        _this.dragBox.setAttribute("x",((event.pageX)%(_this.width+20)));
        _this.dragBox.setAttribute("y",((event.pageY-80)%(_this.height)));
      }

      // _this.dragBox.setAttribute("x",_this.startX);
      // _this.dragBox.setAttribute("y",_this.startY);
      
      _this.dragBox.setAttribute("width",Math.abs(((event.pageX-8)%(_this.width+20)) - _this.startX));
      _this.dragBox.setAttribute("height",Math.abs(_this.endPointY - _this.startY));
      _this.dragBox.setAttribute("class","selectionBox");
      _this.svgCanvas.appendChild(_this.dragBox);
      
    }

  },false);

  this.svgCanvas.addEventListener("mouseup",function(event){
    if(flag==1)
    {   
      _this.svgCanvas.removeChild(_this.dragBox);
      // _this.anchorPoints.setAttribute("class","anchorpoint");
      // console.log(_this.anchorPoints.length);
    }
    if(_this.chartType == "line")
    {
      _this.svgCanvas.appendChild(_this.hairLine);  
    }

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
    beginY=(event.detail.beginY-20)%(_this.height);
    endX=event.detail.endX;
    endY=(event.detail.endY-20)%(_this.height-70);
    // console.log()

    for(var i in _this.coordinateOb)
    {
      var renderingTool= new renderTool();
      var temp = _this.coordinateOb[i];
      if(temp.x>beginX  && temp.x<endX && ((temp.y)%(_this.height+70))>beginY &&  ((temp.y)%(_this.height+70))<endY)
      {
        // console.log(_this.height);
        // console.log(temp.x,((temp.y+30)%(_this.height+100)));
        // _this.anchorPoints[i].setAttribute("fill","rgb(243,90,90)");
          if(_this.chartType == "line")
          {
          //      var cx = _this.anchorPoints[i].getAttribute("cx");
          //      var cy = _this.anchorPoints[i].getAttribute("cy");
          //      var bufferPoint = renderingTool.drawCircle(Number(cx),Number(cy),"anchorpointHighlight");
          //     _this.svgCanvas.appendChild(bufferPoint);
              _this.anchorPoints[i].setAttribute("class","anchorpointHighlight");
              _this.anchorPoints[i].style.stroke ="red";
              _this.anchorPoints[i].style.r ="8";
              // console.log(_this.anchorPoints[i].getAttribute("class"));
          }  
          else
          {
              
              _this.svgColumn[i].setAttribute("class","svgColumnHighlight");
              // console.log(_this.svgColumn[i].getAttribute("x"));
              
          }

      }
      else
      {
          // _this.anchorPoints[i].style.fill ="white";
      }
    }

  },false);
}

function onSelectBox(beginX,endX,beginY,endY)
{
    // console.log((event.pageX)%Window.width);
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

function onMouseMove(event)
{
    // console.log((event.pageX)%Window.width);
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
    // console.log((event.pageX)%Window.width);
    var event = new CustomEvent(
            "onNormal",
            {
              detail: {
                x: (event.pageX),
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
              var a = 0;
              var b = 80000;//tempTickObj[tempTickObj.length-1];
              var c = 30;
              var d = this.height-40;
              var y = tempObj[j].sos;
              var yCoordinate = d-(((y-a)/(b-a))*(d-c));
              // console.log(tempObj[j].value+"-->"+yCoordinate);
              // var bufferX = ((tempObj[j].time+"").substring(0,2))%20;
              // var xCoordinate = Math.floor(45+(((this.width-60)/tempObj.length)*bufferX));//+(0.1*wh[0]);
              var xCoordinate = 60 + (Number(j)*50)
              // console.log(tempObj[j].time+"-->"+xCoordinate);
              if(this.chartType == "crosschart")
              {
                  bufferCoordinateOb.push({x:(yCoordinate-d)*(-1),y:xCoordinate});
              }else{
                  bufferCoordinateOb.push({x:xCoordinate,y:yCoordinate});
              }
        }
        //console.log(bufferCoordinateOb);
        this.coordinateOb=(bufferCoordinateOb);
        count++;
      }
      // console.log(this.coordinateOb);
};

renderGraph.prototype.pathStringBuilder = function(){

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

};
