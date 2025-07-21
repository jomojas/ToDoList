<script setup>
  import Input from './components/ToDoInput.vue'
  import List from './components/ToDoList.vue'
  import Operation from './components/ToDoOperation.vue'
  import EditPanel from './components/EditPanel.vue'
  import { onMounted, reactive, ref, watch } from 'vue'
  
  const events = ref([
    { id:1, description:"Do Homework", completed: false },
    { id:2, description:"Read Book", completed: false },
  ])

  const selectedId = ref([]);
  let isEditing = ref(false);

  onMounted(()=>{
    const stored = localStorage.getItem('todo-events');
    if(stored) {
      try {
        events.value = JSON.parse(stored);
      } catch(e) {
        console.error('Failed To Parse localStorage:', e);
      }
    }
  });

  watch(events, (newValue)=>{
    localStorage.setItem('todo-events', JSON.stringify(newValue));
  }, {deep: true});

  function toggleSelection(id) {
    // If the id is already in selectedId then remove it, otherwise add it
    const index = selectedId.value.indexOf(id);
    if(index === -1) {
      selectedId.value.push(id);
    } else {
      selectedId.value.splice(index, 1);
    }

  }

  function deleteEvent() {
    // Remove selected event from events
    events.value = events.value.filter((event, index)=>{
      return !selectedId.value.includes(event.id);
    })

    // clear selectedId when selected events are removed 
    selectedId.value = []

  }

  function openEditPanel() {
    isEditing.value = true;
  }

  function closeEditPanel() {
    isEditing.value = false;
  }

  function editEvent(description) {
    description = description.trim();
    if(!description) return;

    // selectedId has only one id when edit is available
    const id = selectedId.value[0];

    // Find certain event to edit
    const event = events.value.find(event => event.id === id);
    if(event) {
      event.description = description;
    }

    // clear selectedId when selected event is modified, since only on id in selectedId
    selectedId.value = []
  }

  function addEvent(description) {
    description = description.trim();
    if(!description) return;

    // Increment id of the last event
    const lastEvent = events.value[events.value.length - 1];
    const id = lastEvent ? lastEvent.id + 1 : 1;
    
    // Create a new event and push it to events
    const event = {
      id,
      description,
      completed: false
    }
    events.value.push(event);
    console.log('events:', events.value);
  }
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center">
    <div class="flex flex-col items-center justify-between bg-blue-50 rounded-lg p-6">
      <Input @addEvent="addEvent" />
      <List :events="events" :selectedId="selectedId" @toggleSelection="toggleSelection" />
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