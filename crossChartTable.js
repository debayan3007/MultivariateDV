var crossChartTable = function(RenderGraph,productType,productSeq)//,coordinateOb,dataob,width,height,productSeq)
{

    this.productSeq = productSeq; 
    this.RenderGraph = RenderGraph;
    this.productType = productType;
    // this.coordinateOb = coordinateOb;
    // this.dataob = dataob;
    // this.width = width;
    // this.height = height;
    this.drawColumns();
    
}

crossChartTable.prototype.drawColumns = function(){
          
          var textType = document.createElementNS("http://www.w3.org/2000/svg","text");
          textType.setAttribute("x",50);
          textType.setAttribute("y",15);
          textType.setAttribute("fill","black");
          textType.setAttribute("font-family","Verdana");
          textType.setAttribute("size","20px");
          textType.textContent = this.productType;
          this.RenderGraph.appendChild(textType);

          
          
          var yCarry = 15;
          for(var i in this.productSeq)
          {
				var textProduct = document.createElementNS("http://www.w3.org/2000/svg","text");
				textProduct.setAttribute("x",130);
				textProduct.setAttribute("fill","black");
				textProduct.setAttribute("font-family","Verdana");
				textProduct.setAttribute("size","20px");
				textProduct.setAttribute("y",yCarry);
				yCarry += 35;
				textProduct.textContent = this.productSeq[i];
				this.RenderGraph.appendChild(textProduct);

          }

};
