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

      console.log(newValues);
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
      return !![...this.selectedProducten].some((obj) => obj.ean === item);
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

      // if ean exists in set, remove set
      // if not, create one
      if ([...this.selectedProducten].some((obj) => obj.ean === el)) {
        this.removeSelection(el);
      } else {
        this.selectedProducten.add({
          naam: this.producten[index]?.naam,
          ean: el,
          aantal: 1,
        });
      }
    },

    changeSelectionAantal(ean, e) {
      let oldSetItem;

      // save the old set item in a variable and delete it from the set
      this.selectedProducten.forEach((item) => {
        if (item.ean === ean) {
          oldSetItem = item;
          this.selectedProducten.delete(item);
        }
      });

      // add the old set item and change the aantal to the new aantal
      this.selectedProducten.add({
        ...oldSetItem,
        aantal: e.target.value,
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
        <label for="aanmaak">Aanmaak datum</label>
        <Field type="date" name="aanmaak" :rules="aanmaakDatumRules" />
        <ErrorMessage name="aanmaak" />
      </div>

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
            :class="{ selected: isSelected(product.ean) }"
            :disabled="product.aantal <= 0"
          >
            {{ product.naam }}
          </option>
        </Field>
        <ErrorMessage name="producten" />
      </div>

      <div class="full-grip-width">
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
                <td class="min">
                  <input
                    type="number"
                    @input="(e) => changeSelectionAantal(selectedProduct.ean, e)"
                    :value="selectedProduct.aantal"
                  />
                </td>
                <td class="min">
                  <Button @click="removeSelection(selectedProduct.ean)" size="small" :icon="['fas', 'xmark']"></Button>
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
