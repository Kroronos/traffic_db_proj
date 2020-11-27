const express = require('express');
const app = express();
const port = process.env.PORT || 3556;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

process.env.ORA_SDTZ = 'UTC';

const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

try {
  oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_19_8'});
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}

async function query(sql) {
    let connection;

    try {

        let sql, binds, options, result;
    
        connection = await oracledb.getConnection(dbConfig);

        sql = `SELECT * FROM ETHNICGROUP`; //TODO DELETE THIS PRIOR TO DEPLOYMENT

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

query("");