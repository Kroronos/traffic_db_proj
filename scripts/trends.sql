
/*Accidents per Month vs Time, for severe accidents at roundabouts (Graph/Trendline format)*/
SELECT COUNT(*) as ACCIDENTCOUNT, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, EXTRACT(MONTH FROM accidentTime.startTime) as STARTMONTH
FROM Accident
    INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime);

/*Accidents per Month vs Time By State, for severe accidents at roundabouts (Map format)*/
SELECT COUNT(*) as ACCIDENTCOUNT, EXTRACT(YEAR FROM accidentTime.startTime) as STARTYEAR, EXTRACT(MONTH FROM accidentTime.startTime) as STARTMONTH, locationAddress.state as USSTATE
FROM Accident
    INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
    INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
    INNER JOIN locationAddress ON (locationAddress.startLatitude = Location.startLatitude AND locationAddress.startLongitude = Location.startLongitude)
    INNER JOIN roadFeatures ON (Accident.atStartLatitude = roadFeatures.atStartLatitude AND Accident.atStartLongitude = roadFeatures.atStartLongitude) 
WHERE Accident.severity > 1 AND
    roadFeatures.roundabout = 1
GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime), locationAddress.state;

/*Change in Accidents Per Month By State*/
SELECT (AccidentPerMonth) - (AccidentPerMonth2)) as DeltaAccidents, AccidentDate, usState
FROM 
    (SELECT COUNT(aid) as AccidentPerMonth, FORMAT(Time.startTime, 'yyyy_MM') as AccidentDate, Location.state as usState
    FROM Accident
    INNER JOIN Time ON (Accident.aid = Time.aid)
    GROUP BY DATEPART(YEAR,  Time.startTime), DATEPART(MONTH,  Time.startTime), Location.state),

    (SELECT COUNT(aid) as AccidentPerMonth2, FORMAT(Time.startTime, 'yyyy_MM') as AccidentDate2, Location.state as usState2
    FROM Accident
    INNER JOIN Time ON (Accident.aid = Time.aid)
    GROUP BY DATEPART(YEAR,  Time.startTime), DATEPART(MONTH,  Time.startTime), Location.state)
WHERE usState = usState 2 AND
    (
        (
            DATEPART(MONTH,  Time.accidentDate) = (DATEPART(MONTH,  Time.accidentDate2) - 1) AND /*month 2 is predecessor of month 1*/
            DATEPART(YEAR,  Time.accidentDate) = DATEPART(YEAR,  Time.accidentDate2) /*if month2 is predecessor then eyars must be equal*/
        ) OR
        (
            DATEPART(MONTH,  Time.accidentDate2) = 12 AND /*month 2 is December*/
            DATEPART(MONTH,  Time.accidentDate) = 1 AND /*month 1 is January*/
            DATEPART(YEAR,  Time.accidentDate) = (DATEPART(YEAR,  Time.accidentDate2) - 1) /*if month2 December and month1 is Jan the year of month 2 must pred(year of month 1)*/
        )
    ) 
;

/*Change in Accidents Per Month By State for severe accidents at roundabouts*/
SELECT (AccidentPerMonth) - (AccidentPerMonth2)) as DeltaAccidents, AccidentDate, usState
FROM 
    /*accidents by month for each state */
    (SELECT COUNT(aid) as AccidentPerMonth, FORMAT(Time.startTime, 'yyyy_MM') as AccidentDate, Location.state as usState
    FROM Accident
        INNER JOIN Time ON (Accident.aid = Time.aid)
        INNER JOIN Features ON (Accident.aid = Features.aid)
        INNER JOIN Location ON (Accident.aid = Location.aid) 
    WHERE Accident.severity > 3 AND
        Features.roundabout = 1
    GROUP BY DATEPART(YEAR,  Time.startTime), DATEPART(MONTH,  Time.startTime), Location.state),
    /*accidents by month for each state again*/
    (SELECT COUNT(aid) as AccidentPerMonth, FORMAT(Time.startTime, 'yyyy_MM') as AccidentDate, Location.state as usState
    FROM Accident
        INNER JOIN Time ON (Accident.aid = Time.aid)
        INNER JOIN Features ON (Accident.aid = Features.aid)
        INNER JOIN Location ON (Accident.aid = Location.aid) 
    WHERE Accident.severity > 3 AND
        Features.roundabout = 1
    GROUP BY DATEPART(YEAR,  Time.startTime), DATEPART(MONTH,  Time.startTime), Location.state)
WHERE usState = usState2 AND
    (
        (
            DATEPART(MONTH,  Time.accidentDate) = (DATEPART(MONTH,  Time.accidentDate2) - 1) AND /*month 2 is predecessor of month 1*/
            DATEPART(YEAR,  Time.accidentDate) = DATEPART(YEAR,  Time.accidentDate2) /*if month2 is predecessor then eyars must be equal*/
        ) OR
        (
            DATEPART(MONTH,  Time.accidentDate2) = 12 AND /*month 2 is December*/
            DATEPART(MONTH,  Time.accidentDate) = 1 AND /*month 1 is January*/
            DATEPART(YEAR,  Time.accidentDate) = (DATEPART(YEAR,  Time.accidentDate2) - 1) /*if month2 December and month1 is Jan the year of month 2 must pred(year of month 1)*/
        )
    ) 
;

/*________DERIVED FROM________*/

/*Accident vs Time*/
SELECT COUNT(aid), Time.startTime
FROM Accident
    INNER JOIN Time ON (Accident.aid = Time.aid);
GROUP BY startTime;

/*Accident vs Time, for severe accidents*/
    SELECT COUNT(*), EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime)
    FROM Accident
        INNER JOIN accidentTime ON (Accident.startTime = accidentTime.startTime AND Accident.endTime = accidentTime.endTime)
        INNER JOIN Location ON (Accident.atStartLatitude = Location.startLatitude AND Accident.atStartLongitude = Location.startLongitude)
    WHERE Accident.severity > 2 
    GROUP BY EXTRACT(YEAR FROM accidentTime.startTime), EXTRACT(MONTH FROM accidentTime.startTime)


/*Accident vs Time, for severe accidents at roundabouts*/
SELECT COUNT(aid), Time.startTime
FROM Accident
    INNER JOIN Time ON (Accident.aid = Time.aid)
    INNER JOIN Features ON (Accident.aid = Features.aid)
WHERE Accident.severity > 3 AND
    Features.roundabout = 1
GROUP BY startTime;

/*Change in Accidents Per Month*/
SELECT (AccidentPerMonth) - (AccidentPerMonth2)) as DeltaAccidents, AccidentDate, usState
FROM 
    (SELECT COUNT(aid) as AccidentPerMonth, FORMAT(Time.startTime, 'yyyy_MM') as AccidentDate
    FROM Accident
        INNER JOIN Time ON (Accident.aid = Time.aid)
    GROUP BY DATEPART(YEAR,  Time.startTime), DATEPART(MONTH,  Time.startTime)),

    (SELECT COUNT(aid) as AccidentPerMonth2, FORMAT(Time.startTime, 'yyyy_MM') as AccidentDate2
    FROM Accident
        INNER JOIN Time ON (Accident.aid = Time.aid)
    GROUP BY DATEPART(YEAR,  Time.startTime), DATEPART(MONTH,  Time.startTime))
WHERE 
    (
        (
            DATEPART(MONTH,  Time.accidentDate) = (DATEPART(MONTH,  Time.accidentDate2) - 1) AND /*month 2 is predecessor of month 1*/
            DATEPART(YEAR,  Time.accidentDate) = DATEPART(YEAR,  Time.accidentDate2) /*if month2 is predecessor then eyars must be equal*/
        ) OR
        (
            DATEPART(MONTH,  Time.accidentDate2) = 12 AND /*month 2 is December*/
            DATEPART(MONTH,  Time.accidentDate) = 1 AND /*month 1 is January*/
            DATEPART(YEAR,  Time.accidentDate) = (DATEPART(YEAR,  Time.accidentDate2) - 1) /*if month2 December and month1 is Jan the year of month 2 must pred(year of month 1)*/
        )
    ) 
;

/*Change in Accidents Per Month By State*/
SELECT (AccidentPerMonth) - (AccidentPerMonth2)) as DeltaAccidents, AccidentDate, usState
FROM 
    (SELECT COUNT(aid) as AccidentPerMonth, FORMAT(Time.startTime, 'yyyy_MM') as AccidentDate, Location.state as usState
    FROM Accident
        INNER JOIN Time ON (Accident.aid = Time.aid)
        INNER JOIN Location ON (Accident.aid = Location.aid) 
    GROUP BY DATEPART(YEAR,  Time.startTime), DATEPART(MONTH,  Time.startTime), Location.state),

    (SELECT COUNT(aid) as AccidentPerMonth2, FORMAT(Time.startTime, 'yyyy_MM') as AccidentDate2, Location.state as usState2
    FROM Accident
        INNER JOIN Time ON (Accident.aid = Time.aid)
        INNER JOIN Location ON (Accident.aid = Location.aid) 
    GROUP BY DATEPART(YEAR,  Time.startTime), DATEPART(MONTH,  Time.startTime), Location.state)
WHERE usState = usState 2 AND
    (
        (
            DATEPART(MONTH,  Time.accidentDate) = (DATEPART(MONTH,  Time.accidentDate2) - 1) AND /*month 2 is predecessor of month 1*/
            DATEPART(YEAR,  Time.accidentDate) = DATEPART(YEAR,  Time.accidentDate2) /*if month2 is predecessor then eyars must be equal*/
        ) OR
        (
            DATEPART(MONTH,  Time.accidentDate2) = 12 AND /*month 2 is December*/
            DATEPART(MONTH,  Time.accidentDate) = 1 AND /*month 1 is January*/
            DATEPART(YEAR,  Time.accidentDate) = (DATEPART(YEAR,  Time.accidentDate2) - 1) /*if month2 December and month1 is Jan the year of month 2 must pred(year of month 1)*/
        )
    ) 
;