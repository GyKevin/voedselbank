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
      .execute("SELECT * FROM klanten where id = ?", [event.context.params.gezinId]);

    return results;
  } catch (error) {
    return error;
  }
});
