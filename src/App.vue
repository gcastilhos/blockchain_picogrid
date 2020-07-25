<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-7 big-font text-center">
          <span>DAILY EVENT TABLE - BATCH {{ batch }}</span>
        </div>
        <div class="col-4 not-so-big-font red text-center">
          <span>CONSUMPTION<br />CONSOLIDATION&nbsp;PER<br />CATEGORY</span>
        </div>
      </div>
      <div class="col-1">
      </div>
      <div class="row">
        <div class="col-7">
          <records-table :records="records"
                         :header="header"
                         :finalHash="finalHash"
                         :batch="batch"
                         >
          </records-table>
        </div>
        <div class="col-4">
          <categories-table :records="records">
          </categories-table>
        </div>
        <div class="col-1">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import RecordsTable from './components/RecordsTable.vue';
import CategoriesTable from './components/CategoriesTable.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import mock_data from '@/mockdata.js';
import encode from '@/encoder.js';
Vue.use(VueRouter);

var router = new VueRouter({
  mode: 'history',
  routes: []
});

const DATA_API_URI = process.env.VUE_APP_DATA_API_URI || "/events";
const MAX_BATCH = parseInt(process.env.VUE_APP_MAX_BATCH || 50);

export default {
  router,
  data: function () {
    return {
      records: [],
      header: [],
      finalHash: '',
      batch: 1,
      interval: process.env.VUE_APP_DELAY || 10000
    }
  },
  components: {
    'records-table': RecordsTable,
    'categories-table': CategoriesTable
  },
  methods: {
    getData: async function(next_batch) {
      var data;
      try {
        let response = await axios.get(DATA_API_URI, {timeout: 10000,
                                                      headers: {"Access-Control-Allow-Origin": "http://localhost:5000/"}
        });
        data = response.data;
        console.log("Data:" + data.data);
        console.log("Columns:" + data.columns);
      } catch (error) {
        console.error("Error: " + error);
        data = mock_data;
      }
      this.records.push(data.data[0]);
      this.batch = next_batch;
      this.header = data.columns;
      this.encodeAll();
    },
    encodeAll: function() {
      var finalHash = '';
      this.records.forEach((rec) => {
        finalHash += encode(rec);
      });
      this.finalHash = encode(finalHash);
    },
  },
  mounted: function() {
    this.getData(this.batch);
  },
  created: function() {
    setInterval(function() {
      let next_batch;
      if (this.batch === MAX_BATCH) {
        next_batch = 1;
        this.records.splice(0, MAX_BATCH);
      } else {
        next_batch = this.batch + 1;
      }
      this.getData(next_batch);
    }.bind(this), this.interval);
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

.container-fluid {
  padding-top: 50px;
  width: 97% !important;
}

/**
 * Table
 */

table {
    padding: 0;
    border-spacing: 0;
}

.header {
    font-weight: bold;
    word-wrap: break-word;
    border-top: 1px black solid;
    border-bottom: 1px black solid;
}

td, th {
    padding: 5px 10px;
}

.dark-blue {
    background-color: #038cfc;
}

.record.original {
    text-align: right;
    white-space: nowrap;
}

/**
 * Hash specific styles
 */

.text {
    font-family: "Lucida Console", Monaco, Courier, monospace;
}

div.text.hash {
    background-color: lightGrey;
    border: 1px black solid;
    padding: 2px;
    text-align: center;
}

.final-hash {
    background-color: lightBlue;
    padding: 5px 0;
    text-align: center;
}

.final-hash.yellow {
    padding: 10px;
}

div.note {
    text-align: center;
    font-size: 14pt;
    font-weight: bold;
    border: 1px black solid;
    padding: 2px;
    background-color: white;
}

/**
 * Generic styles
 */

.big-font {
    font-size: 24pt;
    font-family: Arial, Helvetica, Sans-serif;
    font-weight: bold;
}

.not-so-big-font {
    font-size: 18pt;
    font-family: Arial, Helvetica, Sans-serif;
    font-weight: bold;
}

.red {
    color: red;
}

.light-blue {
    background-color: lightBlue;
}

.yellow {
    background-color: yellow;
}

.mono {
    font-family: "Lucida Console", Monaco, Courier, monospace;
}

div.no-lateral-padding {
    padding-right: 0;
    padding-left: 0;
}
</style>
