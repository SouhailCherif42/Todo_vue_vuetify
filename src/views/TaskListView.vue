<template>
  <v-container>
    <h1 class="text-h4 mb-4">Liste des Tâches</h1>

    <v-row class="mb-4" align="center" justify="space-between">
      <v-col cols="12" md="6">
        <v-text-field v-model="search" label="Rechercher une tâche..." />
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="sortMode"
          :items="['Date', 'État']"
          label="Trier par"
        />
      </v-col>
    </v-row>

    <TaskList
      :tasks="filteredTasks"
      @delete-task="confirmDelete"
      @toggle-done="toggleDone"
      @edit-task="editTask"
    />

    <TaskEditDialog
      v-model="editDialog"
      :task="selectedTask"
      @save-task="updateTask"
    />

    <v-dialog v-model="deleteDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>Confirmer la suppression</v-card-title>
        <v-card-text>Voulez-vous vraiment supprimer cette tâche ?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" @click="deleteDialog = false">Annuler</v-btn>
          <v-btn color="red" @click="deleteTask">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import type { Task } from '@/types/Task';
import TaskList from '@/components/TaskList.vue';
import TaskEditDialog from '@/components/TaskEditDialog.vue';

const tasks = ref<Task[]>([]);
const selectedTask = ref<Task | null>(null);
const editDialog = ref(false);
const search = ref('');
const sortMode = ref<'Date' | 'État'>('Date');
const deleteDialog = ref(false);
const taskToDelete = ref<number | null>(null);
const STORAGE_KEY = 'my-vue-tasks';

const filteredTasks = computed(() => {
  let result = [...tasks.value];
  if (search.value.trim() !== '') {
    result = result.filter(task =>
      task.title.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  if (sortMode.value === 'État') {
    result.sort((a, b) => Number(a.done) - Number(b.done));
  } else {
    result.sort((a, b) => b.id - a.id);
  }
  return result;
});

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    tasks.value = JSON.parse(saved);
  }
});

watch(tasks, (newTasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
}, { deep: true });

function confirmDelete(id: number) {
  taskToDelete.value = id;
  deleteDialog.value = true;
}

function deleteTask() {
  if (taskToDelete.value !== null) {
    tasks.value = tasks.value.filter(task => task.id !== taskToDelete.value);
    taskToDelete.value = null;
    deleteDialog.value = false;
  }
}

function toggleDone(id: number) {
  const task = tasks.value.find(t => t.id === id);
  if (task) task.done = !task.done;
}

function editTask(task: Task) {
  selectedTask.value = { ...task };
  editDialog.value = true;
}

function updateTask(updated: Task) {
  const index = tasks.value.findIndex(t => t.id === updated.id);
  if (index !== -1) {
    tasks.value[index] = { ...updated };
  }
}
</script>
