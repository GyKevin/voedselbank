<style src="./id.css"/>

<template>
    <h3>Edit leverancier</h3>
    <div class="pwindow">
        
            <div clas="text">
                <input type="text" placeholder="bedrijfsnaam" required>
                <input type="text" placeholder="adres" required>
                <input type="text" placeholder="contactpersoon" required>
                <input type="text" placeholder="email" required>
                <input type="date" id="start" name="trip-start" title="eerstvolgende leveringsdatum" required> 
                <input type="text" placeholder="telefoonnummer" required>
                <input type="time" id="appt" name="appt" title="eerstvolgende leveringstijd" required>
                <input class="save-button" type="button" value="Opslaan">
        </div>
        
    </div>

</template>

<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>
```
