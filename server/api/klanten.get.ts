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
        *
      FROM klanten
      `
    );

    return results;
  } catch (error) {
    return error;
  }
});
