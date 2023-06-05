import { getMysqlConnection } from "~/server/mysql";

// insert username,regemail and pass from register form into database
export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    // Get the body and query from the event
    const body = await readBody(event)
    console.log(body)
    console.log(typeof body.password, typeof body.confirmpassword)

    if (body.password === body.confirmpassword) {
        con.execute("SELECT email FROM gebruikers WHERE email = ?",
        [body.email], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            
            if (result.length > 0) {
                console.log("Email already exists in the database.");
            } else {
                con.execute("INSERT INTO gebruikers (naam, email, password) VALUES (?, ?, ?)",
                [body.username, body.email, body.password], (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(result);
                });
                return body;
            }
        });
    } else {
        console.log("Passwords do not match");
    }
}
    
);