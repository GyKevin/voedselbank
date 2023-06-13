import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    
    try {
        const [result, fields] = await con.promise().execute("SELECT ean, naam, categorie_id, aantal FROM producten");
        return result;
    } catch (e) {
        return e;
    }
    
});