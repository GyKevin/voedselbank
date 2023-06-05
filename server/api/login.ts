import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    // Get the body and query from the event
    const body = await readBody(event)
    console.log(body)

    con.execute("SELECT * FROM gebruikers WHERE naam = ? AND password = ?", [body.username, body.password], (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(result)

        if (
            result.length > 0 &&
            result[0].naam === body.username &&
            result[0].password === body.password
        ) {
            console.log("Login successful");
            // Set a cookie to remember the successful login
            setCookie("loggedIn", "true", { maxAge: 86400 }); // Example: cookie expires in 1 day (86400 seconds)
        } else {
            console.log("Login failed");
        }
    })

    return body
});