<script setup>
  import Input from '@/components/ToDoInput.vue'
  import List from '@/components/ToDoList.vue'
  import Operation from '@/components/ToDoOperation.vue'
  import EditPanel from '@/components/EditPanel.vue'
  import { onMounted, reactive, ref, watch } from 'vue'
  import { useTodo } from '@/composables/useTodo';

  const {
    events,
    selectedId,
    isEditing,
    filterEvents,
    filterStatus,
    hasCompleted,
    setFilterStatus, 
    addEvent,
    deleteEvent,
    toggleSelection,
    editEvent,
    openEditPanel,
    closeEditPanel,
    clearCompletedEvents
  } = useTodo();

</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center">
    <div class="flex flex-col items-center justify-between bg-blue-50 rounded-lg p-6">
      <div class="text-3xl font-bold mb-4 flex justify-around w-full">
        <router-link to="/" class="text-blue-500 hover:underline">Home</router-link> 
        <router-link to="/about" class="text-blue-500 hover:underline">About</router-link> 
      </div>
      <Input @addEvent="addEvent" />
      <List :events="filterEvents" :selectedId="selectedId" :filterStatus = "filterStatus" @toggleSelection="toggleSelection" @setFilterStatus="setFilterStatus" />
      <Operation :hasCompleted="hasCompleted" :selectedId="selectedId" @deleteEvent="deleteEvent" @openEditPanel="openEditPanel" @clear="clearCompletedEvents"/>
    </div>

    <!-- Gray overlay -->
    <div v-if="isEditing" class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"></div>

    <!-- EditPanel Modal -->
    <EditPanel 
      v-if="isEditing"
      :events="events" 
      :selectedId="selectedId" 
      @close="closeEditPanel" 
      @confirm="editEvent"
      class="fixed z-50" 
    />
  </div>
</template>


<style scoped>

</style>