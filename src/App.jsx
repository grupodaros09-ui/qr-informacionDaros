import { Routes, Route } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Verificacion from "./pages/Verificacion";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />

      <Route
        path="/v/:token"
        element={<Verificacion />}
      />

      <Route path="*" element={<Inicio />} />
    </Routes>
  );
}