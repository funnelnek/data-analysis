import React, { FC,  }  from 'react';
import clsx from "clsx";
import { useHistogram } from "./hooks";
import { HistogramOptions } from './types';


export const HistogramChart: FC<HistogramOptions> = (props: HistogramOptions): JSX.Element => {
    let { width, height } = useHistogram(props);
    let cls = clsx('histogram', 'chart');
    
    return (
        <div className={cls}>
        </div>
    );
};