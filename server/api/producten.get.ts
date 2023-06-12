import { getMysqlConnection } from "~/server/mysql";

interface TQueryResults {
  results: Object[];
  fields: any[];
}

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();

  try {
    // @ts-ignore
    const [results]: TQueryResults = await con.promise().query(
      `
      SELECT 
        p.*,
        c.naam AS categorie_naam
      FROM producten p
      LEFT JOIN categorie c ON c.id = p.categorie_id
      `
    );

    return results;
  } catch (error) {
    return error;
  }
});
