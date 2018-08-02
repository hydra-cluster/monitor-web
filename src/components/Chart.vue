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
            tag: "CPU Load"
        }
    },
    computed: {
        nodes() {
            return this.$store.getters.getNodes
        }
    },
    watch: { 
        nodes: function (updatedNodes) {
            updatedNodes.forEach(node => {
              var dataset = this.chart.data.datasets.find(ds => ds.label == node.hostname)  
              if (this.$lodash.isEmpty(dataset)) {
                var newDataset = {
                    label: node.hostname,
                    borderWidth: 1,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgb(255, 99, 132)',
                    fill: false,
                    minSize: 0,
                    data: [],
                }
                this.chart.data.datasets.push(newDataset)
              } else {
                if (node.status == "Offline") {
                    const index = this.chart.data.datasets.indexOf(dataset)
                    this.chart.data.datasets.splice(index, 1)
                    console.log("Offline: index = "+ index)
                } else {
                    var data = {
                        x: this.$moment(node.last_updated_at),
                        y: node.params.find(p => p.label == this.tag).value
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

