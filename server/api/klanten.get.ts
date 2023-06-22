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
        *
      FROM klanten
      WHERE naam LIKE CONCAT('%', ?, '%')
      `,
      // @ts-ignore
      [query?.search?.toLowerCase() ?? ""]
    );

    return results;
  } catch (error) {
    return error;
  }
});
