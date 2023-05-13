import {main} from "../index.js"

export function expChart(ndata,dayAmount){
        
    const chart = document.createElement("div")
   chart.id = "xp_chart"
    chart.className = "xp_chart"
    document.getElementById("chart_container").appendChild(chart)
    // <canvas id="myChart"></canvas>
    const cChart = document.createElement("canvas")
    cChart.id = "myChart"
    chart.appendChild(cChart)
    const ctx = document.getElementById('myChart').getContext('2d');

    // Generate labels from today to an older date
    const labels = [];
    const endDate = new Date(); // End date as today's date
    const startDate = new Date(); // Start date as an older date
    startDate.setDate(endDate.getDate() - dayAmount); // Assuming a span of dayAmount days
    
    for (let i = 0; i < dayAmount; i++) {
      const currentDate = new Date(endDate);
      currentDate.setDate(endDate.getDate() - i);
      const dateString = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      labels.unshift(dateString); // Add the label to the beginning of the array
    }
    
    // get start index value

    let index = 0;
    for (let i = 0; i < ndata["data"].length; i++) {
      let date = new Date(ndata["data"][i]["createdAt"]);
      if (date >= startDate) { // If the date is before or equal to startDate, break the loop
        break;
      }
      if (date <= startDate) { // If the date is before or equal to labels[0], add the amount to index
        index += ndata["data"][i]["amount"];
      }
    }
    
    const data = [];
    for (let j = 0; j < dayAmount; j++) {
      ndata["data"].forEach((Data) => {
        if (labels[j] === Data["day"]){
          index += Data["amount"]
          data.push(index)
        }
      })
      data.push(index)
    }
    
const pointRadius1 = data.map((value, index, array) => {
if (index === 0 || value !== array[index - 1]) {
  return 2; // Show point with radius 6 when the value is updated
} else {
  return 0; // Hide point by setting radius to 0 when the value is the same as the previous one
}
});
    const chartData = {
      labels: labels,
      datasets: [{
        label: 'XP Amount',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointRadius: pointRadius1,
        pointHoverRadius:0,
        showLine: true
      }]
    };
    
    // Create the chart
    const myChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'black',
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          },
          y: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: 'black',
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            enabled: true,
            callbacks: {
                label: function (context) {    
                }
              }
          }
        }
      }
    });
}