<template>
  <div>
    <span>Block #{{ blockNumber }}:</span> <span class="hash mono">{{ totals }}</span>
  </div>
</template>

<script>
export default {
  props: ['totals', 'blockNumber']
}
</script>

<style scoped>
div {
  border: 1px solid grey;
  padding: 3px;
  margin-bottom: 5px;
  border-radius: 5px;
}

span {
  font-weight: bold;
  font-size: 18pt;
}

span.hash {
  background-color: lightGrey;
  padding: 5px;
  font-family: Courier;
}
</style>
