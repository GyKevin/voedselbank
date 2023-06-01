import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();
  const body = await readBody(event);
  const query = getQuery(event);

  await con.execute("SELECT * FROM gebruikers", [], (err, result) => {
    console.log(result);
  });

  return { message: "Hello world!" };
});
