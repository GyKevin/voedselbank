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
        },
        {
          id: 2,
          name: "Frank",
          email: "fortKnox@outlook.com",
        },
        {
          id: 3,
          name: "Wiljan",
          email: "wiljanverhoeven@gmail.com",
        },
        {
          id: 4,
          name: "Kevin",
          email: "hiiiren@gmail.com",
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td class="min">{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
