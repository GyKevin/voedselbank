<style src="./producten.css" scoped/>

<template>
  <div class="pwindow">
    <h3>Producten overzicht</h3>
      <div class="product_table" v-if="!pending">
        <table>
          <thead>
            <tr>
              <th>EAN</th>
              <th>Naam</th>
              <th>Categorie</th>
              <th>Aantal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in items">
              <td>{{ product.ean }}</td>
              <td>{{ product.naam }}</td>
              <td>{{ product.categorie_naam }}</td>
              <td>{{ product.aantal }}</td>
              <td> 
                  <button class="btn btn-primary" @click="editProduct(product)">Edit</button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
export default {
  setup() {
    const { data, pending, error, refresh } = useFetch('/api/producten', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    return {
      items: data,
      pending,
      error,
      refresh
    }
  },
  methods: {
    editProduct(product) {
      this.$router.push(`producten/edit/${product.ean}`, { params: { ean: product.ean } })
    },
  }
}
</script>