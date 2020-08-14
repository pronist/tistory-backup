<template lang="pug">
  #auth
    nav#nav
      a(href='https://tistory.com' target='_blank')
        img(src='static/images/logo.png')
    main#main
      h1 티스토리 백업
      h2 티스토리 블로그에 담겨있는 소중한 포스트들을 백업해보세요!
      button#tistory-auth(@click='login') 티스토리 인증하기
      button#logout(@click='logout' v-if='this.$store.state.tistory.accessToken') 로그아웃
</template>

<script>
import tistory from 'tistory'
import { webContents } from 'electron'

const electron = require('electron').remote

export default {
  name: 'auth',
  data () {
    return {
      windowOptions: {
        height: 768,
        width: 1024,
        webPreferences: {
          nodeIntegration: false
        },
        autoHideMenuBar: true
      }
    }
  },
  methods: {
    login () {
      const tistoryWindow = new electron.BrowserWindow(this.windowOptions)
      tistoryWindow.loadURL(this.permissionUrl)

      const contents = tistoryWindow.webContents
      contents.on('did-get-redirect-request', (event, oldURL, newURL) => {
        if (newURL.includes(this.$store.state.tistory.tistory.redirectUri)) {
          tistoryWindow.close()

          this.$store.dispatch('setAccessToken', {
            accessToken: newURL.split('#access_token=')[1].split('&')[0]
          })
          this.$router.push(`/extractor#access_token=${this.$store.state.tistory.accessToken}&state=`)
        }
      })
    },
    logout () {
      const logoutWindow = new electron.BrowserWindow(this.windowOptions)
      logoutWindow.loadURL('https://tistory.com/auth/logout')

      const contents = logoutWindow.webContents
      contents.on('did-get-redirect-request', (event, oldURL, newURL) => {
        if (newURL === 'https://www.tistory.com/') {
          logoutWindow.close()

          this.$store.dispatch('setAccessToken', { accessToken: null })
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
      #tistory-auth, #logout
        color white
        padding 15px 30px
        border-radius 5px
        box-shadow 0 0 0 1px rgba(0, 0, 0, .1), 0 2px 5px rgba(0, 0, 0, .1)
        font-weight 500
        border none
        cursor pointer
        font-size 1rem
      #tistory-auth
        background-color #ed5207
        margin-right 10px
      #logout
        background-color black
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
