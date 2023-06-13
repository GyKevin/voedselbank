<template>
  <h4>Producten overzicht</h4>

  <!-- <p v-if="error">{{ error }}</p> -->
  <div >
    <input type="text" v-model="searchTerm" placeholder="Search users" />
    <table>
      <thead>
        <tr>
          <th>Ean</th>
          <th>Naam</th>
          <th>Categorie ID</th>
          <th>Aantal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in producten">
          <td>{{ product.ean }}</td>
          <td>{{ product.naam }}</td>
          <td>{{ product.categorie_id }}</td>
          <td>{{ product.aantal }}</td>
        </tr>
        <tr v-if="!producten[0]">
          <td class="min">Geen producten beschikbaar.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const {
  data: producten,
  pending,
  error,
} = useFetch("/api/overzicht/producten", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
</script>

<script>
export default {
  data() {
    return {
      searchTerm: "",
    }
  }
}
</script>
<style src="./producten.css" scoped />