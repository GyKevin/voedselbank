import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    // Get the body and query from the event
    const body = await readBody(event)
    console.log(body)


    const [result, fields] = await con.promise().execute("SELECT * FROM gebruikers WHERE email = ? AND password = ?", [body.email, body.password])
    if (result.length > 0) {
        
        // set auth header
        setResponseHeaders(event, {
            "authorization": result[0].email,
            "authorization-key": result[0].password,
            "authorization-role": result[0].functie
        });

        return {
            message: "Logged in"
        };
    }
    else {
        // set response status
        setResponseStatus(event, 401);
        return {
            message: "Unauthorized"
        }
    }
});