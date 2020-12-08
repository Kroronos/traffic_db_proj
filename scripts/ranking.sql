CREATE OR REPLACE VIEW astronomicalTwilight AS
SELECT COUNT(*) as astronomicalTwilightCount, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, EXTRACT(MONTH FROM accidentTime.startTime) as STARTMONTH
FROM Accident
    INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
    INNER JOIN timePeriod ON (Accident.startTime = timePeriod.startTime AND Accident.endTime = timePeriod.endTime)
    INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
    INNER JOIN signAnnotation ON (Accident.atStartLatitude = signAnnotation.atStartLatitude AND Accident.atStartLongitude = signAnnotation.atStartLongitude)
WHERE astronomicalTwilight = 1 AND signAnnotation.noExit = 1
GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime);

CREATE OR REPLACE VIEW civilTwilight AS
SELECT COUNT(*) as civilTwilightCount, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, EXTRACT(MONTH FROM accidentTime.startTime) as STARTMONTH
FROM Accident
    INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
    INNER JOIN timePeriod ON (Accident.startTime = timePeriod.startTime AND Accident.endTime = timePeriod.endTime)
    INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
    INNER JOIN signAnnotation ON (Accident.atStartLatitude = signAnnotation.atStartLatitude AND Accident.atStartLongitude = signAnnotation.atStartLongitude)
WHERE civilTwilight = 1 AND signAnnotation.noExit = 1
GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime);

CREATE OR REPLACE VIEW nauticalTwilight AS
SELECT COUNT(*) as nauticalTwilightCount, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, EXTRACT(MONTH FROM accidentTime.startTime) as STARTMONTH
FROM Accident
    INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
    INNER JOIN timePeriod ON (Accident.startTime = timePeriod.startTime AND Accident.endTime = timePeriod.endTime)
    INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
    INNER JOIN signAnnotation ON (Accident.atStartLatitude = signAnnotation.atStartLatitude AND Accident.atStartLongitude = signAnnotation.atStartLongitude)
WHERE nauticalTwilight = 1 AND signAnnotation.noExit = 1
GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime);

CREATE OR REPLACE VIEW sunriseSunset AS
SELECT COUNT(*) as sunriseSunsetCount, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, EXTRACT(MONTH FROM accidentTime.startTime) as STARTMONTH
FROM Accident
    INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
    INNER JOIN timePeriod ON (Accident.startTime = timePeriod.startTime AND Accident.endTime = timePeriod.endTime)
    INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
    INNER JOIN signAnnotation ON (Accident.atStartLatitude = signAnnotation.atStartLatitude AND Accident.atStartLongitude = signAnnotation.atStartLongitude)
WHERE sunriseSunset = 1 AND signAnnotation.noExit = 1
GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime);


SELECT *
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
WHERE STARTYEAR IS NOT NULL AND STARTMONTH IS NOT NULL AND WINNINGPERIOD IS NOT NULL;
