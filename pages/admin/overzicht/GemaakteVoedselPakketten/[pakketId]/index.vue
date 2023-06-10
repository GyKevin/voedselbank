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
      postcodeRules: yup
        .string()
        .required()
        .matches(/^[\d]{4}( )?[A-Z]{2}$/, "Dit is geen geldige postcode"),
      emailRules: yup.string().email().required(),
      volwassenenRules: yup.number().required().integer().min(0),
      jongerenRules: yup.number().required().integer().min(0),
      babiesRules: yup.number().required().integer().min(0),
    };
  },
  setup() {
    const route = useRoute();

    const {
      data: gezin,
      pending,
      error,
      refresh,
    } = useFetch(`/api/overzicht/voedselpakketten/${route.params.pakketId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { gezin, pending, error, refresh };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    onSubmit(values) {
      const _values = { ...values, id: this.gezin.id, postcode: values.postcode.replace(/\s/g, "") };

      useFetch(`/api/overzicht/gezinnen/${this.gezin.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_values),
      }).then((data) => {
        this.refresh();
        navigateTo("/admin/overzicht/gezinnen", { replace: true });
      });
    },
  },
};
</script>

<template>
  <div v-if="!!gezin">
    <h4>{{ gezin.naam }}'s gezin</h4>

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

      <Button>Accept</Button>
    </Form>
  </div>

  <!-- error -->
  <div v-if="error">
    <h4>Error</h4>
    {{ error }}
  </div>
</template>
