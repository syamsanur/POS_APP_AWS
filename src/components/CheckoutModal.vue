<template>
  <div>
    <b-modal id="modalcheckout" title="CheckOut" hide-footer>
      <div class="row">
        <div class="col-12">
          <div class="row mb-3">
            <div class="col-6">
              <h6 >Cashier : {{cashier}}</h6>
            </div>
            <div class="col-6">
              <h6>Receipt no: {{invoices_history}}</h6>
            </div>
          </div>
        </div>
        <!-- {{dataCart}} -->
        <div class="col-12 mt-4">
          <div class="row" v-for="(itemCart, index) in dataCart" :key="index">
            <div class="col-8" :name_product="itemCart.name_product">
              <h5>{{itemCart.name_product}} {{itemCart.qty}}x:</h5>
            </div>
            <div class="col-4" :price_product="itemCart.price_product">
              <h5>Rp.{{itemCart.amount}} </h5>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-8 mt-3">
              <h5 class="float-right">Total:</h5>
            </div>
            <div class="col-4 mt-3">
              <h5>Rp.{{dataTotal}}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mt-4">
        <div class="row mx-auto text-center">
          <div class="col-12">
              <div class="btn btn-outline-light d-block" @click="addHistory" id="buttonPink">Proceed</div>
          </div>
          <!-- <div class="col-12 mt-1 mb-1">
              <h6><b>Or</b></h6>
          </div>
          <div class="col-12">
              <div class="btn btn-outline-light d-block" data-dismiss="modal" id="buttonGreen">Send Email</div>
          </div> -->
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
      total: null,
      cashier: 'Prilly Latuconsina',
      invoices_history: '#010410919'
    }
  },
  methods: {
    addHistory () {
      const detail = this.dataCart.map(e => {
        const dataDetail = {
          id_product: e.id_product,
          product_name: e.name_product,
          qty: e.qty,
          price: e.price_product
        }
        return dataDetail
      })
      const data = {
        invoices_history: 1,
        cashier_history: this.cashier,
        amount_history: this.dataTotal,
        detail: detail
      }
      this.onAddHistory(data)
        .then((response) => {
          if (response === 'Add history success') {
            alert('Checkout success')
          }
          window.location.reload()
        })
        .catch((err) => {
          alert(err.data.messege)
        })
    },
    ...mapActions({
      onAddHistory: 'Cart/insert'
    })
  },
  computed: {
    ...mapGetters({
      dataCart: 'Cart/getCart',
      dataTotal: 'Cart/getTotal'
    })
  }
}
</script>

<style scoped>
#buttonGreen{
    background: #57CAD5;
}

#buttonPink{
    background:#F24F8A;
}
</style>
