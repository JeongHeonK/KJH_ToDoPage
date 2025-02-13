import { MouseEvent, DragEvent } from "react";

export const usePreventDefault = (e: Event | DragEvent) => e.preventDefault();

export const useStopPropagation = (e: MouseEvent) => e.stopPropagation();
