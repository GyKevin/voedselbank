import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    
    try {
        const [results, fields] = await con.promise().execute("SELECT producten.*, categorie.naam AS categorie_naam FROM `producten` JOIN categorie ON categorie_id = categorie.id;");
    
        return results;
    } catch (error) {
        return error;
    }
});