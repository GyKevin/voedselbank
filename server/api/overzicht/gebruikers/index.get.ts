import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();

  try {
    const [results, fields] = await con.promise().execute("SELECT id, naam, email, functie FROM gebruikers");

    return results;
  } catch (error) {
    return error;
  }
});
