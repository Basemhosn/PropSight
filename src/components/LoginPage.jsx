import { SignIn } from "@clerk/clerk-react";

export default function LoginPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A1628",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}>
      {/* Logo / header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{
          width: 64, height: 64, borderRadius: 18,
          background: "linear-gradient(135deg, #185FA5 0%, #1D9E75 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1rem", fontSize: 32,
        }}>🏙️</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
          Dubai RE Dashboard
        </h1>
        <p style={{ fontSize: 14, color: "#5A7A9A" }}>
          Sign in to access the dashboard
        </p>
      </div>

      {/* Clerk sign-in component */}
      <SignIn
        appearance={{
          elements: {
            rootBox: { width: "100%", maxWidth: 420 },
            card: {
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
              border: "none",
            },
            headerTitle: { color: "#0A1628", fontSize: 18 },
            headerSubtitle: { color: "#7A8499" },
            formButtonPrimary: {
              background: "#185FA5",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              "&:hover": { background: "#0C447C" },
            },
            formFieldInput: {
              borderRadius: 8,
              border: "1px solid #E8ECF2",
              fontSize: 14,
            },
            footerActionLink: { color: "#185FA5" },
            identityPreviewText: { color: "#0A1628" },
            socialButtonsBlockButton: {
              borderRadius: 8,
              border: "1px solid #E8ECF2",
              color: "#0A1628",
              fontSize: 14,
            },
          },
        }}
      />

      <p style={{ marginTop: "1.5rem", fontSize: 12, color: "#3A5A7A", textAlign: "center" }}>
        Powered by Dubai Land Department Open Data
      </p>
    </div>
  );
}
