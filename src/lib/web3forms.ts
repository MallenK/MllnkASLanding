const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// Clave gratuita de Web3Forms (web3forms.com): crea una cuenta gratis,
// copia tu "Access Key" y ponla como variable de entorno
// NEXT_PUBLIC_WEB3FORMS_KEY en Vercel. Sin esto, los formularios de la
// landing no podrán enviarse (ver README).
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export const isWeb3FormsConfigured = ACCESS_KEY.length > 0;

interface SubmitParams {
  email: string;
  subject: string;
  message?: string;
  name?: string;
}

export async function submitToWeb3Forms({
  email,
  subject,
  message,
  name,
}: SubmitParams): Promise<void> {
  if (!isWeb3FormsConfigured) {
    throw new Error(
      "Falta configurar NEXT_PUBLIC_WEB3FORMS_KEY (ver README: SEO y formularios).",
    );
  }

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject,
      email,
      name: name || "Visitante de la landing",
      message: message || "(sin mensaje)",
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || "No se pudo enviar el formulario.");
  }
}
