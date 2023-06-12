import { getMysqlConnection } from "~/server/mysql";

interface TQueryResults {
  results: Object[];
  fields: any[];
}

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();

  if (!event.context.params) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error.",
    });
  }

  try {
    // @ts-ignore  --  get main content
    const [results]: TQueryResults = await con.promise().execute(
      `
      SELECT DISTINCT 
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

    // @ts-ignore  --  get eisen
    const [eisen]: TQueryResults = await con.promise().execute(
      `
      SELECT DISTINCT 
        e.naam
      FROM voedselpakketten v
      LEFT JOIN klanten k ON k.id = v.klanten_id
      LEFT JOIN klanten_heeft_eisen k_e ON k_e.klanten_id = k.id
      LEFT JOIN eisen e ON e.id = k_e.eisen_id
      WHERE v.id = ?
      `,
      [event.context.params.pakketId]
    );

    const newResult = {
      voedselpakket_id: results[0]?.voedselpakket_id ?? null,
      datum_aanmaaken: results[0]?.datum_aanmaaken ?? null,
      datum_uitgifte: results[0]?.datum_uitgifte ?? null,
      klanten_naam: results[0]?.klanten_naam ?? null,
      producten: results?.map((item: any) => ({
        product_aantal: item.product_aantal,
        producten_naam: item.producten_naam,
        producten_ean: item.producten_ean,
        catagorie_naam: item.catagorie_naam,
      })),
      eisen: eisen?.map((eis: any) => eis.naam),
    };

    return newResult;
  } catch (error) {
    return error;
  }
});
