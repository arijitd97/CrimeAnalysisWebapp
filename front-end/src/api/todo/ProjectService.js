import axios from "axios"

class ProjectService {
    executeIntervalRate(timeInterval, startyear, endyear){
        console.log("Interval Rate: " + timeInterval + startyear + endyear)
        // return axios.get(`http://10.20.106.45:8080/api/intervalRate?startYear=${startyear}&endYear=${endyear}`)
        // return axios.get(`http://10.20.106.45:8080/api/intervalRate?timeInterval=${timeInterval}&startYear=${startyear}&endYear=${endyear}`)
        return axios.get(`http://localhost:8080/api/intervalRate?timeInterval=${timeInterval}&startYear=${startyear}&endYear=${endyear}`)
        //return axios.get(`http://localhost:8080/intervalRate?starthour=${starthour}&endhour=${endhour}`)
        //return axios.get('http://localhost:8080/api/tutorials') //Path variables

        // return axios.get('http://localhost:8080/api/tutorials?title=Arijit') Request Params
        // this returns a promise back
    }

    executeAgeTimeInterval(timeInterval, startyear, endyear){
        console.log("Age Time Interval" + timeInterval + startyear + endyear)
        // return axios.get(`http://10.20.106.45:8080/api/ageGroupRate?timeInterval=${timeInterval}&startYear=${startyear}&endYear=${endyear}`)
        return axios.get(`http://localhost:8080/api/ageGroupRate?timeInterval=${timeInterval}&startYear=${startyear}&endYear=${endyear}`)
        //return axios.get(`http://localhost:8080/ageGroupRate?timeInterval=${timeInterval}&startyear=${startyear}&endyear=${endyear}`)
    }

    executeLocationCrime(location, startyear, endyear){
        console.log("Crime Location" + location + startyear + endyear)
        // return axios.get(`http://10.20.106.45:8080/api/byCrimeLocation?locationType=${location}&startYear=${startyear}&endYear=${endyear}`)
        return axios.get(`http://localhost:8080/api/byCrimeLocation?locationType=${location}&startYear=${startyear}&endYear=${endyear}`)
        //return axios.get(`http://localhost:8080/api/byCrimeLocation?location=${location}&startyear=${startyear}&endyear=${endyear}`)
    }

    executeRaceOffenseType(crimeType, startyear, endyear){
        console.log("Crime Type" + crimeType + startyear + endyear)
        // return axios.get(`http://10.20.106.45:8080/api/raceOffenseType?offenseType=${crimeType}&startYear=${startyear}&endYear=${endyear}`)
        return axios.get(`http://localhost:8080/api/raceOffenseType?offenseType=${crimeType}&startYear=${startyear}&endYear=${endyear}`)
        //return axios.get(`http://localhost:8080/api/raceOffenseType?location=${crimeType}&startyear=${startyear}&endyear=${endyear}`)
    }

    executeRaceRelation(relation, startyear, endyear){
        console.log("Race selected is " + relation + startyear + endyear)
        return axios.get(`http://localhost:8080/api/raceRelation?relation=${relation}&startYear=${startyear}&endYear=${endyear}`)
        //return axios.get(`http://10.20.106.11:8080/api/raceRelation?relation=${relation}&startYear=${startyear}&endYear=${endyear}`)
        //return axios.get(`http://10.20.106.45:8080/api/raceRelation?race=${race}&startYear=${startyear}&endYear=${endyear}`)
        // return axios.get(`http://localhost:8080/api/raceRelation?race=${race}&startYear=${startyear}&endYear=${endyear}`)
        // return axios.get(`http://localhost:8080/api/raceRelation?race=${race}&startyear=${startyear}&endyear=${endyear}`)
    }

    executeCountRows(){
        console.log("Count Rows...!!!")
        // return axios.get(`http://10.20.106.45:8080/api/countTuples`)
        return axios.get(`http://localhost:8080/api/countTuples`)
    }

    executeTest(name){
        return axios.get(`http://localhost:8080/api/tutorials?title=${name}`)
    }

}

export default new ProjectService()