<template>
  <div>
    <div class="col-lg mb-4 mt-4">
      <h4>Recent Order</h4>
    </div>
    <div class="col-lg-12 col-12 mt-3">
      <div class="table-responsive-sm">
        <table class="table">
          <thead>
            <tr>
              <th><b>Invoice</b></th>
              <th><b>Cashier</b></th>
              <th><b>Date</b></th>
              <th><b>Amount</b></th>
              <th><b>Detail</b></th>
            </tr>
          </thead>
          <tbody>
            <!-- {{dataHistory}} -->
            <tr v-for="(item, index) in dataHistory " :key="index">
              <td>#{{item.id_history}}</td>
              <td>{{item.cashier_history}}</td>
              <td>{{item.date_history}}</td>
              <td>{{item.amount_history}}</td>
              <td>
                <b-btn variant="info" size="sm" @click="getDetail(item.id_history)">Detail</b-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <b-modal id="product-collapse" title="Detail">
      <div class="row">
        <div class="col-12">
          <div class="row" v-for="(itemCart, index) in detailHistory" :key="index">
            <div class="col-8" :name_product="itemCart.name_product">
              <h5>{{itemCart.product_name}} {{itemCart.qty}}x:</h5>
            </div>
            <div class="col-4" :price_product="itemCart.price_product">
              <h5>Rp.{{itemCart.price}} </h5>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      detailHistory: null
    }
  },
  methods: {
    getDetail (payload) {
      this.$bvModal.show('product-collapse')
      // console.log(this.dataHistoryJoin)
      const detail = this.dataHistoryJoin.filter((e) => e.id_history === payload)
      this.detailHistory = detail
    },
    ...mapActions({
      onGetHistory: 'History/getHistory',
      onGetHistoryJoin: 'History/getHistoryJoin'
    })
  },
  computed: {
    ...mapGetters({
      dataHistory: 'History/getHistory',
      dataHistoryJoin: 'History/getHistoryJoin'
    })
  },
  mounted () {
    this.onGetHistory()
    this.onGetHistoryJoin()
  }
}
</script>

<style scoped>
td{
  color:#CECECE
}
</style>
