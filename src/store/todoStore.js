import { defineStore } from 'pinia'
import { ref, computed, watch, onMounted } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const events = ref([])
  const selectedId = ref([])
  const isEditing = ref(false)
  const filterStatus = ref('all') // 'completed', 'all', 'incomplete'

  const filterEvents = computed(() => {
    if (filterStatus.value === 'incomplete') {
      return events.value.filter((event) => !event.completed)
    } else if (filterStatus.value === 'completed') {
      return events.value.filter((event) => event.completed)
    } else {
      return events.value
    }
  })

  // Check if there are completed events
  const hasCompleted = computed(() => {
    return events.value.some((event) => event.completed)
  })

  function setFilterStatus(status) {
    filterStatus.value = status
  }

  onMounted(() => {
    const stored = localStorage.getItem('todo-events')
    if (stored) {
      try {
        events.value = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to parse localStorage:', e)
      }
    }
  })

  watch(
    events,
    (newValue) => {
      localStorage.setItem('todo-events', JSON.stringify(newValue))
    },
    { deep: true }
  )

  function toggleSelection(id) {
    const index = selectedId.value.indexOf(id)
    if (index === -1) {
      selectedId.value.push(id)
    } else {
      selectedId.value.splice(index, 1)
    }
  }

  function clearCompletedEvents() {
    events.value = events.value.filter((event) => !event.completed)
  }

  function deleteEvent() {
    events.value = events.value.filter(
      (event) => !selectedId.value.includes(event.id)
    )
    selectedId.value = []
  }

  function openEditPanel() {
    isEditing.value = true
  }

  function closeEditPanel() {
    isEditing.value = false
  }

  function editEvent(description) {
    description = description.trim()
    if (!description) return

    const id = selectedId.value[0]
    const event = events.value.find((event) => event.id === id)
    if (event) {
      event.description = description
    }

    selectedId.value = []
  }

  function addEvent(description) {
    description = description.trim()
    if (!description) return

    const lastEvent = events.value[events.value.length - 1]
    const id = lastEvent ? lastEvent.id + 1 : 1

    const event = { id, description, completed: false }
    events.value.push(event)
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
  }
})
