<style src="./index.css" scoped />

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Multiselect from "vue-multiselect";

export default {
  data() {
    return {
      naamRules: yup.string().required(),
      aanmaakDatumRules: yup.date().required(),
      productenRules: yup.string().required(),
      selectedProducten: [],
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  methods: {
    onSubmit(values) {
      useFetch("/api/overzicht/gezinnen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((data) => {
        navigateTo("/admin/overzicht/gezinnen", { replace: true });
      });
    },
  },
  setup() {
    const { data: klanten } = useFetch("/api/klanten", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data: producten } = useFetch("/api/producten", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { klanten, producten };
  },
};
</script>

<template>
  <h4>Edit gezin</h4>

  <Form @submit="onSubmit">
    <div class="formContent">
      <div>
        <label for="klant">Klant</label>
        <Field name="klant" as="select" :rules="naamRules">
          <option v-for="klant in klanten" :value="klant.id">{{ klant.naam }}</option>
        </Field>
        <ErrorMessage name="klant" />
      </div>

      <div>
        <label for="telefoon">Telefoon</label>
        <Field type="tel" name="telefoon" :rules="telefoonRules" />
        <ErrorMessage name="telefoon" />
      </div>

      <div>
        <label for="producten">Producten</label>
        <Field name="producten" v-slot="{ selectedProducten }" :rules="adresRules">
          <Multiselect
            v-bind="selectedProducten"
            v-model="selectedProducten.value"
            :options="producten.map((product) => ({ label: product.naam, value: product.ean }))"
          ></Multiselect>
        </Field>
        <ErrorMessage name="producten" />
      </div>
    </div>

    <Button>Accept</Button>
  </Form>
</template>
