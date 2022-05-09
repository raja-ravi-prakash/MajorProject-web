export interface CustomResponse<T> {
    success: boolean,
    message: string,
    error: string,
    data: T
}

export interface InterceptedRequestBody {
    sessionId: string,
    encryptedPayload: string | Object
}

export interface IUser {
    _id: string,
    username: string,
    password: string,
    name: string,
    email: string
}

export enum EntityType {
    FILE="FILE",
    FOLDER="FOLDER"
}

export interface IEntity{
    _id: string
    type: EntityType,
    name: string,
    parent: string,
    file: string
}

export interface ISession{
    _id: string,
    username: string,
    payload: string
    expiry: Date
}

export interface IPrimaryEntity extends Document {
    _id: string,
    file: string,
    user: string
}