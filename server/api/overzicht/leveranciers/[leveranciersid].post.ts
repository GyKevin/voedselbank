import { getMysqlConnection } from "~/server/mysql";
import * as yup from "yup";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();
  const body = await readBody(event);

  console.log(event.context.params)

  if (!event.context.params) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error.",
    });
  }

  let userSchema = yup.object({
    id: yup.number().required(),
    bedrijf_naam: yup.string().required(),
    adres: yup.string().required(),
    postcode: yup.string().required().matches(/^[\d]{4}( )?[A-Z]{2}$/),
    contact_naam: yup.string().required(),
    contact_email: yup.string().email().required(),
    telefoon_nr: yup.string().required(),
    levering_datum: yup.date().required(),
  });

  const isValid = await userSchema.validate(body);

  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid data.",
    });
  }

  if (parseInt(event.context.params.leveranciersid) !== body.id) {
    console.error("Hi wiljan :)")
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid data.",
    });
  }

  try {
    const results = await con
      .promise()
      .execute(
        `UPDATE leverancier SET
          bedrijf_naam = ?,
          telefoon_nr = ?,
          adres = ?,
          postcode = ?,
          contact_email = ?,
          contact_naam = ?
        WHERE id = ?`,
        [
          body.bedrijf_naam,
          body.telefoon_nr,
          body.adres,
          body.postcode,
          body.contact_email,
          body.contact_naam,
          event.context.params.leveranciersid,
        ]
      );

      await con
      .promise()
      .execute(
        `UPDATE leveringen SET
          datum = ?
        WHERE leverancier_id = ?`,
        [
          body.levering_datum,
          event.context.params.leveranciersid,
        ]
      );

    return results;
  } catch (error) {
    return error;
  }
});