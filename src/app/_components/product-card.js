const conditionColors = {
  Novo: "bg-[#A8D900] text-[#1C1B2E]",
  Ótimo: "bg-[#EAE8FD] text-[#5B50E8]",
  Bom: "bg-amber-100 text-amber-700",
  Regular: "bg-gray-100 text-gray-600",
};

export default function ProductCard({ product, onClick }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <button
      onClick={onClick}
      className="group text-left bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#5B50E8]/30 hover:shadow-lg hover:shadow-[#5B50E8]/10 transition-all duration-300"
    >
      <div className="relative overflow-hidden bg-gray-50 aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount && (
          <div className="absolute top-3 left-3 bg-[#5B50E8] text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${conditionColors[product.condition]}`}>
            {product.condition}
          </span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 font-medium mb-1">{product.category}</p>
        <h3 className="font-semibold text-[#1C1B2E] text-sm leading-snug mb-3 line-clamp-2 group-hover:text-[#5B50E8] transition-colors">
          {product.name}
        </h3>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-[#5B50E8]">
              R$ {product.price.toLocaleString("pt-BR")}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                R$ {product.originalPrice.toLocaleString("pt-BR")}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-[#5B50E8] bg-[#EAE8FD] px-2 py-1 rounded-full">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="font-medium">{product.co2Saved}kg CO₂</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <img
            src={product.sellerAvatar}
            alt={product.seller}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-xs text-gray-500">{product.seller}</span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">{product.location.split(",")[1]?.trim()}</span>
        </div>
      </div>
    </button>
  );
}
