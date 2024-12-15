// just a simple class
class ApiResponse {
    constructor(status , message="Success" ,data){
      this.status = status
      this.message = message
      this.data = data
    }
}
export {ApiResponse}