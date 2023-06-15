<style src="./new.css" scoped />
<template>
    <div class="wrapper">
        <div class="form">
            <div class="row">
                <label>EAN</label>
                <input type="text" v-model="product.ean"/>
                <label class="warning" v-if="ean_exists">Ean bestaat al</label>
            </div>
            <div class="row">
                <label>Naam</label>
                <input type="text" v-model="product.naam" />
            </div>
            <div class="row">
                <label>Categorie</label>
                <select v-model="product.categorie_id">
                    <option v-for="categorie in categorien" :key="categorie.id" :value="categorie.id">
                        {{ categorie.naam }}
                    </option>
                </select>
            </div>
            <div class="row">
                <label>Aantal</label>
                <input type="text" v-model="product.aantal" />
            </div>
        </div>
        <Button :icon="['fas', 'edit']" @click="addProduct()">Toevoegen</Button>
    
        <Button :icon="['fas', 'xmark']" @click="$router.push('/producten')">Cancel</Button>
    </div>
</template>

<script>
export default {
    setup() {
        const { data: categorien, pending, error, refresh } = useFetch(`/api/categorieen/get`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        return {
            categorien,
            pending,
            error,
            refresh,
        }
    },
    data() {
        return {
            product: {
                ean: "",
                naam: "",
                categorie_id: "",
                aantal: 0,
            },
            ean_exists: false,
        };
    },
    methods: {
        addProduct() {
            if (this.check_ean_exists(this.product.ean)) return;

            const { data, pending, error, refresh } = useFetch(`/api/overzicht/producten`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.product),
            });
            this.$router.push("/producten");
        },
        check_ean_exists(ean) {
            const { data, pending, error, refresh } = useFetch(`/api/overzicht/producten/${ean}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (data.value != null && data.value[0]) {
                this.ean_exists = true;
            } else {
                this.ean_exists = false;
            }
            return this.ean_exists;
        }
    },
};
</script>
