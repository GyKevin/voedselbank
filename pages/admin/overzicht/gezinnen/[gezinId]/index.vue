<style src="./index.css" scoped />

<script setup>
const route = useRoute();

const {
  data: users,
  pending,
  error,
} = useFetch(`/api/overzicht/gezinnen/${route.params.gezinId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
</script>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const naamRules = yup.string().required();
const telefoonRules = yup.string().required();
const adresRules = yup.string().required();
const postcodeRules = yup.string().required().max(7);
const emailRules = yup.string().email().required();
const volwassenenRules = yup.number().required().integer();
const jongerenRules = yup.number().required().integer();
const babiesRules = yup.number().required().integer();

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
  },
};
</script>

<template>
  <div v-if="!!users">
    <h4>Edit gezin</h4>

    <Form @submit="onSubmit">
      <div class="formContent">
        <label>
          Naam
          <Field type="text" name="naam" :rules="naamRules" />
          <ErrorMessage name="naam" />
        </label>

        <label>
          Telefoon
          <Field type="text" name="telefoon" :rules="telefoonRules" />
          <ErrorMessage name="telefoon" />
        </label>

        <label>
          Adres
          <Field type="text" name="adres" :rules="adresRules" />
          <ErrorMessage name="adres" />
        </label>

        <label>
          Postcode
          <Field type="text" name="postcode" :rules="postcodeRules" />
          <ErrorMessage name="postcode" />
        </label>

        <label>
          Email
          <Field type="email" name="email" :rules="emailRules" />
          <ErrorMessage name="email" />
        </label>

        <label>
          Volwassenen
          <Field type="number" name="volwassenen" :rules="volwassenenRules" />
          <ErrorMessage name="volwassenen" />
        </label>

        <label>
          Jongeren
          <Field type="number" name="jongeren" :rules="jongerenRules" />
          <ErrorMessage name="jongeren" />
        </label>

        <label>
          Babies
          <Field type="number" name="babies" :rules="babiesRules" />
          <ErrorMessage name="babies" />
        </label>
      </div>

      <button>Accept</button>
    </Form>
  </div>

  <!-- loading -->
  <div v-if="pending">
    <h4>Loading...</h4>
  </div>

  <!-- error -->
  <div v-if="error">
    <h4>Error</h4>
    {{ error }}
  </div>
</template>
