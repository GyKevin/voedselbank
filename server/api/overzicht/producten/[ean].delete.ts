import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();

    try {
        const [result, fields] = await con.promise().execute("DELETE FROM `producten` WHERE `ean` = ?;", [event.context.params?.ean]);
        return result;
    } catch (error) {
        return error;
    }
});