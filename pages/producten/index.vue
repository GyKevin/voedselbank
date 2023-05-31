<style src="./producten.css" scoped/>

<template>
  <div class="pwindow">
    <h3>Producten overzicht</h3>
      <div class="product_table">
        <table>
          <thead>
            <tr>
              <th>Naam</th>
              <th>Prijs</th>
              <th>Aantal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product) in items">
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { name: "Product 1", price: "$0.21", quantity: 1 },
        { name: "Product 2", price: "$20.00", quantity: 200 }
      ]
    }
  }
}
</script>