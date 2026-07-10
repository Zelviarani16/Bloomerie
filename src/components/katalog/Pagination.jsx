"use client";

/*
  Pagination.jsx
  tombol bulat dengan angka, yang aktif solid
  maroon, tombol prev/next (< >) di kiri-kanan.
*/

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Prev */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-full flex items-center justify-center border disabled:opacity-40"
        style={{ borderColor: "var(--color-neutral-dark)" }}
        aria-label="Halaman sebelumnya"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Page numbers */}
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className="w-9 h-9 rounded-full text-sm font-medium flex items-center justify-center transition-colors"
            style={{
              background: isActive ? "var(--color-primary)" : "transparent",
              color: isActive ? "white" : "var(--color-ink)",
              border: isActive ? "none" : "1px solid var(--color-neutral-dark)",
            }}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-full flex items-center justify-center border disabled:opacity-40"
        style={{ borderColor: "var(--color-neutral-dark)" }}
        aria-label="Halaman selanjutnya"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}