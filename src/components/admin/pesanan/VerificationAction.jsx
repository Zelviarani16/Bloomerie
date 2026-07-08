"use client";

/*
  VerificationAction.jsx
  Tombol aksi verifikasi berdasarkan status:
  - Pending → Approve + Reject
  - Diproses → "Kirim Paket"
  - Dikirim → "Lacak Resi"
*/

export default function VerificationAction({ status }) {
  if (status === "pending") {
    return (
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded hover:bg-green-50 transition-colors"
          title="Terima"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
        <button
          className="p-2 rounded hover:bg-red-50 transition-colors"
          title="Tolak"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    );
  }

  if (status === "diproses") {
    return (
      <button
        className="px-3 py-1.5 text-xs font-semibold rounded"
        style={{ background: "var(--color-primary)", color: "white" }}
      >
        Kirim Paket
      </button>
    );
  }

  if (status === "dikirim") {
    return (
      <button
        className="px-3 py-1.5 text-xs font-semibold rounded border"
        style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
      >
        Lacak Resi
      </button>
    );
  }

  return null;
}
