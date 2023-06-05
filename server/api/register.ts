import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    // Get the register body and query from the event
    const body = await readBody(event)
    console.log(body)

    // if (body.pass == body.confpass) {
        con.execute("INSERT INTO gebruikers (naam, email, password) VALUES (?, ?, ?)", [body.username, body.regemail, body.pass], (err, result) => {
        if (err) {
            console.log("u fucked up",err)
            return
        }
        console.log("it worky?",result)
    })
    // }
    
});