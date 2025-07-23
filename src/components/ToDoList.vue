<script setup>
  import { defineProps, ref, toRefs } from 'vue'; 
  const props = defineProps(["events", "selectedId", "filterStatus"]);
  const emit = defineEmits(["toggleSelection", "setFilterStatus"]);
  
  const {events, selectedId, filterStatus} = toRefs(props);

  const id = ref(0);
  
  function handleToggle(eventId) {
    // console.log("selectedId in ToDoList:", selectedId);
    emit('toggleSelection', eventId);
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex items-center gap-x-4 my-4">
      <button 
        @click="emit('setFilterStatus', 'all')"
        :disabled="filterStatus === 'all'"
        :class="[
          'w-24 h-10 rounded-lg text-white',
          filterStatus === 'all' 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-green-400 cursor-pointer'
        ]"
      >
        All
      </button>

      <button 
        @click="emit('setFilterStatus', 'completed')"
        :disabled="filterStatus === 'completed'"
        :class="[
          'w-24 h-10 rounded-lg text-white',
          filterStatus === 'completed' 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-green-400 cursor-pointer'
        ]"
      >
        Completed
      </button>

      <button 
        @click="emit('setFilterStatus', 'incomplete')"
        :disabled="filterStatus === 'incomplete'"
        :class="[
          'w-24 h-10 rounded-lg text-white',
          filterStatus === 'incomplete' 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-green-400 cursor-pointer'
        ]"
      >
        Incomplete
      </button>
    </div>
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