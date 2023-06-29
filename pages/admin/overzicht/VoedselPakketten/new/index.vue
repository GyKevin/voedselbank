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

const klantenSearchTerm = ref("");
const productenSearchTerm = ref("");

export default {
  data() {
    return {
      klantRules: yup.string().required(),
      aanmaakDatumRules: yup.date().required(),
      selectedKlant: null,
      selectedProducten: new Set(),
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    search() {
      if (this.pending) return; // don't search if there is a pending request
      this.refresh();
    },
    onSubmit(values) {
      if (!this.selectedKlant.id) return;

      const newValues = {
        ...values,
        klant: this.selectedKlant.id,
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
      const el = e.target.id;
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
    onInputSearchResultToKlantenInput(e) {
      /*
        this runs on every input from Klant field.
        it will check if the input text exists in the klanten array.
        if true:
            add it to the selectedKlant object
        if false:
            empty selectedKlant object

        this is incase the user doesnt use the searchBox results
      */
      this.search();
      const index = this.klanten.findIndex((i) => i.naam === e.target.value);

      if (index !== -1) {
        this.selectedKlant = {
          id: this.klanten[index].id,
          naam: this.klanten[index].naam,
        };
      } else {
        this.selectedKlant = {
          id: null,
          naam: null,
        };
      }
    },
    addSearchResultToKlantenInput(e) {
      /*
        this runs when user selects option from search result box on Klant field
        it will add the id and naam to selectedKlant object
      */
      this.klantenSearchTerm = e.target.dataset.naam; // add naam to klantenSearchTerm
      this.selectedKlant = {
        id: e.target.id,
        naam: e.target.dataset.naam,
      };
    },
    addSearchResultToProductenInput(e) {
      this.selection(e);
    },
  },
  setup() {
    definePageMeta({
      middleware: ["auth-2"],
    });
    const { data: klanten, refresh: klantenRefresh } = useFetch("/api/klanten", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      onRequest({ request, options }) {
        if (klantenSearchTerm.value) {
          options.query = { search: klantenSearchTerm.value };
        }
      },
    });

    const { data: producten, refresh: productenRefresh } = useFetch("/api/producten", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      onRequest({ request, options }) {
        if (productenSearchTerm.value) {
          options.query = { search: productenSearchTerm.value };
        }
      },
    });

    const refresh = () => {
      klantenRefresh();
      productenRefresh();
    };

    return { klanten, producten, refresh, klantenSearchTerm, productenSearchTerm };
  },
};
</script>

<template>
  <h4>Nieuwe voedsel pakket maken</h4>

  <Form @submit="onSubmit" autocomplete="off">
    <div class="formContent">
      <div>
        <label for="klant">Klant</label>
        <Field
          name="klant"
          type="text"
          v-model="klantenSearchTerm"
          :value="klantenSearchTerm"
          @input="onInputSearchResultToKlantenInput"
          :rules="klantRules"
        />
        <div class="searchResultBox">
          <div
            v-for="klant in klanten.slice(0, 5)"
            :id="klant.id"
            :data-naam="klant.naam"
            @mousedown.prevent="addSearchResultToKlantenInput"
          >
            {{ klant.naam }}
          </div>
        </div>
        <ErrorMessage name="klant" />
      </div>

      <div>
        <label for="aanmaak_datum">Aanmaak datum</label>
        <Field type="date" name="aanmaak_datum" :rules="aanmaakDatumRules" />
        <ErrorMessage name="aanmaak_datum" />
      </div>

      <div>
        <label for="producten">Selecteer producten</label>
        <Field
          name="producten"
          type="text"
          v-model="productenSearchTerm"
          :value="productenSearchTerm"
          @input="search()"
        />
        <div class="searchResultBox">
          <div
            v-for="product in producten.slice(0, 5)"
            :id="product.ean"
            @mousedown.prevent="addSearchResultToProductenInput"
          >
            {{ product.naam }}
          </div>
        </div>
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
              <tr v-if="!selectedProducten.keys().next().value">
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
