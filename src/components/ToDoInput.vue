<script setup>
  import { defineEmits, ref } from 'vue';

  const inputText = ref('');

  const emit = defineEmits(['addEvent']);

  function handleAdd() {
    emit('addEvent', inputText.value);
    inputText.value = '';
  }
</script>

<template>
  <div class="flex items-center justify-center">
    <form class="bg-blue-100 m-10 p-6 rounded-lg text-2xl w-[500px] shadow-lg">
      <input type="text" placeholder="Input An Event" v-model="inputText" class="border border-blue-600 my-3 rounded-lg block w-full h-12">
      <button @click.prevent="handleAdd" class="bg-blue-500 border-black-600 rounded-lg my-2 w-full h-12 hover:bg-blue-200 hover:cursor-pointer">Add</button>
    </form>
  </div>
</template>

<style scoped>

</style>