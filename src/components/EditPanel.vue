<script setup>
  import {defineProps, defineEmits, toRefs, ref} from 'vue';
  const emit = defineEmits(['close', 'confirm']);
  const props = defineProps(['events', 'selectedId'])

  const {events, selectedId} = toRefs(props);

  // selectedId has only one id when edit is available
  const id = selectedId.value[0];

  // Find description
  const event = events.value.find(event => event.id === id); 
  const inputText = ref(event.description);

  function handleCancel() {
    emit('close');
  }
  
  function handleConfirm() {
    emit('confirm', inputText.value);
    emit('close');
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