import { ref, onMounted, watch, computed } from 'vue';

export function useTodo() {
  const events = ref([])
  const selectedId = ref([]);
  const isEditing = ref(false);
  const filterStatus = ref('all') // completed, all, incomplete

  const filterEvents = computed(()=> {
    if(filterStatus.value === 'incomplete') {
      return events.value.filter((event) => !event.completed);
    } else if(filterStatus.value === 'completed') {
      return events.value.filter((event) => event.completed);
    } else {
      return events.value;
    }
  })

  // Check Whether there are completed events
  const hasCompleted = computed(() => {
    return events.value.some(event => event.completed);
  });

  function setFilterStatus(status) {
    filterStatus.value = status;
  }

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

  function clearCompletedEvents() {
    events.value = events.value.filter((event) => {
      return !event.completed;
    })
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

  return {
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
  };
}