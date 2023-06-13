<template>
  <h4>Producten overzicht</h4>

  <div>
    <!-- searchbar -->
    <div class="search-box">
    <input class="search" type="text" v-model="searchTerm" placeholder="Search users" />
    </div>
    <!-- product table -->
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
        <tr v-for="product in filteredProducten" :key="product.ean">
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
// Import ref and computed from vue
import { ref, computed } from 'vue';

// Create a ref for searchTerm
const searchTerm = ref('');

// Use computed property to filter the producten based on searchTerm
const filteredProducten = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return producten.value.filter(product => product.naam.toLowerCase().includes(term));
});
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