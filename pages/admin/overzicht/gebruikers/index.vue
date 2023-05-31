<style src="./index.css" scoped />

<script>
export default {
  // state
  data() {
    return {
      users: [
        {
          id: 1,
          name: "Harold",
          email: "HaroldW@gmail.com",
          functie: 0,
        },
        {
          id: 2,
          name: "Frank",
          email: "fortKnox@outlook.com",
          functie: 2,
        },
        {
          id: 3,
          name: "Wiljan",
          email: "wiljanverhoeven@gmail.com",
          functie: 1,
        },
        {
          id: 4,
          name: "Kevin",
          email: "hiiiren@gmail.com",
          functie: 2,
        },
      ],
    };
  },
};
</script>

<template>
  <h4>Gebruikers overzicht</h4>

  <div class="tableWrapper">
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Naam</th>
          <th>Email</th>
          <th>Functie</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td class="min">{{ user.id }}</td>
          <td>{{ user.name ?? "-" }}</td>
          <td>{{ user.email ?? "-" }}</td>
          <td class="min">
            <span v-if="user.functie === 0">Directie</span>
            <span v-else-if="user.functie === 1">Magazijnmedewerker</span>
            <span v-else-if="user.functie === 2">Vrijwilliger</span>
            <span v-else>-</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
