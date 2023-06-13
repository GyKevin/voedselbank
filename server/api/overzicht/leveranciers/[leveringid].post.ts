import { getMysqlConnection } from "~/server/mysql";
import * as yup from "yup";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();
  const body = await readBody(event);

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
  });

  const isValid = await userSchema.validate(body);

  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid data.",
    });
  }

  if (parseInt(event.context.params.gezinId) !== body.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid data.",
    });
  }

  try {
    const results = con
      .promise()
      .execute(
        "UPDATE leverancier SET bedrijf_naam = ?, telefoon_nr = ?, adres = ?, postcode = ?, contact_email = ?, contact_naam WHERE id = ?",
        [
          body.bedrjf_naam,
          body.telefoon_nr,
          body.adres,
          body.postcode,
          body.contact_email,
          body.contact_naam,
          event.context.params.leveringId,
        ]
      );

    return results;
  } catch (error) {
    return error;
  }
});