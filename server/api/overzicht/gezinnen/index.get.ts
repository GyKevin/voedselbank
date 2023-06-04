import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();

  try {
    const [results, fields] = await con.promise().query("SELECT id, naam, telefoon, email, postcode FROM klanten");

    return results;
  } catch (error) {
    return error;
  }
});
