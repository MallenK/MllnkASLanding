import { SITE_TAGLINE } from "@/lib/constants";

export function OgImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#111111",
        padding: "80px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -140,
          right: -140,
          width: 460,
          height: 460,
          borderRadius: "50%",
          display: "flex",
          background:
            "radial-gradient(circle, rgba(255,210,31,0.35) 0%, rgba(255,210,31,0) 70%)",
        }}
      />

      <div style={{ display: "flex", alignItems: "baseline" }}>
        <span style={{ fontSize: 68, fontWeight: 800, color: "#ffffff" }}>
          Mallen&apos;k
        </span>
        <span style={{ fontSize: 68, fontWeight: 800, color: "#ffd21f" }}>
          .
        </span>
      </div>
      <div
        style={{ display: "flex", fontSize: 30, color: "#a3a3a3", marginTop: 4 }}
      >
        Academy Software
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 48,
          fontSize: 46,
          fontWeight: 800,
          color: "#ffffff",
          maxWidth: 920,
          lineHeight: 1.25,
        }}
      >
        {SITE_TAGLINE}
      </div>

      <div style={{ display: "flex", gap: 14, marginTop: 44 }}>
        {["Alumnos", "Calendario", "Bonos", "Documentación"].map((label) => (
          <div
            key={label}
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#ffffff",
              fontSize: 22,
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
