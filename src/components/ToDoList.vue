<script setup>
  import { defineProps, ref, toRefs } from 'vue'; 
  const props = defineProps(["events", "selectedId"]);
  const emit = defineEmits(["toggleSelection"]);
  
  const {events, selectedId} = toRefs(props);

  const id = ref(0);
  
  function handleToggle(eventId) {
    // console.log("selectedId in ToDoList:", selectedId);
    emit('toggleSelection', eventId);
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="bg-blue-100 text-2xl w-[500px] shadow-lg rounded-lg">
      <div v-for="event in events" :key="event.id" @click="handleToggle(event.id)" 
      :class="{     // conditional class
        'bg-yellow-200': selectedId.includes(event.id), // Highlight certain event
        'bg-blue-500': !selectedId.includes(event.id)   // Normal background
      }" 
      class="px-3 py-3 rounded-lg my-2 hover:cursor-pointer">
        <input type="checkbox" v-model="event.completed" @click.stop class="mx-12 w-5 h-5" />
        <p class="inline px-10">{{ event.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>