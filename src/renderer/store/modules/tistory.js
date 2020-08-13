const state = {
  tistory: {
    clientId: '9d95acf2e27190b1c9d70e7adc88ca6f',
    responseType: 'token',
    redirectUri: 'http://localhost:9080/#/extractor'
  },
  accessToken: null
}

const mutations = {
  setAccessToken (state, accessToken) {
    state.accessToken = accessToken
  }
}

const actions = {
  setAccessToken ({ commit }, payload) {
    commit('setAccessToken', payload.accessToken)
  }
}

export default {
  state,
  mutations,
  actions
}
