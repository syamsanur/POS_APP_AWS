<template>
  <div>
    <b-modal id="editmodal" title="Update Product" hide-footer>
      <b-form enctype="multipart/form-data">
      <!-- {{`http://localhost:4000/${item1.image}`}}
      {{`http://127.0.0.1:4000/${item1.image}`}} -->
      <!-- <b-card
          :img-src="`http://127.0.0.1:4000/${item1.image}`"
      >
      </b-card> -->
      <!-- {{item1.image}} -->
        <b-form-group label-cols="4" label="Enter Product Name">
          <b-form-input v-model="item1.name_product" :name_product="item1.name_product" required>{{item1.name_product}}</b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label="Enter Price">
          <b-form-input v-model="item1.price_product" :price_product="item1.price_product" required type="number"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label="Enter Date">
          <b-form-datepicker v-model="item1.date_product" :date_product="item1.date_product" required></b-form-datepicker>
        </b-form-group>
        <b-form-group label-cols="4" label="Enter Image">
          <b-form-file v-model="item1.image" :image="item1.image" @change="fileProcess" required></b-form-file>
        </b-form-group>
        <b-form-group label-cols="4" label="Enter Category">
          <b-form-select v-model="item1.category_id" :category_id="item1.category_id" >
            <b-form-select-option v-for="(item, index) in dataCategory" :key="index" :value="item.id_category" required>
              {{item.name_category}}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <div class="col float-right">
          <div class="row">
            <div class="col">
              <b-btn variant="danger" block class="ml-2 mr-2" @click="$bvModal.hide('editmodal')">Cancel</b-btn>
            </div>
            <div class="col">
              <b-button type="submit" @click.prevent="updated()" variant="primary" block class="ml-2 mr-2">Submit</b-button>
            </div>
          </div>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      id: null,
      file: [],
      name_product: null,
      price_product: null,
      date_product: null,
      image: null,
      category_id: null,
      category: []
    }
  },
  methods: {
    hideModal () {
      this.$bvModal.hide('editmodal')
    },
    fileProcess (event) {
      this.image = event.target.files[0]
      // this.image = this.$refs.file.files[0]
      // console.log(this.image)
    },
    updated () {
      // console.log(this.item1)
      const fd = new FormData()
      fd.append('id_product', this.item1.id_product)
      fd.append('image', this.item1.image)
      fd.append('name_product', this.item1.name_product)
      fd.append('price_product', this.item1.price_product)
      fd.append('date_product', this.item1.date_product)
      fd.append('category_id', this.item1.category_id)
      this.onUpdateProduct(fd)
        .then((response) => {
          alert(response)
          window.location.reload()
        })
        .catch((err) => {
          alert(err)
        })

      // for (var value of fd.values()) {
      //   console.log(value)
      // }

      // console.log('hola')
    },
    ...mapActions({
      onGetOneProducts: 'FoodDrink/getOneProduct',
      onUpdateProduct: 'FoodDrink/updateProduct'
    })
  },
  computed: {
    ...mapGetters({
      item1: 'FoodDrink/getOneProduct',
      dataCategory: 'FoodDrink/getDataCategory'
    })
  },
  mounted () {
  }
}
</script>
