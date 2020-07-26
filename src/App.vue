<template>
  <div id="app">
    <div class="container-xl">
      <div class="row">
        <div class="col-xl-12 big-font text-center red">
          <span>CONSUMPTION CONSOLIDATION PER CATEGORY</span>
        </div>
      </div>
      <div v-for="rowInd in 4" 
           :key="'r' + rowInd"
           class="row">
        <div v-for="colInd in 3"
             :key="'c' + colInd"
             class="col-xl-4">
          <categories-table v-if="gridNumber(rowInd, colInd) < 12"
                            :interval="interval"
                            @categoryTotals="logEvent($event)"
                            @batchNumber="setTotalsData($event)"
                            :picogridNumber="gridNumber(rowInd, colInd)">
          </categories-table>
        </div>
      </div>
    </div>
    <div id="hash" class="container-xl">
      <div v-for="(item, index) in totals" :key="'r' + index" class="row">
        <div class="col-xl-12">
          <event-totals :totals="item"></event-totals>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import CategoriesTable from './components/CategoriesTable.vue'
import EventTotals from './components/EventTotals.vue'
import sha256 from 'sha256';

export default {
  data: function () {
    return {
      batch: 1,
      batchNumber: 0,
      interval: process.env.VUE_APP_DELAY || 10000,
      totalsData: [],
      totals: []
    }
  },
  components: {
    'categories-table': CategoriesTable,
    'event-totals': EventTotals
  },
  methods: {
    gridNumber: function(row, col) {
      return (row - 1) * 3 + col
    },
    logEvent: function(event) {
      this.totalsData.push(event)
    },
    setTotalsData: function(batchNumber) {
      this.batchNumber = batchNumber
      this.totals.push(this.totalsHash())
    },
    totalsHash: function() {
      let result = ''
      let batchNumber = this.batchNumber
      this.totalsData.forEach(item => {
        if (item[0] === batchNumber) {
          result += JSON.stringify(item.slice(1))
        }
      })
      return sha256(result)
    }
  }
}
</script>

<style>
/**
 * app div
 */
#app {
  font-size: 8pt;
  font-family: Arial, Helvetica, Sans-serif;
}

body {
  background-color: lightBlue !important;
}

.container-xl {
  padding-top: 50px;
  padding-bottom: 50px;
}

/**
 * Table
 */

.header {
    font-weight: bold;
    word-wrap: break-word;
    border-top: 1px black solid;
    border-bottom: 1px black solid;
}

td, th {
    padding: 5px 10px;
}

/**
 * Font styles
 */

.dark-blue {
    background-color: #038cfc;
}

.big-font {
    font-size: 20pt;
    font-family: Arial, Helvetica, Sans-serif;
    font-weight: bold;
}

.font-18 {
    font-size: 18pt;
}

.red {
    color: red;
}
</style>
