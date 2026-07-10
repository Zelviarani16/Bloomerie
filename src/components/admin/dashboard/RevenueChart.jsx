"use client";

/*
  RevenueChart.jsx
  bar chart 7 hari, tiap bar punya 2 layer warna
  (pucat = total/target, gelap = value aktual), bar hari "Sab" di
  contoh di-highlight beda warna (lebih gelap dari yang lain).

  Dibuat manual dengan div+CSS (bukan library chart) karena datanya
  simpel
*/

import { motion } from "framer-motion";

export default function RevenueChart({ data }) {
  const maxValue = Math.max(...data.map((d) => d.total));

  return (
    <div className="bg-white rounded-lg p-6 border" style={{ borderColor: "var(--color-neutral-dark)" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold" style={{ color: "var(--color-ink)" }}>
          Tren Pendapatan
        </h2>
        <select
          className="text-sm px-3 py-1.5 rounded border outline-none"
          style={{ borderColor: "var(--color-neutral-dark)", color: "var(--color-ink-soft)" }}
          defaultValue="7"
        >
          <option value="7">7 Hari Terakhir</option>
          <option value="30">30 Hari Terakhir</option>
        </select>
      </div>

      {/* Chart area */}
      <div className="flex items-end justify-between gap-3 h-52 mb-3">
        {data.map((item, index) => {
          const totalHeightPct = (item.total / maxValue) * 100;
          const valueHeightPct = (item.value / maxValue) * 100;

          return (
            <div key={item.day} className="flex-1 flex flex-col items-center justify-end h-full">
              {/* Bar container — relative supaya 2 layer bisa numpuk */}
              <div className="relative w-full max-w-[40px] h-full flex items-end justify-center">
                {/* Layer pucat (total/target) — background statis */}
                <div
                  className="absolute bottom-0 w-full rounded-t"
                  style={{ height: `${totalHeightPct}%`, background: "var(--color-neutral-dark)" }}
                />
                {/* Layer gelap (value aktual) — animasi tumbuh dari bawah */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${valueHeightPct}%` }}
                  transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 w-full rounded-t"
                  style={{
                    background: item.highlight ? "var(--color-primary)" : "#C68A9C",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* X-axis labels */}
      <div className="flex items-center justify-between gap-3">
        {data.map((item) => (
          <div key={item.day} className="flex-1 text-center">
            <span
              className="text-xs"
              style={{
                color: item.highlight ? "var(--color-ink)" : "var(--color-secondary)",
                fontWeight: item.highlight ? 700 : 400,
              }}
            >
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
