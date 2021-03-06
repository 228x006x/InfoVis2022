d3.csv("https://228x006x.github.io/InfoVis2022/Finaltask/FEI.csv")
    .then( data => {
        data.forEach( (d,i) => {
          d.population1998 =+d.population1998, 
          d.under15age1998 =+d.under15age1998,
          d.age15to641998 =+d.age15to641998,
          d.over65age1998 =+d.over65age1998,
          d.population2019 =+d.population2019, 
          d.under15age2019 =+d.under15age2019,
          d.age15to642019 =+d.age15to642019,
          d.over65age2019 =+d.over65age2019,
          d.index = i;  });

        const barchart = new BarChart({ 
            parent: '#drawing_region_barchart',
            width: 600,
            height: 600,
            margin: {top:10, right:50, bottom:50, left:80},
            xlabel: 'xlabel',
            ylabel: 'ylabel',
            title: "title",
            }, data);
        
        const scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 600,
            height: 600,
            margin: {top:10, right:10, bottom:50, left:80},
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
              data.sort((a, b) => a.population1998 - b.population1998)
              }else if (num == 2){
                data.sort((a, b) => a.under15age1998 - b.under15age1998)
              }else if (num == 3){
                data.sort((a, b) => a.age15to641998 - b.age15to641998)
              }else if (num == 4){
                data.sort((a, b) => a.over65age1998 - b.over65age1998)
              }else if (num == 5){
                data.sort((a, b) => a.population2019 - b.population2019)
              }else if (num == 6){
                data.sort((a, b) => a.under15age2019 - b.under15age2019)
              }else if (num == 7){
                data.sort((a, b) => a.age15to642019 - b.age15to642019)
              }else if (num == 8){
                data.sort((a, b) => a.over65age2019 - b.over65age2019)
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
              data.sort((a, b) => b.population1998 - a.population1998)
              }else if (num == 2){
              data.sort((a, b) => b.under15age1998 - a.under15age1998)
              }else if (num == 3){
                data.sort((a, b) => b.age15to641998 - a.age15to641998)
              }else if (num == 4){
                data.sort((a, b) => b.over65age1998 - a.over65age1998)
              }else if (num == 5){
                data.sort((a, b) => b.population2019 - a.population2019)
              }else if (num == 6){
                data.sort((a, b) => b.under15age2019 - a.under15age2019)
              }else if (num == 7){
                data.sort((a, b) => b.age15to642019 - a.age15to642019)
              }else if (num == 8){
                data.sort((a, b) => b.over65age2019 - a.over65age2019)
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
