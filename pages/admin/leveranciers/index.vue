<style src="./index.css" scoped />

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faArrowRight, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowRight, faSquarePlus);

const {
  data: leveranciers,
  pending,
  error,
} = useFetch("/api/overzicht/leveranciers", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
</script>

<template>
  <div class="header">
    <h4>leveranciers overzicht</h4>
    <Button  @click="() => navigateTo('/admin/leveranciers/new', { replace: true })" :icon="['fas', 'square-plus']">
      Toevoegen
    </Button>
  </div>

  <p v-if="error">{{ error }}</p>
  <p v-if="pending">Loading...</p>
  <div v-if="!!leveranciers" class="tableWrapper">
    <table>
      <thead>
        <tr>
          <th>Naam</th>
          <th>Contact persoon</th>
          <th>Email</th>
          <th>Postcode</th>
          <th>Adres</th>
          <th>Telefoon</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="leveranciers in leveranciers" class="click" @click.native="navigateTo(`/admin/leveranciers/${levering.id}`)">
          <td>{{ leveranciers.bedrijf_naam ?? "-" }}</td>
          <td>{{ leveranciers.contact_naam ?? "-" }}</td>
          <td>{{ leveranciers.contact_email ?? "-" }}</td>
          <td>{{ leveranciers.postcode ?? "-" }}</td>
          <td>{{ leveranciers.adres ?? "-" }}</td>
          <td>{{ leveranciers.telefoon_nr ?? "-" }}</td>
          <td class="min"><font-awesome-icon :icon="['fas', 'arrow-right']" /></td>
        </tr>
        <tr v-if="!leveranciers[0]">
          <td class="min">Geen leveranciers zichtbaar.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>
