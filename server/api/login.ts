import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    // Get the body and query from the event
    const body = await readBody(event)
    console.log(body)


    const [result, fields] = await con.promise().execute("SELECT * FROM gebruikers WHERE naam = ? AND password = ?", [body.username, body.password])
    if (result.length > 0 && result[0].naam === body.username && result[0].password === body.password) {

        setCookie(event, "user_id", result[0].id, { maxAge: 60 * 60 * 24 * 7, path: "/" });
        return {
            status: 200,
            message: "Logged in"
        };
    }
    else {
        return {
            status: 401,
            message: "Unauthorized"
        }
    }
});