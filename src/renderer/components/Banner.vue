<template lang="pug">
  footer#footer(role='footer')
    .copyright ⓒ 2020. #[a(href='https://github.com/pronist' target='_blank') 정상우]. all rights reserved
</template>

<script>
export default {
  name: 'banner'
}
</script>

<style lang="stylus">
  #footer
    background-color #1e1f21
    position fixed
    bottom 0
    right 0
    width 100%
    height 50px
    line-height 50px
    color white
    text-align center
    font-size .9rem
    a
      text-decoration underline !important
      color white
</style>
