<template>
  <div>
    <div class="card">
        <div class="row">
          <div class="col">
            <b-card :img-src="`http://54.165.103.215:3001/${itemCart.image}`" img-alt="Image" no-body></b-card>
          </div>
          <div class="col text-center">
            <div class="col">
              <h4>{{itemCart.name_product}}</h4>
              <h6>Rp{{itemCart.price_product}}</h6>
            </div>
              <b-col>
                <b-btn-group>
                  <b-btn size="sm" variant="outline-success">-</b-btn>
                  <b-btn size="sm" variant="success" disabled>{{itemCart.qty}}</b-btn>
                  <b-btn size="sm" variant="outline-success" @click="$emit('plus', index)">+</b-btn>
                </b-btn-group>
              </b-col>
          </div>
        </div>
      </div>

      <!-- <div class="card">
        <div class="row">
          <div class="col border">
            <b-img :src="`http://127.0.0.1:4000/${itemCart.image}`"></b-img>
            gambar
          </div>
          <div class="col">
            <div class="col border">a</div>
            <div class="col border">b</div>
          </div>
        </div>
      </div> -->

  </div>
</template>

<script>

export default {
  components: {
  },
  props: ['itemCart', 'index']
}
</script>
