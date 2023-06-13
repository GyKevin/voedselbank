import { getMysqlConnection } from "~/server/mysql";
import { ref } from "@vue/reactivity";
export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    const body = await readBody(event);
    try {
        const query = ref(``);
        const search = body.searchTerm._value;

        console.log(search);
        if (!!search && search.length > 0) {
            console.log(search);
            query.value = `SELECT producten.*, categorie.naam AS categorie_naam FROM \`producten\` JOIN categorie ON categorie_id = categorie.id WHERE producten.naam LIKE '%${search.toLowerCase()}%' OR categorie.naam LIKE '%${search.toLowerCase()}%';`
        } else {
            query.value = "SELECT producten.*, categorie.naam AS categorie_naam FROM `producten` JOIN categorie ON categorie_id = categorie.id;"
        }
        const [result, fields] = await con.promise().execute(query.value);

        return result;
    } catch (error) {
        return error;
    }
});