<style src="./index.css" scoped />

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  data() {
    return {
      naamRules: yup.string().required(),
      telefoonRules: yup.number().required(),
      adresRules: yup.string().required(),
      postcodeRules: yup.string().required().matches(/^[\d]{4}( )?[A-Z]{2}$/, "Dit is geen geldige postcode"),
      emailRules: yup.string().email().required(),
      volwassenenRules: yup.number().required().integer(),
      jongerenRules: yup.number().required().integer(),
      babiesRules: yup.number().required().integer(),
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
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
};
</script>

<template>
  <h4>Edit gezin</h4>

  <Form @submit="onSubmit">
    <div class="formContent">
      <div>
        <label for="naam">Naam</label>
        <Field type="text" name="naam" :rules="naamRules" />
        <ErrorMessage name="naam" />
      </div>

      <div>
        <label for="telefoon">Telefoon</label>
        <Field type="tel" name="telefoon" :rules="telefoonRules" />
        <ErrorMessage name="telefoon" />
      </div>

      <div>
        <label for="adres">Adres</label>
        <Field type="text" name="adres" :rules="adresRules" />
        <ErrorMessage name="adres" />
      </div>

      <div>
        <label for="postcode">Postcode</label>
        <Field type="text" name="postcode" :rules="postcodeRules" />
        <ErrorMessage name="postcode" />
      </div>

      <div>
        <label for="email">Email</label>
        <Field type="email" name="email" :rules="emailRules" />
        <ErrorMessage name="email" />
      </div>

      <div>
        <label for="volwassenen">Volwassenen</label>
        <Field type="number" name="volwassenen" :rules="volwassenenRules" />
        <ErrorMessage name="volwassenen" />
      </div>

      <div>
        <label for="jongeren">Jongeren</label>
        <Field type="number" name="jongeren" :rules="jongerenRules" />
        <ErrorMessage name="jongeren" />
      </div>

      <div>
        <label for="babies">Babies</label>
        <Field type="number" name="babies" :rules="babiesRules" />
        <ErrorMessage name="babies" />
      </div>
    </div>

    <Button>Accept</Button>
  </Form>
</template>
