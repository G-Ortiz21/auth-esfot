import { useEffect } from "react";
import { router, Stack } from "expo-router";
import { QueryProvider } from "@/shared/lib/QueryProvider";
import { SessionProvider, useSession } from "@/features/session";
 
// Componente interno que maneja la redirección basada en auth.
// Está dentro de QueryProvider para poder usar useSession.
function AuthGuard() {
  const { isAuthenticated, isLoading } = useSession();
 
  useEffect(() => {
    if (isLoading) return; // Esperar a que se cargue la sesión
 
    if (isAuthenticated) {
      // Usuario autenticado → ir a la pantalla principal
      router.replace("/home");
    } else {
      // Sin sesión → ir al login
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, isLoading]);
 
  return null; // Este componente no renderiza nada, solo navega
}
 
export default function RootLayout() {
  return (
    <QueryProvider>
      <SessionProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Grupo de rutas de autenticación */}
          <Stack.Screen name="(auth)" />
          {/* Pantalla principal */}
          <Stack.Screen name="home"  />
          {/* Ruta índice: solo redirige, no muestra nada */}
          <Stack.Screen name="index" />
        </Stack>
        <AuthGuard />
      </SessionProvider>
    </QueryProvider>
  );
}
