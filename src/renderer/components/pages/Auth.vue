<template lang="pug">
  #auth
    nav#nav
      a(href='https://tistory.com' target='_blank')
        img(src='static/images/logo.png')
    main#main
      h1 티스토리 백업 서비스
      h2 티스토리 블로그에 담겨있는 소중한 포스트들을 백업해보세요!
      a(href='#' @click='openTistoryWindow') 티스토리 인증하기
</template>

<script>
import tistory from 'tistory'
import { webContents } from 'electron'

const electron = require('electron').remote

export default {
  name: 'auth',
  methods: {
    openTistoryWindow () {
      let tistoryWinodw = new electron.BrowserWindow({
        height: 768,
        width: 1024,
        webPreferences: {
          nodeIntegration: false
        },
        autoHideMenuBar: true
      })
      tistoryWinodw.loadURL(this.permissionUrl)

      let contents = tistoryWinodw.webContents
      contents.on('did-get-redirect-request', (event, oldURL, newURL) => {
        if (newURL.includes(this.$store.state.tistory.tistory.redirectUri)) {
          tistoryWinodw.close()

          const accessToken = newURL.split('#access_token=')[1].split('&')[0]
          this.$router.push(`/extractor#access_token=${accessToken}&state=`)
        }
      })
    }
  },
  computed: {
    permissionUrl () {
      return tistory.auth.getPermissionUrl(
        this.$store.state.tistory.tistory.clientId,
        this.$store.state.tistory.tistory.redirectUri,
        this.$store.state.tistory.tistory.responseType
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
  #auth
    #nav
      position fixed
      top 20px
      left 20px
    #main
      text-align center
      a
        color white
        padding 25px 50px
        background-color #ed5207
        border-radius 5px
        display inline-block
        box-shadow 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 5px rgba(0, 0, 0, .1)
        font-weight 500
        font-size 1rem
      h1
        margin-bottom 8px
        font-size 2rem
      h2
        margin 0
        margin-bottom 30px
        color alpha(black, .5)
        font-size 1rem
      h1, h2
        font-weight 500
</style>
