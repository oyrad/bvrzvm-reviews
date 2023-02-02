import { useNavigate } from "react-router-dom";

import { routes } from "../api/paths";

export default function Header() {
  const navigate = useNavigate();



  return (
    <header className="bg-gray-400 py-6 px-80 mb-8 sticky top-0 z-50 border-b w-full bg-white">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate(routes.DASHBOARD)}
      >
        movie reviews
      </h1>
    </header>
  );
}
