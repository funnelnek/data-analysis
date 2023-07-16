import { createContext } from "react";
import { DataFrame } from "../DataFrame";


export const DatasetContext = createContext<DataFrame>(undefined!);