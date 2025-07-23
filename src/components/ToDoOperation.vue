<script setup>
  import { defineEmits, defineProps, toRef } from 'vue';
  const props = defineProps(['selectedId', 'hasCompleted']);
  const emit = defineEmits(["deleteEvent", "openEditPanel", "clear"]);

  const selectedId = toRef(props, 'selectedId');
  const hasCompleted = toRef(props, 'hasCompleted');

  function openEditPanel() {
    emit('openEditPanel');
  }

  function handleDelete() {
    emit('deleteEvent');
  }

  function handleClear() {
    emit('clear');
  }
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="flex justify-center items-center bg-blue-100 text-2xl w-[500px] rounded-lg shadow-lg h-20">
      <button 
      @click="openEditPanel"
      :disabled="selectedId.length !== 1" 
      :class="[
        'inline w-32 h-12 text-black rounded-lg mx-5',
        selectedId.length === 1 
        ? 'bg-blue-500 hover:bg-green-400 cursor-pointer'
        : 'bg-gray-300 cursor-not-allowed' 
      ]"
       >Edit</button>
      <button 
      @click="handleDelete"
      :disabled="selectedId.length === 0" 
      :class="[
        'inline w-32 h-12 text-black rounded-lg mx-5',
        selectedId.length !== 0
        ? 'bg-blue-500 hover:bg-green-400 cursor-pointer'
        : 'bg-gray-300 cursor-not-allowed' 
      ]"
      >Delete</button>
      <button 
      @click="handleClear"
      :disabled="!hasCompleted" 
      :class="[
        'inline w-32 h-12 text-black rounded-lg mx-5',
        hasCompleted
        ? 'bg-blue-500 hover:bg-green-400 cursor-pointer'
        : 'bg-gray-300 cursor-not-allowed' 
      ]"
      >Clear</button>
    </div>
  </div>
</template>

<style scoped>

</style>