"use client";

/*
  ProofImageCell.jsx
  Menampilkan bukti bayar:
  - Pending + ada image → preview image
  - Sudah verified → badge "Terverifikasi"
*/

export default function ProofImageCell({ proofImage, proofVerified }) {
  if (proofVerified) {
    return (
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span className="text-xs font-medium" style={{ color: "#059669" }}>
          Terverifikasi
        </span>
      </div>
    );
  }

  if (proofImage) {
    return (
      <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-soft)" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </button>
    );
  }

  return (
    <span className="text-xs" style={{ color: "var(--color-secondary)" }}>
      -
    </span>
  );
}
