var Axis =  function(ObjectInput){

	this.RenderGraphI = ObjectInput.RenderGraphI;
	this.width = ObjectInput.width;
	this.height = ObjectInput.height;
	this.tickArray = ObjectInput.tickArray || ["a","b","c","d","e"];	
	this.tickBoolean = ObjectInput.tickBoolean;
	this.axisBoolean = ObjectInput.axisBoolean;
	this.getWindowSize();
	this.RenderGraphI.appendChild(this.drawAxis());
	this.drawTicks();
}

Axis.prototype.drawAxis = function(){

	var renderingTool= new renderTool();
	if(this.axisBoolean == 'y')
	{
		this.svgAxis = renderingTool.drawLine(45,45,30,(this.height-40),"svgAxis");
	}
	else if(this.axisBoolean == 'x')
	{
		this.svgAxis = renderingTool.drawLine(45,(this.width),(this.height-40),(this.height-40),"svgAxis");
	}

	// this.RenderGraphI.appendChild(this.svgAxis);
	return this.svgAxis;
}

Axis.prototype.drawTicks = function(){

	var renderingTool= new renderTool();

	if(this.axisBoolean == 'y'){
		this.div = (this.height-70)/(this.tickArray.length-1);//height,tickArray,

		for(var i=0;i<this.tickArray.length;i++)
		{
			var svgAxisTickY = renderingTool.drawLine(42,45,((this.height-40)-this.div*(i)),((this.height-40)-this.div*(i)),null);//height,
			svgAxisTickY.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:1.5");//
			this.svgTickLineY = renderingTool.drawRect(45,((this.height-40)-this.div*(i)),this.width-45,this.div,null);
			this.svgTickLineY.setAttributeNS(null,"style","stroke:rgb(0,0,0);stroke-width:0");
			if(i%2==0 && i!=0)
				this.svgTickLineY.setAttributeNS(null,"class","svgTickRectEven");
			else
				this.svgTickLineY.setAttributeNS(null,"class","svgTickRectOdd");
			this.RenderGraphI.appendChild(this.svgTickLineY);
			this.TicksY = document.createElementNS("http://www.w3.org/2000/svg", "text");
			this.TicksY.setAttributeNS(null,"x",40);
			this.TicksY.setAttributeNS(null,"y",((this.height-40)-this.div*(i)));
			this.TicksY.setAttributeNS(null,"fill","black");
			this.TicksY.setAttributeNS(null,"text-anchor","end");
			this.TicksY.setAttributeNS(null,"dominant-baseline","central");
			this.TicksY.setAttributeNS(null,"font-family","Verdana");
			this.TicksY.setAttribute("size","10px");
			this.TicksY.textContent=""+this.tickArray[i];
			console.log(Math.floor(this.wid/Window.width));
			this.RenderGraphI.appendChild(this.TicksY);	
		}
	}else if(this.axisBoolean == 'x'){

		var div = (this.width-70)/(this.tickArray.length-1);
		for(var j=0;j<this.tickArray.length;j++)
	    {
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
	        TicksX.textContent=this.tickArray[j];
	        TicksX.setAttribute("dominant-baseline","text-after-edge");
	        TicksX.setAttribute("transform","rotate(90 "+ (45+(div*j)) +","+(this.height-40)+")" );
	        TicksX.setAttribute("font-family","Verdana");
	        console.log(this.tickBoolean);
	        if(this.tickBoolean!= 0)
		        this.RenderGraphI.appendChild(TicksX);
	    }
	}
}

Axis.prototype.getWindowSize = function(){
	 var d= document, root= d.documentElement, body= d.body;
	 this.wid= window.innerWidth || root.clientWidth || body.clientWidth;
}