import { getMysqlConnection } from "~/server/mysql";
import * as yup from "yup";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();
  const body = await readBody(event);

  let userSchema = yup.object({
    id: yup.number().required(),
    bedrijf_naam: yup.string().required(),
    adres: yup.string().required(),
    postcode: yup.string().required().matches(/^[\d]{4}( )?[A-Z]{2}$/),
    contact_naam: yup.string().required(),
    contact_email: yup.string().email().required(),
    telefoon_nr: yup.string().required(),
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
        "INSERT INTO leverancier (bedrijf_naam, telefoon_nr, adres, postcode, contact_email, contact_naam ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [body.bedrijf_naam, body.telefoon_nr, body.adres, body.postcode, body.contact_email, body.contact_naam]
      );

    return results;
  } catch (error) {
    return error;
  }
});
