import { getMysqlConnection } from "~/server/mysql";
import { ref } from "@vue/reactivity";
export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    const body = await readBody(event);
    try {
        const search = body.searchTerm._value;
        const [result] = await con
            .promise()
            .execute(`SELECT producten.*, categorie.naam AS categorie_naam FROM \`producten\` JOIN categorie ON categorie_id = categorie.id WHERE producten.naam LIKE '%${search.toLowerCase()}%' OR categorie.naam LIKE '%${search.toLowerCase()}%';`);
        return result;
    } catch (error) {
        return error;
    }
});