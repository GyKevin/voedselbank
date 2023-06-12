<style src="./index.css" scoped />

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

let options = [].slice.call(document.querySelectorAll(`select[name="producten"] option`));
options.forEach(function (element) {
  element.addEventListener(
    "mousedown",
    function (e) {
      e.preventDefault();
      element.parentElement.focus();
      this.selected = !this.selected;
      return false;
    },
    false
  );
});

export default {
  data() {
    return {
      klantRules: yup.string().required(),
      aanmaakDatumRules: yup.date().required(),
      productenRules: yup.array().required(),
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

      <div>
        <label for="producten">Producten</label>
        <Field name="producten" as="select" multiple :rules="productenRules">
          <option
            v-for="product in producten"
            :key="product.ean"
            :value="product.ean"
            :selected="value && value.includes(product.ean)"
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
