import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler((event) => {
    // if request is an api request, skip this middleware
    if (event.req.url?.startsWith("/api")) return;

    // read cookie from request
    const auth = getCookie(event, "Authorization");
    const auth_key = getCookie(event, "Authorization-key");

    // if cookie is not set redirect to login page
    if (!auth || !auth_key) {
        if (event.req.url !== "/auth") {
            sendRedirect(event, "/auth", 302);
        }
    }

    // if cookie is set, check if it is valid
    const con = getMysqlConnection();
    con.promise().execute("SELECT * FROM gebruikers WHERE email = ? AND password = ?", [auth, auth_key])
        .then(([result, fields]) => {
            if (result.length > 0) {
                return;
            }
            else if (event.req.url !== "/auth") {
                sendRedirect(event, "/auth", 302);
            }
        });
});