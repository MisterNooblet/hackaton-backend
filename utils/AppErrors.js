export class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode
        this.status = "faild"
    }
}

export const appErr = (message, statusCode) =>{
    let error = new Error(message)
    error.statusCode = statusCode
    return error
}

