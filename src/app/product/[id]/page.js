"use client";

import * as React from 'react'
import ProductCard from "../../_components/product-card";
import { getProductById, getRelatedProducts } from "../../../../data/products";

const conditionColors = {
  Novo: "bg-[#A8D900] text-[#1C1B2E]",
  Ótimo: "bg-[#EAE8FD] text-[#5B50E8]",
  Bom: "bg-amber-100 text-amber-700",
  Regular: "bg-gray-100 text-gray-600",
};

export default function ProductDetailPage({ params }) {
  const { id } = React.use(params);

  const product = getProductById(id);
  const [activeImage, setActiveImage] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  const [contacted, setContacted] = React.useState(false);
  const isLoggedIn = false;

  const onNavigateLogin = () => {
    window.location.href = "/login";
  }

  const onNavigateCatalog = () => {
    window.location.href = "/catalog";
  }

  const onNavigateProduct = (id) => {
    window.location.href = `/product/${id}`;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF]">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-xl font-bold text-[#1C1B2E] mb-2">Produto não encontrado</h2>
          <button onClick={onNavigateCatalog} className="text-[#5B50E8] font-semibold hover:underline">
            Voltar ao catálogo
          </button>
        </div>
      </div>
    );
  }

  const related = getRelatedProducts(product.id, product.category);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleContact = () => {
    if (!isLoggedIn) {
      onNavigateLogin();
      return;
    }
    setContacted(true);
  };

  return (
    <div className="bg-[#F8F7FF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <button onClick={onNavigateCatalog} className="hover:text-[#5B50E8] transition-colors">
            Catálogo
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigateCatalog()}
            className="hover:text-[#5B50E8] transition-colors"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[#1C1B2E] font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-4">
            <div className="relative bg-white rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount && (
                <div className="absolute top-4 left-4 bg-[#5B50E8] text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  -{discount}% OFF
                </div>
              )}
              <button
                onClick={() => setLiked(!liked)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  liked ? "bg-red-500 text-white" : "bg-white/90 text-gray-500 hover:text-red-400"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={liked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === i ? "border-[#5B50E8]" : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img src={img} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-gray-400">{product.category}</span>
                <span className="text-gray-200">·</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${conditionColors[product.condition]}`}>
                  {product.condition}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-[#1C1B2E] leading-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-extrabold text-[#5B50E8]">
                  R$ {product.price.toLocaleString("pt-BR")}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through mb-1">
                    R$ {product.originalPrice.toLocaleString("pt-BR")}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-bold text-[#1C1B2E] mb-3 text-sm">Descrição</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-[#F0EFF8] text-[#5B50E8] px-2.5 py-1 rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-bold text-[#1C1B2E] mb-4 text-sm">Vendedor</h3>
              <div className="flex items-center gap-4">
                <img
                  src={product.sellerAvatar}
                  alt={product.seller}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1C1B2E]">{product.seller}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-sm text-amber-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-medium text-[#1C1B2E]">{product.sellerRating}</span>
                    </div>
                    <span className="text-gray-300">·</span>
                    <span className="text-sm text-gray-500">{product.sellerSales} vendas</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-sm text-gray-500">{product.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Condição", value: product.condition },
                { label: "Localização", value: product.location },
                { label: "Publicado", value: product.listedAt },
                { label: "Categoria", value: product.category },
              ].map((d) => (
                <div key={d.label} className="bg-white rounded-xl p-3.5 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-0.5">{d.label}</p>
                  <p className="text-sm font-semibold text-[#1C1B2E]">{d.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              {contacted ? (
                <div className="flex items-center gap-3 bg-[#A8D900]/10 border border-[#A8D900]/30 rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-full bg-[#A8D900] flex items-center justify-center text-[#1C1B2E]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1C1B2E] text-sm">Mensagem enviada!</p>
                    <p className="text-gray-500 text-xs">{product.seller} receberá seu interesse em breve.</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleContact}
                  className="w-full py-4 rounded-xl bg-[#5B50E8] text-white font-bold text-base hover:bg-[#4a40d4] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Tenho interesse
                </button>
              )}
              <button
                onClick={() => setLiked(!liked)}
                className={`w-full py-3.5 rounded-xl border-2 font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  liked
                    ? "border-red-400 text-red-500 bg-red-50"
                    : "border-gray-200 text-gray-600 hover:border-[#5B50E8] hover:text-[#5B50E8]"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill={liked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {liked ? "Salvo nos favoritos" : "Salvar nos favoritos"}
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-extrabold text-[#1C1B2E] mb-6">Você também pode gostar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onClick={() => onNavigateProduct(p.id)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
