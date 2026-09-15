import { Routes, Route } from "react-router";
import Verificacion from "./pages/Verificacion";

export default function App() {
  return (
    <Routes>
      <Route path="/v/:token" element={<Verificacion />} />
    </Routes>
  );
}