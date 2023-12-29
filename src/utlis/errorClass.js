export class ErrorClass extends Error{
    constructor(message,status){
        super(message);
        this.status = status || 500
    }
}

// export const ErrorClass=(message,statusCode)=>{
//     const error = new Error();
//     error.message = message;
//     error.statusCode = statusCode;
//     return error;
// }