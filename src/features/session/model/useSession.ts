import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/shared/api/supabase";
import { SESSION_QUERY_KEY } from "@/shared/lib/sessionQueryKey";
import type { Session } from "@supabase/supabase-js";
 
// Clave canónica de la sesión en TanStack Query.
// Al usar la misma clave en cualquier componente de la app,
// TanStack garantiza que todos lean del mismo caché.
export const useSession = () => {
  const queryClient = useQueryClient();
 
  // Query que obtiene la sesión actual.
  // TanStack Query la cachea y la comparte con todos los suscriptores.
  const { data: session, isLoading } = useQuery<Session | null>({
    queryKey: SESSION_QUERY_KEY,
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    },
    // La sesión se considera "fresca" por 2 minutos.
    // Después, TanStack la re-fetcha en background automáticamente.
    staleTime: 2 * 60 * 1000,
  });
 
  const signOut = async () => {
    await supabase.auth.signOut();
    // Limpiar toda la caché de TanStack al cerrar sesión.
    // Esto evita que datos del usuario anterior persistan.
    queryClient.clear();
  };
 
  return {
    session,
    isLoading,
    isAuthenticated: !!session,
    user: session?.user ?? null,
    signOut,
  };
};
