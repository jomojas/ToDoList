<script setup>
  import { useTodoStore } from '@/store/todoStore';
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';

  const todoStore = useTodoStore();
  
  const { selectedId, events } = storeToRefs(todoStore);
  const { closeEditPanel, editEvent } = todoStore;
  const id = selectedId.value[0];
  const event = events.value.find(event => event.id === id); 
  const inputText = ref(event.description);

  function handleCancel() {
    closeEditPanel(); // Close the edit panel
  }
  function handleConfirm() {
    if (inputText.value.trim()) {
      editEvent(inputText.value.trim()); // Edit the event
      closeEditPanel(); // Close the edit panel
    }
  }
</script>

<template>
  <div class="h-1/3 max-w-lg w-full bg-blue-50 rounded-lg text-2xl">
    <div class="p-5 flex flex-col items-center">
      <input type="text" v-model="inputText" class="border border-blue-600 my-3 rounded-lg h-12 w-full">
      <div class="flex items-center justify-between">
        <button class="h-12 w-32 bg-blue-500 rounded-lg hover:bg-blue-200 block mx-3 my-2" @click="handleConfirm">
          Confirm
        </button>
        <button class="h-12 w-32 bg-blue-500 rounded-lg hover:bg-blue-200 block mx-3 my-2" @click="handleCancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>