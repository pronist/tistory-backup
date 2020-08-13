<template lang='pug'>
  #app
    router-view
    banner
</template>

<script>
import Banner from './components/Banner'

export default {
  name: 'tistory-backup',
  components: {
    Banner
  }
}
</script>

<style lang='stylus'>
  html, body
    padding 0
    margin 0
    background-color #f8f8f8
    *, *::before, *::after
      font-family 'Noto Sans KR', sans-serif
  #app
    width 100vw
    height 100vh
    display flex
    align-items center
    justify-content center
    a
      text-decoration none
    nav
      *
        min-height initial !important
</style>
