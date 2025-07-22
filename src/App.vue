<script setup>
  import Input from './components/ToDoInput.vue'
  import List from './components/ToDoList.vue'
  import Operation from './components/ToDoOperation.vue'
  import EditPanel from './components/EditPanel.vue'
  import { onMounted, reactive, ref, watch } from 'vue'
  import { useTodo } from './composables/useTodo';

  const {
    events,
    selectedId,
    isEditing,
    filterEvents,
    filterStatus,
    setFilterStatus, 
    addEvent,
    deleteEvent,
    toggleSelection,
    editEvent,
    openEditPanel,
    closeEditPanel
  } = useTodo();

</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center">
    <div class="flex flex-col items-center justify-between bg-blue-50 rounded-lg p-6">
      <Input @addEvent="addEvent" />
      <List :events="filterEvents" :selectedId="selectedId" :filterStatus = "filterStatus" @toggleSelection="toggleSelection" @setFilterStatus="setFilterStatus" />
      <Operation :selectedId="selectedId" @deleteEvent="deleteEvent" @openEditPanel="openEditPanel" />
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