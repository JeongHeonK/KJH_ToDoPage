export const delay = async (delayTime: number) => {
  const promise = new Promise((resolve) => {
    setTimeout(resolve, delayTime);
  });

  return promise;
};
