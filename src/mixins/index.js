const mix = {
  data () {
    return {
      select: '-->'
    }
  },
  directives: {
    searchWarna: {
      bind: (el, binding) => {
        el.style.backgroundColor = binding.value
      }
    }
  }
}
export default mix
