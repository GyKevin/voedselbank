<style src="./index.css" scoped />

<script setup>
const {
  data: users,
  pending,
  error,
} = useFetch("/api/overzicht/gebruikers", {
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
  <h4>Gebruikers overzicht</h4>

  <p v-if="error">{{ error }}</p>
  <p v-if="pending">Loading...</p>
  <div v-if="!!users" class="tableWrapper">
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Naam</th>
          <th>Email</th>
          <th>Functie</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td class="min">{{ user.id }}</td>
          <td>{{ user.naam ?? "-" }}</td>
          <td>{{ user.email ?? "-" }}</td>
          <td class="min">
            <span v-if="user.functie === 0">Directie</span>
            <span v-else-if="user.functie === 1">Magazijnmedewerker</span>
            <span v-else-if="user.functie === 2">Vrijwilliger</span>
            <span v-else>-</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
