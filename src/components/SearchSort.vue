<template>
  <div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    sendName () {
      this.$emit('search', this.name)
    }
  }
}
</script>
