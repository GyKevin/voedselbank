<style src="./main.css" scoped />
<template>
  <div>
    <h5>{{ item[0].ean }} - {{ capitalize(item[0].naam) }}</h5>

    <div v-for="(value, key) in item[0]" :key="key">
      <div v-if="key != 'ean'" class="row">
        <label>{{ capitalize(key) }}</label>
        <input
          type="text"
          :value="value"
          @input="
            (e) => {
              item[0][key] = e.target.value;
            }
          "
        />
      </div>
    </div>

    <button class="btn btn-primary" @click="editProduct(item[0])">Edit</button>
    <button class="btn btn-primary" @click="$router.push('/producten')">Cancel</button>
  </div>
</template>

<script>
export default {
  setup() {
    const params = useRoute().params;
    const { data, pending, error, refresh } = useFetch(`/api/producten/get/${params.ean}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return {
      item: data,
      pending,
      error,
      refresh,
    };
  },
  methods: {
    editProduct(product) {
      console.log(product);
      useFetch(`/api/producten/edit/${product.ean}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      this.$router.push("/producten");
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
};
</script>
