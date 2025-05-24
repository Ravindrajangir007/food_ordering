export const isFutureDate = (date) => {
  return new Date(date) > new Date();
};
