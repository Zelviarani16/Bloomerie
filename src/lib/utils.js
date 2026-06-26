/**
 * Format number to Indonesian Rupiah format
 * @param {number} amount
 * @returns {string} e.g. "Rp 450.000"
 */
export function formatRupiah(amount) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

/**
 * Format date to Indonesian locale
 * @param {string|Date} date
 * @returns {string} e.g. "12 Okt 2023"
 */
export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format date with full month name
 * @param {string|Date} date
 * @returns {string} e.g. "12 Oktober 2023"
 */
export function formatDateLong(date) {
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Merge class names (simple cn utility)
 * @param  {...string} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Truncate text to a specified length
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

/**
 * Generate initials from a full name
 * @param {string} name
 * @returns {string} e.g. "SM" from "Siti Maryam"
 */
export function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}
