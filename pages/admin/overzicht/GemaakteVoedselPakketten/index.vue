<style src="./index.css" scoped />

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faArrowRight, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

import "vue-datepicker-ui/lib/vuedatepickerui.css";
import VueDatepickerUi from "vue-datepicker-ui";

function getData(searchQuery, dateRange) {
  const query = `search=${searchQuery ?? ""}&date=${dateRange ?? ""}`;

  const {
    data: pakketten,
    pending,
    error,
    refresh,
  } = useFetch(`/api/overzicht/voedselpakketten?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { pakketten, pending, error, refresh };
}

export default {
  data() {
    return {
      dateFormatOptions: {
        month: "short",
        day: "numeric",
        year: "numeric",
      },
      search: "",
      selectedDate: [null, null],
    };
  },
  components: {
    Datepicker: VueDatepickerUi,
  },
  setup() {
    library.add(faArrowRight, faSquarePlus);

    const result = reactive(getData());

    console.log(result);

    watch(
      () => [this.search, this.selectedDate],
      () => {
        Object.assign(result, getData(this.search, this.selectedDate));
      },
      { deep: true }
    );

    return {
      ...result,
      refresh: () => {
        Object.assign(result, getData(this.search, this.selectedDate));
      },
    };
  },
  methods: {
    onSearchChange(e) {
      this.search = e.target.value;
      this.refresh();
    },
  },
};
</script>

<template>
  <div class="header">
    <h4>Gemaakte Voedsel Pakketten Overzicht</h4>
  </div>

  <div v-if="!!pakketten">
    <div class="search">
      <input type="text" placeholder="Search" @input="onSearchChange" />
      <Datepicker
        v-model="selectedDate"
        :range="true"
        lang="dut"
        position="bottom right"
        :circle="true"
        :showClearButton="true"
        class="dateRange"
      />
    </div>

    <div class="tableWrapper">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Klant naam</th>
            <th>Aanmaak datum</th>
            <th>Uitgifte datum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="pakket in pakketten"
            class="click"
            @click.native="navigateTo(`/admin/overzicht/GemaakteVoedselPakketten/${pakket.id}`)"
          >
            <td class="min">{{ pakket.id ?? "-" }}</td>
            <td>{{ pakket.klanten_naam ?? "-" }}</td>
            <td>
              {{
                pakket.datum_aanmaaken
                  ? new Date(pakket.datum_aanmaaken).toLocaleDateString("en-NL", dateFormatOptions)
                  : "-"
              }}
            </td>
            <td>
              {{
                pakket.datum_uitgifte
                  ? new Date(pakket.datum_uitgifte).toLocaleDateString("en-NL", dateFormatOptions)
                  : "-"
              }}
            </td>
            <td class="min"><font-awesome-icon :icon="['fas', 'arrow-right']" /></td>
          </tr>
          <tr v-if="!pakketten[0]">
            <td class="min">Geen voedsel pakketten zichtbaar.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <p v-if="error">{{ error }}</p>
  <p v-if="pending">Loading...</p>
</template>
