const STORAGE_KEY = "mk_cookie_consent";
export const CONSENT_EVENT = "mk-cookie-consent-change";

export type ConsentValue = "accepted" | "rejected";

export function getConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Si localStorage no está disponible simplemente se volverá a preguntar
    // la próxima visita: no es crítico.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

// Para usar con useSyncExternalStore: evita el patrón "setState dentro de
// un useEffect" (lectura de localStorage) y es seguro para la hidratación
// de SSR (getServerSnapshot siempre devuelve el mismo valor que el server).
export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

export function getConsentSnapshot(): ConsentValue | null {
  return getConsent();
}

export function getConsentServerSnapshot(): ConsentValue | null {
  return null;
}
