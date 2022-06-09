d3.csv("https://228x006x.github.io/InfoVis2022/Finaltask/FEI.csv")
    .then( data => {
        data.forEach( (d,i) => {
          d.population = +d.population, 
          d.under15age =+d.under15age,
          

          d.index = i;  });

        const barchart = new BarChart({ 
            parent: '#drawing_region_barchart',
            width: 600,
            height: 600,
            margin: {top:10, right:50, bottom:50, left:100},
            xlabel: 'xlabel',
            ylabel: 'ylabel',
            title: "title",
            }, data);
        
        const scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 600,
            height: 600,
            margin: {top:10, right:10, bottom:50, left:100},
            xlabel: 'Sepal length [cm]',
            ylabel: 'Sepal width [cm]',
            }, data );
        
        d3.select('#original')
          .on('click', d => {
            data.sort((a, b) => a.index - b.index);
            barchart.update();
        });
        
        d3.select('#reverse')
        .on('click', d => {
            data.reverse();
            barchart.update();
        });
    
        d3.select('#ascend')
        .on('click', d => {
            const BarData = document.getElementById('BarValue');
            const num = BarData.selectedIndex;
            const str = BarData.options[num].value;
            //データの追加
              if(num == 1){
              data.sort((a, b) => a.population - b.population)
              }else if (num == 2){
                data.sort((a, b) => a.under15age - b.under15age)
              }else if (num == 3){
                data.sort((a, b) => a.age15to64 - b.age15to64)
              }else if (num == 4){
                data.sort((a, b) => a.over65age - b.over65age)
              }
              barchart.update();
        });

        d3.select('#descend')
        .on('click', d => {
            const BarData = document.getElementById('BarValue');
            const num = BarData.selectedIndex;
            const str = BarData.options[num].value;
            //データの追加
              if(num == 1){
              data.sort((a, b) => b.population - a.population)
              }else if (num == 2){
              data.sort((a, b) => b.under15age - a.under15age)
              }else if (num == 3){
                data.sort((a, b) => a.age15to64 - b.age15to64)
              }else if (num == 4){
                data.sort((a, b) => a.over65age - b.over65age)
              }
              barchart.update();
        });

        d3.select('#Decision1')
        .on('click', d => {
            const BarData = document.getElementById('BarValue');
            const num = BarData.selectedIndex;
            const str = BarData.options[num].value;
            barchart.update()
            document.getElementById("span1").textContent = str;   
        });

        d3.select('#Decision2')
        .on('click', d => {
            const HorizontalData = document.getElementById('HorizontalValue');
            const Horizontalnum = HorizontalData.selectedIndex;
            const Horizontalstr = HorizontalData.options[Horizontalnum].value;
            scatter_plot.update();
            document.getElementById("span2").textContent = Horizontalstr; 
        });

        d3.select('#Decision3')
        .on('click', d => {
            const VerticalData = document.getElementById('VerticalValue');
            const Verticalnum = VerticalData.selectedIndex;
            const Verticalstr = VerticalData.options[Verticalnum].value;
            scatter_plot.update();
            document.getElementById("span3").textContent = Verticalstr; 
        });

        d3.select('#Decision4')
        .on('click', d => {
            barchart.update()
            scatter_plot.update();    
        });

        d3.select('#Decision5')
        .on('click', d => {
            data.forEach( (d,i) =>{
            d.color = 'steelblue'
        });
            barchart.update()
            scatter_plot.update();    
        });
        
        d3.select('#radius-slider')
        .on('input', function() {
            data.forEach( (d,i) =>{
            d.radius = this.value
        });
            scatter_plot.update(); 
            d3.select('#radius-value').text(this.value);
        });

        

    })
    .catch( error => {
        console.log( error );
    });
