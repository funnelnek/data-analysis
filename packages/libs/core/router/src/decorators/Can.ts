import { RouteActivation } from "../constants"
import { GuardType } from "../types"

export const Can = (type: RouteActivation) => {
    return (ctor: GuardType): void => {

    }
}