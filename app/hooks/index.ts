import { MouseEvent } from "react";

export const usePreventDefault = (e: Event) => e.preventDefault();

export const useStopPropagation = (e: MouseEvent) => e.stopPropagation();
