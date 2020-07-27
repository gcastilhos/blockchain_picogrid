import Vuex from 'vuex'
import Vue from 'vue'
import encode from '@/encoder.js'
import INITIAL_HASH from '@/mockdata.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    picogridTotals: [],
    previousHash: INITIAL_HASH
  },
  getters: {
    picogridsHash: state => {

      let addPicogrid = () => {
        let picogridValues = new Map()
        state.picogridTotals.forEach(item => {
          if (picogridValues.has(item[0])) {
            picogridValues.get(item[0]).push(item.slice(1))
          } else {
            picogridValues.set(item[0], [item.slice(1)])
          }
        })
        return picogridValues
      }

      let createHash = (values) => {
        let bn = new Map()
        for (const pair of values.entries()) {
          if (pair[1].length === 11) {
            let sortedValuesAsString = pair[1].sort((a, b) => b[0] < a[0]).map(a => JSON.stringify(a.slice(1))).join(',')
            let encodedValues = encode(sortedValuesAsString)
            state.previousHash = encodedValues.hash
            bn.set(pair[0], encodedValues.hash)
          }
        }
        return bn
      }

      return createHash(addPicogrid())
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
