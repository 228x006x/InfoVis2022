class ScatterPlot {
    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || '',
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;
        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);
        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );
        self.yscale = d3.scaleLinear()
            .range( [self.inner_height, 0] );
        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(6)
            .tickSize(6)
            .tickPadding(6);
        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(6)
            .tickSize(6)
            .tickPadding(6);
        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);
        self.yaxis_group = self.chart.append('g')
             .attr('transform', `translate( ${self.inner_width}),0`);
        const xlabel_space = 35;
        self.svg.append('text')
            .style('font-size', '10px')
            .attr('x', self.config.margin.left + self.inner_width / 2)
            .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
            .attr('text-anchor', 'middle')
            .text(  );
        const ylabel_space = 40;
        self.svg.append('text')
            .style('font-size', '10px')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - ylabel_space -30 )
            .attr('x', -self.config.margin.top - self.inner_height / 2)
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text(  );
}

    update() {
        let self = this;
        const HorizontalData = document.getElementById('HorizontalValue');
        const Horizontalnum = HorizontalData.selectedIndex;
        const Horizontalstr = HorizontalData.options[Horizontalnum].value;
        //??????????????????
        if (Horizontalnum == 1){
            self.xvalue = d => d.population1998	;
        }else if(Horizontalnum == 2){
            self.xvalue = d => d.under15age1998	;
        }else if(Horizontalnum == 3){
            self.xvalue = d => d.age15to641998	;
        }else if(Horizontalnum == 4){
            self.xvalue = d => d.over65age1998	;
        }else if(Horizontalnum == 5){
            self.xvalue = d => d.population2019	;
        }else if(Horizontalnum == 6){
            self.xvalue = d => d.under15age2019	;
        }else if(Horizontalnum == 7){
            self.xvalue = d => d.age15to642019	;
        }else if(Horizontalnum == 8){
            self.xvalue = d => d.over65age2019	;
        }else{
            self.xvalue = d => d.population1998	;
        }

        const VerticalData = document.getElementById('VerticalValue');
        const Verticalnum = VerticalData.selectedIndex;
        const Verticalstr = VerticalData.options[Horizontalnum].value;
        //??????????????????
        if (Verticalnum == 1){
            self.yvalue = d => d.population1998	;
        }else if(Verticalnum == 2){
            self.yvalue = d => d.under15age1998	;
        }else if(Verticalnum == 3){
            self.yvalue = d => d.age15to641998	;
        }else if(Verticalnum == 4){
            self.yvalue = d => d.over65age1998	;
        }else if(Verticalnum == 5){
            self.yvalue = d => d.population2019	;
        }else if(Verticalnum == 6){
            self.yvalue = d => d.under15age2019	;
        }else if(Verticalnum == 7){
            self.yvalue = d => d.age15to642019	;
        }else if(Verticalnum == 8){
            self.yvalue = d => d.over65age2019	;
        }else{
        self.yvalue = d => d.population1998	;
        }
        
        const xmin = d3.min( self.data, self.xvalue );
        const xmax = d3.max( self.data, self.xvalue );
        self.xscale.domain( [0, xmax] );
        const ymin = d3.min( self.data, self.yvalue );
        const ymax = d3.max( self.data, self.yvalue );
        self.yscale.domain( [0, ymax] );
        self.render();
}

    render() {
        let self = this;
        let circles = self.chart.selectAll("circle")
            .data(self.data)
            .join('circle');
            
        const circle_color = 'steelblue';
        const circle_radius = 10;
        circles
            .transition().duration(1000)
            .attr("r",d => d.radius || 10 )
            .attr("cx", d => self.xscale( self.xvalue(d) ) )
            .attr("cy", d => self.yscale( self.yvalue(d) ) )
            .attr('fill', d => d.color || 'steelblue');

        circles
            .on('mouseover', (e,d) => {
                d3.select('#tooltip')
                .style('opacity', 1)
                .html(`<div class="tooltip-label">${d.area}</div>(${self.xvalue(d)}, ${self.yvalue(d)})`);
            })
            .on('mousemove', (e) => {
                const padding = 10;
                d3.select('#tooltip')
                .style('left', (e.pageX + padding) + 'px')
                .style('top', (e.pageY + padding) + 'px');
            })
            .on('mouseleave', () => {
                d3.select('#tooltip')
                .style('opacity', 0);
            });
            
        self.xaxis_group
            .call( self.xaxis );
        self.yaxis_group
            .call( self.yaxis );
    }
}