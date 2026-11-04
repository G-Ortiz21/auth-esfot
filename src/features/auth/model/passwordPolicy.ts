export const PASSWORD_REQUIREMENTS = [
  {
    key: "length",
    label: "Mínimo 8 caracteres",
    test: (password: string) => password.length >= 8,
  },
  {
    key: "uppercase",
    label: "Al menos una letra mayúscula",
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    key: "special",
    label: "Al menos un carácter especial",
    test: (password: string) => /[^A-Za-z0-9\s]/.test(password),
  },
] as const;

export const PASSWORD_POLICY_ERROR =
  "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un carácter especial.";

export const getPasswordRequirements = (password: string) =>
  PASSWORD_REQUIREMENTS.map(({ key, label, test }) => ({
    key,
    label,
    met: test(password),
  }));

export const isPasswordValid = (password: string) =>
  PASSWORD_REQUIREMENTS.every(({ test }) => test(password));
