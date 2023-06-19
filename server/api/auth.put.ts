import { getMysqlConnection } from "~/server/mysql";

// insert username,regemail and pass from register form into database
export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    // Get the body and query from the event
    const body = await readBody(event)
    console.log(body)



    // check if email already exists
    const [result_email_check] = await con.promise().execute("SELECT * FROM gebruikers WHERE email = ?", [body.email])
    if (result_email_check.length > 0) {
        return {
            status: 409,
            message: "Email already exists"
        }
    }

    // insert into database
    const [result] = await con.promise().execute("INSERT INTO gebruikers (username, email, password) VALUES (?, ?, ?)", [body.username, body.email, body.password])
    if (result.affectedRows > 0) {
        return {
            status: 200,
            message: "Registered"
        };
    }

});