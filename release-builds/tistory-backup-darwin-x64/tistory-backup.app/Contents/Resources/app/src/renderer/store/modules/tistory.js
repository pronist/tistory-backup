const state = {
  tistory: {
    clientId: '9d95acf2e27190b1c9d70e7adc88ca6f',
    secret: '9d95acf2e27190b1c9d70e7adc88ca6f569946d18b3cfddb75aa935f963446e1fedb83ab',
    responseType: 'code',
    redirectUri: 'http://localhost:9080/#/'
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
