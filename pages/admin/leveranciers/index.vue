<style src="./leveranciers.css"/>

<template>
    <div class="pwindow">
      <h3>Leverancieren overzicht</h3>
      <input class="aanmaak-button" type="button" value="aanmaken">
        <div class="leveranciers_table">
          <table>
            <thead>
              <tr>
                <th>Naam</th>
                <th>Adres</th>
                <th>contactpersoon</th>
                <th>email</th>
                <th>telefoonnummer</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(leverancier) in items" @click.native="navigateTo(`/admin/leveranciers/[id]`)">
                <td>{{ leverancier.name }}</td>
                <td>{{ leverancier.adres }}</td>
                <td>{{ leverancier.contactpersoon }}</td>
                <td>{{ leverancier.email }}</td>
                <td>{{ leverancier.telefoonnummer }}</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          { name: "Product 1", adres:"bananenstraat 20", contactpersoon:"bob", email:"bob@banaan.nl", telefoonnummer:"06123456789" },
          { name: "Product 2", adres:"chocoladehof 16", contactpersoon:"johan", email:"johan@autism.nl", telefoonnummer:"06123123123" }
        ]
      }
    }
  }
  </script>