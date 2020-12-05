import csv
import cx_Oracle
import config
import datetime

def insertItem(row, connection):

    try:
        if connection:
            accidentSql = ('insert into accident(id, severity, distance, startTime, endTime, atStartLatitude, atStartLongitude) '
        'values(:id, :severity, :distance, :startTime, :endTime, :startLatitude, :startLongitude)')
            accidentTimeSql = ('insert into accidentTime(startTime, endTime) '
        'values(:startTime, :endTime)')
            timePeriodSql = ('insert into timePeriod(startTime, endTime, astronomicalTwilight, civilTwilight, nauticalTwilight, sunriseSunset) '
        'values(:startTime, :endTime, :astronomicalTwilight, :civilTwilight, :nauticalTwilight, :sunriseSunset)')
            locationSql = ('insert into location(startLatitude, endLatitude, startLongitude, endLongitude, timezone, side, airportCode) '
        'values(:startLatitude, :endLatitude, :startLongitude, :endLongitude, :timezone, :side, :airportCode)')
            locationAddressSql = ('insert into locationAddress(startLatitude, startLongitude, streetNumber, street, city, county, state, zipcode) '
        'values(:startLatitude, :startLongitude, :streetNumber, :street, :city, :county, :state, :zipcode)')
            experiencesSql = ('insert into experiences(startLatitude, startLongitude, weatherTimestamp, airportCode) '
        'values(:startLatitude, :startLongitude, :weatherTimestamp, :airportCode)')
            weatherSql = ('insert into weather(weatherTimestamp, airportCode, temperature, humidity, pressure, visibility, precipitation, weatherCondition) '
        'values(:weatherTimestamp, :airportCode, :temperature, :humidity, :pressure, :visibility, :precipitation, :weatherCondition)')
            windConditionSql = ('insert into windCondition(weatherTimestamp, airportCode, windChill, windSpeed) '
        'values(:weatherTimestamp, :airportCode, :windChill, :windSpeed)')
            poiAnnotationSql = ('insert into poiAnnotation(atStartLatitude, atStartLongitude) '
        'values(:startLatitude, :startLongitude)')
            signAnnotationSql = ('insert into signAnnotation(atStartLatitude, atStartLongitude, stop, noExit, giveWay) '
        'values(:startLatitude, :startLongitude, :stop, :noExit, :giveWay)')
            featureAnnotationSql = ('insert into featureAnnotation(atStartLatitude, atStartLongitude, station, amenity, railway) '
        'values(:startLatitude, :startLongitude, :station, :amenity, :railway)')
            roadFeaturesSql = ('insert into roadFeatures(atStartLatitude, atStartLongitude, crossing, bump, roundabout, trafficSignal, trafficCalming, junction, turningLoop) '
        'values(:startLatitude, :startLongitude, :crossing, :bump, :roundabout, :trafficSignal, :trafficCalming, :junction, :turningLoop)')

        id = row["ID"]
        severity = row["Severity"]
        distance = row["Distance(mi)"]
        if(row["Start_Time"] != ''):
            startTime = datetime.datetime.strptime(row["Start_Time"], "%Y-%m-%d %H:%M:%S")
        else:
            startTime = ''
        if(row["End_Time"] != ''):
            endTime =  datetime.datetime.strptime(row["End_Time"], "%Y-%m-%d %H:%M:%S")
        else:
            endTime = ''
        startLatitude = row["Start_Lat"]
        startLongitude = row["Start_Lng"]
        endLatitude = row["End_Lat"]
        endLongitude = row["End_Lng"]
        astronomicalTwilight = row["Astronomical_Twilight"] == "Night"
        civilTwilight = row["Civil_Twilight"] == "Night"
        nauticalTwilight = row["Nautical_Twilight"] == "Night"
        sunriseSunset = row["Sunrise_Sunset"] == "Night"
        timezone = row["Timezone"]
        side = row["Side"]
        airportCode = row["Airport_Code"]
        streetNumber = row["Number"]
        street = row["Street"]
        city = row["City"]
        county = row["County"]
        state = row["State"]
        zipcode = row["Zipcode"]
        if(row["Weather_Timestamp"] != ''):
            weatherTimestamp = datetime.datetime.strptime(row["Weather_Timestamp"], "%Y-%m-%d %H:%M:%S")
        else:
            weatherTimestamp = ''
        temperature = row["Temperature(F)"]
        humidity = row["Humidity(%)"]
        pressure = row["Pressure(in)"]
        visibility = row["Visibility(mi)"]
        precipitation = row["Precipitation(in)"]
        weatherCondition = row["Weather_Condition"]
        windChill = row["Wind_Chill(F)"]
        windSpeed = row["Wind_Speed(mph)"]
        stop = row["Stop"] == "True"
        noExit = row["No_Exit"] == "True"
        giveWay = row["Give_Way"] == "True"
        station = row["Station"] == "True"
        amenity = row["Amenity"] == "True"
        railway = row["Railway"] == "True"
        crossing = row["Crossing"] == "True"
        bump = row["Bump"] == "True"
        roundabout = row["Roundabout"] == "True"
        trafficSignal = row["Traffic_Signal"] == "True"
        trafficCalming = row["Traffic_Calming"] == "True"
        junction = row["Junction"] == "True"
        turningLoop = row["Turning_Loop"] == "True"

        timeComplete = False
        locationComplete = False
        weatherComplete = False

        with connection.cursor() as cursor:
            cursor.execute(accidentSql, [id, severity, distance, startTime, endTime, startLatitude, startLongitude])

            if startTime != '' and endTime != '':
                cursor.execute(accidentTimeSql, [startTime, endTime])
                cursor.execute(timePeriodSql, [startTime, endTime, astronomicalTwilight, civilTwilight, nauticalTwilight, sunriseSunset])
                timeComplete = True
            
            if startLatitude != '' and startLongitude != '' and weatherTimestamp != '' and airportCode != '':
                cursor.execute(experiencesSql, [startLatitude, startLongitude, weatherTimestamp, airportCode])

            if startLatitude != '' and startLongitude != '':
                cursor.execute(locationSql, [startLatitude, endLatitude, startLongitude, endLongitude, timezone, side, airportCode])
                cursor.execute(locationAddressSql, [startLatitude, startLongitude, streetNumber, street, city, county, state, zipcode])
                cursor.execute(poiAnnotationSql, [startLatitude, startLongitude])
                cursor.execute(signAnnotationSql, [startLatitude, startLongitude, stop, noExit, giveWay])
                cursor.execute(featureAnnotationSql, [startLatitude, startLongitude, station, amenity, railway])
                cursor.execute(roadFeaturesSql, [startLatitude, startLongitude, crossing, bump, roundabout, trafficSignal, trafficCalming, junction, turningLoop])
                locationComplete = True
            

            if weatherTimestamp != '' and airportCode != '':
                cursor.execute(weatherSql, [weatherTimestamp, airportCode, temperature, humidity, pressure, visibility, precipitation, weatherCondition])
                cursor.execute(windConditionSql, [weatherTimestamp, airportCode, windChill, windSpeed])
                weatherComplete = True

            connection.commit()

    except cx_Oracle.Error as error:
        print(error)
        print("In " + id)
        print([timeComplete, locationComplete, weatherComplete])
        
        connection.cancel()

        if timeComplete == False and locationComplete == False and weatherComplete == False:
            try:
                with connection.cursor() as cursor:
                    cursor.execute(accidentSql, [id, severity, distance, startTime, endTime, startLatitude, startLongitude])
                    
                    if startLatitude != '' and startLongitude != '' and weatherTimestamp != '' and airportCode != '':
                        cursor.execute(experiencesSql, [startLatitude, startLongitude, weatherTimestamp, airportCode])

                    if startLatitude != '' and startLongitude != '':
                        cursor.execute(locationSql, [startLatitude, endLatitude, startLongitude, endLongitude, timezone, side, airportCode])
                        cursor.execute(locationAddressSql, [startLatitude, startLongitude, streetNumber, street, city, county, state, zipcode])
                        cursor.execute(poiAnnotationSql, [startLatitude, startLongitude])
                        cursor.execute(signAnnotationSql, [startLatitude, startLongitude, stop, noExit, giveWay])
                        cursor.execute(featureAnnotationSql, [startLatitude, startLongitude, station, amenity, railway])
                        cursor.execute(roadFeaturesSql, [startLatitude, startLongitude, crossing, bump, roundabout, trafficSignal, trafficCalming, junction, turningLoop])
                        locationComplete = True
            

                    if weatherTimestamp != '' and airportCode != '':
                        cursor.execute(weatherSql, [weatherTimestamp, airportCode, temperature, humidity, pressure, visibility, precipitation, weatherCondition])
                        cursor.execute(windConditionSql, [weatherTimestamp, airportCode, windChill, windSpeed])
                        weatherComplete = True
                    
                    connection.commit()

            except cx_Oracle.Error as error:
                connection.cancel()
                try:
                    with connection.cursor() as cursor:
                        cursor.execute(accidentSql, [id, severity, distance, startTime, endTime, startLatitude, startLongitude])
                        
                        if startLatitude != '' and startLongitude != '' and weatherTimestamp != '' and airportCode != '':
                            cursor.execute(experiencesSql, [startLatitude, startLongitude, weatherTimestamp, airportCode])

                        if startLatitude != '' and startLongitude != '':
                            cursor.execute(locationSql, [startLatitude, endLatitude, startLongitude, endLongitude, timezone, side, airportCode])
                            cursor.execute(locationAddressSql, [startLatitude, startLongitude, streetNumber, street, city, county, state, zipcode])
                            cursor.execute(poiAnnotationSql, [startLatitude, startLongitude])
                            cursor.execute(signAnnotationSql, [startLatitude, startLongitude, stop, noExit, giveWay])
                            cursor.execute(featureAnnotationSql, [startLatitude, startLongitude, station, amenity, railway])
                            cursor.execute(roadFeaturesSql, [startLatitude, startLongitude, crossing, bump, roundabout, trafficSignal, trafficCalming, junction, turningLoop])
                            locationComplete = True
                

                        if weatherTimestamp != '' and airportCode != '':
                            cursor.execute(weatherSql, [weatherTimestamp, airportCode, temperature, humidity, pressure, visibility, precipitation, weatherCondition])
                            cursor.execute(windConditionSql, [weatherTimestamp, airportCode, windChill, windSpeed])
                            weatherComplete = True
                        
                        connection.commit()
                except cx_Oracle.Error as error:
                    connection.cancel()
                    try:
                        with connection.cursor() as cursor:
                            cursor.execute(accidentSql, [id, severity, distance, startTime, endTime, startLatitude, startLongitude])
                            
                            if startLatitude != '' and startLongitude != '' and weatherTimestamp != '' and airportCode != '':
                                cursor.execute(experiencesSql, [startLatitude, startLongitude, weatherTimestamp, airportCode])

                            if weatherTimestamp != '' and airportCode != '':
                                cursor.execute(weatherSql, [weatherTimestamp, airportCode, temperature, humidity, pressure, visibility, precipitation, weatherCondition])
                                cursor.execute(windConditionSql, [weatherTimestamp, airportCode, windChill, windSpeed])
                                weatherComplete = True
                            
                            connection.commit()
                    except cx_Oracle.Error as error:
                        try:
                            with connection.cursor() as cursor:
                                cursor.execute(accidentSql, [id, severity, distance, startTime, endTime, startLatitude, startLongitude])
                                
                                if startLatitude != '' and startLongitude != '' and weatherTimestamp != '' and airportCode != '':
                                    cursor.execute(experiencesSql, [startLatitude, startLongitude, weatherTimestamp, airportCode])

                                if weatherTimestamp != '' and airportCode != '':
                                    cursor.execute(weatherSql, [weatherTimestamp, airportCode, temperature, humidity, pressure, visibility, precipitation, weatherCondition])
                                    cursor.execute(windConditionSql, [weatherTimestamp, airportCode, windChill, windSpeed])
                                    weatherComplete = True
                                connection.commit()
                        except cx_Oracle.Error as error:
                            connection.cancel()
                            try:
                                with connection.cursor() as cursor:
                                    cursor.execute(accidentSql, [id, severity, distance, startTime, endTime, startLatitude, startLongitude])
                                        
                                    if startLatitude != '' and startLongitude != '' and weatherTimestamp != '' and airportCode != '':
                                        cursor.execute(experiencesSql, [startLatitude, startLongitude, weatherTimestamp, airportCode])
                                    connection.commit()
                            except cx_Oracle.Error as error:
                                connection.cancel()
                            try:
                                with connection.cursor() as cursor:
                                    cursor.execute(accidentSql, [id, severity, distance, startTime, endTime, startLatitude, startLongitude])
                                    connection.commit()
                            except cx_Oracle.Error as error:
                                print(error)
                                print("Duplicate of time, location, and weather failure inserting " + id )

        elif locationComplete == False and weatherComplete == False:
            try:
                with connection.cursor() as cursor:

                    cursor.execute(accidentSql, [id, severity, distance, startTime, endTime, startLatitude, startLongitude])

                    if startTime != '' and endTime != '':
                        cursor.execute(accidentTimeSql, [startTime, endTime])
                        cursor.execute(timePeriodSql, [startTime, endTime, astronomicalTwilight, civilTwilight, nauticalTwilight, sunriseSunset])
                        timeComplete = True

                    if startLatitude != '' and startLongitude != '' and weatherTimestamp != '' and airportCode != '':
                        cursor.execute([experiencesSql, startLatitude, startLongitude, weatherTimestamp, airportCode])

                    if weatherTimestamp != '' and airportCode != '':
                        cursor.execute(weatherSql, [weatherTimestamp, airportCode, temperature, humidity, pressure, visibility, precipitation, weatherCondition])
                        cursor.execute(windConditionSql, [weatherTimestamp, airportCode, windChill, windSpeed])
                        weatherComplete = True

                    connection.commit()
            except cx_Oracle.Error as error:
                connection.cancel()
                print(error)
                print("Duplicate of location, and weather failure inserting " + id )
                
                try: 
                    with connection.cursor() as cursor:

                        cursor.execute(accidentSql, [id, severity, distance, startTime, endTime, startLatitude, startLongitude])

                        if startTime != '' and endTime != '':
                            cursor.execute(accidentTimeSql, [startTime, endTime])
                            cursor.execute(timePeriodSql, [startTime, endTime, astronomicalTwilight, civilTwilight, nauticalTwilight, sunriseSunset])
                            timeComplete = True
                        
                        if startLatitude != '' and startLongitude != '' and weatherTimestamp != '' and airportCode != '':
                            cursor.execute([experiencesSql, startLatitude, startLongitude, weatherTimestamp, airportCode])

                        connection.commit()
                except cx_Oracle.Error as error:
                    connection.cancel()

                    try: 
                        with connection.cursor() as cursor:
                            cursor.execute(accidentSql, [id, severity, distance, startTime, endTime, startLatitude, startLongitude])
                            if startLatitude != '' and startLongitude != '' and weatherTimestamp != '' and airportCode != '':
                                cursor.execute([experiencesSql, startLatitude, startLongitude, weatherTimestamp, airportCode])
                            connection.commit()

                    except cx_Oracle.Error as error:
                        connection.cancel()

                        try:
                            with connection.cursor() as cursor:
                                cursor.execute(accidentSql, [id, severity, distance, startTime, endTime, startLatitude, startLongitude])
                                connection.commit()
                        except cx_Oracle.Error as error:
                            print("No insertion!")

        
connection = None 
try:
    cx_Oracle.init_oracle_client(lib_dir="C:\\oracle\\instantclient_19_8")

    connection = cx_Oracle.connect(
    config.username,
    config.password,
    config.dsn,
    encoding=config.encoding)
except cx_Oracle.Error as error:
    print(error)
finally: 
    with open('US_Accidents_June20.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)

        for num, row in enumerate(reader,start =1):
            if num >= 835198:
                insertItem(row, connection)

    print("DONE")