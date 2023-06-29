<template>
  <h4>Producten overzicht</h4>

  <div>
    <!-- searchbar -->
    <div class="controls">
      <div class="search-box">
        <input name="search" class="search" type="text" v-model="searchTerm" @input="search()" placeholder="Search Producten" />
      </div>
      <!-- magezijnmedewerker -->
      <div class="buttons" v-if="perm == '0' || perm == '1'">
        <Button
          @click="() => navigateTo('/producten/new', { replace: true })"
          class="btn"
          :icon="['fas', 'square-plus']"
        >
          Toevoegen
        </Button>
      </div>
    </div>
    <!-- product table -->
    <table>
      <thead>
        <tr>
          <th>Ean</th>
          <th>Naam</th>
          <th>Categorie ID</th>
          <th>Aantal</th>
          <th v-if="perm == '0' || perm == '1'">
            Acties
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in producten" :key="product.ean">
          <td>{{ product.ean }}</td>
          <td>{{ product.naam }}</td>
          <td>{{ product.categorie_naam }}</td>
          <td>{{ product.aantal }}</td>
          <td v-if="perm == '0' || perm == '1'">
            <Button
              @click="() => navigateTo(`/producten/edit/${product.ean}`, { replace: true  })"
              class="btn-x-small"
              :icon="['fas', 'edit']"
            >
              Bewerken
            </Button>
          </td>
        </tr>
        <!-- producten == null to stop funny typescript complain -->
        <tr v-if="producten == null || !producten[0]">
          <td class="min">Geen producten beschikbaar.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
interface Product {
  ean: string;
  naam: string;
  categorie_id: string;
  categorie_naam: string;
  aantal: string;
}
const searchTerm = ref('');

export default {
  setup() {
    const { data: producten, pending, error, refresh } = useFetch<Product[]>('/api/overzicht/producten', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      onRequest({ request, options }) {
        if (searchTerm.value) {
          // wanted to add abort controller here to prevent but its to fast to cancel the request on local setup 💀💀
          options.query = { search: searchTerm.value };
        } 
      }
    });

    return {
      producten,
      pending,
      error,
      refresh,
      searchTerm,
    }
  },
  data() {
    return {
      perm: useCookie("Authorization-role")
    }
  },
  methods: {
    search() {
      if (this.pending) return; // don't search if there is a pending request
      this.refresh();
    }
  }
}
</script>



<style src="./producten.css" scoped />

