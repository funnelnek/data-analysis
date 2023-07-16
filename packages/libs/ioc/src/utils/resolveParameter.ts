import { isPrimitive } from "./isPrimitive"

export const resolveParameters = (target: object, deps: any[], method: string): any[] => {
    return deps.map(dependency => {
        if (isPrimitive(dependency)) {
            
        }
    });
}