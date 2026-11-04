import type { CSSProperties } from "react";

export const HomePage = () => (
  <main style={layout}>
    <section style={card}>
      <div style={header}>
        <span aria-hidden="true" style={{ fontSize: "42px" }}>🔐</span>
        <h1 style={{ color: "#fff", margin: "8px 0 4px", fontSize: "22px" }}>
          ESFOT Auth
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", margin: 0, fontSize: "14px" }}>
          Bienvenido
        </p>
      </div>
      <div style={body}>
        <p style={{ color: "#334155", marginBottom: "24px" }}>
          Esta página procesa los enlaces de confirmación y recuperación de cuenta.
          Para iniciar sesión, abre la aplicación móvil.
        </p>
        <a href="authesfot:///login" style={appLink}>
          Abrir la aplicación
        </a>
        <p style={{ color: "#64748B", marginTop: "24px", fontSize: "14px" }}>
          ¿Llegaste aquí desde un correo? Abre el enlace completo que recibiste.
        </p>
      </div>
    </section>
  </main>
);

const layout: CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #F0F4FF 0%, #E0EAFF 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
};

const card: CSSProperties = {
  background: "#fff",
  borderRadius: "20px",
  boxShadow: "0 20px 60px rgba(27,58,107,0.15)",
  width: "100%",
  maxWidth: "420px",
  overflow: "hidden",
};

const header: CSSProperties = {
  background: "linear-gradient(135deg, #1B3A6B 0%, #2563EB 100%)",
  padding: "28px 32px",
  textAlign: "center",
};

const body: CSSProperties = {
  padding: "32px",
  textAlign: "center",
};

const appLink: CSSProperties = {
  display: "inline-block",
  background: "#1B3A6B",
  color: "#fff",
  borderRadius: "8px",
  padding: "12px 20px",
  textDecoration: "none",
  fontWeight: 600,
};
