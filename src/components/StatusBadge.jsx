const STATUS_STYLES = {
  pending: { bg: "bg-gray-100", text: "text-gray-700", label: "Pending Pickup" },
  in_transit: { bg: "bg-blue-100", text: "text-blue-700", label: "In Transit" },
  out_for_delivery: { bg: "bg-amber-100", text: "text-amber-700", label: "Out for Delivery" },
  delivered: { bg: "bg-green-100", text: "text-green-700", label: "Delivered" },
  delayed: { bg: "bg-red-100", text: "text-red-700", label: "Delayed" },
  returned: { bg: "bg-red-100", text: "text-red-700", label: "Returned" },
  cancelled: { bg: "bg-gray-100", text: "text-gray-700", label: "Cancelled" },
};

export default function StatusBadge({ status, displayLabel }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.pending;

  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${style.bg} ${style.text}`}
    >
      {displayLabel || style.label}
    </span>
  );
}