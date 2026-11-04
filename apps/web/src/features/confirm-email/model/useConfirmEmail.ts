import { useEffect, useRef, useState } from "react";
import { supabase } from "@/shared/api/supabase";

type ConfirmationResult = {
  status: "success" | "error";
  error?: string;
  warning?: string;
};

const getInitialResult = (): ConfirmationResult | null => {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  if (params.get("token_hash") && params.get("type") === "email") return null;

  return {
    status: "error",
    error:
      "No se encontró un enlace de confirmación válido. Abre el enlace completo del correo.",
  };
};

export const useConfirmEmail = () => {
  const [result, setResult] = useState<ConfirmationResult | null>(getInitialResult);
  const verificationRef = useRef<Promise<ConfirmationResult> | null>(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    if (!verificationRef.current) {
      const params = new URLSearchParams(window.location.search);
      const tokenHash = params.get("token_hash");
      const type = params.get("type");

      if (!tokenHash || type !== "email") {
        return () => {
          isMountedRef.current = false;
        };
      }

      const url = new URL(window.location.href);
      url.searchParams.delete("token_hash");
      url.searchParams.delete("type");
      window.history.replaceState(
        window.history.state,
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );

      verificationRef.current = (async () => {
        try {
          const { error: verificationError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: "email",
          });

          if (verificationError) {
            const errorCode = `${verificationError.code ?? ""} ${verificationError.message}`.toLowerCase();
            const isInvalidOrExpired = /expired|invalid|used|otp|token/.test(errorCode);

            return {
              status: "error",
              error: isInvalidOrExpired
                ? "El enlace de confirmación es inválido, ya fue utilizado o ha expirado. Solicita uno nuevo."
                : "No se pudo confirmar la cuenta. Comprueba tu conexión e inténtalo de nuevo.",
            };
          }
        } catch {
          return {
            status: "error",
            error:
              "No se pudo confirmar la cuenta. Comprueba tu conexión e inténtalo de nuevo.",
          };
        }

        try {
          const { error: signOutError } = await supabase.auth.signOut();

          return {
            status: "success",
            warning: signOutError
              ? "La cuenta se confirmó, pero no se pudo cerrar la sesión web. Cierra esta pestaña antes de continuar."
              : undefined,
          };
        } catch {
          return {
            status: "success",
            warning:
              "La cuenta se confirmó, pero no se pudo cerrar la sesión web. Cierra esta pestaña antes de continuar.",
          };
        }
      })();
    }

    void verificationRef.current.then((confirmationResult) => {
      if (isMountedRef.current) {
        setResult(confirmationResult);
      }
    });

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    status: result?.status ?? "loading",
    error: result?.error ?? null,
    warning: result?.warning ?? null,
  };
};
