import { useEffect, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/shared/api/supabase";
import { SESSION_QUERY_KEY } from "@/shared/lib/sessionQueryKey";

interface Props {
  children: ReactNode;
}

export const SessionProvider = ({ children }: Props) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      queryClient.setQueryData(SESSION_QUERY_KEY, newSession);
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  return <>{children}</>;
};
