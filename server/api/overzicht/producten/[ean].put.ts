import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
    const ean = event.context.params?.ean;
    const con = getMysqlConnection();

    const body = await readBody(event);

    try {
        // update producten set new data where ean = ean
        const [results, fields] = await con.promise().execute("UPDATE producten SET naam = ?, categorie_id = ?, aantal = ? WHERE ean = ?", [body.naam, body.categorie_id, body.aantal, ean]);
        
        return results;
    } catch (error) {
        return error;
    }
});