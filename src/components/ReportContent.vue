<template>
  <div>
    <div class="col card">
      <Cash/>
    </div>
    <div class="col-lg-10 card mx-auto mt-4 mb-4">
        <Chart />
    </div>
    <div class="col card">
      <History/>
    </div>
  </div>
</template>

<script>
import History from './History'
import Chart from './Chart'
import Cash from './Cash'

// import axios from 'axios'

export default {
  components: {
    History,
    Chart,
    Cash
  },
  data () {
    return {
      dataHistory: []
    }
  },
  methods: {
    // getHistory () {
    //   axios.get('history/getall').then((response) => {
    //     this.dataHistory = response.data.data
    //     // this.meta = response.data.meta
    //     // console.log(response.data.data)
    //     // console.log(response.data.meta)
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // }
  },
  mounted () {
    // this.getHistory()
  }
}
</script>
