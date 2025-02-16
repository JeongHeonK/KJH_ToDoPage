import { boardFormSchema, todoFormSchema, todoValidation } from "./validation";

const delay = async (delayTime: number) => {
  const promise = new Promise((resolve) => {
    setTimeout(resolve, delayTime);
  });

  return promise;
};

export { boardFormSchema, todoFormSchema, todoValidation, delay };
