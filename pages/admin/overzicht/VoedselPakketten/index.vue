<style src="./index.css" scoped />

<script>
import "vue-datepicker-ui/lib/vuedatepickerui.css";
import VueDatepickerUi from "vue-datepicker-ui";

export default {
  data() {
    return {
      dateFormatOptions: {
        month: "short",
        day: "numeric",
        year: "numeric",
      },
    };
  },
  components: {
    Datepicker: VueDatepickerUi,
  },
  setup() {
    // this code is such a pain in the ass
    // even GPT-4 needed to help me 5 times
    const search = ref("");
    const selectedDate = ref([null, null]);
    const result = reactive(getData());

    watch(
      () => [search.value, selectedDate.value],
      () => {
        Object.assign(result, getData(search.value, selectedDate.value));
      },
      { deep: true }
    );

    const pakketten = computed(() => result.pakketten);

    return {
      ...result,
      pakketten,
      search,
      selectedDate,
      refresh: () => {
        Object.assign(result, getData(search.value, selectedDate.value));
      },
      onSearchChange: (e) => {
        search.value = e.target.value;
        result.refresh();
      },
      onDateReset: () => {
        selectedDate.value = [null, null];
      },
    };
  },
};

function getData(searchQuery, dateRange) {
  const query = `search=${searchQuery ?? ""}&date=${dateRange?.[0] ?? ""}&date=${dateRange?.[1] ?? ""}`;

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
</script>

<template>
  <div class="header">
    <h4>Voedsel Pakketten Overzicht</h4>
    <Button
      @click="() => navigateTo('/admin/overzicht/VoedselPakketten/new', { replace: true })"
      :icon="['fas', 'square-plus']"
    >
      Toevoegen
    </Button>
  </div>

  <div class="search">
    <input type="text" placeholder="Zoeken" @input="onSearchChange" />
    <Datepicker
      v-model="selectedDate"
      :range="true"
      lang="dut"
      position="bottom right"
      :circle="true"
      :showClearButton="true"
      class="dateRange"
      @reset="onDateReset"
    />
  </div>

  <div v-if="!!pakketten">
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
            @click.native="navigateTo(`/admin/overzicht/VoedselPakketten/${pakket.id}`)"
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

  <br />
  <p v-if="error">{{ error }}</p>
</template>
