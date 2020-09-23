<template>
  <div class="mt-3">
    <div class="row">
      <div class="col-12 col-lg-8">
        <b-col class="border bg-white">
          <b-row v-searchWarna="'#4A235A'">
          <div class="col p-3">
            <b-input-group>
              <b-form-input type="text" placeholder="Search" v-model="name"></b-form-input>
              <b-btn variant="light" @click="searchProduct()">
                <b-icon icon="search"></b-icon>
              </b-btn>
            </b-input-group>
          </div>
          <div class="col p-3 text-right mr-3">
            <b-dropdown id="dropdown-1" right text="Sort" variant="success">
              <b-dropdown-item @click="fetchApi(sortBy=('id_product'))">Default</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="fetchApi(sortBy=('name_product'))" >{{select}} Name</b-dropdown-item>
              <b-dropdown-item @click="fetchApi(sortBy=('price_product'))">{{select}} Price</b-dropdown-item>
              <b-dropdown-item @click="fetchApi(sortBy=('date_product'))">{{select}} Date</b-dropdown-item>
              <b-dropdown-item @click="fetchApi(sortBy=('category_product'))">{{select}} Category</b-dropdown-item>
            </b-dropdown>
          </div>
          </b-row>
        <!-- end Seacrh Sort -->
        </b-col>
        <div class="col border">
          <div class="row justify-content-center align-items-center">
            <div class="p-3 text-center" v-if="dataProducts.isLoading">
              <h3 class="mt-5">
                <b-icon icon="arrow-clockwise" animation="spin" font-scale="4"></b-icon>
                <b>Loading ....</b></h3>
            </div>
            <div class="p-3 text-center" v-else-if="dataProducts.data.length === 0">
                <b-img src="https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg"/>
                <b-btn variant="outline-danger" block @click="fetchApi"><b>MEH</b></b-btn>
            </div>
            <div v-else class="p-3 text-center" v-for="(item, index) in dataProducts.data" :key="index">
              <Item :product="item" @idDelProduct="delProduct" @idEditProduct="edProduct" @idCart="cartProduct"/>
            </div>
          </div>
        </div>
        <EditModal :propsId="idProduct"/>
      </div>
      <!-- CART -->
      <div class="col-12 col-lg-4 mt-lg-0 mt-5">
        <div class="col border">
          <div class="row justify-content-center ">
            <div><h4>CART</h4></div>
            <div class="mt-1 mb-1 ml-2 mr-2"><b-badge pill variant="primary">{{this.cart.length}}</b-badge></div>
          </div>
          <div class="text-center p-2">
            <div class="col mt-4" v-if="this.cart.length === 0">
                <div class="col-12 p-3 mt-2 text-center">
                  <div class="col">
                    <img src="../assets/food-and-restaurant.png" />
                  </div>
                  <div class="col">
                    <h3 class="mb-5">
                      <b>Your Cart is Empty</b>
                    </h3>
                    <h6>Please Add Some Item</h6>
                  </div>
                </div>
              </div>
              <!-- ISI CART -->
              <div class="col mt-" >
                <div class="col-12 p-3 mt-2 text-center" v-for="(item, index) in this.cart" :key="index">
                  <Cart :itemCart="item"/>
                </div>
                <b-row align-v="end" v-if="this.cart.length !== 0">
                    <div class="col-lg-12 mt-5 mb-2">
                      <div class="row">
                        <div class="col-lg">
                          <div class="row">
                            <div class="col-lg-8 col-8">
                              <h5 class="float-left">Total:</h5>
                            </div>
                            <div class="col-lg-4 col-4">
                              <h6 class="float-right">Rp. {{this.total}}</h6>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <p class="float-left">*Belum Termasuk Ppn</p>
                        </div>
                        <div class="col-lg-12">
                          <button
                            class="btn btn-primary btn-outline-light btn-block mt-2"
                            v-b-modal.modalCheckOut
                          >Checkout</button>
                        </div>
                        <div class="col-lg-12">
                          <button class="btn btn-danger btn-outline-light btn-block mt-2 mb-2" @click="reset">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </b-row>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './Item'
import EditModal from './EditModal'
import Cart from './Cart'

import mix from '../mixins/index'

import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  data () {
    return {
      idProduct: null,
      name: '',
      sortBy: null,
      typesort: 'ASC',
      cart: [],
      total: null
    }
  },
  mixins: [mix],
  components: {
    Item,
    EditModal,
    Cart
  },
  methods: {
    fetchApi () {
      // console.log(this.sortBy)
      this.onGetProducts(this.sortBy)
    },
    searchProduct () {
      if (this.name !== '') {
        this.findProduct(this.name)
      } else {
        this.fetchApi()
      }
      this.name = ''
    },
    cartProduct (payload) {
      // console.log(payload)
      this.idProduct = payload
      // console.log(this.idProduct)

      const qwe = this.cart.filter(e => e.id_product === this.idProduct)
      if (qwe.length === 0) {
        const data = this.dataProducts.data.filter(e => e.id_product === payload)
        data[0].qty = 1
        this.cart = [...this.cart, data[0]]
      } else {
        const newData = this.cart.map(e => {
          if (e.id_product === this.idProduct) {
            e.qty += 1
          }
          return e
        })
        this.cart = newData
      }

      // console.log(this.cart)
      this.total = this.cart.map(e => e.price_product)
      // console.log(this.total)
      this.total = this.total.reduce((a, b) => {
        return a + b
      }, 0)
      // console.log(this.total)
    },
    reset () {
      this.cart = []
    },
    delProduct (payload) {
      // console.log(payload)
      this.onDeleteProduct(payload)
        .then((response) => {
          alert(response.message)
          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
          window.location.reload()
        })
    },
    edProduct (payload) {
      this.idProduct = payload
      // console.log(`${payload} dari component`)
      this.onGetOneProduct(this.idProduct)
        .then((response) => {
          // console.log(response)
          this.$bvModal.show('editmodal')
          // window.location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    ...mapActions({
      onGetProducts: 'FoodDrink/getAllProducts',
      onGetOneProduct: 'FoodDrink/getOneProduct',
      onGetCategory: 'FoodDrink/getCategory',
      onDeleteProduct: 'FoodDrink/deleteProduct',
      findProduct: 'FoodDrink/getFindProduct'
    })
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters({
      dataProducts: 'FoodDrink/getAllProducts',
      dataOneProduct: 'FoodDrink/getOneProduct',
      dataCategory: 'FoodDrink/getDataCategory'
    })
  },
  mounted () {
    this.fetchApi()
    this.onGetCategory()
  }
}
</script>
