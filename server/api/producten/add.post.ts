import { getMysqlConnection } from "~/server/mysql";

export default defineEventHandler(async (event) => {
    const con = getMysqlConnection();
    const body = await readBody(event);
    try {
        const [results, fields] = await con.promise().execute("INSERT INTO producten (ean, naam, categorie_id, aantal) VALUES (?, ?, ?, ?)", [body.ean, body.naam, body.categorie_id as Number, body.aantal]);
        console.log(results);
        return {
            status: 200,
            body: results
        }
    } catch (error: any) {
        let result = {
            status: 500,
            body: error
        };
        console.log(error.errno);
        switch (error.errno) {
            case 1062:
                result.status = 409;
                result.body = "EAN bestaat al";
                break;
            default:
                break;
        }
        return result;
        
    }
});