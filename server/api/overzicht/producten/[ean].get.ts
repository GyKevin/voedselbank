import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
    const ean = event.context.params?.ean;
    const con = getMysqlConnection();

    try {
        const [results, fields] = await con.promise().execute("SELECT * FROM producten WHERE ean = ?", [ean]);

        return results;
    } catch (error) {
        return error;
    }
});