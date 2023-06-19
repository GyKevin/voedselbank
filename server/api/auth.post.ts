import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    // Get the body and query from the event
    const body = await readBody(event)
    console.log(body)


    const [result, fields] = await con.promise().execute("SELECT * FROM gebruikers WHERE email = ? AND password = ?", [body.email, body.password])
    if (result.length > 0) {
        
        // set auth header
        setResponseHeader(event, "authorization", result[0].email);
        setResponseHeader(event, "authorization-key", result[0].password);

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