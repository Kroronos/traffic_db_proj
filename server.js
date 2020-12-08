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


app.get('/windyAccidents', async(req, res) => {
  let connection;
  try {

      let sql, binds, options, result;
  
      connection = await oracledb.getConnection(dbConfig);
      console.log("Req:")
      console.dir(req.query)
      sql = `SELECT COUNT(*) as ACCIDENTCOUNT, locationAddress.state as STATE
      FROM Accident
          INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
          INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
          INNER JOIN locationAddress ON (locationAddress.startLatitude = Location.startLatitude AND locationAddress.startLongitude = Location.startLongitude)
          INNER JOIN experiences ON (Accident.atStartLatitude = experiences.startLatitude AND Accident.atStartLongitude = experiences.startLongitude)
          INNER JOIN windCondition ON (windCondition.weatherTimestamp = experiences.weatherTimestamp)
      WHERE EXTRACT(YEAR FROM accidentTime.startTime)  =` + req.query.startYear +` AND windSpeed > 20
      GROUP BY locationAddress.state`

          binds = {};

          // For a complete list of options see the documentation.
          options = {
          outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
          // extendedMetaData: true,               // get extra metadata
          // prefetchRows:     100,                // internal buffer allocation size for tuning
          // fetchArraySize:   100                 // internal buffer allocation size for tuning
          };
    
          result = await connection.execute(sql, binds, options);
          console.log("Query: " + sql)
          console.log("Metadata: ");
          console.dir(result.metaData, { depth: null });
          console.log("delta results: ");
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

app.get('/stackedCities', async(req, res) => {
  let connection;
  try {

      let sql, binds, options, result;
  
      connection = await oracledb.getConnection(dbConfig);
      console.log("Req:")
      console.dir(req.query)

      sql = `SELECT STARTYEAR, CITY, ACCIDENTCOUNT, CITY2, ACCIDENTCOUNT2, CITY3, ACCIDENTCOUNT3
      FROM
          (SELECT COUNT(*) as ACCIDENTCOUNT, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, locationAddress.city as CITY
          FROM Accident
              INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
              INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
              INNER JOIN locationAddress ON (locationAddress.startLatitude = Location.startLatitude AND locationAddress.startLongitude = Location.startLongitude)
          GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), locationAddress.city
          HAVING COUNT(*) > 1),
          (SELECT COUNT(*) as ACCIDENTCOUNT2, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR2, locationAddress.city as CITY2
          FROM Accident
              INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
              INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
              INNER JOIN locationAddress ON (locationAddress.startLatitude = Location.startLatitude AND locationAddress.startLongitude = Location.startLongitude)
          GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), locationAddress.city
          HAVING COUNT(*) > 1),
          (SELECT COUNT(*) as ACCIDENTCOUNT3, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR3, locationAddress.city as CITY3
          FROM Accident
              INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
              INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
              INNER JOIN locationAddress ON (locationAddress.startLatitude = Location.startLatitude AND locationAddress.startLongitude = Location.startLongitude)
          GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), locationAddress.city
          HAVING COUNT(*) > 1)
      WHERE STARTYEAR = STARTYEAR2 AND STARTYEAR2 = STARTYEAR3 AND CITY = 'Houston' AND CITY2 = 'Dallas' AND CITY3 = 'Los Angeles'
      ORDER BY STARTYEAR ASC
      `;

          binds = {};

          // For a complete list of options see the documentation.
          options = {
          outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
          // extendedMetaData: true,               // get extra metadata
          // prefetchRows:     100,                // internal buffer allocation size for tuning
          // fetchArraySize:   100                 // internal buffer allocation size for tuning
          };
    
          result = await connection.execute(sql, binds, options);
          console.log("Query: " + sql)
          console.log("Metadata: ");
          console.dir(result.metaData, { depth: null });
          console.log("delta results: ");
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

app.get('/rankCities', async(req, res) => {
  let connection;
  try {

      let sql, binds, options, result;
  
      connection = await oracledb.getConnection(dbConfig);
      console.log("Req:")
      console.dir(req.query)

      sql = `SELECT STARTYEAR, CITY, CITY2, CITY3
      FROM 
          (SELECT STARTYEAR as STARTYEARMAX, MAX(ACCIDENTSUM)AS MAXSUM
          FROM(SELECT STARTYEAR, (ACCIDENTCOUNT + ACCIDENTCOUNT2 + ACCIDENTCOUNT3) as ACCIDENTSUM
              FROM
                  (SELECT COUNT(*) as ACCIDENTCOUNT, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, locationAddress.city as CITY
                  FROM Accident
                      INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
                      INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
                      INNER JOIN locationAddress ON (locationAddress.startLatitude = Location.startLatitude AND locationAddress.startLongitude = Location.startLongitude)
                  GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), locationAddress.city
                  HAVING COUNT(*) > 1500),
                  (SELECT COUNT(*) as ACCIDENTCOUNT2, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR2, locationAddress.city as CITY2
                  FROM Accident
                      INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
                      INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
                      INNER JOIN locationAddress ON (locationAddress.startLatitude = Location.startLatitude AND locationAddress.startLongitude = Location.startLongitude)
                  GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), locationAddress.city
                  HAVING COUNT(*) > 1500),
                  (SELECT COUNT(*) as ACCIDENTCOUNT3, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR3, locationAddress.city as CITY3
                  FROM Accident
                      INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
                      INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
                      INNER JOIN locationAddress ON (locationAddress.startLatitude = Location.startLatitude AND locationAddress.startLongitude = Location.startLongitude)
                  GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), locationAddress.city
                  HAVING COUNT(*) > 1500)
              WHERE STARTYEAR = STARTYEAR2 AND STARTYEAR2 = STARTYEAR3 AND CITY != CITY2 AND CITY !=CITY3 AND CITY2 != CITY3
              AND ACCIDENTCOUNT > ACCIDENTCOUNT2 AND ACCIDENTCOUNT2 > ACCIDENTCOUNT3)
          GROUP BY STARTYEAR),
          (SELECT STARTYEAR, ACCIDENTCOUNT, CITY, ACCIDENTCOUNT2, CITY2, ACCIDENTCOUNT3, CITY3
              FROM
                  (SELECT COUNT(*) as ACCIDENTCOUNT, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, locationAddress.city as CITY
                  FROM Accident
                      INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
                      INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
                      INNER JOIN locationAddress ON (locationAddress.startLatitude = Location.startLatitude AND locationAddress.startLongitude = Location.startLongitude)
                  GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), locationAddress.city
                  HAVING COUNT(*) > 1500),
                  (SELECT COUNT(*) as ACCIDENTCOUNT2, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR2, locationAddress.city as CITY2
                  FROM Accident
                      INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
                      INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
                      INNER JOIN locationAddress ON (locationAddress.startLatitude = Location.startLatitude AND locationAddress.startLongitude = Location.startLongitude)
                  GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), locationAddress.city
                  HAVING COUNT(*) > 1500),
                  (SELECT COUNT(*) as ACCIDENTCOUNT3, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR3, locationAddress.city as CITY3
                  FROM Accident
                      INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
                      INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
                      INNER JOIN locationAddress ON (locationAddress.startLatitude = Location.startLatitude AND locationAddress.startLongitude = Location.startLongitude)
                  GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), locationAddress.city
                  HAVING COUNT(*) > 1500)
              WHERE STARTYEAR = STARTYEAR2 AND STARTYEAR2 = STARTYEAR3 AND CITY != CITY2 AND CITY !=CITY3 AND CITY2 != CITY3
              AND ACCIDENTCOUNT > ACCIDENTCOUNT2 AND ACCIDENTCOUNT2 > ACCIDENTCOUNT3)
          WHERE STARTYEARMAX = STARTYEAR AND (ACCIDENTCOUNT + ACCIDENTCOUNT2 + ACCIDENTCOUNT3) = MAXSUM`;

          binds = {};

          // For a complete list of options see the documentation.
          options = {
          outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
          // extendedMetaData: true,               // get extra metadata
          // prefetchRows:     100,                // internal buffer allocation size for tuning
          // fetchArraySize:   100                 // internal buffer allocation size for tuning
          };
    
          result = await connection.execute(sql, binds, options);
          console.log("Query: " + sql)
          console.log("Metadata: ");
          console.dir(result.metaData, { depth: null });
          console.log("delta results: ");
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

app.get('/delta', async(req, res) => {
  let connection;
  try {

      let sql, binds, options, result;
  
      connection = await oracledb.getConnection(dbConfig);
      console.log("Req:")
      console.dir(req.query)

      sql = `SELECT ((AccidentPerMonth2) -(AccidentPerMonth)) as DeltaAccidents, STARTYEAR, STARTMONTH
      FROM 
          (SELECT COUNT(*) as AccidentPerMonth, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, EXTRACT(MONTH FROM accidentTime.startTime) as STARTMONTH
          FROM Accident
          INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
          GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime)),
          (SELECT COUNT(*) as AccidentPerMonth2, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR2, EXTRACT(MONTH FROM accidentTime.startTime) as STARTMONTH2
          FROM Accident
          INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
          GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime))
          WHERE
          (
              (
                  STARTMONTH = (STARTMONTH2 - 1) AND
                  STARTYEAR = STARTYEAR2 
              ) OR
              (
                  STARTMONTH2 = 12 AND 
                  STARTMONTH = 1 AND
                  STARTYEAR = (STARTYEAR2 - 1)
              )
          )`;

          binds = {};

          // For a complete list of options see the documentation.
          options = {
          outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
          // extendedMetaData: true,               // get extra metadata
          // prefetchRows:     100,                // internal buffer allocation size for tuning
          // fetchArraySize:   100                 // internal buffer allocation size for tuning
          };
    
          result = await connection.execute(sql, binds, options);
          console.log("Query: " + sql)
          console.log("Metadata: ");
          console.dir(result.metaData, { depth: null });
          console.log("delta results: ");
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


app.get('/rankingOfTimePeriodBySign', async(req, res) => {
  let connection;
  try {

      let sql, binds, options, result;
  
      connection = await oracledb.getConnection(dbConfig);
      console.log("Req:")
      console.dir(req.query)
      const stmts = [
        `CREATE OR REPLACE VIEW astronomicalTwilight AS
        SELECT COUNT(*) as astronomicalTwilightCount, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, EXTRACT(MONTH FROM accidentTime.startTime) as STARTMONTH
        FROM Accident
            INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
            INNER JOIN timePeriod ON (Accident.startTime = timePeriod.startTime AND Accident.endTime = timePeriod.endTime)
            INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
            INNER JOIN signAnnotation ON (Accident.atStartLatitude = signAnnotation.atStartLatitude AND Accident.atStartLongitude = signAnnotation.atStartLongitude)
        WHERE astronomicalTwilight = 1 AND signAnnotation.`+ req.query.sign +`= 1
        GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime)`,
        `CREATE OR REPLACE VIEW civilTwilight AS
        SELECT COUNT(*) as civilTwilightCount, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, EXTRACT(MONTH FROM accidentTime.startTime) as STARTMONTH
        FROM Accident
            INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
            INNER JOIN timePeriod ON (Accident.startTime = timePeriod.startTime AND Accident.endTime = timePeriod.endTime)
            INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
            INNER JOIN signAnnotation ON (Accident.atStartLatitude = signAnnotation.atStartLatitude AND Accident.atStartLongitude = signAnnotation.atStartLongitude)
        WHERE civilTwilight = 1 AND signAnnotation.`+ req.query.sign +`= 1
        GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime)`, 
        `CREATE OR REPLACE VIEW nauticalTwilight AS
        SELECT COUNT(*) as nauticalTwilightCount, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, EXTRACT(MONTH FROM accidentTime.startTime) as STARTMONTH
        FROM Accident
            INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
            INNER JOIN timePeriod ON (Accident.startTime = timePeriod.startTime AND Accident.endTime = timePeriod.endTime)
            INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
            INNER JOIN signAnnotation ON (Accident.atStartLatitude = signAnnotation.atStartLatitude AND Accident.atStartLongitude = signAnnotation.atStartLongitude)
        WHERE nauticalTwilight = 1 AND signAnnotation.`+ req.query.sign +`= 1
        GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime)`,
        `CREATE OR REPLACE VIEW sunriseSunset AS
        SELECT COUNT(*) as sunriseSunsetCount, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, EXTRACT(MONTH FROM accidentTime.startTime) as STARTMONTH
        FROM Accident
            INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
            INNER JOIN timePeriod ON (Accident.startTime = timePeriod.startTime AND Accident.endTime = timePeriod.endTime)
            INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
            INNER JOIN signAnnotation ON (Accident.atStartLatitude = signAnnotation.atStartLatitude AND Accident.atStartLongitude = signAnnotation.atStartLongitude)
        WHERE sunriseSunset = 1 AND signAnnotation.`+ req.query.sign +`= 1
        GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime)`
      ];

      for (const s of stmts) {
        try {
          await connection.execute(s);
        } catch(e) {
          if (e.errorNum != 942)
            console.error(e);
        }
      }

      sql = `SELECT *
      FROM(
          SELECT 
          CASE
              WHEN sunriseSunsetCount >= nauticalTwilightCount AND sunriseSunsetCount >= civilTwilightCount AND sunriseSunsetCount >= astronomicalTwilightCount
                  THEN 'Sunrise/Sunset' 
              WHEN astronomicalTwilightCount > nauticalTwilightCount AND astronomicalTwilightCount > civilTwilightCount AND astronomicalTwilightCount > sunriseSunsetCount
                  THEN 'Astronomical Twilight'
              WHEN civilTwilightCount > nauticalTwilightCount AND civilTwilightCount > astronomicalTwilightCount AND civilTwilightCount > sunriseSunsetCount
                  THEN 'Civil Twilight'
              WHEN nauticalTwilightCount > civilTwilightCount AND nauticalTwilightCount > astronomicalTwilightCount AND nauticalTwilightCount > sunriseSunsetCount
                  THEN 'Nautical Twilight'
          END as winningPeriod,
          CASE
              WHEN sunriseSunsetCount >= nauticalTwilightCount AND sunriseSunsetCount >= civilTwilightCount AND sunriseSunsetCount >= astronomicalTwilightCount
                  THEN CASE
                      WHEN astronomicalTwilightCount > nauticalTwilightCount AND astronomicalTwilightCount > civilTwilightCount
                          THEN 'Astronomical Twilight'
                      WHEN civilTwilightCount > nauticalTwilightCount AND civilTwilightCount > astronomicalTwilightCount
                          THEN 'Civil Twilight'
                      WHEN nauticalTwilightCount > civilTwilightCount AND nauticalTwilightCount > astronomicalTwilightCount
                          THEN 'Nautical Twilight'               
                      END
              WHEN astronomicalTwilightCount > nauticalTwilightCount AND astronomicalTwilightCount > civilTwilightCount AND astronomicalTwilightCount > sunriseSunsetCount
                  THEN CASE
                      WHEN sunriseSunsetCount >= nauticalTwilightCount AND sunriseSunsetCount >= civilTwilightCount AND sunriseSunsetCount >= astronomicalTwilightCount
                          THEN 'Sunrise/Sunset' 
                      WHEN civilTwilightCount > nauticalTwilightCount AND civilTwilightCount > sunriseSunsetCount
                          THEN 'Civil Twilight'
                      WHEN nauticalTwilightCount > civilTwilightCount AND nauticalTwilightCount > sunriseSunsetCount
                          THEN 'Nautical Twilight'
                  END
              WHEN civilTwilightCount > nauticalTwilightCount AND civilTwilightCount > astronomicalTwilightCount AND civilTwilightCount > sunriseSunsetCount
                  THEN CASE
                      WHEN sunriseSunsetCount >= nauticalTwilightCount AND sunriseSunsetCount >= astronomicalTwilightCount
                          THEN 'Sunrise/Sunset' 
                      WHEN astronomicalTwilightCount > nauticalTwilightCount AND astronomicalTwilightCount > sunriseSunsetCount
                          THEN 'Astronomical Twilight'
                      WHEN nauticalTwilightCount > astronomicalTwilightCount AND nauticalTwilightCount > sunriseSunsetCount
                          THEN 'Nautical Twilight'
                  END
              WHEN nauticalTwilightCount > civilTwilightCount AND nauticalTwilightCount > astronomicalTwilightCount AND nauticalTwilightCount > sunriseSunsetCount
                  THEN CASE
                      WHEN sunriseSunsetCount >= civilTwilightCount AND sunriseSunsetCount >= astronomicalTwilightCount
                          THEN 'Sunrise/Sunset' 
                      WHEN astronomicalTwilightCount > civilTwilightCount AND astronomicalTwilightCount > sunriseSunsetCount
                          THEN 'Astronomical Twilight'
                      WHEN civilTwilightCount > astronomicalTwilightCount AND civilTwilightCount > sunriseSunsetCount
                          THEN 'Civil Twilight'
                  END
          END as secondWinningPeriod,
          sunriseSunset.STARTYEAR as STARTYEAR,
          sunriseSunset.STARTMONTH AS STARTMONTH
          FROM astronomicalTwilight
          FULL OUTER JOIN sunriseSunset ON
              sunriseSunset.STARTYEAR = astronomicalTwilight.STARTYEAR AND sunriseSunset.STARTMONTH = astronomicalTwilight.STARTMONTH
          FULL OUTER JOIN civilTwilight ON
              civilTwilight.STARTYEAR = astronomicalTwilight.STARTYEAR AND civilTwilight.STARTMONTH = astronomicalTwilight.STARTMONTH
          FULL OUTER JOIN nauticalTwilight ON
              nauticalTwilight.STARTYEAR = astronomicalTwilight.STARTYEAR AND nauticalTwilight.STARTMONTH = astronomicalTwilight.STARTMONTH)
      WHERE STARTYEAR IS NOT NULL AND STARTMONTH IS NOT NULL AND WINNINGPERIOD IS NOT NULL`

      binds = {};

      // For a complete list of options see the documentation.
      options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
      // extendedMetaData: true,               // get extra metadata
      // prefetchRows:     100,                // internal buffer allocation size for tuning
      // fetchArraySize:   100                 // internal buffer allocation size for tuning
      };

      result = await connection.execute(sql, binds, options);
      console.log("Query: " + sql)
      console.log("Metadata: ");
      console.dir(result.metaData, { depth: null });
      console.log("numberOfAccidentsByStateFeautre results: ");
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
})

app.get('/numberOfAccidentsByStateFeature', async(req, res) => {
  let connection;
  try {

      let sql, binds, options, result;
  
      connection = await oracledb.getConnection(dbConfig);
      console.log("Req:")
      console.dir(req.query)

      sql = `SELECT EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, COUNT(*) as ACCIDENTCOUNT
      FROM JFM.accident 
          JOIN accidenttime  ON (accident.starttime = accidenttime.starttime and accident.endtime = accidenttime.endtime) ` +
          ((req.query.state) ? `JOIN location  ON (accident.atStartLatitude = location.startLatitude and accident.atStartLongitude = location.startlongitude) 
          JOIN locationAddress ON (locationAddress.startLatitude = location.startLatitude AND locationAddress.startLongitude = location.startLongitude) `: ``) +
          ((req.query.feature) ? `JOIN roadfeatures ON (accident.atStartLatitude = roadFeatures.atStartLatitude AND accident.atStartLongitude = roadFeatures.atStartLongitude) ` : ``)  +
          ((req.query.state || req.query.feature) ? `WHERE ` : ``) +
          ((req.query.state) ? `locationAddress.state =  '` + req.query.state + `' `: `` ) +
          ((req.query.state && req.query.feature) ? `AND ` : ``) +
          ((req.query.feature) ? `roadfeatures.` + req.query.feature + ` = 1 `: `` ) +
          `GROUP BY EXTRACT(YEAR FROM accidentTime.startTime)`;

          binds = {};

          // For a complete list of options see the documentation.
          options = {
          outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
          // extendedMetaData: true,               // get extra metadata
          // prefetchRows:     100,                // internal buffer allocation size for tuning
          // fetchArraySize:   100                 // internal buffer allocation size for tuning
          };
    
          result = await connection.execute(sql, binds, options);
          console.log("Query: " + sql)
          console.log("Metadata: ");
          console.dir(result.metaData, { depth: null });
          console.log("numberOfAccidentsByStateFeautre results: ");
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

      sql = `SELECT ACCIDENTCOUNT, LOCATIONCOUNT FROM (SELECT COUNT(*) as AccidentCount FROM JFM.ACCIDENT), (SELECT COUNT(*) as LocationCount FROM JFM.LOCATION)`;

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

