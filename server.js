const express = require('express');
const app = express();
const port = process.env.PORT || 3556;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


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

app.get('/accidentsvstime', async (req, res) => {

  let connection;
  try {

      let sql, binds, options, result;
  
      connection = await oracledb.getConnection(dbConfig);

      sql = `SELECT COUNT(*) as ACCIDENTCOUNT, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, EXTRACT(MONTH FROM accidentTime.startTime) as STARTMONTH
      FROM JFM.Accident
          INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
      GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime)`;

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

      res.send({ express:  result.rows});
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

});

app.get('/tuples_count', async (req, res) => {

  let connection;
  try {

      let sql, binds, options, result;
  
      connection = await oracledb.getConnection(dbConfig);

      sql = `SELECT COUNT(*) as TupleCount FROM JFM.ACCIDENT`;

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

      res.send({ express:  result.rows});
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

});




console.log("Done making query routes!");

