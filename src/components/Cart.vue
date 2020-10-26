<template>
  <div>
    <div class="card mb-4" v-for="(itemCart, index) in dataCart" :key="index">
        <div class="row">
          <div class="col">
            <b-card :img-src="`http://54.165.103.215:3001/${itemCart.image}`" img-alt="Image" no-body></b-card>
          </div>
          <div class="col text-center">
            <div class="col">
              <h5>{{itemCart.name_product}}</h5>
              <h6>Rp{{itemCart.price_product}}</h6>
            </div>
              <b-col>
                <b-btn-group>
                  <b-btn size="sm" variant="outline-success" @click="$emit('minus', index)">-</b-btn>
                  <b-btn size="sm" variant="success" disabled>{{itemCart.qty}}</b-btn>
                  <b-btn size="sm" variant="outline-success" @click="$emit('plus', index)">+</b-btn>
                </b-btn-group>
              </b-col>
          </div>
        </div>
      </div>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      dataCart: 'Cart/getCart'
    })
  }
}
</script>
