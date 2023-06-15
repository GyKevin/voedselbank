<style src="./main.css" scoped />
<template>
  <div class="wrapper" v-if="!product_pending">
    <div class="form">
      <div class="row">
        <label>EAN</label>
        <input type="text" v-model="product[0].ean" />
      </div>
      <div class="row">
        <label>Naam</label>
        <input type="text" v-model="product[0].naam" />
      </div>
      <div class="row">
        <label>Categorie</label>
        <select v-model="product[0].categorie_id">
          <option v-for="categorie in categorien" :key="categorie.id" :value="categorie.id">
            {{ categorie.naam }}
          </option>
        </select>
      </div>
      <div class="row">
        <label>Aantal</label>
        <input type="text" v-model="product[0].aantal" />
      </div>
    </div>
    <div v-if="!delete_confirm" class="buttons">
      <Button :icon="['fas', 'edit']" @click="editProduct(product[0])">Wijzig</Button>
  
      <Button :icon="['fas', 'trash-alt']" @click="delete_confirm = true">Verwijder</Button>
      <Button :icon="['fas', 'xmark']" @click="$router.push('/producten')">Annuleer</Button>
    </div>
    <div v-if="delete_confirm" class="warning">
      <p class="message">Weet je het zeker?</p>
      <Button :icon="['fas', 'check']" @click="deleteProduct(product[0])">Ja</Button>
      <Button :icon="['fas', 'check']" @click="delete_confirm = false">nee</Button>
    </div>

  </div>
</template>

<script>
export default {
  setup() {
    const params = useRoute().params;
    const {
      data: categorien,
      pending: pendingCategorien,
      error: errorCategorien,
      refresh: refreshCategorien,
    } = useFetch(`/api/categorieen/get`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const { data: product, pending: product_pending, error: product_error, refresh: product_refresh } = useFetch(`/api/overzicht/producten/${params.ean}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return {

      // producten,
      product,
      product_pending,
      product_error,
      product_refresh,

      // categorien,
      categorien,
      pendingCategorien,
      errorCategorien,
      refreshCategorien,
    };
  },
  data() {
    return {
      delete_confirm: false,
    };
  },
  methods: {
    editProduct(product) {
      useFetch(`/api/overzicht/producten/${product.ean}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      this.$router.push("/producten");
    },
    deleteProduct(product) {
      useFetch(`/api/overzicht/producten/${product.ean}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      this.$router.push("/producten");
    },
  },
};
</script>
