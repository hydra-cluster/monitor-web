<template>
    <div class="chart-container">
        <canvas id="clusterChart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js'
export default {
    data: function () {
        return {
            tag: "CPU Load",
            chartColors: [
                'rgb(54, 162, 235)',    //blue
                'rgb(255, 159, 64)',    //orange
                'rgb(75, 192, 192)',    //green
                'rgb(255, 205, 86)',    //yellow
                'rgb(153, 102, 255)',   //purple
                'rgb(255, 99, 132)'     //red
            ]
        }
    },
    computed: {
        nodes() {
            return this.$store.getters.getNodes
        }
    },
    watch: { 
        nodes: function (updatedNodes) {
            updatedNodes.forEach((node, key) => {
              var dataset = this.chart.data.datasets.find(ds => ds.label == node.hostname)  
              if (this.$lodash.isEmpty(dataset)) {
                var newDataset = {
                    label: node.hostname,
                    borderWidth: 1,
                    borderColor: this.chartColors[key],
                    backgroundColor: this.chartColors[key],
                    fill: false,
                    minSize: 0,
                    data: [],
                }
                this.chart.data.datasets.push(newDataset)
              } else {
                if (node.status != "Online") {
                    const index = this.chart.data.datasets.indexOf(dataset)
                    this.chart.data.datasets.splice(index, 1)
                } else {
                    const param = node.params.find(p => p.label == this.tag)
                    if (this.$lodash.isEmpty(param)) {
                        return
                    }
                    var data = {
                        x: this.$moment(node.last_updated_at),
                        y: param.value
                    }
                    if (dataset.data.length > 15) {
                        dataset.data.shift()
                    }
                    dataset.data.push(data)
                }
              }
            })
            this.chart.update();
        }
    },
    mounted: function () {
        const ctx = document.getElementById("clusterChart")
        ctx.height = 250;
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            suggestedMin: 0,
                            suggestedMax: 1
                        },
                        gridLines: {
                            color: 'rgb(75, 75, 75)'
                        }
                    }],
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'second',
                            displayFormats: {
                                second: 'hh:mm:ss'
                            }
                        },
                        gridLines: {
                            color: 'rgb(75, 75, 75)'
                        }
                    }]
                },
                title: {
                    display: true,
                    text: this.tag
                }
            }
        })
    }
}
</script>

