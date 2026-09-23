import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categoryList, products } from '../data/products'
import { formatCOP } from '../lib/format'
import { ProductCard } from '../components/product/ProductCard'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name'

export function CatalogPage() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('featured')
  const [maxPrice, setMaxPrice] = useState(300000)

  const activeCat = params.get('cat') ?? ''

  const setCat = (cat: string) => {
    const next = new URLSearchParams(params)
    if (!cat) next.delete('cat')
    else next.set('cat', cat)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCat) list = list.filter((p) => p.category === activeCat)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
    }
    list = list.filter((p) => p.price <= maxPrice)

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    }
    return list
  }, [activeCat, query, sort, maxPrice])

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pb-24 pt-32 sm:px-6">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-dark">
          Catálogo
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
          {activeCat
            ? (categoryList.find((c) => c.slug === activeCat)?.label ?? 'Productos')
            : 'Toda la tienda'}
        </h1>
        <p className="mt-3 max-w-xl text-ink/60">
          {filtered.length} producto{filtered.length === 1 ? '' : 's'} disponibles · Envíos a todo
          Colombia
        </p>
      </motion.header>

      <div className="glass grain mb-8 rounded-3xl p-4 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos…"
              title="Buscar máscaras, cepillos, masajeadores…"
              className="input-glass !pl-11"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-ink/8"
                aria-label="Limpiar"
              >
                <X className="size-4 text-ink/50" />
              </button>
            )}
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-white/50 px-3 py-2">
              <SlidersHorizontal className="size-4 text-ink/45" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="bg-transparent text-sm font-medium outline-none"
                aria-label="Ordenar"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio ↑</option>
                <option value="price-desc">Precio ↓</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>

            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-ink/10 bg-white/50 px-3 py-2 text-sm sm:flex-none">
              <span className="text-ink/50">Hasta</span>
              <input
                type="range"
                min={50000}
                max={300000}
                step={10000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="min-w-0 flex-1 accent-rose sm:w-28 sm:flex-none"
                aria-label="Precio máximo"
              />
              <span className="min-w-[72px] font-semibold text-ink">{formatCOP(maxPrice)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCat('')}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
              !activeCat
                ? 'bg-rose text-white shadow-rose scale-105'
                : 'bg-white/55 text-ink/65 hover:bg-white hover:text-ink'
            }`}
          >
            Todas
          </button>
          {categoryList.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCat(c.slug === activeCat ? '' : c.slug)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                activeCat === c.slug
                  ? 'bg-rose text-white shadow-rose scale-105'
                  : 'bg-white/55 text-ink/65 hover:bg-white hover:text-ink'
              }`}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass grain rounded-3xl py-20 text-center">
          <p className="font-display text-2xl font-semibold">Sin resultados</p>
          <p className="mt-2 text-ink/55">Prueba otra búsqueda o quita filtros.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
