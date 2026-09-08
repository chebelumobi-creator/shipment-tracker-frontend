import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Plane, ArrowLeft, Printer, User, MapPin, Phone, Mail,
  CreditCard, CheckCircle2,
} from "lucide-react";
import ShipmentMap from "./components/ShipmentMap";
import Timeline from "./components/Timeline";
import StatusBadge from "./components/StatusBadge";
import { fetchShipment } from "./api";

const POLL_INTERVAL_MS = 15000;

const STAGES = [
  { key: "pending", label: "Booked" },
  { key: "in_transit", label: "In Transit" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

function StageProgress({ status }) {
  const activeIndex = STAGES.findIndex((s) => s.key === status);
  const index = activeIndex === -1 ? 1 : activeIndex;

  return (
    <div className="flex items-center">
      {STAGES.map((stage, i) => (
        <div key={stage.key} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-semibold ${
                i <= index
                  ? "gradient-primary border-transparent text-white"
                  : "border-white/15 bg-white/5 text-white/40"
              }`}
            >
              {i < index ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
            </div>
            <span
              className={`mt-2 whitespace-nowrap text-xs font-medium ${
                i <= index ? "text-white" : "text-white/40"
              }`}
            >
              {stage.label}
            </span>
          </div>
          {i < STAGES.length - 1 && (
            <div
              className={`mx-2 h-0.5 flex-1 ${i < index ? "gradient-primary" : "bg-white/15"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* Section wrapper: dark glass card with a solid colored header bar */
function SectionCard({ title, children, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm ${className}`}>
      <div className="gradient-primary px-6 py-3">
        <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
          {title}
        </h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* Label-left / value-right row, matching the reference table style */
function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-0">
      <div className="flex items-center gap-2 text-white/50">
        {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <span className="text-right text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

export default function TrackResults() {
  const { trackingNumber } = useParams();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pollRef = useRef(null);

  async function runSearch(isPoll = false) {
    if (!isPoll) setLoading(true);
    setError(null);
    
    // Start timer for minimum loading time
    const startTime = Date.now();
    
    try {
      const data = await fetchShipment(trackingNumber);
      setShipment(data);
    } catch (err) {
      if (err.message === "NOT_FOUND") {
        setError("No shipment found with that tracking number. Please check and try again.");
      } else {
        setError("Something went wrong. Please try again shortly.");
      }
      if (!isPoll) setShipment(null);
    } finally {
      if (!isPoll) {
        // Wait at least 6 seconds before hiding spinner
        const elapsed = Date.now() - startTime;
        const minWait = 6000; // 6 seconds
        if (elapsed < minWait) {
          await new Promise(resolve => setTimeout(resolve, minWait - elapsed));
        }
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    runSearch();
    pollRef.current = setInterval(() => runSearch(true), POLL_INTERVAL_MS);
    return () => clearInterval(pollRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackingNumber]);

  const latest = shipment?.events?.[shipment.events.length - 1];

  return (
    <div className="min-h-screen bg-navy">
      {/* Simple top bar — hidden when printing */}
      <header className="gradient-primary print:hidden">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <Plane className="h-5 w-5 -rotate-45 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-white">
              Swift<span className="text-cyan-accent">Delivery Cargo</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-10 md:px-6">
        {/* Loading Spinner */}
        {loading && (
          <div className="py-20 text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
            <p className="mt-4 text-white/60">Loading shipment…</p>
          </div>
        )}

        {/* Error Message */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-8 text-center">
            <p className="font-semibold text-red-300">{error}</p>
            <Link
              to="/"
              className="mt-4 inline-block rounded-md bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600"
            >
              Try another number
            </Link>
          </div>
        )}

        {/* Shipment Details */}
        {!loading && shipment && !error && (
          <div className="space-y-6">
            {/* Header card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-white/50">Tracking Number</p>
                  <p className="font-mono text-2xl font-bold text-white">
                    {shipment.tracking_number}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge
                    status={shipment.current_status}
                    displayLabel={shipment.current_status_display}
                  />
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 print:hidden"
                  >
                    <Printer className="h-4 w-4" /> Print
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <StageProgress status={shipment.current_status} />
              </div>
            </div>

            {/* Sender / Receiver */}
            <div className="grid gap-6 md:grid-cols-2">
              <SectionCard title="Shipper Information">
                <InfoRow icon={User} label="Name" value={shipment.sender_name} />
                <InfoRow icon={Phone} label="Phone" value={shipment.sender_phone} />
                <InfoRow icon={Mail} label="Email" value={shipment.sender_email} />
                <InfoRow icon={MapPin} label="Address" value={shipment.sender_address} />
                <InfoRow icon={MapPin} label="Country" value={shipment.origin_country} />
              </SectionCard>

              <SectionCard title="Receiver Information">
                <InfoRow icon={User} label="Name" value={shipment.receiver_name} />
                <InfoRow icon={Phone} label="Phone" value={shipment.receiver_phone} />
                <InfoRow icon={Mail} label="Email" value={shipment.receiver_email} />
                <InfoRow icon={MapPin} label="Address" value={shipment.receiver_address} />
                <InfoRow icon={MapPin} label="Country" value={shipment.destination_country} />
              </SectionCard>
            </div>

            {/* Shipment details */}
            <SectionCard title="Shipment Information">
              <InfoRow label="Item Type" value={shipment.item_type?.name} />
              <InfoRow label="Item Count" value={shipment.item_count} />
              <InfoRow
                label="Weight"
                value={shipment.weight_kg ? `${shipment.weight_kg} kg` : null}
              />
              <InfoRow label="Current Location" value={latest ? latest.location_name : null} />
              {shipment.description && (
                <InfoRow label="Description" value={shipment.description} />
              )}
              {/* Customs Fees */}
              <InfoRow label="Customs Fee" value={shipment.customs_fee ? `$${shipment.customs_fee}` : null} />
              <InfoRow label="Customs Tax" value={shipment.customs_tax ? `$${shipment.customs_tax}` : null} />
              <InfoRow label="Total Customs" value={shipment.total_customs ? `$${shipment.total_customs}` : null} />
            </SectionCard>

            {/* Map */}
            {shipment.events.length > 0 && (
              <SectionCard title="Route" className="print:hidden">
                <div className="overflow-hidden rounded-xl">
                  <ShipmentMap events={shipment.events} />
                </div>
              </SectionCard>
            )}

            {/* Timeline */}
            <SectionCard title="Journey History">
              <Timeline events={shipment.events} />
            </SectionCard>

            {/* Decorative payment section — informational only, no real payment processed */}
            <SectionCard title="Accepted Payment Methods" className="print:hidden">
              <p className="mb-4 text-sm text-white/60">
                We accept the following payment methods for shipping and customs fees where applicable.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Visa", "Mastercard", "Verve", "PayPal"].map((method) => (
                  <span
                    key={method}
                    className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white"
                  >
                    <CreditCard className="h-4 w-4 text-cyan-accent" />
                    {method}
                  </span>
                ))}
              </div>
            </SectionCard>
          </div>
        )}
      </main>
    </div>
  );
}