import axios from "axios"

class TodoDataService{
    retrieveAllTodos(){
        console.log("Hello World Service")
        return axios.get('http://localhost:8080/api/tutorials')
    }
}

export default new TodoDataService()