import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();
  //   const body = await readBody(event); // breaks this entire endpoint for some reason
  const query = getQuery(event);

  try {
    const [results, fields] = await con.promise().query("SELECT id, naam, email, functie FROM gebruikers");

    return results;
  } catch (error) {
    return error;
  }
});
