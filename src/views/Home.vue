<template>
  <div>
    <b-container fluid>
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <Header />
          <Content />
        </div>
      </div>
    </b-container>

  </div>
</template>

<script>
import Header from '../components/Header'
import Content from '../components/Content'

export default {
  data () {
    return {
    }
  },
  components: {
    Header,
    Content
  },
  methods: {
  }
}
</script>
