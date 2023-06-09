import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();

  try {
    const [results, fields] = await con.promise().query(`
        SELECT 
          v.*,
          k.naam AS klanten_naam
        FROM voedselpakketten v
        INNER JOIN klanten k ON k.id = v.klanten_id
    `);

    return results;
  } catch (error) {
    return error;
  }
});
