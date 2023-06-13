import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
  const con = getMysqlConnection();

  try {
    const [results, fields] = await con.promise().query("SELECT id, bedrijf_naam, telefoon_nr, adres, postcode, contact_naam, contact_email FROM leverancier");

    return results;
  } catch (error) {
    return error;
  }
});