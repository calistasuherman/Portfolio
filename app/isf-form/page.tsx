"use client";

import { useState, useRef } from "react";

const ACCENT = "#a42828";

interface FormData {
  importer: string;
  masterBOL: string;
  houseBOL: string;
  scacCode: string;
  containerNum: string;
  seller: string;
  buyer: string;
  shipTo: string;
  stuffingLocation: string;
  consolidator: string;
  manufacturer: string;
  itemDescription: string;
  packingList: File | null;
}

const INITIAL: FormData = {
  importer: "",
  masterBOL: "",
  houseBOL: "",
  scacCode: "",
  containerNum: "",
  seller: "",
  buyer: "",
  shipTo: "",
  stuffingLocation: "",
  consolidator: "",
  manufacturer: "",
  itemDescription: "",
  packingList: null,
};

const FIELD_LABELS: { key: keyof Omit<FormData, "packingList">; label: string; multiline?: boolean }[] = [
  { key: "importer", label: "Importer (Name & Address)", multiline: true },
  { key: "masterBOL", label: "Master BOL #" },
  { key: "houseBOL", label: "House BOL #" },
  { key: "scacCode", label: "SCAC Code" },
  { key: "containerNum", label: "Container #" },
  { key: "seller", label: "Seller (Name & Address)", multiline: true },
  { key: "buyer", label: "Buyer (Name & Address)", multiline: true },
  { key: "shipTo", label: "Ship To (Name & Address)", multiline: true },
  { key: "stuffingLocation", label: "Container Stuffing Location (Name & Address)", multiline: true },
  { key: "consolidator", label: "Consolidator (Name & Address)", multiline: true },
  { key: "manufacturer", label: "Manufacturer (Name & Address)", multiline: true },
  { key: "itemDescription", label: "Item Description", multiline: true },
];

export default function ISFForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [packingFileName, setPackingFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleChange(key: keyof Omit<FormData, "packingList">, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setForm((f) => ({ ...f, packingList: file }));
    setPackingFileName(file?.name ?? "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleSendEmail() {
    const body = buildEmailBody();
    const mailto = `mailto:${encodeURIComponent(emailTo)}?subject=${encodeURIComponent("Importer Security Filing (10+2 Form)")}&body=${encodeURIComponent(emailMessage + "\n\n" + body)}`;
    window.location.href = mailto;
  }

  function buildEmailBody() {
    return FIELD_LABELS.map(({ key, label }) => `${label}:\n${form[key] || "(not provided)"}`).join("\n\n");
  }

  async function handleGeneratePDF() {
    const jspdf = await import("jspdf");
    const jsPDF = jspdf.jsPDF ?? jspdf.default;
    const doc = new jsPDF({ unit: "pt", format: "letter" });

    const margin = 50;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = margin;

    // Header bar
    doc.setFillColor(164, 40, 40);
    doc.rect(0, 0, pageWidth, 70, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Importer Security Filing Form (10+2 Form)", pageWidth / 2, 30, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 52, { align: "center" });

    y = 100;
    doc.setTextColor(30, 30, 30);

    FIELD_LABELS.forEach(({ key, label }) => {
      const value = form[key] || "(not provided)";
      const lines = doc.splitTextToSize(value, pageWidth - margin * 2 - 10);
      const blockHeight = 18 + lines.length * 14 + 10;

      if (y + blockHeight > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(164, 40, 40);
      doc.text(label.toUpperCase(), margin, y);
      y += 4;

      doc.setDrawColor(220, 220, 220);
      doc.line(margin, y, pageWidth - margin, y);
      y += 14;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(30, 30, 30);
      doc.text(lines, margin, y);
      y += lines.length * 14 + 18;
    });

    doc.save("ISF_Form_10plus2.pdf");
  }

  function handleReset() {
    setForm(INITIAL);
    setSubmitted(false);
    setEmailTo("");
    setEmailMessage("");
    setPackingFileName("");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: ACCENT, padding: "18px 0", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}>
        <span style={{ color: "#fff", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, opacity: 0.85 }}>
          U.S. Customs &amp; Border Protection
        </span>
        <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: "6px 0 0", letterSpacing: 0.5 }}>
          Importer Security Filing Form
        </h1>
        <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 13, margin: "4px 0 0" }}>10+2 Filing Requirement</p>
      </div>

      <div style={{ maxWidth: 760, margin: "36px auto", padding: "0 20px 60px" }}>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div style={{ background: "#fff", borderRadius: 10, boxShadow: "0 2px 16px rgba(0,0,0,0.09)", overflow: "hidden" }}>
              {/* Section label */}
              <div style={{ background: "#fdf2f2", borderBottom: `3px solid ${ACCENT}`, padding: "14px 28px" }}>
                <p style={{ margin: 0, fontSize: 13, color: "#888", fontWeight: 500 }}>
                  Complete all applicable fields. Fields marked with an asterisk (*) are required by CBP regulation.
                </p>
              </div>

              <div style={{ padding: "28px 28px 10px" }}>
                {FIELD_LABELS.map(({ key, label, multiline }) => (
                  <div key={key} style={{ marginBottom: 22 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>
                      {label}
                    </label>
                    {multiline ? (
                      <textarea
                        rows={3}
                        value={form[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                        placeholder={`Enter ${label.toLowerCase()}...`}
                        style={inputStyle(true)}
                      />
                    ) : (
                      <input
                        type="text"
                        value={form[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                        placeholder={`Enter ${label.toLowerCase()}...`}
                        style={inputStyle(false)}
                      />
                    )}
                  </div>
                ))}

                {/* Packing list upload */}
                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>
                    Packing List (optional upload)
                  </label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    style={{
                      border: `2px dashed ${ACCENT}44`,
                      borderRadius: 8,
                      padding: "18px 20px",
                      cursor: "pointer",
                      background: packingFileName ? "#fdf2f2" : "#fafafa",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      transition: "background 0.2s",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span style={{ fontSize: 13, color: packingFileName ? ACCENT : "#888", fontWeight: packingFileName ? 600 : 400 }}>
                      {packingFileName || "Click to upload packing list (PDF, Excel, or image)"}
                    </span>
                  </div>
                  <input ref={fileRef} type="file" accept=".pdf,.xls,.xlsx,.png,.jpg,.jpeg" onChange={handleFile} style={{ display: "none" }} />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "15px",
                    background: ACCENT,
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: 0.5,
                    marginBottom: 24,
                    boxShadow: "0 4px 12px rgba(164,40,40,0.3)",
                  }}
                >
                  Submit ISF Form
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            {/* Confirmation header */}
            <div style={{ background: "#fff", borderRadius: 10, boxShadow: "0 2px 16px rgba(0,0,0,0.09)", overflow: "hidden", marginBottom: 24 }}>
              <div style={{ background: ACCENT, padding: "20px 28px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <h2 style={{ color: "#fff", margin: 0, fontSize: 18, fontWeight: 700 }}>Form Submitted Successfully</h2>
                  <p style={{ color: "rgba(255,255,255,0.8)", margin: "2px 0 0", fontSize: 13 }}>Choose how you'd like to proceed below</p>
                </div>
              </div>

              {/* Summary */}
              <div style={{ padding: "20px 28px" }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 16 }}>Filing Summary</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
                  {FIELD_LABELS.slice(0, 5).map(({ key, label }) => (
                    <div key={key}>
                      <p style={{ margin: 0, fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>{label}</p>
                      <p style={{ margin: "3px 0 0", fontSize: 13, color: "#222", fontWeight: 500 }}>{form[key] || "—"}</p>
                    </div>
                  ))}
                </div>
                {packingFileName && (
                  <p style={{ margin: "16px 0 0", fontSize: 12, color: "#666" }}>
                    <strong style={{ color: ACCENT }}>Packing list attached:</strong> {packingFileName}
                  </p>
                )}
              </div>
            </div>

            {/* Email section */}
            <div style={{ background: "#fff", borderRadius: 10, boxShadow: "0 2px 16px rgba(0,0,0,0.09)", overflow: "hidden", marginBottom: 20 }}>
              <div style={{ borderBottom: `3px solid ${ACCENT}`, padding: "14px 28px", background: "#fdf2f2" }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#222" }}>Send via Email</h3>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: "#888" }}>Send this filing to your customs broker, freight forwarder, or CBP representative</p>
              </div>
              <div style={{ padding: "20px 28px" }}>
                <label style={labelStyle}>Recipient Email Address(es)</label>
                <input
                  type="text"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="broker@example.com, forwarder@example.com"
                  style={{ ...inputStyle(false), marginBottom: 16 }}
                />
                <label style={labelStyle}>Custom Message</label>
                <textarea
                  rows={4}
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  placeholder="Please find the attached Importer Security Filing for shipment..."
                  style={{ ...inputStyle(true), marginBottom: 20 }}
                />
                <button
                  onClick={handleSendEmail}
                  disabled={!emailTo.trim()}
                  style={{
                    padding: "12px 28px",
                    background: emailTo.trim() ? ACCENT : "#ccc",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: emailTo.trim() ? "pointer" : "not-allowed",
                    boxShadow: emailTo.trim() ? "0 4px 12px rgba(164,40,40,0.25)" : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Open in Email Client
                </button>
              </div>
            </div>

            {/* PDF & Reset */}
            <div style={{ display: "flex", gap: 14 }}>
              <button
                onClick={handleGeneratePDF}
                style={{
                  flex: 1,
                  padding: "14px",
                  background: "#fff",
                  color: ACCENT,
                  border: `2px solid ${ACCENT}`,
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
                Download PDF Copy
              </button>
              <button
                onClick={handleReset}
                style={{
                  flex: 1,
                  padding: "14px",
                  background: "#f5f5f5",
                  color: "#555",
                  border: "2px solid #ddd",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Start New Filing
              </button>
            </div>
          </div>
        )}

        <p style={{ textAlign: "center", fontSize: 11, color: "#aaa", marginTop: 32 }}>
          This form is for filing preparation purposes. Official ISF submissions must be made through an Automated Broker Interface (ABI) or licensed customs broker.
        </p>
      </div>
    </div>
  );
}

function inputStyle(multiline: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "10px 14px",
    border: "1.5px solid #e0e0e0",
    borderRadius: 7,
    fontSize: 14,
    color: "#222",
    background: "#fafafa",
    outline: "none",
    resize: multiline ? "vertical" : undefined,
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 700,
  color: ACCENT,
  letterSpacing: 0.5,
  textTransform: "uppercase",
  marginBottom: 6,
};
