<style src="./producten.css" scoped/>
<template>
  <div class="product_table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>price</th>
        <th>quantity</th>
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