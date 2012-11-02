/**
 * @author Frendhi Saido Danaro
 * 
 */

function toggle(element) {
    document.getElementById(element).style.display = (document.getElementById(element).style.display == "none") ? "" : "none";
}

var m = [0,5,10,20,30,40,50,60,90];
var w = 1000,
    wbar = 600,
	h = 300;
	
	
var data = [
	{kem: "Depkominfo", kor: "1.03"},
	{kem: "Kementrian Pendayagunaan Aparatur Negara", kor: "1.37"},
	{kem: "Kementrian Sekertariat Negara", kor: "1.6"},
	{kem: "BMKG", kor: "2.71"},
	{kem: "Kementrian Pendidikan Nasional", kor: "2.89"},
	{kem: "BPKP", kor: "3.14"},
	{kem: "Kementrian Perumahan Rakyat", kor: "4.01"},
	{kem: "Mahkamah Agung", kor: "4.79"},
	{kem: "Kementrian Dalam Negeri", kor: "9"},
	{kem: "Kementrian Kesehatan", kor: "36.5"}
];

var maxX = data[data.length-1].kor;
var mapY = data.map(function(d){ return d.kem;});

var x = d3.scale.linear().range([0,wbar]).domain([0,maxX]),
    y = d3.scale.ordinal().rangeRoundBands([0, h], .1).domain(mapY);


var svgbase = d3.select("#infographic")
				.append("svg")
				.attr("width", w)
				.attr("height", h)
				.attr("class","background");


var rect = svgbase.selectAll("rect")
            .data(data).enter()
            .append("svg:g")
            .attr("class","main")
            .attr("transform","translate(0,0)");
            
      
            //.on("mouseover.rect", function(){});
                
            
        rect.append("rect")
            .attr("class","chart")
            .attr("fill","#FF0000")
            .attr("x", m[5])
            .attr("y", function(d){
                return y(d.kem);   
            })
            .attr("width", function(d){
                return x(d.kor);
            })
            .attr("height", y.rangeBand());
            
            rect.append("text")
                .attr("x", m[1])
                .attr("y", function(d){
                    return y(d.kem);   
                })
                .attr("dx", 0)
                .attr("dy", "1.5em")
                .attr("text-anchor", "start")
                .style("fill","#000")
                .text(function(d){
                    return d.kor+" M";
                });
                
        rect.append("rect")
            .attr("class","over")
            .attr("opacity",0.1)
            .attr("x", 0)
            .attr("y", function(d){
                return y(d.kem);   
            })
            .attr("width", wbar+350)
            .attr("height", y.rangeBand()); 
            
             rect.append("text")
                .attr("x",  wbar+m[8])
                .attr("y", function(d){
                    return y(d.kem);   
                })
                .attr("dx", 0)
                .attr("dy", "1.5em")
                .attr("text-anchor", "start")
                .style("fill","#000")
                .text(function(d,i){
                    var num = data.length - i;
                    return (num)+". "+d.kem;
                });
                
         rect.append("rect")
            .attr("class","showus")
            .attr("fill","#ffa500")
            .attr("x", wbar+m[6])
            .attr("y", function(d){
                return y(d.kem);   
            })
            .attr("width", 300)
            .attr("height", y.rangeBand())
            .on("click.rect",function(){
                var element = d3.select(this);
                
                element.transition().duration(500)
                        .attr("width",m[3]);
            });  
