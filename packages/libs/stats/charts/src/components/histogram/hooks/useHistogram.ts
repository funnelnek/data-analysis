import { useEffect, useRef } from "react";
import { Histogram } from "../Histogram";
import { HistogramOptions } from '../types';


export const useHistogram = (props: HistogramOptions): Histogram => {
    let ref = useRef();

    useEffect(() => {

    }, []);

    return new Histogram(props);
}