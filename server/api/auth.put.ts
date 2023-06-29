import { getMysqlConnection } from "~/server/mysql";

// insert username,regemail and pass from register form into database
export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    // Get the body and query from the event
    const body = await readBody(event)



    // check if email already exists
    const [result_email_check] = await con.promise().execute("SELECT * FROM gebruikers WHERE email = ?", [body.email])
    if (result_email_check.length > 0) {
        setResponseStatus(event, 409);
        return {
            message: "Email already exists"
        }
    }

    // insert into database
    const [result] = await con.promise().execute("INSERT INTO gebruikers (naam, email, password, functie) VALUES (?, ?, ?, ?)", [body.username, body.email, body.password, body.functie])
    if (result.affectedRows > 0) {
        setResponseStatus(event, 201);
        return {
            message: "Registered"
        };
    }

});