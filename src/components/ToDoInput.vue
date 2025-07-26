<script setup>
import { useTodoStore } from '@/store/todoStore'
import { ref } from 'vue'

const todoStore = useTodoStore()
const inputText = ref('')

const { addEvent } = todoStore
// Define the handleAdd method
function handleAdd() {
  // Pass the inputText value to addEvent and clear the input field after adding
  if (inputText.value.trim()) {
    addEvent(inputText.value.trim()) // Add the event
    inputText.value = '' // Clear the input field
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <form class="bg-blue-100 m-10 p-6 rounded-lg text-2xl w-[500px] shadow-lg">
      <input
        type="text"
        placeholder="Input An Event"
        v-model="inputText"
        class="border border-blue-600 my-3 rounded-lg block w-full h-12"
      />
      <button
        @click.prevent="handleAdd"
        class="bg-blue-500 border-black-600 rounded-lg my-2 w-full h-12 hover:bg-blue-200 hover:cursor-pointer"
      >
        Add
      </button>
    </form>
  </div>
</template>

<style scoped></style>
