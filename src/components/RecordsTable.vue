<template>
  <div id="slider">
    <table>
      <thead>
        <tr>
          <th v-for="(item, index) in header" :key="'head_' + index" class="header dark-blue">
            {{ item }}
          </th>
          <th><cell-separator></cell-separator></th>
          <th><cell-separator></cell-separator></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, rowIndex) in records" :key="'rec_' + rowIndex" class="row">
          <td v-for="(item, index) in record" :key="'val_' + index" class="record original dark-blue text mono" v-html="item">
          </td>
          <td><cell-separator></cell-separator></td>
          <td class="record dark-blue">
            <div class="text hash">
              {{ record | recordAsString | encode }}
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="15"><cell-separator></cell-separator></td>
          <td><cell-separator></cell-separator></td>
          <td class="final-hash">
            <div class="text note no-lateral-padding">
              <span>Block HASH for {{numberOfEvents}}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="15"><cell-separator></cell-separator></td>
          <td><cell-separator></cell-separator></td>
          <td class="yellow final-hash">
            <div class="text hash">
              {{ finalHash }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CellSeparator from './CellSeparator.vue';
import encode from '@/encoder.js';

export default {
  props: {
    header: Array,
    records: Array,
    finalHash: String,
    batch: Number
  },
  components: {
    cellSeparator: CellSeparator
  },
  filters: {
    encode,
    recordAsString: function(record) {
      return record.join("|");
    }
  },
  computed: {
    numberOfEvents: function() {
      if (this.batch == 1) {
        return "1 event";
    }
      return "each " + this.batch + " events"
    }
  }
}
</script>

<style>
</style>
