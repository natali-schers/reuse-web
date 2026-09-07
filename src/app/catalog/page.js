"use client";
import { useState, useMemo } from "react";
import { products, CATEGORIES } from "../../../data/products";
import ProductCard from "../_components/product-card";

const conditions = ["Novo", "Ótimo", "Bom", "Regular"];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [sort, setSort] = useState("relevancia");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const onNavigateProduct = (id) => {
    window.location.href = `/product/${id}`;
  }

  const toggleCondition = (c) =>
    setSelectedConditions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim())
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      );

    if (selectedCategory !== "Todos")
      result = result.filter((p) => p.category === selectedCategory);

    if (selectedConditions.length > 0)
      result = result.filter((p) => selectedConditions.includes(p.condition));

    if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));

    switch (sort) {
      case "menor-preco":
        result.sort((a, b) => a.price - b.price);
        break;
      case "maior-preco":
        result.sort((a, b) => b.price - a.price);
        break;
      case "recente":
        result.reverse();
        break;
    }

    return result;
  }, [search, selectedCategory, selectedConditions, sort, minPrice, maxPrice]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-[#1C1B2E] text-sm mb-3">Categoria</h3>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat
                  ? "bg-[#EAE8FD] text-[#5B50E8] font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#5B50E8]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-[#1C1B2E] text-sm mb-3">Condição</h3>
        <div className="space-y-2">
          {conditions.map((c) => (
            <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggleCondition(c)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
                  selectedConditions.includes(c)
                    ? "bg-[#5B50E8] border-[#5B50E8]"
                    : "bg-white border-gray-300 group-hover:border-[#5B50E8]"
                }`}
              >
                {selectedConditions.includes(c) && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-600 group-hover:text-[#5B50E8] transition-colors">{c}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-[#1C1B2E] text-sm mb-3">Faixa de preço</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Mín"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#1C1B2E] focus:outline-none focus:border-[#5B50E8] focus:ring-1 focus:ring-[#5B50E8]/20"
          />
          <span className="text-gray-400 text-sm">–</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Máx"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#1C1B2E] focus:outline-none focus:border-[#5B50E8] focus:ring-1 focus:ring-[#5B50E8]/20"
          />
        </div>
      </div>

      <button
        onClick={() => {
          setSelectedCategory("Todos");
          setSelectedConditions([]);
          setMinPrice("");
          setMaxPrice("");
          setSearch("");
        }}
        className="w-full py-2 rounded-lg border border-gray-200 text-sm text-gray-500 hover:border-[#5B50E8] hover:text-[#5B50E8] transition-colors"
      >
        Limpar filtros
      </button>
    </div>
  );

  return (
    <div className="bg-[#F8F7FF] min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-extrabold text-[#1C1B2E] mb-4">
            {selectedCategory === "Todos" ? "Explorar tudo" : selectedCategory}
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#F8F7FF] text-sm text-[#1C1B2E] placeholder-gray-400 focus:outline-none focus:border-[#5B50E8] focus:ring-2 focus:ring-[#5B50E8]/20"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#1C1B2E] focus:outline-none focus:border-[#5B50E8] cursor-pointer"
            >
              <option value="relevancia">Relevância</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
              <option value="recente">Mais recentes</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                showFilters
                  ? "bg-[#5B50E8] border-[#5B50E8] text-white"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtros
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <FilterPanel />
            </div>
          </aside>

          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setShowFilters(false)}>
              <div
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-[#1C1B2E]">Filtros</h2>
                  <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500 mb-5">
              <span className="font-semibold text-[#1C1B2E]">{filtered.length}</span> resultados encontrados
            </p>
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-[#1C1B2E] mb-2">Nenhum resultado</h3>
                <p className="text-gray-500 text-sm">Tente outros termos ou remova alguns filtros.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => onNavigateProduct(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
