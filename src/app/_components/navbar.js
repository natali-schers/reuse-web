"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = pathname === "/" ? "home" : pathname.split("/")[1];
  const isLoggedIn = false;
  const onNavigate = (page) => router.push(page === "home" ? "/" : `/${page}`);
  const onLogout = () => router.push("/");
  const isAuth = currentPage === "login" || currentPage === "register";

  if (isAuth) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate("home")}
            className="flex-shrink-0 text-xl font-extrabold tracking-tight text-[#5B50E8]"
          >
            ReUse
          </button>

          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate("home")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentPage === "home"
                  ? "bg-[#EAE8FD] text-[#5B50E8]"
                  : "text-gray-600 hover:text-[#5B50E8] hover:bg-[#EAE8FD]"
              }`}
            >
              Início
            </button>
            <button
              onClick={() => onNavigate("catalog")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentPage === "catalog"
                  ? "bg-[#EAE8FD] text-[#5B50E8]"
                  : "text-gray-600 hover:text-[#5B50E8] hover:bg-[#EAE8FD]"
              }`}
            >
              Explorar
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => onNavigate("catalog")}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#A8D900] text-[#1C1B2E] text-sm font-semibold hover:bg-[#96c200] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Vender
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#5B50E8] flex items-center justify-center text-white text-xs font-bold">
                    M
                  </div>
                  <button
                    onClick={onLogout}
                    className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block"
                  >
                    Sair
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate("login")}
                  className="text-sm font-medium text-gray-700 hover:text-[#5B50E8] transition-colors"
                >
                  Entrar
                </button>
                <button
                  onClick={() => onNavigate("register")}
                  className="px-4 py-2 rounded-full bg-[#5B50E8] text-white text-sm font-semibold hover:bg-[#4a40d4] transition-colors"
                >
                  Cadastrar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
