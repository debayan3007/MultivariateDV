var renderGraph=function(data,i,chartHeight,chartWidth,tickob,chartType){

      this.dataob = data;
      this.height = chartHeight+70;
      this.width = chartWidth+65;
      Window.height = this.height
      Window.width = this.width;
      this.axisName = i;
      this.chartType = chartType;
      // this.tickob = [];
      this.tickob=tickob;
      this.numberOfGraph = Object.keys(this.dataob).length;
      this.currentIteration=0;
      var numberOfInterations = this.numberOfGraph;
      this.coordinateCalculation();
      this.pathStringBuilder();
      var svgC = this.svgPlot();
      this.yaxisDrawDEMO = new yAxis(svgC,this.width,this.height,this.tickob);
      this.xAxisDrawDEMO = new xAxis(svgC,this.width,this.height);
      // yaxisDrawDEMO.draw();
      // console.log(Object.keys(yaxisDrawDEMO));
      // this.yAxisPlot();
      document.getElementById("container").appendChild(this.svgCanvas);
      // this.xAxisPlot();
      this.addAxisLabel();
      this.mouseDragSelector();

      this.renderingTool= new renderTool();

      // this.circleDemo = this.renderingTool.drawCircle(this.height/2,this.height/2,this.svgCanvas,"anchorpoint");
      // this.svgCanvas.appendChild(this.circleDemo);

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

};

renderGraph.prototype.svgPlot=function(){

      var renderingTool= new renderTool();
      this.svgCanvas = renderingTool.drawSVG(this.width+20,this.height,"svgGraph");
      // document.getElementById("container").appendChild(this.svgCanvas);
      return this.svgCanvas;
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
    
    console.log("startX:"+(_this.startX-10)+"startY:"+(_this.startY-70));
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
      

    _this.svgCanvas.removeChild(_this.dragBox);
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

renderGraph.prototype.drawLineChart=function(){
// ----rendering line----
      var _this = this;
      var renderingTool= new renderTool();

      var svgLine = renderingTool.drawPath(this.pathString,"line-graph");
      this.svgCanvas.appendChild(svgLine);

      this.anchorPoints=[];
      this.anchorPoints.fill(renderingTool.drawCircle(-100,-100,"anchorpoint")); 

      // this.anchorPoints[i]=document.createElementNS("http://www.w3.org/2000/svg","circle");
      // this.anchorPoints[i].setAttribute("class","anchorpoint");

      for(var i=0;i<this.coordinateOb.length;i++) {
          if(this.anchorPoints[i]==undefined)     
          {   
              this.toolBox = document.createElementNS("http://www.w3.org/2000/svg","rect");
              this.toolText = document.createElementNS("http://www.w3.org/2000/svg","text");


              this.anchorPoints[i]=renderingTool.drawCircle(Math.floor(this.coordinateOb[i].x),Math.floor(this.coordinateOb[i].y),"anchorpoint");
              
              
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

                            _this.toolText.setAttribute("fill","brown");
                            _this.toolText.setAttribute("font-size","15px");


                            _this.toolBox.setAttribute("x",upperBoundX);
                            _this.toolBox.setAttribute("y",lowerBoundY);

                            if(tempX>=(_this.coordinateOb[j].x+8) && tempX <= (_this.coordinateOb[j].x+12))
                            {
                                  // console.log("abc");
                                  // console.log(_this.coordinateOb[j].y);
                                  _this.toolText.textContent=_this.dataob[j].value; 
                                  _this.toolText.setAttribute("x",-100)
                                  _this.toolText.setAttribute("y",-100);
                                  _this.toolBox.setAttribute("x",-100);
                                  _this.toolBox.setAttribute("y",-100);
                            }

                            
                            
                            _this.svgCanvas.appendChild(_this.toolBox);
                            _this.svgCanvas.appendChild(_this.toolText);

                        }
                        else
                        {
                            // _this.toolText.setAttribute("x",-1);
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
