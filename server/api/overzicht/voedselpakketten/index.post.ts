import { getMysqlConnection } from "~/server/mysql";
import * as yup from "yup";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();
  const body = await readBody(event);

  let userSchema = yup.object({
    aanmaak_datum: yup.date().required(),
    klant: yup.number().required(),
    producten: yup.array(
      yup.object({
        naam: yup.string().required(),
        ean: yup.string().required(),
        aantal: yup.number().required(),
        categorie: yup.string().required(),
      })
    ),
  });

  const isValid = await userSchema.validate(body);

  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "ongeldig data.",
    });
  }

  try {
    const results = await con.promise().execute(
      `
      INSERT INTO voedselpakketten (datum_aanmaaken, klanten_id) VALUES (?, ?);
      `,
      [body.aanmaak_datum, body.klant]
    );

    const [insertId] = await con.promise().query("SELECT LAST_INSERT_ID() AS last_id;");

    await body.producten.forEach(async (product: any) => {
      await con.promise().execute(
        `
        INSERT INTO voedselpakketten_has_producten (
            voedselpakketten_id,
            producten_ean,
            producten_categorie_id,
            aantal
        ) VALUES (?, ?, ?, ?);
        `,
        [insertId[0].last_id, product.ean, product.categorie, product.aantal]
      );
    });

    return results;
  } catch (error) {
    return error;
  }
});
