<template>
  <v-app>
    <v-app-bar app color="deep-purple accent-4" dark>
      <v-toolbar-title>ToDo List</v-toolbar-title>
      <v-spacer />
      <v-btn to="/" text>Accueil</v-btn>
      <v-btn to="/taches" text>Liste des Tâches</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>