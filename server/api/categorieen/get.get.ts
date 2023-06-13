import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();

    try {
        const [result, fields] = await con.promise().execute("SELECT * FROM `categorie`;");
        return result;
    } catch (error) {
        return error;
    }
});