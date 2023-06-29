<style src="./index.css" scoped />
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

/*
=====================================================================
 the code here is very complex,
 if something breaks or needs to be changed please just ask me (Thijn)
=====================================================================
*/

export default {
  data() {
    return {
      klantRules: yup.string().required(),
      aanmaakDatumRules: yup.date().required(),
      selectedProducten: new Set(),
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    onSubmit(values) {
      const newValues = {
        ...values,
        producten: [...this.selectedProducten],
      };

      useFetch("/api/overzicht/voedselpakketten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newValues),
      }).then((data) => {
        navigateTo("/admin/overzicht/VoedselPakketten", { replace: true });
      });
    },
    getProductFromEan(ean) {
      return this.producten[this.producten.findIndex((i) => i.ean === ean)];
    },
    removeSelection(ean) {
      this.selectedProducten.forEach((item) => {
        if (item.ean === ean) {
          this.selectedProducten.delete(item);
        }
      });
    },
    selection(e) {
      const el = e.target.value;
      const index = this.producten.findIndex((i) => i.ean === el);

      if ([...this.selectedProducten].some((obj) => obj.ean === el)) return; // return if ean exists

      this.selectedProducten.add({
        naam: this.producten[index]?.naam,
        ean: el,
        aantal: 1,
        categorie: this.producten[index]?.categorie_id,
      });
    },
    changeSelectionAantal(ean, e) {
      this.selectedProducten.forEach((obj) => {
        if (obj.ean === ean) {
          obj.aantal = e.target.value;
        }
      });
    },
  },
  setup() {
    definePageMeta({
      middleware: ["auth-2"],
    });
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
  <h4>Nieuwe voedsel pakket maken</h4>

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
        <label for="aanmaak_datum">Aanmaak datum</label>
        <Field type="date" name="aanmaak_datum" :rules="aanmaakDatumRules" />
        <ErrorMessage name="aanmaak_datum" />
      </div>

      <div>
        <label for="producten">Selecteer producten</label>
        <Field name="producten" as="select" :value="selectedProducten" @change="selection">
          <option v-for="product in producten" :key="product.ean" :value="product.ean" :disabled="product.aantal <= 0">
            {{ product.naam }}
          </option>
        </Field>
        <ErrorMessage name="producten" />
      </div>

      <div class="full-grid-width">
        <label>Geselecteerde producten</label>
        <div class="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>Naam</th>
                <th>Ean</th>
                <th>Aantal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="selectedProduct in selectedProducten">
                <td>{{ selectedProduct.naam ?? "-" }}</td>
                <td>{{ selectedProduct.ean ?? "-" }}</td>
                <td>
                  <input
                    type="number"
                    @input="(e) => changeSelectionAantal(selectedProduct.ean, e)"
                    :value="selectedProduct.aantal"
                    min="0"
                    :max="getProductFromEan(selectedProduct.ean).aantal"
                    required
                  />
                </td>
                <td class="min">
                  <Button
                    @click="removeSelection(selectedProduct.ean)"
                    type="button"
                    size="small"
                    :icon="['fas', 'xmark']"
                  ></Button>
                  <!-- type="button" is needed to avoid onSubmit from running without e.preventDefault() -->
                </td>
              </tr>
              <tr v-if="!selectedProducten[0]">
                <td class="min">Geen product geselecteerd</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <Button>Accept</Button>
  </Form>
</template>
