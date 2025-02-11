"use client";

import { ComponentType, JSX } from "react";
import { useModalStore } from "../store";

export default function ModalWrapper<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<P>,
) {
  return function Wrapper(props: P) {
    const isOpen = useModalStore((state) => state.isOpen);
    return (
      <>
        {isOpen ? (
          <div className="bg-black/60 fixed top-0 left-0 right-0 bottom-0 z-30">
            <WrappedComponent {...props} />
          </div>
        ) : null}
      </>
    );
  };
}
