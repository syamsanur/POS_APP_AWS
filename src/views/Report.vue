<template>
  <div>
    <div class="container-fluid border">
      <div class="row">
        <div class="col-lg-12 col-12">
          <Header @toggle="toggleMenu"/>
          <div class="row">
            <div class="col-lg-1 col-12" v-if="isHidden">
              <SideMenu/>
            </div>
            <div class="col border border-right-0">
              <div class="p-3">
                <ReportContent/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import SideMenu from '../components/SideMenu'
import ReportContent from '../components/ReportContent'

export default {
  components: {
    Header,
    SideMenu,
    ReportContent
  },
  data () {
    return {
      isHidden: false
    }
  },
  methods: {
    toggleMenu () {
      this.isHidden = !this.isHidden
    }
  }
}
</script>
