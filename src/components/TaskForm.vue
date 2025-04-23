<template>
  <v-form @submit.prevent="submitForm">
    <v-text-field v-model="title" label="Titre" required />
    <v-textarea v-model="description" label="Description" required />
    <v-btn type="submit" color="primary">Ajouter</v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const title = ref('');
const description = ref('');

const emit = defineEmits<{
  (e: 'submit-task', task: { title: string; description: string }): void;
}>();

function submitForm() {
  emit('submit-task', {
    title: title.value,
    description: description.value
  });
  title.value = '';
  description.value = '';
}
</script>
