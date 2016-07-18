var noTickG=[];
var univCounter;
var dataOb={};
var keyG=[]
var caption,subcaption;
var coordinateG = [];
var keyTimePair = [];
var timeValuePair = [];
var coordinateArray=[];
var coordinateArray2=[];
var xCoordinate=[];
var spanToolText=[];
var toolBox=[];
function parser(mydata)
{
      var keys = [];
            var obj = mydata.data;
            var temp;
            var dataob={};// data according to category put against date
            var counter2=0;
            for(var key in obj)
            {
                var o = obj[key];
                keys.push(key);

                for(var key2 in o) 
                {
                    var o2=o[key2];
                    
                    //console.log(key2);
                    keyG.push(key2)
                    if(key2=='time')
                    {
                        temp=o2;
                    }
                    else
                    {
                        if(dataob[key2]==undefined)
                        {  dataob[key2]=[];
                          dataob[key2].push({time:temp,value:o2});
                        }
                        else
                          dataob[key2].push({time:temp,value:o2});
                    }
                }
                counter2=0;
            }
            dataOb = dataob;
            var maxY=0;
            for(var key in dataob)
            {
                var o = dataob[key];
                maxY++;
                //console.log(key);
                for(var key2 in o) 
                {
                    var o2=o[key2];
                    //console.log(o2);
                }   

            }
            console.log(dataob);

            var noKey=Object.keys(dataob).length;
            var max=Array(noKey).fill(-1*(1/0)),min=Array(noKey).fill(1/0);
            var count=0;
            var date=[];
            var value=[];
            var minPass;
            var maxPass;
            for(var l in dataob)
            {
            //    console.log(kk);
                var kx=dataob[l];
                console.log(l);
                for(var m in kx)
                {
                  var value2=kx[m].value;
                  var time2 = kx[m].time;
                  date.push(time2);
                  console.log(time2);
                  value.push(value2);
                  //coordinateCalculationX(time2,value2,counter2++);
                  
                  if(value2>max[count])
                  {
                    max[count]=value2;
                  }
                  if(value2<min[count])
                  {
                    min[count]=value2;
                  } 
                  //coordinateCalculationX(time2,value2);
                  var objSend=[];objSend[0]=optimizerRange(min[count],max[count]);objSend[1]=(value2);

                  //        coordinateCalculationY(objSend);//,optimizerRange(min[count],max[count]));
                } 
                //console.log("============",min[count],max[count]);
                minPass=min[count];
                maxPass=max[count];
                count++; 

    //=====
        
        /*for(var i in min)
        {
          yValues[i] = value2;
          xValues[i] = time2;

        }*/
        var tickOb =  optimizerRangeSingle(minPass,maxPass);
        //console.log(tickOb);
        var coordinateResult = coordinateCalculationXY(date,value,minPass,maxPass,l);
        date=[];
                value=[];
                var hw = widthheight();
                var len_2 = coordinateResult.length;
                var tickTimesY = coordinateResult.substring(len_2-1,len_2);
                var flag = 0;
                if(noKey == count)
                  flag=1;

                //console.log(flag);
                RenderSVG("container",hw[1],hw[0],1,tickTimesY,10,coordinateResult.substring(0,len_2-1),tickOb,flag,l,count,maxY,time2,l);
                flag=0;
            }
            optimizerRange(min,max);
            console.log(timeValuePair);
}

function optimizerRangeSingle(MIN,MAX)
{
      //var length = MIN.length;
      var bufferMin=0,bufferMax=0;
        bufferMin = MIN;
        bufferMax = MAX;
        var diff = bufferMax - bufferMin;
        var opMAX=0,opMIN=0;
        var noDig=0,buffer=diff;
        var newBeautyN = 0;
        while(buffer > 0)
        {
            buffer = Math.floor(buffer/10);
            noDig=noDig+1;
        }
        var beautyN = 5*Math.pow(10,(noDig-2));

        //=====MIN===== 

        opMIN = beautyN*(Math.floor(bufferMin/beautyN));
        
        //minARRAY.push(opMIN);
        //=============
        //=====MAX===== 

        if(bufferMax == bufferMin)
        {
            return [0,bufferMin,2*bufferMin];
        }

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

        //minARRAY.push(opMIN);
        bufferArray = optimizerTick(opMIN,opMAX);
        //optimizedTick.push(bufferArray);
        return bufferArray;
      //}
}
function optimizerRange(MIN,MAX)
{
      var length = MIN.length;
      var bufferMin,bufferMax;
      var minARRAY=[];
      var maxARRAY=[];
      var optimizedTick=[];
      var bufferArray=[];
      for(var i=0;i<length;i++)
      {
        bufferMin = MIN[i];
        bufferMax = MAX[i];
        var diff = bufferMax - bufferMin;
        var opMAX=0,opMIN=0;
        var noDig=0,buffer=diff;
        var newBeautyN = 0;
        while(buffer > 0)
        {
            buffer = Math.floor(buffer/10);
            noDig=noDig+1;
        }
        var beautyN = 5*Math.pow(10,(noDig-2));

        //=====MIN===== 

        opMIN = beautyN*(Math.floor(bufferMin/beautyN));
        
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

        minARRAY.push(opMIN);
        maxARRAY.push(opMAX);
        bufferArray = optimizerTick(opMIN,opMAX);
        optimizedTick.push(bufferArray);

      }
}


function optimizerTick(opMin,opMax)
{
    //console.log(opMin);
    var MINIMUM = opMin;
    var bufferMax = opMax;
    var bufferMin = opMin;
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
    
    counter = opMin;
    ticks.push(counter);
    while(counter<opMax)
    {
        counter = counter + div;
        ticks.push(counter);
    }
    var len=ticks.length;
    noTickG.push(ticks[len-1]-ticks[0] + div);
    //coordinateCalculationY(ticks);    
    //console.log(ticks);
    return ticks;
}


function widthheight()
{
    var obj2 = mydata.chart;
    var cheight,cwidth;
    var cWidthHeight = [];
    for(var key in obj2)
    {
        var oc = obj2[key];
        if(key=="width")
        {
            cwidth=oc;                    
        }
        if(key=="height")
        {
            cheight=oc;
        }      
        if(key == "caption")      
        {
            caption = oc;
        }
        if(key == "subcaption")
        {
            subcaption = oc
        }
    }
    //RenderSVG("container",cheight,cwidth);
    cWidthHeight[0]=cwidth;
    cWidthHeight[1]=cheight;
    var buf = cwidth+"px";
    document.getElementById('container').style.width=1.5*cWidthHeight[0]+"px";
    document.getElementById('container').style.height=cWidthHeight[1]+"px";

    var elCaption = document.getElementById("caption");
    elCaption.innerHTML = caption;
    var elSubCaption = document.getElementById("subcaption");
    elSubCaption.innerHTML = subcaption;

    return cWidthHeight;
}

var pt=[];
//var baalLine;
var loc;
var svgCanvas;
var baalLine=[];
var sgvTempo
function RenderSVG(idDiv,height,width,tickStart,tickTimesY,tickTimesX,pathString,tickOb,flag,keys,count,maxY,key,axisName)
{


    var tempTool="empty";
    console.log(key);
    //spanTooltip.innerHTML=tempTool;
    //document.getElementById("container").appendChild(spanTooltip);
    console.log("test count = "+count);
    var br = document.createElement("br");
    document.getElementById(idDiv).appendChild(br);
    console.log(count);
    svgCanvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //baalLine[count]=(document.createElementNS("http://www.w3.org/2000/svg", "line"));
    svgCanvas.setAttributeNS(null,"id","svgC"+count);
    svgCanvas.setAttribute("class","svgGraph");
    svgCanvas.setAttributeNS(null,"width",width+120);
    svgCanvas.setAttributeNS(null,"height",height+20);
    console.log(height);
    document.getElementById(idDiv).appendChild(svgCanvas);


     
    
      var svgAxisY = document.createElementNS("http://www.w3.org/2000/svg", "line");
      svgAxisY.setAttributeNS(null,"x1","100");
      svgAxisY.setAttributeNS(null,"x2","100");
      svgAxisY.setAttributeNS(null,"y1","20");
      svgAxisY.setAttributeNS(null,"y2",(height-20));
      svgAxisY.setAttribute("class","svgAxis");
      //svgAxisY.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:0.5");
      svgCanvas.appendChild(svgAxisY);


      var labelY=document.createElementNS("http://www.w3.org/2000/svg", "text");
          labelY.setAttributeNS(null,"x",40);
          labelY.setAttributeNS(null,"y",height/2+50);
          labelY.setAttributeNS(null,"fill","grey");
          labelY.textContent=keys+"";
          labelY.setAttribute("transform","rotate(270 40,"+(height/2 + 50)+")" );
          console.log(keys);
          labelY.setAttributeNS(null,"font-family","Verdana");
          svgCanvas.appendChild(labelY);

      var div = (height-20)/(tickTimesY);
      for(var j=0;j<tickTimesY;j++)
      {
          var svgAxisTickY = document.createElementNS("http://www.w3.org/2000/svg", "line");
          svgAxisTickY.setAttributeNS(null,"x1","95");
          svgAxisTickY.setAttributeNS(null,"x2","100");
          svgAxisTickY.setAttributeNS(null,"y1",((height-20)-div*(j)));
          svgAxisTickY.setAttributeNS(null,"y2",((height-20)-div*(j)));
          svgAxisTickY.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:2");
          svgCanvas.appendChild(svgAxisTickY);


          var svgTickLineY = document.createElementNS("http://www.w3.org/2000/svg", "line");
          svgTickLineY.setAttributeNS(null,"x1","100");
          svgTickLineY.setAttributeNS(null,"x2",width+50);
          svgTickLineY.setAttributeNS(null,"y1",((height-20)-div*(j)));
          svgTickLineY.setAttributeNS(null,"y2",(height-20-div*(j)));
          svgTickLineY.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:0.15");
          svgCanvas.appendChild(svgTickLineY);


          var TicksY=document.createElementNS("http://www.w3.org/2000/svg", "text");
          TicksY.setAttributeNS(null,"x",60);
          TicksY.setAttributeNS(null,"y",((height-20-div*(j))+6));
          TicksY.setAttributeNS(null,"fill","blue");
          TicksY.setAttributeNS(null,"font-family","Verdana");
          TicksY.textContent=""+tickOb[j];
          svgCanvas.appendChild(TicksY);
      }





      var svgAxisX = document.createElementNS("http://www.w3.org/2000/svg", "line");
      svgAxisX.setAttributeNS(null,"y1",(height-20));
      svgAxisX.setAttributeNS(null,"y2",(height-20));
      svgAxisX.setAttributeNS(null,"x1","100");
      svgAxisX.setAttributeNS(null,"x2",(width+100));
      svgAxisX.setAttribute("class","svgAxis");
      //svgAxisX.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:0.5");
      svgCanvas.appendChild(svgAxisX);
      
      div = (width-40)/(tickTimesX);
      
      for(var j=0;j<tickTimesX;j++)
      {
          var svgAxisTickX = document.createElementNS("http://www.w3.org/2000/svg", "line");
          svgAxisTickX.setAttributeNS(null,"y1",(height-15));
          svgAxisTickX.setAttributeNS(null,"y2",(height-20));
          svgAxisTickX.setAttributeNS(null,"x1",100+(div*(j+1)));
          svgAxisTickX.setAttributeNS(null,"x2",100+(div*(j+1)));
          svgAxisTickX.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:2");
          svgCanvas.appendChild(svgAxisTickX);

          var TicksX=document.createElementNS("http://www.w3.org/2000/svg", "text");
          TicksX.setAttributeNS(null,"x",100+(div*(j+1)));
          TicksX.setAttributeNS(null,"y",height);
          TicksX.setAttributeNS(null,"fill","black");
          TicksX.textContent=(20+(j+1))+"-07";
          TicksX.setAttribute("transform","rotate(30 "+ (100+(div*(j+1))) +","+height+")" );
          TicksX.setAttributeNS(null,"font-family","Verdana");
          if(flag==1)
            svgCanvas.appendChild(TicksX);

      } 
      
      var svgPath = document.createElementNS("http://www.w3.org/2000/svg","path");
      svgPath.setAttributeNS(null,"stroke","#009688");
      svgPath.setAttributeNS(null,"fill","none");
      svgPath.setAttributeNS(null,"stroke-width","7");
      svgPath.setAttributeNS(null,"d",pathString);
      svgPath.textContent = "SVG PATH";
      //console.log(pathString);
      sgvTempo = svgCanvas[count];
      svgCanvas.appendChild(svgPath);
      var index=0;

      //var coordinateArray = stringParserCoordinate(pathString);
      //coordinateG.push(coordinateArray);
      console.log("coordinateArray2"+coordinateArray2);
      for(var i = 0;i<coordinateArray.length-1;i++)
      { 

        if(coordinateArray[i][0]!= "" && coordinateArray[i][1]!= "")
        {  
          var anchorPoints = document.createElementNS("http://www.w3.org/2000/svg","circle");
          anchorPoints.setAttribute("cx",Math.floor(coordinateArray[i][0]));
          anchorPoints.setAttribute("cy",Math.floor(coordinateArray[i][1]));
          anchorPoints.setAttribute("r","6");
          anchorPoints.setAttribute("stroke","#009688");
          anchorPoints.setAttribute("stroke-width",1);
          anchorPoints.setAttribute("fill","white");
          
          //anchorPoints.addEventListener(displaytext,function(evt){

          //},false);
          //anchorPoints.addEventListener(mouseout,hideText,false);
          svgCanvas.appendChild(anchorPoints);
        }
      }



      // Find your root SVG element
      //var svg = document.querySelector('svg');

      // Create an SVGPoint for future math
      pt = svgCanvas.createSVGPoint();
      
      
      // Get point in global SVG space
      function cursorPoint(evt){
        pt.x = evt.clientX; pt.y = evt.clientY;
        
        
        return pt.matrixTransform(svgCanvas.getScreenCTM().inverse());
      }

      svgCanvas.addEventListener('mousemove',onMouseMove,false);
      //console.log(svgCanvas);
      

      document.addEventListener('verticalLine',function(evt){

        //console.log(evt.detail.x);
        for(var i=-1;i<maxY-1;i++)
        {
          if(baalLine[i]===undefined){
            baalLine[i]  = document.createElementNS("http://www.w3.org/2000/svg", "line");
            }
            baalLine[i].setAttributeNS(null,"y1",20);
            baalLine[i].setAttributeNS(null,"y2",height-20);
            baalLine[i].setAttributeNS(null,"x1",evt.detail.x-8);
            baalLine[i].setAttributeNS(null,"x2",evt.detail.x-8);
            var xCheck = evt.detail.x - 8;
            baalLine[i].setAttribute("class","hairLine");

            document.getElementById("svgC"+(i+2)).appendChild(baalLine[i]);
        }

        for(var i=0;i<xCoordinate.length-1;i++)
        {
            var tempName;

            if(evt.detail.x-5 > xCoordinate[i][0] &&   evt.detail.x-11<xCoordinate[i][0])
            {
                //console.log("ANCHOR MATCHED!  "+xCoordinate[i][1]);
                //console.log(dataOb);
                for(var iI in dataOb)
                {
                  //document.getElementById("svgC"+iI.charAt(5)).removeChild(spanToolText[count]);
                  var tempOb = dataOb[iI];
                  tempName = iI;
                  for(var jI in tempOb)
                  {


                    if(tempOb[jI].time == xCoordinate[i][1]) 
                    {
                      //console.log("key=     "+ax);
                      console.log(iI+"     "+tempOb[jI].value);
                      if(iI == axisName)
                      {
                        console.log(iI);
                        console.log(tempOb[jI].value);




                        if(spanToolText[count] == undefined)
                        {
                          spanToolText[count] = document.createElementNS("http://www.w3.org/2000/svg","text");
                        // }
                        // if(toolBox[count] == undefined)
                        // {
                          toolBox[count] = document.createElementNS("http://www.w3.org/2000/svg","rect");
                        }

                        myVar = setTimeout(function(){
                          toolBox[count].setAttribute("x",xCoordinate[i][0]);
                          toolBox[count].setAttribute("y",xCoordinate[i][2]);
                          toolBox[count].setAttribute("height",20);
                          toolBox[count].setAttribute("width",35);
                          //toolBox[count].setAttribute("width",60);
                          toolBox[count].setAttribute("style","fill:#fed8ca;stroke:brown;stroke-width:1;opacity:0.7");
                          document.getElementById("svgC"+iI.charAt(5)).appendChild(toolBox[count]);


                          spanToolText[count].setAttribute("x",xCoordinate[i][0]+8);
                          spanToolText[count].setAttribute("y",xCoordinate[i][2]+15);
                          spanToolText[count].setAttribute("fill","brown");
                          spanToolText[count].setAttribute("font-size","12px");
                          spanToolText[count].textContent=tempOb[jI].value;
                          console.log("abcde"+iI.charAt(5));
                          //document.getElementById("svgC"+iI.charAt(5)).removeChild(spanToolText);
                          document.getElementById("svgC"+iI.charAt(5)).appendChild(spanToolText[count]);
                        }, 2500);

                        toolBox[count].setAttribute("x",xCoordinate[i][0]);
                        toolBox[count].setAttribute("y",xCoordinate[i][2]);
                        toolBox[count].setAttribute("height",20);
                        toolBox[count].setAttribute("width",35);
                        //toolBox[count].setAttribute("width",60);
                        toolBox[count].setAttribute("style","fill:#fed8ca;stroke:brown;stroke-width:1;opacity:1");
                        document.getElementById("svgC"+iI.charAt(5)).appendChild(toolBox[count]);


                        spanToolText[count].setAttribute("x",xCoordinate[i][0]+8);
                        spanToolText[count].setAttribute("y",xCoordinate[i][2]+15);
                        spanToolText[count].setAttribute("fill","brown");
                        spanToolText[count].setAttribute("font-size","12px");
                        spanToolText[count].textContent=tempOb[jI].value;
                        console.log("abcde"+iI.charAt(5));
                        //document.getElementById("svgC"+iI.charAt(5)).removeChild(spanToolText);
                        document.getElementById("svgC"+iI.charAt(5)).appendChild(spanToolText[count]);
                        
                      }
                    }
                  }
                }
                
            }
            
        }
       },false);


}

  function onMouseMove(evt)
  {
        var event = new CustomEvent(
            "verticalLine",
            {
              detail: {
                x: evt.clientX
              },
              bubbles: true,
              cancelable : true
            }
          );
        document.dispatchEvent(event);
  }

  function appendLine(i,baalLine)
  {
    
  }

  function calculationOfCorrespondingYValue(x,count,iQ)
  {
      //console.log(dataOb)
      var testKey;
      var coordinateAll = [];
      var flagArray=[]
      coordinateAll = coordinateG;var counter =0 ;
      console.log(x);
      for(var i=0;i<coordinateAll.length;i++)
      {
          console.log("abc");
       
            for(var p in dataOb)
            {

                var tempObj = dataOb[p];
                testKey = p;
                
                //console.log(tempObj[0]);
                for(var q in tempObj)
                {
                  if(tempObj[iQ] != undefined)
                  {
                    console.log(testKey+"---------"+tempObj[iQ].time);
                    //console.log(testKey+":="+tempObj[q].value);
                  }
                }
            }
      }
}


//co-ordinate calculation
function coordinateCalculationXY(x,y,min,max,yAx)//xArray , yArray for one yaxis,  ticks of that data
{

  //console.log("x:"+x+",y:"+y);          
  //,min:"+min+",max"+max);
  //timeValuePair.push([x,y]);
  //var coordinateArray2 = [];
  var X=[];X=x;
  var Y=[];Y=y;
  var bufferX,bufferY;
  var buffer=0;
  var wh=widthheight();
  var ticks=optimizerRangeSingle(min,max);
  var len=ticks.length;
  var coordinate="M";
  var ratioX,ratioY;
  var xOr,yOr;
  for (var i = 0; i < x.length; i++) {
    xOr = X[i];yOr = Y[i];
    keyTimePair.push(yAx,X[i])
    timeValuePair.push([X[i],Y[i]]);
    bufferX = (x[i].substring(0,2))%20;
    bufferY = y[i];
    //console.log(bufferX,bufferY);
    ratioX = (wh[0]-45)/10;
    buffer = Math.floor(100+(ratioX*bufferX));//+(0.1*wh[0]);
    //console.log(buffer);
    //console.log("\nbufferX:",buffer);
    X[i]=(buffer);
    buffer=0;ratio=0;
    //ratioY=(((hw[1]-40)*(ticks[1]-ticks[0]))/(ticks[len-1]-ticks[0]+ticks[1]-ticks[0]));
    buffer= (wh[1])-(((y[i]-ticks[0])/(ticks[len-1]-ticks[0]))*(wh[1]-70))-20; //(wh[1]-((135*wh[1])/(wh[1]-75)))/(ticks[len-1]-ticks[0]);//*(ticks[1]-ticks[0]);
    //buffer = Math.floor((hw[1]-20)-(ratioY*((y[i]))))+2;
    //buffer = Math.floor(wh[1]-(((y[i])-ticks[0])*ratioY))-(0.055*wh[1]);
    //console.log("y:",buffer);
    Y.push(buffer);
    console.log(xOr,yOr);
    coordinateArray2.push([xOr,yOr]);//,x[i],y[i]]);
    //coordinateArray2[i].push(yOr);
    xCoordinate.push([X[i],xOr,buffer]);
    coordinate=coordinate+(X[i]+","+buffer+" L");
    buffer=0;
  
  }
  //console.log("Min:"+min+"Max:"+max);
  //console.log(ticks);
  //console.log("X:"+X+"\nY:"+Y);
  //console.log(coordinateArray2);
  //console.log(timeValuePair);
  coordinate = coordinate.substring(0,(coordinate.length)-1)+len;
  console.log(coordinateArray2);
  coordinateArray2=[];
  //stringParserCoordinate(coordinate,coordinateArray2);
  //var coordinateArray2 = [];
    //coordinateArray2 = cA2;
    //var coordinateArray = [];
    //int length = coordinate.length();
    var count=0;
    //console.log(cA2);
    var arrbuffer = coordinate.split(" ");
    coordinateArray = [];
    for(var i = 0;i<arrbuffer.length;i++)
    {
        arrbuffer[i] = arrbuffer[i].substring(1,arrbuffer[i].length);
        coordinateArray[i] = arrbuffer[i].split(",");
        //coordinateArray[i].push(cA2);
        //coordinateArray[i].push(timeValuePair[i][1]);
    }
    //console.log("arrbuffer\n"+arrbuffer);
    //console.log("coordinateArray\n"+coordinateArray[2]);

    console.log(coordinateArray);
    return coordinate;
  }
    
