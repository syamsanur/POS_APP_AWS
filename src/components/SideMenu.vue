<template>
  <div>
    <b-sidebar id="side-menu"  bg-variant="white" sidebar-class="border" backdrop backdrop-variant="dark" width="150px" shadow>
      <div class="px-3 py-3 ">
        <div class="col">
          <router-link to="/home">
            <button class="btn btn-block btn-lg">
              <b-icon icon="house"></b-icon>
            </button>
          </router-link>
        </div>
        <div class="col">
          <router-link to="/report">
            <button class="btn btn-block btn-lg">
              <b-icon icon="clipboard"></b-icon>
            </button>
          </router-link>
        </div>
        <div class="col">
            <b-btn v-b-modal.addmodal @click="hideSideMenu()" variant="btn-outline-light" size="lg" block>
              <b-icon icon="plus-circle"></b-icon>
            </b-btn>
        </div>
      </div>
      <div class="col mb-5 mt-5">
            <div class="border">
            <b-btn block variant="danger" size="lg" @click="onLogout()">
              <b-icon icon="box-arrow-in-left"></b-icon>
            </b-btn>
            </div>
        </div>
    </b-sidebar>
    <AddModal/>
  </div>
</template>

<script>
import AddModal from './AddModel'
import { mapActions } from 'vuex'

export default {
  components: {
    AddModal
  },
  data () {
    return {
    }
  },
  methods: {
    hideSideMenu () {
      this.$root.$emit('bv::toggle::collapse', 'side-menu')
    },
    onLogout () {
      this.actionLogout
        .then(() => {
          window.location = '/'
        })
    }
  },
  computed: {
    ...mapActions({
      actionLogout: 'auth/logout'
    })
  }
}
</script>
