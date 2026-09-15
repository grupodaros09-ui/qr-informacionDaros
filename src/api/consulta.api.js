const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerDocumento(token) {
  const response = await fetch(
    `${API_URL}/public/verificacion/${encodeURIComponent(token)}`
  );

  if (response.status === 404) {
    throw new Error(
      "El documento solicitado no existe o el código no es válido."
    );
  }

  if (!response.ok) {
    throw new Error(
      "No fue posible verificar el documento."
    );
  }

  return response.json();
}