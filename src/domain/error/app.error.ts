

export class AppError extends Error {

    constructor(
        public readonly statusCode: number,
        public readonly message: string,
    ){
        super(message);
    }

    public notContent(message: string){
        return new AppError(204, message);
    }

    public badRequest(message: string){
        return new AppError(400, message);
    }

    public unauthorized(message: string){
        return new AppError(401, message);
    }

    public notFound(message: string){
        return new AppError(404, message);
    }

    public internalServer(message: string){
        return new AppError(500, message);
    }

}