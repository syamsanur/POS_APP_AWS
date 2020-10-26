<template>
  <div class="mt-3">
    <div class="row">
      <div class="col-12 col-lg-8">
        <b-col class="border bg-white">
          <b-row v-searchWarna="'#4A235A'">
          <div class="col-12 col-lg-8 p-3">
            <b-input-group>
              <b-form-input
                id="input-1"
                type="text"
                v-model="name"
                placeholder="Search"
              ></b-form-input>
              <div class="btn btn-primary" @click="getFilter">
                <b-icon icon="search"></b-icon>
              </div>
            </b-input-group>
          </div>
          <div class="col-2 col-lg-1 offset-lg-1 p-3 text-right">
            <button class="btn btn-secondary" @click="resetFilter">Reset</button>
          </div>
          <div class="col-10 col-lg-2 p-3 text-right">
            <b-dropdown id="dropdown-1" right text="Sort" variant="success">
              <b-dropdown-item @click="getFilter(sortBy=('id_product'))">Default</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="getFilter(sortBy=('name_product'))" >{{select}} Name</b-dropdown-item>
              <b-dropdown-item @click="getFilter(sortBy=('price_product'))">{{select}} Price</b-dropdown-item>
              <b-dropdown-item @click="getFilter(sortBy=('date_product'))">{{select}} Date</b-dropdown-item>
              <b-dropdown-item @click="getFilter(sortBy=('category_product'))">{{select}} Category</b-dropdown-item>
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
            <div class=" col-12 p-3 text-center" v-else-if="dataProducts.data.length === 0">
                <b-img class="img404" src="https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg"/>
                <b-btn variant="outline-danger" block @click="resetFilter"><b>MEH</b></b-btn>
            </div>
            <div v-else class="p-3 text-center" v-for="(item, index) in dataProducts.data" :key="index">
              <Item :product="item" @idDelProduct="delProduct" @idEditProduct="edProduct" @idCart="cartProduct"/>
            </div>
          </div>
          <div class="row">
            <div class="col mt-4 mb-4 text-center">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-primary" @click="paginationBack"> Back </button>
                <button type="button" class="btn btn-outline-primary btn-lg disabled">{{this.page}}</button>
                <button type="button" class="btn btn-outline-primary" @click="paginationNext"> Next </button>
              </div>
            </div>
          </div>
        </div>
        <EditModal :propsId="idProduct"/>
      </div>
      <!-- CART -->
      <div class="col-12 col-lg-4 mt-lg-0 mt-5">
        <div class="col border">
          <div class="row justify-content-center mt-3">
            <div><h4>CART</h4></div>
            <div class="mt-1 mb-1 ml-2 mr-2"><b-badge pill variant="primary">{{this.cart.length}}</b-badge></div>
          </div>
          <div class="text-center ">
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
              <div v-else class="col mt-" >
                <div class="col-12 p-3 mt-2 text-center">
                  <Cart @plus="plus" @minus="minus"/>
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
                              <h6 class="float-right">Rp. {{dataTotal}}</h6>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <p class="float-left">*Belum Termasuk Ppn</p>
                        </div>
                        <div class="col-lg-12">
                          <button
                            class="btn btn-primary btn-outline-light btn-block mt-2"
                            v-b-modal.modalcheckout
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
    <Checkout />
  </div>
</template>

<script>
import Item from './Item'
import EditModal from './EditModal'
import Cart from './Cart'
import Checkout from './CheckoutModal'

import mix from '../mixins/index'

import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      idProduct: null,
      name: '',
      sortBy: null,
      typesort: 'ASC',
      cart: [],
      total: null,
      page: 1
    }
  },
  mixins: [mix],
  components: {
    Item,
    EditModal,
    Cart,
    Checkout
  },
  methods: {
    fetchApi () {
      this.onGetProducts()
    },
    getFilter () {
      const data = {
        name: this.name,
        sorting: this.sortBy,
        page: this.page
      }
      this.$router.push({
        path: '/home',
        query: { name: this.name, page: this.page, sorting: this.sortBy }
      })
      this.onFilter(data)
    },
    resetFilter () {
      const data = {
        name: '',
        sorting: 'id_product',
        page: 1
      }
      this.$router.push({
        path: '/home'
      })
      this.onFilter(data)
      this.name = ''
      this.page = 1
      this.sortBy = 'id_product'
    },
    paginationBack () {
      if (this.page <= 1) {
        alert('first page')
      } else {
        this.page -= 1
        this.getFilter()
      }
    },
    paginationNext () {
      console.log(this.dataProducts.data)
      if (this.page < this.dataProducts.data.length) {
        this.page += 1
        this.getFilter()
      } else {
        alert('last page')
      }
    },
    cartProduct (payload) {
      // console.log(payload)
      this.idProduct = payload
      // console.log(this.idProduct)

      const qwe = this.cart.filter(e => e.id_product === this.idProduct)
      if (qwe.length === 0) {
        const data = this.dataProducts.data.filter(e => e.id_product === payload)
        data[0].qty = 1
        data[0].amount = data[0].price_product * data[0].qty
        this.cart = [...this.cart, data[0]]
      } else {
        const newData = this.cart.map(e => {
          if (e.id_product === this.idProduct) {
            e.qty += 1
            e.amount = e.amount + e.price_product
          }
          return e
        })
        this.cart = newData
      }
      this.onAddCart(this.cart)
    },
    plus (index) {
      const data1 = this.cart[index].id_product
      const data2 = this.cart.filter((e) => {
        if (e.id_product === data1) {
          e.qty += 1
          e.amount = e.amount + e.price_product
        }
        return e
      })
      this.cart = data2
      this.onAddCart(this.cart)
    },
    minus (index) {
      const data1 = this.cart[index].id_product
      const data2 = this.cart.filter((e) => {
        if (e.id_product === data1) {
          e.qty -= 1
          e.amount = e.amount - e.price_product
        }

        if (e.qty < 1) {
          e.qty = 1
          e.amount = e.price_product
        }
        return e
      })
      this.cart = data2
      this.onAddCart(this.cart)
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
      onFilter: 'FoodDrink/getFilter',
      onAddCart: 'Cart/addCart'
    })
  },
  computed: {
    ...mapGetters({
      dataProducts: 'FoodDrink/getAllProducts',
      dataOneProduct: 'FoodDrink/getOneProduct',
      dataCategory: 'FoodDrink/getDataCategory',
      dataCart: 'Cart/getCart',
      dataTotal: 'Cart/getTotal'
    }),
    pagination () {
      return this.page
    }
  },
  mounted () {
    this.fetchApi()
    this.onGetCategory()
  }
}
</script>

<style scoped>
@media (max-width: 576px) {
  .img404 {
    width: 350px;
    height: 350px;
  }
}
</style>
