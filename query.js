// Using a fixed Oracle time zone helps avoid machine and deployment differences
process.env.ORA_SDTZ = 'UTC';

const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

async function query(sql) {
    let connection;

    try {

        let sql, binds, options, result;
    
        connection = await oracledb.getConnection(dbConfig);

        sql = `SELECT * FROM no_example`; //TODO DELETE THIS PRIOR TO DEPLOYMENT

        binds = {};

        // For a complete list of options see the documentation.
        options = {
        outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
        // extendedMetaData: true,               // get extra metadata
        // prefetchRows:     100,                // internal buffer allocation size for tuning
        // fetchArraySize:   100                 // internal buffer allocation size for tuning
        };

        result = await connection.execute(sql, binds, options);

        console.log("Metadata: ");
        console.dir(result.metaData, { depth: null });
        console.log("Query results: ");
        console.dir(result.rows, { depth: null });

    } catch (err) {
        console.error(err);
    } finally {
    if (connection) {
        try {
        await connection.close();
        } catch (err) {
        console.error(err);
        }
    }
    }
}