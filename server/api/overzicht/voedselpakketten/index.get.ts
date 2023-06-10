import { getMysqlConnection } from "~/server/mysql";

interface TQuery {
  search: string;
  date: string[];
}

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();
  // @ts-ignore
  const query: TQuery = getQuery(event);

  const dateOne = query.date?.[0] ? formatDate(query.date[0]) : null;
  const dateTwo = query.date?.[1] ? formatDate(query.date[1]) : null;

  try {
    const [results, fields] = await con.promise().execute(
      `
        SELECT 
          v.*,
          k.naam AS klanten_naam
        FROM voedselpakketten v
        INNER JOIN klanten k ON k.id = v.klanten_id
        WHERE k.naam LIKE CONCAT('%', ?, '%')
        AND v.datum_aanmaaken BETWEEN COALESCE(?, '1000-01-01 00:00:00') AND COALESCE(?, '9999-12-31 00:00:00')
    `,
      [query.search ?? "", dateOne, dateTwo]
    );

    return results;
  } catch (error) {
    return error;
  }
});

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");

  return formattedDate;
}
