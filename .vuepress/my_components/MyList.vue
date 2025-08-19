<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.text }}</li>
  </ul>
</template>
 
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>