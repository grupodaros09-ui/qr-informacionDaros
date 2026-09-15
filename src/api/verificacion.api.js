const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function obtenerVerificacion(token) {
  if (!token) {
    throw new Error("Código de verificación no válido.");
  }

  if (!API_URL) {
    throw new Error("La dirección del servidor no está configurada.");
  }

  try {
    const response = await fetch(
      `${API_URL}/public/verificacion/${encodeURIComponent(token)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response.status === 404) {
      throw new Error("El código QR no corresponde a ningún registro o remisión.");
    }

    if (response.status === 410) {
      throw new Error("Este registro ya no se encuentra disponible.");
    }

    if (!response.ok) {
      throw new Error("No fue posible verificar la información.");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      // Si el backend aun no responde, se entrega un mock representativo en desarrollo local
      console.warn("No se pudo conectar al servidor backend. Usando datos de respaldo.");
    }
    throw error;
  }
}

export async function descargarRemisionPdf(token) {
  if (!token) throw new Error("Código token no proporcionado");
  const response = await fetch(
    `${API_URL}/public/verificacion/${encodeURIComponent(token)}/pdf`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("No se pudo descargar el documento PDF.");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Remision_${token}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}