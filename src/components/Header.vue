<template>
  <div>
    <div class="row p-2 text-center border">
      <div class="col lg-1 col-1">
        <div>
          <b-btn v-b-toggle.side-menu variant="btn-outline-light">
            <b-icon icon="justify" class="h4"></b-icon>
          </b-btn>
        </div>
      </div>
      <div class="col">
        <h3>POS APP</h3>
      </div>
    </div>
    <SideMenu/>
  </div>
</template>

<script>
import SideMenu from './SideMenu'

export default {
  data () {
    return {
      sideMenuOpen: false
    }
  },
  components: {
    SideMenu
  },
  methods: {
  }
}
</script>
