import state from './store'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import createPersistedState from 'vuex-persistedstate'

const setHandle = (key, state) => localStorage.setItem(key, JSON.stringify(state))

const getHandle = (key) => {
  if (!localStorage[key]) { return {} }
  return JSON.parse(localStorage[key])
}

export default {
  state,
  mutations,
  getters,
  actions,
  plugins: [createPersistedState({
    storage: localStorage,
    getState: getHandle,
    setState: setHandle
  })]
}