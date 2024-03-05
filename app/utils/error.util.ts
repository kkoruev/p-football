import {ErrorCode} from "~/errors/error.code";

export const ErrorMessages: { [key in ErrorCode]: string} = {
   [ErrorCode.InvalidEmail]: "The provided email is invalid.",
   [ErrorCode.AgeRequired]: "Age should be a positive number.",
   [ErrorCode.UserEmailAlreadyExists]: "A user with this email already exists.",
}