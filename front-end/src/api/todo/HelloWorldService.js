import axios from "axios"

class HelloWorldService {
    executeHelloWorldService(){
        console.log("Hello World Service")
        return axios.get('http://localhost:8080/api/tutorials')
        //return axios.get('http://localhost:8080/api/tutorials/2') Path variables

        // return axios.get('http://localhost:8080/api/tutorials?title=Arijit') Request Params
        // this returns a promise back
    }

    executePathVariableService(name){
        return axios.get(`http://localhost:8080/api/tutorials/${name}`)
    }

}

export default new HelloWorldService()