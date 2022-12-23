export const hasObjectEmptyValues = (obj) =>
  Object.values(obj).some((x) => x === null || x === "");

export const hasEmailValidFormat = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const hasUpperCase = (str) => str !== str.toLowerCase();

export const containsNumber = (str) => /\d/.test(str);

export const isValidLength = (str) => str.length >= 8;