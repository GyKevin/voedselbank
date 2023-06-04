import { getMysqlConnection } from "~/server/mysql";
import * as yup from "yup";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();
  const body = await readBody(event);

  let userSchema = yup.object({
    id: yup.number(),
    naam: yup.string().required(),
    telefoon: yup.string().required(),
    adres: yup.string().required(),
    postcode: yup.string().required().matches(/^[\d]{4}( )?[A-Z]{2}$/),
    email: yup.string().email().required(),
    volwassenen: yup.number().required().integer(),
    jongeren: yup.number().required().integer(),
    babies: yup.number().required().integer(),
  });

  const isValid = await userSchema.validate(body);

  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid data.",
    });
  }

  try {
    const results = con
      .promise()
      .execute(
        "INSERT INTO klanten (naam, telefoon, adres, postcode, email, volwassenen, jongeren, baby) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [body.naam, body.telefoon, body.adres, body.postcode, body.email, body.volwassenen, body.jongeren, body.babies]
      );

    return results;
  } catch (error) {
    return error;
  }
});
