import { getMysqlConnection } from "~/server/mysql";
import { ref } from "@vue/reactivity";

export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    const query = getQuery(event);

    try {
        const sql_query = ref("")
        if (query.search) {
            //@ts-ignore ---------- toLowerCase not callable on string | undefined
            sql_query.value = `SELECT producten.*, categorie.naam AS categorie_naam FROM \`producten\` JOIN categorie ON categorie_id = categorie.id WHERE producten.naam LIKE '%${query.search.toLowerCase()}%' OR categorie.naam LIKE '%${query.search.toLowerCase()}%';`
        } else {
            sql_query.value = "SELECT producten.*, categorie.naam AS categorie_naam FROM `producten` JOIN categorie ON categorie_id = categorie.id;"
        }
        const [results, fields] = await con.promise().execute(sql_query.value);
        return results;
    } catch (error) {
        return error;
    }
});