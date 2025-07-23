<script setup>
  import { useTodoStore } from '@/store/todoStore';
  import { storeToRefs } from 'pinia';

  const todoStore = useTodoStore();

  const { selectedId, hasCompleted } = storeToRefs(todoStore);
  const { openEditPanel, deleteEvent, clearCompletedEvents
  } = todoStore;

  function handleOpen() {
    openEditPanel(); // Open the edit panel
  }
  function handleDelete() {
    deleteEvent(); // Delete the selected events
  }
  function handleClear() {
    clearCompletedEvents(); // Clear completed events
  }
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="flex justify-center items-center bg-blue-100 text-2xl w-[500px] rounded-lg shadow-lg h-20">
      <button 
      @click="handleOpen"
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