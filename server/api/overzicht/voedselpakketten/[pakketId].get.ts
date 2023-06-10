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
    const [results, fields] = await con.promise().execute(
      `
      SELECT 
        v.id AS voedselpakket_id,
        v.datum_aanmaaken,
        v.datum_uitgifte,
        k.naam AS klanten_naam,
        v_p.aantal AS product_aantal,
        p.naam AS producten_naam,
        p.ean AS producten_ean,
        c.naam AS catagorie_naam
      FROM voedselpakketten v
      LEFT JOIN klanten k ON k.id = v.klanten_id
      RIGHT JOIN voedselpakketten_has_producten v_p ON v.id = v_p.voedselpakketten_id
      RIGHT JOIN producten p ON p.ean = v_p.producten_ean
      RIGHT JOIN categorie c ON c.id = p.categorie_id
      WHERE v.id = ?
    `,
      [event.context.params.pakketId]
    );

    return results;
  } catch (error) {
    return error;
  }
});
