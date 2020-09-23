<template>
  <div>
    <b-card
        :img-src="`http://54.165.103.215:3001/${product.image}`"
        img-alt="Image"
        style="max-width: 20rem;"
        no-body
      >
        <b-card-text>
          <h6>{{product.name_product}}</h6>
          <h6>Rp.{{product.price_product}}</h6>
          <div class="row mx-auto">
            <div class="col">
              <b-dropdown dropup variant="light" block no-caret>
                 <template v-slot:button-content>
                    <b-icon icon="three-dots"></b-icon>
                  </template>
                  <b-dropdown-item>
                    <b-btn variant="outline-warning" block @click="edProduct()">
                      <b-icon icon="card-list"></b-icon>
                    </b-btn>
                  </b-dropdown-item>
                  <b-dropdown-item-btn>
                    <b-btn variant="outline-danger" block @click="delProduct()">
                      <b-icon icon="trash"></b-icon>
                    </b-btn>
                  </b-dropdown-item-btn>
              </b-dropdown>
            </div>
            <b-col class="btn btn-outline-primary btn-lg btn-block" @click="cartProduct(product.id_product)" >
              <b-icon icon="cart-plus"></b-icon>
            </b-col>
          </div>
        </b-card-text>
      </b-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      idCart: null
    }
  },
  props: [
    'product'
  ],
  methods: {
    cartProduct (payload) {
      this.idCart = payload
      // console.log(this.idCart)
      this.$emit('idCart', this.idCart)
    },
    delProduct () {
      this.$emit('idDelProduct', this.product.id_product)
    },
    edProduct () {
      this.$emit('idEditProduct', this.product.id_product)
    }
  }
}
</script>

<style scoped>
img {
  width: 250px;
  height: 200px;
}
</style>
