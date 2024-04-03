export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty";
  if (!re.test(email)) return "Wrong email format";

  return "";
};

export const passwordValidator = (password: string) => {
  const minLength = 8;
  const re = new RegExp(
    `(?=.{${minLength},}$)(?=.*[A-Z])(?=.*[!#$%&'*+-/=?^_\`.{|}~]).*`,
  );

  if (!password || !re.test(password))
    return `${minLength} or more characters including uppercase and symbols`;

  return "";
};
