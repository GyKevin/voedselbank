<style src="./index.css" scoped />

<script>
export default {
  data() {
    return {
      dateFormatOptions: {
        month: "short",
        day: "numeric",
        year: "numeric",
      },
    };
  },
  setup() {
    const route = useRoute();

    const {
      data: voedselpakket,
      pending,
      error,
      refresh,
    } = useFetch(`/api/overzicht/voedselpakketten/${route.params.pakketId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { voedselpakket, pending, error, refresh };
  },
};
</script>

<template>
  <div v-if="!!voedselpakket" class="container">
    <h4>voedselpakket {{ voedselpakket.voedselpakket_id }}</h4>
    <h5>{{ voedselpakket.klanten_naam }}</h5>

    <table class="dateInfo">
      <tbody>
        <tr>
          <td>Datum aanmaak</td>
          <td>
            {{
              voedselpakket.datum_aanmaaken
                ? new Date(voedselpakket.datum_aanmaaken).toLocaleDateString("en-NL", dateFormatOptions)
                : "-"
            }}
          </td>
        </tr>
        <tr>
          <td>Datum uitgifte</td>
          <td>
            {{
              voedselpakket.datum_uitgifte
                ? new Date(voedselpakket.datum_uitgifte).toLocaleDateString("en-NL", dateFormatOptions)
                : "-"
            }}
          </td>
        </tr>
        <tr>
          <td>Eisen</td>
          <td>
            {{ voedselpakket.eisen.join(", ") || "-" }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="tableWrapper">
      <table>
        <thead>
          <tr>
            <th>Product naam</th>
            <th>Aantal</th>
            <th>ean</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in voedselpakket.producten">
            <td>{{ product.producten_naam ?? "-" }}</td>
            <td>{{ product.product_aantal ?? "-" }}</td>
            <td>{{ product.producten_ean ?? "-" }}</td>
          </tr>
          <tr v-if="!voedselpakket.producten[0]">
            <td class="min">Geen producten beschikbaar.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- end of table wrapper -->
  </div>

  <!-- error -->
  <div v-if="error">
    <h4>Error</h4>
    {{ error }}
  </div>
</template>
