import { useState } from "react";
import { BehaviorSubject as Observable } from "rxjs";

export const useObservable = <T = any>(initialState: T) => {
  const [observable] = useState(new Observable(initialState));

  const handleNext = (value: T) => {
    observable.next(value);
  };

  return [observable, handleNext];
};