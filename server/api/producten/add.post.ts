import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    const body = await readBody(event);
    console.log(body);
    try {
        const [results, fields] = await con.promise().execute("INSERT INTO producten (ean, naam, categorie_id, aantal) VALUES (?, ?, ?, ?)", [body.ean, body.naam, body.categorie_id as Number, body.aantal]);
        return {
            status: 200,
            body: results
        }
    } catch (error) {
        return {
            status: 500,
            body: error
        }
    }
});