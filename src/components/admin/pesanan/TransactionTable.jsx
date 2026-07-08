"use client";

/*
  TransactionTable.jsx
  Sama style dengan InventoryTable - tabel dengan border, hover effect
*/

import { motion } from "framer-motion";
import { transactions, STATUS_BADGE } from "@/data/admin-transactions";
import ProofImageCell from "./ProofImageCell";
import VerificationAction from "./VerificationAction";

export default function TransactionTable({ data }) {
  return (
    <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "var(--color-neutral-dark)" }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--color-neutral-dark)", background: "var(--color-neutral)" }}>
              {["No. Order", "Tanggal", "Pelanggan", "Status", "Bukti Bayar", "Aksi Verifikasi", ""].map((head) => (
                <th
                  key={head}
                  className="text-left text-xs font-semibold tracking-wide uppercase py-3.5 px-4 whitespace-nowrap"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((transaction, index) => (
              <motion.tr
                key={transaction.orderNumber}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className="border-b hover:bg-gray-50 transition-colors"
                style={{ borderColor: "var(--color-neutral-dark)" }}
              >
                <td className="py-4 px-4">
                  <span className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                    #{transaction.orderNumber}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm whitespace-nowrap" style={{ color: "var(--color-ink)" }}>
                  {transaction.date}
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm font-medium whitespace-nowrap" style={{ color: "var(--color-ink)" }}>
                      {transaction.customerName}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-secondary)" }}>
                      {transaction.customerEmail}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className="inline-flex px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap"
                    style={{
                      background: STATUS_BADGE[transaction.status]?.bg || "#F3F4F6",
                      color: STATUS_BADGE[transaction.status]?.color || "#4B5563",
                    }}
                  >
                    {STATUS_BADGE[transaction.status]?.label || transaction.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <ProofImageCell
                    proofImage={transaction.proofImage}
                    proofVerified={transaction.proofVerified}
                  />
                </td>
                <td className="py-4 px-4">
                  <VerificationAction status={transaction.status} />
                </td>
                <td className="py-4 px-4">
                  <button aria-label="Opsi lain" style={{ color: "var(--color-secondary)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="19" r="1.5" />
                    </svg>
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
            Tidak ada transaksi yang ditemukan.
          </p>
        </div>
      )}
    </div>
  );
}
