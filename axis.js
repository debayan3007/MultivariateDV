var Axis =  function(RenderGraphI){

	this.RenderGraphI = RenderGraphI;

}

var yAxis = function(RenderGraphI,width,height,tickArray){

	// console.log(Object.keys(RenderGraphI));

	this.width = width;
	this.height = height;
	// console.log(tickArray);
	this.tickArray = tickArray;//["0K","20k","40K","60K","80K"];
	Axis.call(this,RenderGraphI);
	this.drawAxis();
	this.getWindowSize();
	this.drawTicks();
	this.drawAxis();
	this.draw();

}


yAxis.prototype.drawAxis=function(){

		var renderingTool= new renderTool();
		this.svgAxisY = renderingTool.drawLine(45,45,30,(this.height-40),"svgAxis");
		// console.log(typeof this.svgAxisY);
		this.RenderGraphI.appendChild(this.svgAxisY);
}

yAxis.prototype.getWindowSize = function(){
	 var d= document, root= d.documentElement, body= d.body;
	 this.wid= window.innerWidth || root.clientWidth || body.clientWidth;
	 // hi= window.innerHeight || root.clientHeight || body.clientHeight ;
	 // return [wid,hi]
}


yAxis.prototype.drawTicks=function(){

		var renderingTool= new renderTool();


		this.div = (this.height-70)/(this.tickArray.length-1);//height,tickArray,
	for(var i=0;i<=this.tickArray.length;i++)
	{
		var svgAxisTickY = renderingTool.drawLine(42,45,((this.height-40)-this.div*(i)),((this.height-40)-this.div*(i)),null);//height,
		svgAxisTickY.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:1.5");//
		// this.RenderGraph.svgCanvas.appendChild(svgAxisTickY);//

		this.svgTickLineY = renderingTool.drawRect(45,((this.height-40)-this.div*(i)),0,0,null);
		// var svgTickLineY = document.createElementNS("http://www.w3.org/2000/svg","rect");
		// svgTickLineY.setAttributeNS(null,"x","45");
		// // svgTickLineY.setAttributeNS(null,"x2",this.width);
		// svgTickLineY.setAttributeNS(null,"y",((this.height-40)-div*(i)));
		// // svgTickLineY.setAttributeNS(null,"y2",(this.height-40-div*(i)));
		// svgTickLineY.setAttributeNS(null,"height",div)
		// svgTickLineY.setAttributeNS(null,"width",this.width-45);
		this.svgTickLineY.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:0");
		if(i%2==0 && i!=0)
		this.svgTickLineY.setAttributeNS(null,"class","svgTickRectEven");
		else
		this.svgTickLineY.setAttributeNS(null,"class","svgTickRectOdd");
		// this.svgCanvas.appendChild(svgTickLineY);
		this.RenderGraphI.appendChild(this.svgTickLineY);


		// var TicksY=renderingTool.drawText(40,((this.height-40)-div*(i)),null);
		this.TicksY = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.TicksY.setAttributeNS(null,"x",40);
		this.TicksY.setAttributeNS(null,"y",(40+this.div*(i)));
		this.TicksY.setAttributeNS(null,"fill","black");
		this.TicksY.setAttributeNS(null,"text-anchor","end");
		this.TicksY.setAttributeNS(null,"dominant-baseline","central");
		this.TicksY.setAttributeNS(null,"font-family","Verdana");
		this.TicksY.setAttribute("size","10px");
		this.TicksY.textContent=this.tickArray[i];

		// console.log(Math.floor(this.wid/Window.width));

		this.RenderGraphI.appendChild(this.TicksY);	
		// console.log(this.tickArray[i]);
		// this.RenderGraph.svgCanvas.appendChild(TicksY);
	}

}


yAxis.prototype.draw=function(){

		// this.RenderGraphI.appendChild(svgTickLineY);
		
		this.RenderGraphI.appendChild(this.TicksY);
		// this.RenderGraphI.appendChild(this.svgAxisY);

}

var xAxis =function(RenderGraphI,width,height,dataob,tickBoolean){

		// this.tickArray2 = ["0k",""20k"","40k","60k"];
		this.tickBoolean = 1;
		this.dataob = dataob;
		Axis.call(this,RenderGraphI);
		this.width = width;
		this.height = height;
		this.drawAxis();
		this.drawTicks();


}

xAxis.prototype.drawAxis=function()
{
		var renderingTool= new renderTool();
		this.svgAxisX = renderingTool.drawLine(45,(this.width),(this.height-40),(this.height-40),"svgAxis");//width,height
		this.RenderGraphI.appendChild(this.svgAxisX);

}

xAxis.prototype.drawTicks=function()
{

	var renderingTool= new renderTool();
	for(var j=0;j<this.dataob.length;j++)
    {

        var div = (this.width-70)/this.dataob.length;
        var svgAxisTickX = renderingTool.drawLine(25+(div*(j+1)),25+(div*(j+1)),(this.height-37),(this.height-39),null);
        svgAxisTickX.setAttribute("style","stroke:rgb(0,0,0);stroke-width:2");
        this.RenderGraphI.appendChild(svgAxisTickX);



        var TicksX = document.createElementNS("http://www.w3.org/2000/svg", "text");
        //renderingTool.drawText(47+(div*j),this.height-40,((20+j)+"-06"),null);
        document.createElementNS("http://www.w3.org/2000/svg", "text");
        TicksX.setAttributeNS(null,"x",47+(div*j));
        TicksX.setAttributeNS(null,"y",this.height-40);
        TicksX.setAttribute("fill","black");
        TicksX.setAttribute("size","10px");
        // TicksX.textContent=(j*20)+"k";
        TicksX.setAttribute("dominant-baseline","text-after-edge");
        TicksX.setAttribute("transform","rotate(90 "+ (45+(div*j)) +","+(this.height-40)+")" );
        TicksX.setAttribute("font-family","Verdana");
        // console.log(this.tickBoolean);
        if(this.tickBoolean!= 0)
	        this.RenderGraphI.appendChild(TicksX);
    }

}