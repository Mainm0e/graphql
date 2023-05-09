import {studentInfoData
,studentXpChart
} from "./payload.js";
import {chartData} from "./tool/chart_data.js"
import {convertCreatedAtToNewFormat} from "./tool/convert.js"
import {main} from "./index.js";
import {getData} from "./tool/getApi.js"
export default class Student {
    constructor(){
        this.token = localStorage.getItem("jwt")
        document.title = "Student"
        this.id = null
        this.name = null
        this.transactionData = null
        this.fetchData()
        .then(() => {
            this.main()
        }
        )
    }
    main(){
        this.makeChart(chartData(this.transactionData))
    }
     makeBox(){
        return`
        <p>${this.id},${this.name}</p>`
    }
    makeChart(ndata){
        console.log("ndata",ndata.length)
        this.chart = document.createElement("div")
        this.chart.id = "xp_chart"
        this.chart.className = "xp_chart"
        main.appendChild(this.chart)
        // <canvas id="myChart"></canvas>
        this.Chart = document.createElement("canvas")
        this.Chart.id = "myChart"
        this.chart.appendChild(this.Chart)
        const ctx = document.getElementById('myChart').getContext('2d');

        // Generate labels from today to an older date
        const labels = [];
        const endDate = new Date(); // End date as today's date
        const startDate = new Date(); // Start date as an older date
        startDate.setDate(endDate.getDate() - 90); // Assuming a span of 90 days
        
        for (let i = 0; i < 90; i++) {
          const currentDate = new Date(endDate);
          currentDate.setDate(endDate.getDate() - i);
          const dateString = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          labels.unshift(dateString); // Add the label to the beginning of the array
        }
        
        // Generate data for each day
        let index = 0;
        const data = [];
        for (let j = 0; j < 90; j++) {
          if (labels[j] ==="Feb 20"){ //this.xpChart["xp"][index]["date"]
            index += 10;
            data.push(index);
          }else if (labels[j] ==="Feb 21"){ //this.xpChart["xp"][index]["date"]
            index += 100;
            data.push(index);
          }else{
            data.push(index);
          }
        }
        
const pointRadius1 = data.map((value, index, array) => {
    if (index === 0 || value !== array[index - 1]) {
      return 6; // Show point with radius 6 when the value is updated
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
                      const pointRadius = context.raw.pointRadius;
                      if (pointRadius === 6) {
                        const label = context.dataset.label || '';
                        const value = context.raw.y || '';
                        return label + ': ' + value;
                      } else {
                        return ''; // Empty string for hiding tooltips
                      }
                    }
                  }
              }
            }
          }
        });
    }
    testData(){
        console.log(this.transactionData)
    }
    async fetchData(){
        const student = await getData(studentInfoData, this.token)
        this.id = student["user"][0]["id"]
        this.name = student["user"][0]["login"]
        let data = await getData(studentXpChart(this.id),this.token)
        data["transaction"].sort(function(a, b) {
            var dateA = new Date(a.createdAt);
            var dateB = new Date(b.createdAt);
            return dateA - dateB;
          });
          data["transaction"] = convertCreatedAtToNewFormat(data["transaction"])
          console.log("data",data)
        this.transactionData = data
    }
}