import { Routes, Route, useSearchParams } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Verificacion from "./pages/Verificacion";

function HomeWrapper() {
  const [searchParams] = useSearchParams();
  const hasIdentifier =
    searchParams.get("id") ||
    searchParams.get("folio") ||
    searchParams.get("token");

  if (hasIdentifier) {
    return <Verificacion />;
  }

  return <Inicio />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeWrapper />} />

      <Route
        path="/v/:token"
        element={<Verificacion />}
      />

      <Route path="*" element={<HomeWrapper />} />
    </Routes>
  );
}