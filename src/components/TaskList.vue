<template>
  <v-list>
    <v-list-item
      v-for="task in tasks"
      :key="task.id"
    >
      <v-list-item-content>
        <v-list-item-title :class="{ 'text-line-through': task.done }">
          {{ task.title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ task.description }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-icon
          class="mr-2"
          color="green"
          @click="$emit('toggle-done', task.id)"
        >
          {{ task.done ? 'mdi-check-circle' : 'mdi-checkbox-blank-circle-outline' }}
        </v-icon>

        <v-icon
          class="mr-2"
          color="blue"
          @click="$emit('edit-task', task)"
        >
          mdi-pencil
        </v-icon>

        <v-icon
          color="red"
          @click="$emit('delete-task', task.id)"
        >
          mdi-delete
        </v-icon>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script lang="ts" setup>
import type { Task } from '@/types/Task';

defineProps<{
  tasks: Task[];
}>();

defineEmits<{
  (e: 'delete-task', id: number): void;
  (e: 'toggle-done', id: number): void;
  (e: 'edit-task', task: Task): void;
}>();
</script>

<style scoped>
.text-line-through {
  text-decoration: line-through;
}
</style>
