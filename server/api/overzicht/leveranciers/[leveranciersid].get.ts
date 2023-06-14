import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();

  if (!event.context.params) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error.",
    });
  }

  try {
    const [results, fields] = await con
      .promise()
      .execute(`
      SELECT
        lc.*,
        l.datum AS levering_datum
      FROM Leverancier lc
      LEFT JOIN leveringen l ON l.leverancier_id = lc.id
      WHERE lc.id = ? 
      `, [event.context.params.leveranciersid]);

    // @ts-ignore
    const _result = results[0];

    return _result;
  } catch (error) {
    return error;
  }
});