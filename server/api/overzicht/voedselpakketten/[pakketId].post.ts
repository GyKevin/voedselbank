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

  let voedselpakketSchema = yup.object({
    id: yup.number().required(),
    datum_aanmaaken: yup.date().required(),
    datum_uitgifte: yup.date().required(),
  });

  const isValid = await voedselpakketSchema.validate(body);

  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid data.",
    });
  }

  if (parseInt(event.context.params.pakketId) !== body.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid data.",
    });
  }

  try {
    const results = con
      .promise()
      .execute(
        "UPDATE voedselpakketten SET datum_aanmaaken = ?, datum_uitgifte = ? WHERE id = ?",
        [
          body.datum_aanmaaken,
          body.datum_uitgifte,
          event.context.params.pakketId,
        ]
      );

    return results;
  } catch (error) {
    return error;
  }
});
