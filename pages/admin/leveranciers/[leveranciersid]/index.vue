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
      datumRules: yup.date().required(),
    };
  },
  setup() {
    const route = useRoute()

    const {
      data: leveranciers,
      pending,
      error,
      refresh,
    } = useFetch(`/api/overzicht/leveranciers/${route.params.leveranciersid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { leveranciers, pending, error, refresh };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    onSubmit(values) {
      const _values = {
        ...values,
        id: this.leveranciers.id,
        postcode: values.postcode.replace(/\s/g, "")
      };

      useFetch(`/api/overzicht/leveranciers/${this.leveranciers.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_values),
      }).then((data) => {
        this.refresh();
        navigateTo("/admin/leveranciers", { replace: true });
      });
    },
  },
};
</script>

<template>
  <div v-if="!!leveranciers">
    <h4>{{ leveranciers.bedrijf_naam }}</h4>

    <Form @submit="onSubmit">
      <div class="formContent">
        <div>
          <label for="bedrijfs naam">Naam</label>
          <Field :value="leveranciers.bedrijf_naam" type="text" name="bedrijf_naam" :rules="bedrijf_naamRules" />
          <ErrorMessage name="bedrijf naam" />
        </div>

        <div>
          <label for="telefoon">Telefoon</label>
          <Field :value="leveranciers.telefoon_nr" type="tel" name="telefoon_nr" :rules="telefoon_nrRules" />
          <ErrorMessage name="telefoon nummer" />
        </div>

        <div>
          <label for="adres">Adres</label>
          <Field :value="leveranciers.adres" type="text" name="adres" :rules="adresRules" />
          <ErrorMessage name="adres" />
        </div>

        <div>
          <label for="postcode">Postcode</label>
          <Field :value="leveranciers.postcode" type="text" name="postcode" :rules="postcodeRules" />
          <ErrorMessage name="postcode" />
        </div>

        <div>
          <label for="email">Email contact persoon</label>
          <Field :value="leveranciers.contact_email" type="email" name="contact_email" :rules="contact_emailRules" />
          <ErrorMessage name="email" />
        </div>

        <div>
          <label for="contact naam">naam contact persoon</label>
          <Field :value="leveranciers.contact_naam" type="text" name="contact_naam" :rules="contact_naamRules" />
          <ErrorMessage name="contact naam" />
        </div>

        <div>
          <label for="opmerkingen">Eerst volgende leveringsdatum</label>
          <Field  :value="leveranciers.levering_datum" type="date" name="levering_datum" :rules="datumRules"/>
          <ErrorMessage name="leveringsdatum" />
        </div>

      </div>

      <Button>Accepteren</Button>
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
