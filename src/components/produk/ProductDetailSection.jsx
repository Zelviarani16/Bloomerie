/*
  ProductDetailSection.jsx
  heading "Detail Produk & Perawatan", checklist 3 poin
  dengan ikon centang, lalu box abu-abu "Tips Perawatan".
  Statis, tidak butuh interaktivitas, jadi tidak perlu "use client".
*/

export default function ProductDetailSection({ careNotes, careTip }) {
  return (
    <section className="py-12 lg:py-16 border-t" style={{ borderColor: "var(--color-neutral-dark)" }}>
      <div className="container-bloomerie max-w-3xl">
        <h2 className="text-xl lg:text-2xl font-bold mb-5" style={{ color: "var(--color-ink)" }}>
          Detail Produk &amp; Perawatan
        </h2>

        {/* Checklist */}
        <ul className="flex flex-col gap-3 mb-6">
          {careNotes.map((note, index) => (
            <li key={index} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                style={{ background: "var(--color-tertiary)" }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="text-sm leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                {note}
              </span>
            </li>
          ))}
        </ul>

        {/* Box tips perawatan */}
        <div className="rounded-lg p-5" style={{ background: "var(--color-neutral)" }}>
          <p className="text-sm font-semibold mb-1.5" style={{ color: "var(--color-ink)" }}>
            Tips Perawatan:
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
            {careTip}
          </p>
        </div>
      </div>
    </section>
  );
}