<style src="./index.css" scoped />

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  data() {
    return {
        bedrijf_naamRules: yup.string().required(),
      telefoon_nrRules: yup.number().required(),
      adresRules: yup.string().required(),
      postcodeRules: yup.string().required().matches(/^[\d]{4}( )?[A-Z]{2}$/, "Dit is geen geldige postcode"),
      contact_emailRules: yup.string().email().required(),
      contact_naamRules: yup.string().required(),
    };
  },
  setup() {
    const route = useRoute()

    const {
      data: gezin,
      pending,
      error,
      refresh,
    } = useFetch(`/api/overzicht/leveranciers/${route.params.leveringId}`, {
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
      const _values = { ...values, id: this.levering.id, postcode: values.postcode.replace(/\s/g, "") };

      useFetch(`/api/overzicht/leveranciers/${this.leveringid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_values),
      }).then((data) => {
        this.refresh();
        navigateTo("/admin/overzicht/leveranciers", { replace: true });
      });
    },
  },
};
</script>

<template>
  <div v-if="!!levering">
    <h4>{{ levering.bedrijf_naam }}</h4>

    <Form @submit="onSubmit">
      <div class="formContent">
        <div>
        <label for="bedrijfs naam">Naam</label>
        <Field type="text" name="naam" :rules="bedrijf_naamRules" />
        <ErrorMessage name="bedrijf naam" />
      </div>

      <div>
        <label for="telefoon">Telefoon</label>
        <Field type="tel" name="telefoon nummer" :rules="telefoon_nrRules" />
        <ErrorMessage name="telefoon nummer" />
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
        <label for="email">Email contact persoon</label>
        <Field type="email" name="email" :rules="contact_emailRules" />
        <ErrorMessage name="email" />
      </div>

      <div>
        <label for="contact naam">naam contact persoon</label>
        <Field type="text" name="contact naam" :rules="contact_naamRules" />
        <ErrorMessage name="contact naam" />
      </div>

      </div>

      <Button>Accept</Button>
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
