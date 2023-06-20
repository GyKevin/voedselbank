import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();

  try {
    const [results, fields] = await con.promise().query(`
    SELECT
      lc.*,
      l.datum AS levering_datum
    FROM leverancier lc
    LEFT JOIN leveringen l ON l.leverancier_id = lc.id
    `);

    return results;
  } catch (error) {
    return error;
  }
});