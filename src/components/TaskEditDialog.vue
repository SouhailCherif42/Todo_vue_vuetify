<template>
  <v-dialog v-model="visible" persistent max-width="600px">
    <v-card>
      <v-card-title>Modifier la tâche</v-card-title>
      <v-card-text>
        <v-text-field v-model="localTask.title" label="Titre" />
        <v-textarea v-model="localTask.description" label="Description" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="save">Enregistrer</v-btn>
        <v-btn color="grey" @click="close">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { Task } from '@/types/Task';

const props = defineProps<{
  modelValue: boolean;
  task: Task | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'save-task', task: Task): void;
}>();

const visible = ref(props.modelValue);
const localTask = ref<Task | null>(null);

watch(() => props.modelValue, (val) => {
  visible.value = val;
  if (val && props.task) {
    localTask.value = { ...props.task };
  }
});

function save() {
  if (localTask.value) {
    emit('save-task', localTask.value);
    close();
  }
}

function close() {
  emit('update:modelValue', false);
}
</script>
