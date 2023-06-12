<style src="./index.css" scoped />

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  data() {
    return {
      klantRules: yup.string().required(),
      aanmaakDatumRules: yup.date().required(),
      productenRules: yup.array().required(),
      selectedProducten: [],
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    onSubmit(values) {
      console.log(values);

      return;

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
    isSelected(item) {
      console.log(this.selectedProducten, item);
      console.log(this.selectedProducten.includes(item));
      return this.selectedProducten.includes(item);
    },
    selection(e) {
      const el = e.target.value;
      if (this.selectedProducten.includes(el)) {
        this.selectedProducten = this.selectedProducten.filter((s) => s !== el);
      } else {
        this.selectedProducten = [...this.selectedProducten, el];
      }
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
        <Field name="klant" as="select" :rules="klantRules">
          <option v-for="klant in klanten" :value="klant.id">{{ klant.naam }}</option>
        </Field>
        <ErrorMessage name="klant" />
      </div>

      <div>
        <label for="aanmaak">Aanmaak datum</label>
        <Field type="date" name="aanmaak" :rules="aanmaakDatumRules" />
        <ErrorMessage name="aanmaak" />
      </div>

      {{ selectedProducten }}

      <div>
        <label for="producten">Producten</label>
        <Field
          name="producten"
          as="select"
          multiple
          :value="selectedProducten"
          @click="selection"
          :rules="productenRules"
        >
          <option
            v-for="product in producten"
            :key="product.ean"
            :value="product.ean"
            :selected="selectedProducten.includes(product.ean)"
          >
            {{ product.naam }}
          </option>
        </Field>
        <ErrorMessage name="producten" />
      </div>
    </div>

    <Button>Accept</Button>
  </Form>
</template>
