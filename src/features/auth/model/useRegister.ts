import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/shared/api/supabase";
import { isPasswordValid, PASSWORD_POLICY_ERROR } from "./passwordPolicy";
 
interface RegisterCredentials {
  email:    string;
  password: string;
}
 
export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ email, password }: RegisterCredentials) => {
      if (!isPasswordValid(password)) {
        throw new Error(PASSWORD_POLICY_ERROR);
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          // URL de la página de confirmación en Vercel.
          // Supabase incrustará esta URL en el email de confirmación.
          emailRedirectTo:
            `${process.env.EXPO_PUBLIC_WEB_URL}/confirm-email`,
        },
      });
      if (error) throw error;
      return data;
    },
  });
};
