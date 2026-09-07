"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegister();
    }, 900);
  };

  const onRegister = () => {
    window.location.href = "/";
  }

  const onGoLogin = () => {
    window.location.href = "/login";
  }

  const steps = [
    { icon: "🌱", title: "Impacto real", desc: "Cada compra economiza CO₂" },
    { icon: "💸", title: "Economize", desc: "Itens até 70% mais baratos" },
    { icon: "🤝", title: "Comunidade", desc: "+120k pessoas conscientes" },
  ];

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[42%] bg-[#1C1B2E] relative overflow-hidden flex-col justify-between p-12">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 80%, #5B50E8 0%, transparent 50%), radial-gradient(circle at 90% 10%, #A8D900 0%, transparent 40%)",
          }}
        />

        <div className="relative space-y-8">
          <div>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Por que entrar<br />
              para o <span className="text-[#A8D900]">ReUse?</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed">
              Comprar de segunda mão é o ato de consumo mais sustentável que existe. E aqui é fácil, seguro e divertido.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((s) => (
              <div key={s.title} className="flex items-start gap-4 bg-white/5 rounded-2xl p-4">
                <div className="text-2xl">{s.icon}</div>
                <div>
                  <p className="text-white font-semibold text-sm">{s.title}</p>
                  <p className="text-white/50 text-xs mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-[#F8F7FF] px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-extrabold text-[#1C1B2E] mb-2">Crie sua conta</h1>

                    <p className="text-gray-500 mb-8">
            Já tem uma conta?{" "}
            <button onClick={onGoLogin} className="text-[#5B50E8] font-semibold hover:underline">
              Faça login
            </button>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1C1B2E] mb-1.5">Nome completo</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Maria Silva"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1C1B2E] placeholder-gray-400 focus:outline-none focus:border-[#5B50E8] focus:ring-2 focus:ring-[#5B50E8]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1C1B2E] mb-1.5">E-mail</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1C1B2E] placeholder-gray-400 focus:outline-none focus:border-[#5B50E8] focus:ring-2 focus:ring-[#5B50E8]/20 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#1C1B2E] mb-1.5">Senha</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 caracteres"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1C1B2E] placeholder-gray-400 focus:outline-none focus:border-[#5B50E8] focus:ring-2 focus:ring-[#5B50E8]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1C1B2E] mb-1.5">Confirmar</label>
                <input
                  name="confirm"
                  type="password"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Repita a senha"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1C1B2E] placeholder-gray-400 focus:outline-none focus:border-[#5B50E8] focus:ring-2 focus:ring-[#5B50E8]/20 transition-all"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    agreed
                      ? "bg-[#5B50E8] border-[#5B50E8]"
                      : "bg-white border-gray-300 group-hover:border-[#5B50E8]"
                  }`}
                >
                  {agreed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-600 leading-relaxed">
                Li e aceito os{" "}
                <span className="text-[#5B50E8] font-medium cursor-pointer hover:underline">Termos de Uso</span>{" "}
                e a{" "}
                <span className="text-[#5B50E8] font-medium cursor-pointer hover:underline">Política de Privacidade</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !agreed}
              className="w-full py-3.5 rounded-xl bg-[#A8D900] text-[#1C1B2E] font-bold text-base hover:bg-[#96c200] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                "Criar conta grátis"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
