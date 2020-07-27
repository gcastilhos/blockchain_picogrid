import Vuex from 'vuex'
import Vue from 'vue'
import sha256 from 'sha256'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    picogridTotals: []
  },
  getters: {
    picogridsHash: state => {
      let batchNumbers = new Map()
      state.picogridTotals.forEach(item => {
        if (batchNumbers.has(item[0])) {
          batchNumbers.get(item[0]).push(item.slice(1))
        } else {
          batchNumbers.set(item[0], [item.slice(1)])
        }
      })
      let bn = new Map()
      for (const pair of batchNumbers.entries()) {
        bn.set(pair[0], sha256(pair[1].sort((a, b) => b[0] < a[0]).map(a => JSON.stringify(a.slice(1))).join(',')))
      }
      return bn
    }
  },
  mutations: {
    addPicogridTotals(state, payload) {
      state.picogridTotals.push(payload.totals)
    }
  },
  actions: {
    addPicogridTotals(context, payload) {
      context.commit('addPicogridTotals', payload)
    }
  }
})
