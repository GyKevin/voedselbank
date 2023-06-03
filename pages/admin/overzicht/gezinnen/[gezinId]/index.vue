<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowRight);

const route = useRoute();

const {
  data: users,
  pending,
  error,
} = useFetch(`/api/overzicht/gezinnen/${route.params.gezinId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(users);
</script>

<template>{{ $route.params.gezinId }}</template>
