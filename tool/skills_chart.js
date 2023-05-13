import {main} from "../index.js"
export function skillChart(dataArray){
    const polarChart = document.createElement("div")
    polarChart.id = "skill_chart"
    polarChart.className = "skill_chart"
    document.getElementById("chart_container").appendChild(polarChart)
    // <canvas id="myChart"></canvas>
    const polarC = document.createElement("canvas")
    polarC.id = "polarC"
    polarChart.appendChild(polarC)

    const ctx = document.getElementById('polarC').getContext('2d');
    const data = {
      labels: dataArray[0],
      datasets: [{
        data: dataArray[1],
        backgroundColor: dataArray[2],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 0,
      }],
    };
    const options = {
      elements: {
        point: {
          display: true,
          pointStyle: 'circle',
          radius: 2, // Set the radius of the points to 0
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
      scale: {
        pointLabels: {
          display: true,
          font: {
            size: 2,
            weight: 'bold'
          }
        }
      },
      pointLabels: {
        display: true,
        font: {
          size: 14,
          weight: 'bold',
        },
        callback: (value, index) => {
          return value + ' kb'; // Append ' kb' to the point label
        },
      },
    }

    const myChart = new Chart(ctx, {
      type: 'polarArea',
      data: data,
      options:options ,
    });
    
  }