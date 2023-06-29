import { getMysqlConnection } from "~/server/mysql";

interface TQueryResults {
  results: Object[];
  fields: any[];
}

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();
  const query = getQuery(event);

  try {
    // @ts-ignore
    const [results]: TQueryResults = await con.promise().execute(
      `
      SELECT 
        p.*,
        c.naam AS categorie_naam
      FROM producten p
      LEFT JOIN categorie c ON c.id = p.categorie_id
      WHERE p.naam LIKE CONCAT('%', ?, '%')
      `,
      // @ts-ignore
      [query?.search?.toLowerCase() ?? ""]
    );

    return results;
  } catch (error) {
    return error;
  }
});
