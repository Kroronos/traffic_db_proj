--entity User
DROP TABLE webUser CASCADE CONSTRAINTS;
DROP TABLE accessAccident CASCADE CONSTRAINTS;
DROP TABLE accident CASCADE CONSTRAINTS;
DROP TABLE accidentTime CASCADE CONSTRAINTS;
DROP TABLE timePeriod CASCADE CONSTRAINTS;
DROP TABLE location CASCADE CONSTRAINTS;
DROP TABLE locationAddress CASCADE CONSTRAINTS;
DROP TABLE experiences CASCADE CONSTRAINTS;
DROP TABLE weather CASCADE CONSTRAINTS;
DROP TABLE windCondition CASCADE CONSTRAINTS;
DROP TABLE poiAnnotation CASCADE CONSTRAINTS;
DROP TABLE signAnnotation CASCADE CONSTRAINTS;
DROP TABLE featureAnnotation CASCADE CONSTRAINTS;
DROP TABLE roadFeatures CASCADE CONSTRAINTS;

CREATE TABLE webUser (
    sessionCookie INT NOT NULL,
    PRIMARY KEY(sessionCookie)
);

--connecting table between User and Accident
CREATE TABLE accessAccident(
    sessionCookie INT NOT NULL,
    accidentId VARCHAR(255) NOT NULL,
    PRIMARY KEY(sessionCookie, accidentId)
);

--entity Accident 
CREATE TABLE accident (
    id VARCHAR(255) NOT NULL,
    severity INT,
    distance DEC(10,8),
    startTime TIMESTAMP,
    endTime TIMESTAMP,
    atStartLatitude DEC(10,8),
    atStartLongitude DEC(11,8),
    PRIMARY KEY(id)
);

--entity Time
CREATE TABLE accidentTime (
    startTime TIMESTAMP NOT NULL,
    endTime TIMESTAMP NOT NULL,
    PRIMARY KEY(startTime, endTime)
);

--multivalued attribute of Time, for twilight Night maps to true, Day maps to false
CREATE TABLE timePeriod (
    startTime TIMESTAMP NOT NULL,
    endTime TIMESTAMP NOT NULL,
    astronomicalTwilight NUMBER(1),
    civilTwilight NUMBER(1),
    nauticalTwilight NUMBER(1),
    sunriseSunset NUMBER(1),
    PRIMARY KEY(startTime, endTime)
);

--entity Location
CREATE TABLE location (
    startLatitude DEC(10,8) NOT NULL, 
    endLatitude DEC(10,8), 
    startLongitude DEC(11,8) NOT NULL, 
    endLongitude DEC(11,8), 
    timezone VARCHAR(15),
    side CHAR(1), 
    airportCode VARCHAR(5),
    PRIMARY KEY(startLatitude, startLongitude)
);

--multivalued attribute of Location
CREATE TABLE locationAddress (
    startLatitude DEC(10,8) NOT NULL, 
    startLongitude DEC(11,8) NOT NULL, 
    streetNumber INT,
    street VARCHAR(255),
    city VARCHAR(255),
    county VARCHAR(20),
    state VARCHAR(20),
    zipcode VARCHAR(12),
    PRIMARY KEY(startLatitude, startLongitude)
);

--connecting table between Location and Weather
CREATE TABLE experiences(
    startLatitude DEC(10,8) NOT NULL, 
    startLongitude DEC(11,8) NOT NULL, 
    weatherTimestamp TIMESTAMP NOT NULL,
    airportCode VARCHAR(5) NOT NULL,
    PRIMARY KEY(startLatitude, startLongitude, weatherTimestamp, airportCode)
);

--entity Weather
CREATE TABLE weather (
    weatherTimestamp TIMESTAMP NOT NULL,
    airportCode VARCHAR(5) NOT NULL,
    temperature DEC(4,1),
    humidity DEC(4,1),
    pressure DEC(4,2),
    visibility DEC(3,1),
    precipitation DEC(4,2),
    weatherCondition VARCHAR(127),
    PRIMARY KEY(weatherTimestamp, airportCode)
);

--multivalued attribute of entity Weather 
CREATE TABLE windCondition (
    weatherTimestamp TIMESTAMP NOT NULL,
    airportCode VARCHAR(5) NOT NULL,
    windChill DEC(3,1),
    windSpeed DEC(3,1),
    PRIMARY KEY(weatherTimestamp, airportCode)
);

--super entity poiAnnotation
CREATE TABLE poiAnnotation (
    atStartLatitude DEC(10,8) NOT NULL,
    atStartLongitude DEC(11,8) NOT NULL,
    PRIMARY KEY(atStartLatitude, atStartLongitude)
);

--is a poiAnnotation
CREATE TABLE signAnnotation (
    atStartLatitude DEC(10,8) NOT NULL,
    atStartLongitude DEC(11,8) NOT NULL,
    stop NUMBER(1),
    noExit NUMBER(1),
    giveWay NUMBER(1),
    PRIMARY KEY(atStartLatitude, atStartLongitude)
);

--is a featureAnnotation
CREATE TABLE featureAnnotation (
    atStartLatitude DEC(10,8) NOT NULL,
    atStartLongitude DEC(11,8) NOT NULL,
    station NUMBER(1),
    amenity NUMBER(1),
    railway NUMBER(1),
    PRIMARY KEY(atStartLatitude, atStartLongitude)
);

--composite attribute of entity featureAnnotation
CREATE TABLE roadFeatures (
    atStartLatitude DEC(10,8) NOT NULL,
    atStartLongitude DEC(11,8) NOT NULL,
    crossing NUMBER(1),
    bump NUMBER(1),
    roundabout NUMBER(1),
    trafficSignal NUMBER(1),
    trafficCalming NUMBER(1),
    junction NUMBER(1),
    turningLoop NUMBER(1), 
    PRIMARY KEY(atStartLatitude, atStartLongitude)
);

--Foreign Key Constraints 
ALTER TABLE accessAccident 
    ADD FOREIGN KEY(sessionCookie) REFERENCES webUser(sessionCookie)
        DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE accessAccident 
    ADD FOREIGN KEY(accidentId) REFERENCES accident(id)
        DEFERRABLE INITIALLY DEFERRED;
        
ALTER TABLE accident
    ADD FOREIGN KEY(startTime, endTime) REFERENCES accidentTime(startTime, endTime)
        DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE accident
    ADD FOREIGN KEY(atStartLatitude, atStartLongitude) 
        REFERENCES location(startLatitude, startLongitude)
        DEFERRABLE INITIALLY DEFERRED;
        
ALTER TABLE timePeriod
    ADD FOREIGN KEY(startTime, endTime) REFERENCES accidentTime(startTime, endTime)
        DEFERRABLE INITIALLY DEFERRED;
        
ALTER TABLE locationAddress
    ADD FOREIGN KEY(startLatitude, startLongitude)
        REFERENCES location(startLatitude, startLongitude)
        DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE experiences      
    ADD FOREIGN KEY(startLatitude, startLongitude)
        REFERENCES locationAddress(startLatitude, startLongitude)
        DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE experiences      
    ADD FOREIGN KEY(weatherTimestamp, airportCode) REFERENCES weather(weatherTimestamp, airportCode)
        DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE windCondition
    ADD FOREIGN KEY(weatherTimestamp, airportCode) REFERENCES weather(weatherTimestamp, airportCode)
        DEFERRABLE INITIALLY DEFERRED;
        
ALTER TABLE poiAnnotation 
  ADD FOREIGN KEY(atStartLatitude, atStartLongitude) 
        REFERENCES location(startLatitude, startLongitude)
        DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE featureAnnotation        
    ADD FOREIGN KEY(atStartLatitude, atStartLongitude) REFERENCES poiAnnotation(atStartLatitude, atStartLongitude)
        DEFERRABLE INITIALLY DEFERRED;
        
ALTER TABLE signAnnotation        
    ADD FOREIGN KEY(atStartLatitude, atStartLongitude) REFERENCES poiAnnotation(atStartLatitude, atStartLongitude)
        DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE roadFeatures
    ADD FOREIGN KEY(atStartLatitude, atStartLongitude) REFERENCES featureAnnotation(atStartLatitude, atStartLongitude)
        DEFERRABLE INITIALLY DEFERRED;
