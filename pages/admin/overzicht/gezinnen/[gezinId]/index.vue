<style src="./index.css" scoped />

<script setup>
const route = useRoute();

const {
  data: gezin,
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
const postcodeRules = yup.string().required().min(6).max(7);
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
  <div v-if="!!gezin">
    <h4>Edit gezin</h4>

    <Form @submit="onSubmit">
      <div class="formContent">
        <div>
          <label for="naam">Naam</label>
          <Field type="text" name="naam" :value="gezin.naam" :rules="naamRules" />
          <ErrorMessage name="naam" />
        </div>

        <div>
          <label for="telefoon">Telefoon</label>
          <Field type="tel" name="telefoon" :value="gezin.telefoon" :rules="telefoonRules" />
          <ErrorMessage name="telefoon" />
        </div>

        <div>
          <label for="adres">Adres</label>
          <Field type="text" name="adres" :value="gezin.adres" :rules="adresRules" />
          <ErrorMessage name="adres" />
        </div>

        <div>
          <label for="postcode">Postcode</label>
          <Field type="text" name="postcode" :value="gezin.postcode" :rules="postcodeRules" />
          <ErrorMessage name="postcode" />
        </div>

        <div>
          <label for="email">Email</label>
          <Field type="email" name="email" :value="gezin.email" :rules="emailRules" />
          <ErrorMessage name="email" />
        </div>

        <div>
          <label for="volwassenen">Volwassenen</label>
          <Field type="number" name="volwassenen" :value="gezin.volwassenen" :rules="volwassenenRules" />
          <ErrorMessage name="volwassenen" />
        </div>

        <div>
          <label for="jongeren">Jongeren</label>
          <Field type="number" name="jongeren" :value="gezin.jongeren" :rules="jongerenRules" />
          <ErrorMessage name="jongeren" />
        </div>

        <div>
          <label for="babies">Babies</label>
          <Field type="number" name="babies" :value="gezin.baby" :rules="babiesRules" />
          <ErrorMessage name="babies" />
        </div>
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
