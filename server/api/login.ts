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

        if (result === body.username && result === body.password) {
            console.log("Login succesful")
        } else {
            console.log("Login failed")
        }
    })

    return body
});