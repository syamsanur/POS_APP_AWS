<template>
  <div>
    <b-modal id="addmodal" title="Add New Product" hide-footer>
      <b-form @submit="addProduct()">
        <b-form-group label-cols="4" label="Enter Product Name" enctype="multipart/form-data">
          <b-form-input v-model="name_product" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label="Enter Price">
          <b-form-input v-model="price_product" required type="number"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label="Enter Date">
          <b-form-datepicker v-model="date_product" required></b-form-datepicker>
        </b-form-group>
        <b-form-group label-cols="4" label="Enter Image">
          <b-form-file v-model="image" @change="fileProcess" required></b-form-file>
        </b-form-group>
        <b-form-group label-cols="4" label="Enter Category">
          <b-form-select v-model="category_id" >
            <b-form-select-option v-for="(item, index) in dataCategory" :key="index" :value="item.id_category" required>
              {{item.name_category}}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <div class="col float-right">
          <div class="row">
            <div class="col">
              <button class="btn btn-danger btn-block ml-2 mr-2" @click="hideModal()">Cancel</button>
            </div>
            <div class="col">
              <!-- <button class="btn btn-primary btn-block ml-2 mr-2" @click="addProduct($event)">Add</button> -->
              <b-button type="submit" variant="primary" block class="ml-2 mr-2">Submit</b-button>
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
    fileProcess (event) {
      this.image = event.target.files[0].name
      // this.image = this.$refs.file.files[0]
      // console.log(this.image)
    },
    addProduct () {
      event.preventDefault()
      const fd = new FormData()
      fd.append('image', this.image)
      fd.append('name_product', this.name_product)
      fd.append('price_product', this.price_product)
      fd.append('date_product', this.date_product)
      fd.append('category_id', this.category_id)

      // for (var value of fd.values()) {
      //   console.log(value)
      // }

      this.onAddProduct(fd)
        .then((response) => {
          alert(response.data.message)
          window.location.reload()
        })
        .catch((err) => {
          alert(err)
          window.location.reload()
        })
      this.$bvModal.hide('addmodal')
    },
    hideModal () {
      this.$bvModal.hide('addmodal')
      // this.$root.$emit('bv::toggle::collapse', 'side-menu')
      this.image = null
      this.name_product = null
      this.price_product = null
      this.date_product = null
      this.category_id = null
    },
    ...mapActions({
      onAddProduct: 'FoodDrink/addProduct',
      onGetProducts: 'FoodDrink/getAllProducts'
    })
  },
  computed: {
    ...mapGetters({
      dataCategory: 'FoodDrink/getDataCategory'
    })
  }
}
</script>
