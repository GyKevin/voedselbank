<style src="./index.css" scoped />

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  data() {
    return {
      uitgifteRules: yup.date().required(),
      dateFormatOptions: {
        month: "short",
        day: "numeric",
        year: "numeric",
      },
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    definePageMeta({
      middleware: ["auth-2"],
    });
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
  methods: {
    onSubmit(values) {
      const newValues = {
        ...values,
        id: this.voedselpakket.voedselpakket_id,
        datum_aanmaaken: this.voedselpakket.datum_aanmaaken,
      };

      useFetch(`/api/overzicht/voedselpakketten/${this.voedselpakket.voedselpakket_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newValues),
      }).then((data) => {
        this.refresh();
        navigateTo("/admin/overzicht/VoedselPakketten", { replace: true });
      });
    },
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
          <td v-if="voedselpakket.datum_uitgifte">
            {{ new Date(voedselpakket.datum_uitgifte).toLocaleDateString("en-NL", dateFormatOptions) }}
          </td>
          <td v-else>
            <Form class="flex-hor" @submit="onSubmit" autocomplete="off">
              <div>
                <Field type="date" name="datum_uitgifte" :rules="uitgifteRules" />
                <ErrorMessage name="datum_uitgifte" />
              </div>
              <Button size="small">Submit</Button>
            </Form>
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
