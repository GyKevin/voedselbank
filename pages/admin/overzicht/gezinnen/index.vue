<style src="./index.css" scoped />

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faArrowRight, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowRight, faSquarePlus);

const {
  data: users,
  pending,
  error,
} = useFetch("/api/overzicht/gezinnen", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
</script>

<script>
export default {};
</script>

<template>
  <div class="header">
    <h4>Gezinnen overzicht</h4>
    <Button
      @click="() => navigateTo('/admin/overzicht/gezinnen/new', { replace: true })"
      :icon="['fas', 'square-plus']"
    >
      Toevoegen
    </Button>
  </div>

  <p v-if="error">{{ error }}</p>
  <p v-if="pending">Loading...</p>
  <div v-if="!!users" class="tableWrapper">
    <table>
      <thead>
        <tr>
          <th>Naam</th>
          <th>Telefoon</th>
          <th>Email</th>
          <th>Postcode</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" class="click" @click.native="navigateTo(`/admin/overzicht/gezinnen/${user.id}`)">
          <td>{{ user.naam ?? "-" }}</td>
          <td>{{ user.telefoon ?? "-" }}</td>
          <td>{{ user.email ?? "-" }}</td>
          <td>{{ user.postcode ?? "-" }}</td>
          <td class="min"><font-awesome-icon :icon="['fas', 'arrow-right']" /></td>
        </tr>
        <tr v-if="!users[0]">
          <td class="min">Geen gezinnen zichtbaar.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
