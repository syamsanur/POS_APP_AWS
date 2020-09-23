<template>
  <div>
    <div class="col mt-4 mb-4">
      <h4>Revenue</h4>
    </div>
    <div class="col">
      <canvas id="my-chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  data () {
    return {
      bar: null
    }
  },
  methods: {
    renderChart () {
      this.bar = new Chart(document.getElementById('my-chart'), {
        type: 'line',
        data: {
          labels: ['', '', '', '', '', '', '  '],
          datasets: [
            {
              label: 'This Month',
              fill: false,
              borderColor: '#00F1FF',
              data: [0, 20, 10, 29, 21, 40, 15, 42]
            },
            {
              label: 'Last Month',
              fill: false,
              borderColor: 'red',
              data: [10, 30, 5, 35, 38, 12, 21, 12]
            }
          ]
        },
        options: {
          legend: {
            display: true,
            position: 'bottom'
          },
          scales: {
            xAxes: [{
              display: false
            }]
          },
          elements: {
            line: {
              tension: 0
            }
          }
        }
      })
    }
  },
  mounted () {
    this.renderChart()
  }
}
</script>
