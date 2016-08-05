var renderTool = function(){

	this.svgLink = "http://www.w3.org/2000/svg";

}

renderTool.prototype.drawSVG = function(width,height,className){

	var SVG = document.createElementNS(this.svgLink, "svg");
	SVG.setAttribute("class",className);
	SVG.setAttribute("width",width);
	SVG.setAttribute("height",height);
	// SVG.setAttribute()
	SVG.setAttribute("style","position:relative");
	// SVG.setAttribute("style",)
	// container.appendChild(SVG);
	return SVG;

}

renderTool.prototype.drawGroup = function () {
	var group = document.createElementNS(this.svgLink,"g");
	group.setAttribute("fill",none);
	return group;
}

renderTool.prototype.drawLine = function(x1,x2,y1,y2,className){

	var svgLine = document.createElementNS(this.svgLink, "line");
	svgLine.setAttribute("x1",x1);
	svgLine.setAttribute("x2",x2);
	svgLine.setAttribute("y1",y1);
	svgLine.setAttribute("y2",y2);
	svgLine.setAttribute("class",className);
	
	// container.appendChild(svgLine);
	return svgLine;
}

renderTool.prototype.drawCircle = function(cx,cy,className){

	var svgCircle = document.createElementNS(this.svgLink,"circle");
	svgCircle.setAttribute("cx",cx);
	svgCircle.setAttribute("cy",cy);
	svgCircle.setAttribute("class",className);
	// container.appendChild(svgCircle);
	return svgCircle;
}

renderTool.prototype.drawRect = function(x,y,width,height,className){

	var svgRect = document.createElementNS(this.svgLink,"rect");
	svgRect.setAttribute("x",x);
	svgRect.setAttribute("y",y);
	svgRect.setAttribute("width",width);
	svgRect.setAttribute("height",height);
	svgRect.setAttribute("class",className);
	// container.appendChild(svgRect);
	return svgRect;

}
renderTool.prototype.drawPath = function(d,className){

	var svgPath = document.createElementNS(this.svgLink,"path");
	svgPath.setAttribute("d",d);
	svgPath.setAttribute("container",container);
	svgPath.setAttribute("class",className);
	// container.appendChild(svgPath);
	return svgPath;
}
renderTool.prototype.drawText = function(x,y,content,className){

	var svgText = document.createElementNS(this.drawText,"text");
	svgText.setAttribute("x",x);
	svgText.setAttribute("y",y);
	svgText.setAttribute("class",className);
	svgText.textContent = content;
	// svgText.textContent=""+content;
	return svgText;
}