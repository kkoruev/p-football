import {ErrorCodes} from "~/errors/error.codes";

export const ErrorMessages: { [key in ErrorCodes]: string} = {
   [ErrorCodes.InvalidEmail]: "The provided email is invalid.",
   [ErrorCodes.AgeRequired]: "Age should be a positive number.",
   [ErrorCodes.UserAlreadyExists]: "A user with this email already exists.",
}