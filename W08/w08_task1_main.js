d3.csv("https://228x006x.github.io/InfoVis2022/W08/data2.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; d.label = +d.label; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:25, right:10, bottom:50, left:50},
            title: 'BarChart',
            xlabel: 'X label',
            ylabel: 'Y label'
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

class BarChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
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
            .range( [ 0, self.inner_height] );
    
        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(6);
    
        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(6);
    
        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)
            .call( xaxis);

        self.yaxis_group = self.chart.append('g')
            .call( yaxis);
        
        const title_space = 10;
        self.svg.append('text')
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top - title_space)
            .text( self.config.title );
    
        const xlabel_space = 40;
        self.svg.append('text')
            .attr('x', self.config.width / 2)
            .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
            .text( self.config.xlabel );
    
        const ylabel_space = 50;
        self.svg.append('text')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - ylabel_space)
            .attr('x', -(self.config.height / 2))
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text( self.config.ylabel );        
    }
    
    update() {
        let self = this;
    
        const xmin = d3.min( self.data, d => d.value );
        const xmax = d3.max( self.data, d => d.value );
        self.xscale.domain( [xmin, xmax] );
    
        const ymin = d3.min( self.data, 0 );
        const ymax = d3.max( self.data, d => d.label );
        self.yscale.domain( [ymax, ymin] );
    
        self.render();
    }
    
    render() {
        let self = this;
    
        self.chart.selectAll("rect")
            .data(self.data)
            .enter()
            .append("rect")
            .attr("x", d => self.xscale( d.value ) )
            .attr("y", d => self.yscale( d.label ) )
            .attr("width", d => self.xscale( d.value) )
            .attr("height", yscale.bandwidth());
    
        
    }
}
    