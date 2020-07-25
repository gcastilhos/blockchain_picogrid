<template>
  <div>
    <event-number :event-number-text="'Initial Event Number: ' + initialNumber"></event-number>
    <event-number :event-number-text="'Last Event Number:&nbsp&nbsp;&nbsp;' + finalNumber"></event-number>
    <table id="totals" class="totals">
      <tr>
        <th v-for="(item, index) in categoryHeader"
            v-html="item"
            :key="'total' + index"
            class="grey text-center text-bold">
        </th>
      </tr>
      <tr v-for="(total, rowIndex) in categoryTotals" :key="rowIndex">
        <td v-for="(item, index) in total"
            :key="'total_' + index"
            :class="{'text-right': index == 2, 'text-left': index !== 2}"
            class="grey border_lightBlue">
          {{ item }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import EventNumber from './EventNumber.vue'
import encode from '@/encoder.js'

export default {
  props: {
    records: Array
  },
  data: function() {
    return {     
      header: [],
      totals: [],
      eventNumbers: [],
      categoryHeader: ['Use<br />Category', 'Name&nbsp;of&nbsp;the&nbsp;Category', 'TOTAL<br />in&nbsp;KWH'],
      batch: 1
    }
  },
  components: {
    eventNumber: EventNumber,
  },
  filters: {
    encode,
    recordAsString: function(record) {
        return record.join("|")
    }
  },
  methods: {
    getTotals: function() {
      this.records.each(rec => {
        this.totals.push(rec[12, 14])
      })
    },
    align: function(index) {
      return this.textAlignment[index] == 0 ? 'left' : 'right'
    }
  },
  computed: {
    categoryTotals: function() {
      let categMap = new Map()
      this.records.forEach(rec => {
        let powerConsumption = parseFloat(rec[12])
        let category = rec[13] + '|' + rec[14]
        categMap.set(category, categMap.has(category) ? powerConsumption + categMap.get(category) : powerConsumption)
      })
      let totals = []
      let entries = categMap.entries()
      let pair = entries.next()
      while (pair !== undefined && pair.value !== undefined) {
        let category = pair.value[0].split('|')
        totals.push([category[0], category[1], pair.value[1].toFixed(2)])
        pair = entries.next()
      }
      return totals.sort()
    },
    initialNumber: function() {
      if (this.records[0] !== undefined) {
        return this.records[0][0]
      }
      return ''
    },
    finalNumber: function() {
      if (this.records.length !== undefined && this.records[this.records.length - 1] !== undefined) {
        return this.records[this.records.length - 1][0]
      }
      return ''
    }
 }
}
</script>

<style>
/**
 * Table-like DIVs
 */
.dark_blue {
  background-color: #038cfc;
}

table#totals {
  margin: 0 auto;
}

div#totals .row .cell {
  font-size: 12pt;
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

div.final_hash {
  background-color: lightBlue;
  padding: 0;
  text-align: center;
}

div.final_hash div.row.yellow div.cell {
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

.grey {
  background-color: #e8ebf5;
}

.mono {
  font-family: "Lucida Console", Monaco, Courier, monospace;
}

.no_space_break {
  white-space: nowrap;
}

/**
 * Events categorization
 */

table.totals {
  border-collapse: separate;
}

table.totals {
  border-spacing: 5px;
}

table.totals th {
  padding: 5px;
  white-space: wrap;
}

table.totals td {
  padding: 5px;
  white-space: nowrap;
}

</style>
