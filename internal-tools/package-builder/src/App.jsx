import { useState, useRef, useEffect, useCallback } from "react";

const STORAGE_KEY = "sbmc-tier-builder-v1";

const SERVICES = [
  // Prenatal
  { id: "prenatal-bf-class", name: "Prenatal Breastfeeding Class", category: "Prenatal", desc: "Group class covering latch, positioning, what to expect", duration: "90 min", suggestedPrice: 75 },
  { id: "private-prenatal-consult", name: "Private Prenatal Consultation", category: "Prenatal", desc: "1-on-1 session covering breastfeeding prep, anatomy, birth plan impact", duration: "60 min", suggestedPrice: 150 },
  { id: "childbirth-ed-series", name: "Childbirth Education Series", category: "Prenatal", desc: "Multi-session evidence-based childbirth prep (LCCE curriculum)", duration: "6 hrs total", suggestedPrice: 350 },
  { id: "private-childbirth-ed", name: "Private Childbirth Education", category: "Prenatal", desc: "Customized 1-on-1 childbirth prep for couples", duration: "3 hrs", suggestedPrice: 275 },
  { id: "birth-plan-consult", name: "Birth Plan Consultation", category: "Prenatal", desc: "Review preferences, hospital protocols, advocacy strategies", duration: "60 min", suggestedPrice: 125 },
  { id: "prenatal-pump-setup", name: "Prenatal Pump Setup & Fitting", category: "Prenatal", desc: "Insurance pump selection, flange sizing, parts overview", duration: "45 min", suggestedPrice: 85 },
  { id: "nursery-prep", name: "Nursery & Hospital Bag Prep", category: "Prenatal", desc: "What you actually need — evidence-based essentials review", duration: "60 min", suggestedPrice: 100 },

  // Lactation & Feeding
  { id: "initial-lc-visit", name: "In-Home Lactation Visit (Initial)", category: "Lactation", desc: "Comprehensive assessment: history, latch, weighted feed, care plan", duration: "90 min", suggestedPrice: 250 },
  { id: "followup-lc-visit", name: "In-Home Lactation Follow-Up", category: "Lactation", desc: "Progress check, weighted feed, adjusted care plan", duration: "60 min", suggestedPrice: 175 },
  { id: "virtual-lc-consult", name: "Virtual Lactation Consultation", category: "Lactation", desc: "Video assessment for positioning, supply, pumping questions", duration: "45 min", suggestedPrice: 125 },
  { id: "weighted-feed", name: "Weighted Feed Assessment", category: "Lactation", desc: "Pre/post feed weights on clinical scale to measure transfer", duration: "30 min", suggestedPrice: 75 },
  { id: "tongue-tie-assess", name: "Oral Function Assessment", category: "Lactation", desc: "Tongue/lip tie screening with referral coordination if needed", duration: "45 min", suggestedPrice: 150 },
  { id: "supply-evaluation", name: "Milk Supply Evaluation", category: "Lactation", desc: "Comprehensive assessment of low or oversupply with action plan", duration: "60 min", suggestedPrice: 175 },
  { id: "engorgement-mastitis", name: "Engorgement / Mastitis Support", category: "Lactation", desc: "Urgent assessment, therapeutic techniques, when to seek MD", duration: "60 min", suggestedPrice: 175 },
  { id: "pump-fitting", name: "Breast Pump Fitting & Optimization", category: "Lactation", desc: "Flange sizing, suction settings, pumping schedule setup", duration: "45 min", suggestedPrice: 100 },
  { id: "back-to-work", name: "Back-to-Work Pumping Plan", category: "Lactation", desc: "Custom pumping schedule, storage, daycare transition, rights", duration: "60 min", suggestedPrice: 150 },
  { id: "combo-feeding", name: "Combo Feeding Guidance", category: "Lactation", desc: "Balancing breast and bottle — pacing, supply protection", duration: "45 min", suggestedPrice: 125 },
  { id: "weaning-support", name: "Weaning Support Session", category: "Lactation", desc: "Gradual weaning plan, emotional support, engorgement prevention", duration: "45 min", suggestedPrice: 125 },
  { id: "starting-solids", name: "Starting Solids Guidance", category: "Lactation", desc: "Readiness signs, first foods, baby-led weaning vs. purees", duration: "45 min", suggestedPrice: 100 },

  // Newborn Care
  { id: "newborn-care-class", name: "Newborn Care Basics Class", category: "Newborn", desc: "Bathing, diapering, cord care, soothing, wake windows", duration: "2 hrs", suggestedPrice: 150 },
  { id: "safe-sleep-setup", name: "Safe Sleep Setup & Education", category: "Newborn", desc: "AAP guidelines, nursery walkthrough, safe sleep environment", duration: "45 min", suggestedPrice: 85 },
  { id: "soothing-techniques", name: "Infant Soothing Techniques", category: "Newborn", desc: "5 S's, colic strategies, reading baby cues", duration: "60 min", suggestedPrice: 100 },
  { id: "routine-building", name: "Newborn Routine Building", category: "Newborn", desc: "Age-appropriate eat/wake/sleep schedule, flexibility strategies", duration: "60 min", suggestedPrice: 125 },
  { id: "infant-cpr", name: "Infant CPR & Safety Class", category: "Newborn", desc: "Hands-on CPR, choking response, first aid basics", duration: "2 hrs", suggestedPrice: 125 },
  { id: "sleep-shaping", name: "Sleep Shaping Consultation", category: "Newborn", desc: "Healthy sleep foundations for 0-4 months, no cry-it-out", duration: "60 min", suggestedPrice: 150 },

  // Postpartum Support
  { id: "pp-doula-day", name: "Postpartum Doula — Day Shift", category: "Postpartum", desc: "In-home support: feeding help, light meals, rest, baby care", duration: "4 hrs", suggestedPrice: 200 },
  { id: "pp-doula-overnight", name: "Postpartum Doula — Overnight", category: "Postpartum", desc: "Overnight newborn care so parents can sleep and recover", duration: "8 hrs", suggestedPrice: 350 },
  { id: "pp-wellness-checkin", name: "Postpartum Wellness Check-In", category: "Postpartum", desc: "Virtual mood screening, recovery check, resource connection", duration: "30 min", suggestedPrice: 75 },
  { id: "pp-mood-screening", name: "Postpartum Mood Screening", category: "Postpartum", desc: "Edinburgh scale, anxiety screening, warm referral if needed", duration: "30 min", suggestedPrice: 0 },
  { id: "partner-education", name: "Partner & Family Education", category: "Postpartum", desc: "How to support the birthing parent — feeding, recovery, mental health", duration: "60 min", suggestedPrice: 125 },
  { id: "pp-recovery-guide", name: "Postpartum Recovery Guidance", category: "Postpartum", desc: "Physical recovery timeline, pelvic floor, nutrition basics", duration: "45 min", suggestedPrice: 100 },

  // Ongoing / Digital Support
  { id: "async-messaging-1wk", name: "Async Messaging Support (1 week)", category: "Ongoing", desc: "Text/app access to Nellie for quick questions between visits", duration: "1 week", suggestedPrice: 50 },
  { id: "async-messaging-4wk", name: "Async Messaging Support (4 weeks)", category: "Ongoing", desc: "Extended text/app support for ongoing questions", duration: "4 weeks", suggestedPrice: 150 },
  { id: "async-messaging-ongoing", name: "Async Messaging (Ongoing Monthly)", category: "Ongoing", desc: "Continuous text/app access — the membership backbone", duration: "Monthly", suggestedPrice: 75 },
  { id: "support-group", name: "Weekly Support Group Access", category: "Ongoing", desc: "Mom's group — feeding, sleep, community (virtual or in-person)", duration: "Ongoing", suggestedPrice: 0 },
  { id: "resource-library", name: "Digital Resource Library Access", category: "Ongoing", desc: "Handouts, videos, checklists — curated evidence-based content", duration: "Ongoing", suggestedPrice: 0 },
  { id: "care-plan-doc", name: "Provider Letter & Care Plan", category: "Ongoing", desc: "Written assessment and plan sent to pediatrician/OB", duration: "Per visit", suggestedPrice: 0 },
];

const CATEGORIES = ["Prenatal", "Lactation", "Newborn", "Postpartum", "Ongoing"];

const CAT_COLORS = {
  Prenatal: { bg: "#FFF4ED", border: "#E8A87C", text: "#9B5B3A", dot: "#E8A87C" },
  Lactation: { bg: "#FDF2F8", border: "#D4749A", text: "#8B3A5E", dot: "#D4749A" },
  Newborn: { bg: "#EFF6FF", border: "#6B9BD2", text: "#2D5A8E", dot: "#6B9BD2" },
  Postpartum: { bg: "#F0FDF4", border: "#6BBF8A", text: "#2D6B4A", dot: "#6BBF8A" },
  Ongoing: { bg: "#F5F3FF", border: "#9B8EC4", text: "#5B4A8A", dot: "#9B8EC4" },
};

const TIER_THEMES = {
  tier1: { name: "Essentials", accent: "#C4956A", bg: "#FFFBF7", headerBg: "#FAF3EC", border: "#E8D5C0" },
  tier2: { name: "Full Support", accent: "#C4956A", bg: "#2C2825", headerBg: "#1E1B18", border: "#4A4540", text: "#F5EDE4" },
  tier3: { name: "Complete Journey", accent: "#C4956A", bg: "#FFFBF7", headerBg: "#FAF3EC", border: "#E8D5C0" },
};

const formatPrice = (n) => n === 0 ? "Included" : `$${n.toLocaleString()}`;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return null;
}

function saveState(tiers, prices, tierNames) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ tiers, prices, tierNames, savedAt: new Date().toISOString() }));
  } catch (e) { /* ignore */ }
}

export default function App() {
  const saved = loadState();
  const [tiers, setTiers] = useState(saved?.tiers || { tier1: [], tier2: [], tier3: [] });
  const [prices, setPrices] = useState(saved?.prices || { tier1: 525, tier2: 1350, tier3: 2500 });
  const [tierNames, setTierNames] = useState(saved?.tierNames || { tier1: "Essentials", tier2: "Full Support", tier3: "Complete Journey" });
  const [dragItem, setDragItem] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [filterCat, setFilterCat] = useState("All");
  const [search, setSearch] = useState("");
  const [editingPrice, setEditingPrice] = useState(null);
  const [editingName, setEditingName] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [expandedService, setExpandedService] = useState(null);
  const [lastSaved, setLastSaved] = useState(saved?.savedAt || null);
  const [showToast, setShowToast] = useState(false);
  const [mobileAddTarget, setMobileAddTarget] = useState(null);
  const dragCounter = useRef({});

  // Auto-save whenever tiers, prices, or names change
  useEffect(() => {
    saveState(tiers, prices, tierNames);
    setLastSaved(new Date().toISOString());
  }, [tiers, prices, tierNames]);

  const allAssigned = new Set([...tiers.tier1, ...tiers.tier2, ...tiers.tier3]);

  const availableServices = SERVICES.filter(s => {
    if (allAssigned.has(s.id)) return false;
    if (filterCat !== "All" && s.category !== filterCat) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.desc.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleDragStart = (serviceId, source) => {
    setDragItem({ id: serviceId, source });
  };

  const handleDragOver = (e, tierId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e, tierId) => {
    e.preventDefault();
    dragCounter.current[tierId] = (dragCounter.current[tierId] || 0) + 1;
    setDragOver(tierId);
  };

  const handleDragLeave = (e, tierId) => {
    dragCounter.current[tierId] = (dragCounter.current[tierId] || 0) - 1;
    if (dragCounter.current[tierId] <= 0) {
      dragCounter.current[tierId] = 0;
      if (dragOver === tierId) setDragOver(null);
    }
  };

  const handleDrop = (e, targetTier) => {
    e.preventDefault();
    dragCounter.current = {};
    setDragOver(null);
    if (!dragItem) return;
    const { id, source } = dragItem;
    if (source === targetTier) { setDragItem(null); return; }
    setTiers(prev => {
      const next = { ...prev };
      if (source && source !== "pool") {
        next[source] = prev[source].filter(sid => sid !== id);
      }
      if (targetTier !== "pool") {
        if (!prev[targetTier].includes(id)) {
          next[targetTier] = [...prev[targetTier], id];
        }
      }
      return next;
    });
    setDragItem(null);
  };

  const addToTier = (serviceId, tierId) => {
    setTiers(prev => ({
      ...prev,
      [tierId]: prev[tierId].includes(serviceId) ? prev[tierId] : [...prev[tierId], serviceId]
    }));
    setMobileAddTarget(null);
  };

  const removeFromTier = (serviceId, tierId) => {
    setTiers(prev => ({
      ...prev,
      [tierId]: prev[tierId].filter(id => id !== serviceId)
    }));
  };

  const getService = (id) => SERVICES.find(s => s.id === id);

  const getTierValue = (tierId) => {
    return tiers[tierId].reduce((sum, sid) => {
      const s = getService(sid);
      return sum + (s?.suggestedPrice || 0);
    }, 0);
  };

  const countByCategory = (cat) => {
    if (cat === "All") return SERVICES.length - allAssigned.size;
    return SERVICES.filter(s => s.category === cat && !allAssigned.has(s.id)).length;
  };

  const handleReset = () => {
    if (window.confirm("Reset all tiers and prices to defaults? This can't be undone.")) {
      setTiers({ tier1: [], tier2: [], tier3: [] });
      setPrices({ tier1: 525, tier2: 1350, tier3: 2500 });
      setTierNames({ tier1: "Essentials", tier2: "Full Support", tier3: "Complete Journey" });
    }
  };

  const handleExport = () => {
    const lines = ["SOUTH BAY MILK CLUB — PACKAGE SUMMARY", "=".repeat(45), ""];
    ["tier1", "tier2", "tier3"].forEach((tid, ti) => {
      const ts = tiers[tid].map(getService).filter(Boolean);
      const val = getTierValue(tid);
      const sav = val > 0 ? Math.round((1 - prices[tid] / val) * 100) : 0;
      lines.push(`TIER ${ti + 1}: ${tierNames[tid].toUpperCase()}`);
      lines.push(`Price: $${prices[tid].toLocaleString()} (à la carte value: $${val.toLocaleString()}${sav > 0 ? `, ${sav}% savings` : ""})`);
      lines.push("-".repeat(40));
      if (ts.length === 0) { lines.push("  (no services assigned)"); }
      CATEGORIES.forEach(cat => {
        const catS = ts.filter(s => s.category === cat);
        if (catS.length > 0) {
          lines.push(`  ${cat}:`);
          catS.forEach(s => lines.push(`    • ${s.name} (${s.duration}) — ${formatPrice(s.suggestedPrice)}`));
        }
      });
      lines.push("");
    });
    const unassigned = SERVICES.filter(s => !allAssigned.has(s.id));
    if (unassigned.length > 0) {
      lines.push("UNASSIGNED SERVICES:");
      lines.push("-".repeat(40));
      unassigned.forEach(s => lines.push(`  • ${s.name} — ${formatPrice(s.suggestedPrice)}`));
    }

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sbmc-package-summary.txt";
    a.click();
    URL.revokeObjectURL(url);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const formatSavedTime = () => {
    if (!lastSaved) return "";
    const d = new Date(lastSaved);
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  return (
    <div style={{
      fontFamily: "'Instrument Serif', Georgia, 'Times New Roman', serif",
      background: "#FAF7F2",
      minHeight: "100vh",
      color: "#2C2825",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tier-drop-zone { transition: all 0.2s ease; }
        .tier-drop-zone.drag-over { transform: scale(1.01); }
        .service-chip {
          cursor: grab;
          transition: all 0.15s ease;
          user-select: none;
        }
        .service-chip:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .service-chip:active { cursor: grabbing; opacity: 0.7; }
        .remove-btn {
          opacity: 0;
          transition: opacity 0.15s ease;
          cursor: pointer;
          border: none;
          background: none;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .service-in-tier:hover .remove-btn { opacity: 1; }
        .cat-pill {
          cursor: pointer;
          transition: all 0.15s ease;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }
        .cat-pill:hover { transform: translateY(-1px); }
        .price-input {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 28px;
          color: #C4956A;
          background: transparent;
          border: none;
          border-bottom: 2px dashed #C4956A;
          width: 120px;
          outline: none;
          text-align: left;
        }
        .name-input {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 24px;
          background: transparent;
          border: none;
          border-bottom: 2px dashed currentColor;
          width: 100%;
          outline: none;
        }
        .summary-overlay {
          position: fixed;
          inset: 0;
          background: rgba(44,40,37,0.6);
          backdrop-filter: blur(4px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pool-drop {
          transition: all 0.2s ease;
          min-height: 40px;
        }
        .pool-drop.drag-over-pool {
          background: #FFF4ED !important;
          border-color: #C4956A !important;
        }
        .toast {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: #2C2825;
          color: #F5EDE4;
          padding: 12px 24px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          z-index: 200;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          animation: toastIn 0.3s ease;
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .mobile-add-menu {
          position: absolute;
          top: calc(100% + 4px);
          right: 0;
          z-index: 30;
          background: #fff;
          border: 1px solid #E8DFD3;
          border-radius: 8px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          overflow: hidden;
        }
        .mobile-add-btn {
          display: none;
          cursor: pointer;
          border: none;
          background: none;
          padding: 4px 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          color: #C4956A;
        }
        @media (max-width: 900px) {
          .service-chip { cursor: pointer !important; }
          .mobile-add-btn { display: flex !important; }
          .remove-btn { opacity: 1 !important; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D4CBBF; border-radius: 3px; }
      `}</style>

      {showToast && <div className="toast">Summary exported!</div>}

      {/* Header */}
      <div style={{
        padding: "28px 24px 20px",
        borderBottom: "1px solid #E8DFD3",
        background: "#FFFBF7",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C4956A", marginBottom: 6 }}>
                South Bay Milk Club
              </div>
              <h1 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 400, lineHeight: 1.1, color: "#2C2825" }}>
                Package Builder
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#8A7F72", marginTop: 8, maxWidth: 520, lineHeight: 1.5 }}>
                Drag services into each tier to design your packages. Click any service for details. Your work auto-saves.
                {lastSaved && (
                  <span style={{ marginLeft: 8, fontSize: 11, color: "#B0A89C" }}>
                    Saved {formatSavedTime()}
                  </span>
                )}
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={handleReset}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "10px 20px",
                  background: "transparent",
                  color: "#8A7F72",
                  border: "1px solid #E8DFD3",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Reset
              </button>
              <button
                onClick={handleExport}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "10px 20px",
                  background: "transparent",
                  color: "#8A7F72",
                  border: "1px solid #E8DFD3",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Export .txt
              </button>
              <button
                onClick={() => setShowSummary(true)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "10px 24px",
                  background: "#2C2825",
                  color: "#F5EDE4",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => e.target.style.background = "#C4956A"}
                onMouseLeave={e => e.target.style.background = "#2C2825"}
              >
                View Summary
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 24px 60px" }}>
        {/* Service Pool */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: 22, fontWeight: 400 }}>Available Services</h2>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#8A7F72",
              background: "#F0EBE3",
              padding: "4px 12px",
              borderRadius: 20,
            }}>
              {availableServices.length} of {SERVICES.length}
            </span>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
            {["All", ...CATEGORIES].map(cat => {
              const active = filterCat === cat;
              const count = countByCategory(cat);
              const color = cat === "All" ? { bg: "#F0EBE3", text: "#2C2825", dot: "#8A7F72" } : CAT_COLORS[cat];
              return (
                <button
                  key={cat}
                  className="cat-pill"
                  onClick={() => setFilterCat(cat)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: active ? 600 : 400,
                    background: active ? color.bg : "transparent",
                    color: active ? color.text : "#8A7F72",
                    border: `1px solid ${active ? color.border || color.dot : "#E8DFD3"}`,
                  }}
                >
                  <span style={{
                    display: "inline-block", width: 5, height: 5, borderRadius: "50%",
                    background: color.dot, marginRight: 5, opacity: active ? 1 : 0.4,
                  }} />
                  {cat} ({count})
                </button>
              );
            })}
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, padding: "6px 12px",
                border: "1px solid #E8DFD3", borderRadius: 8, background: "#fff",
                color: "#2C2825", width: 160, outline: "none", marginLeft: "auto",
              }}
            />
          </div>

          {/* Service chips pool */}
          <div
            className={`pool-drop ${dragOver === "pool" ? "drag-over-pool" : ""}`}
            onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
            onDragEnter={e => { e.preventDefault(); setDragOver("pool"); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={e => handleDrop(e, "pool")}
            style={{
              display: "flex", flexWrap: "wrap", gap: 8, padding: 14,
              background: "#fff", borderRadius: 12, border: "1px dashed #E8DFD3", minHeight: 56,
            }}
          >
            {availableServices.length === 0 && (
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#B0A89C", padding: 8 }}>
                {allAssigned.size === SERVICES.length
                  ? "All services assigned — drag them back here to reassign"
                  : "No services match your filter"}
              </div>
            )}
            {availableServices.map(s => {
              const color = CAT_COLORS[s.category];
              return (
                <div
                  key={s.id}
                  className="service-chip"
                  draggable
                  onDragStart={() => handleDragStart(s.id, "pool")}
                  style={{
                    padding: "7px 12px", borderRadius: 8, background: color.bg,
                    border: `1px solid ${color.border}40`, fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11, color: color.text, display: "flex", alignItems: "center",
                    gap: 6, position: "relative",
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: color.dot, flexShrink: 0 }} />
                  <span
                    style={{ fontWeight: 500, cursor: "pointer" }}
                    onClick={() => setExpandedService(expandedService === s.id ? null : s.id)}
                  >
                    {s.name}
                  </span>
                  {s.suggestedPrice > 0 && (
                    <span style={{ opacity: 0.6, fontSize: 10 }}>${s.suggestedPrice}</span>
                  )}
                  {/* Mobile: tap to add to tier */}
                  <button
                    className="mobile-add-btn"
                    onClick={(e) => { e.stopPropagation(); setMobileAddTarget(mobileAddTarget === s.id ? null : s.id); }}
                  >
                    +
                  </button>
                  {mobileAddTarget === s.id && (
                    <div className="mobile-add-menu" onClick={e => e.stopPropagation()}>
                      {["tier1", "tier2", "tier3"].map(tid => (
                        <button
                          key={tid}
                          onClick={() => addToTier(s.id, tid)}
                          style={{
                            display: "block", width: "100%", padding: "10px 16px",
                            border: "none", background: "none", fontFamily: "'DM Sans', sans-serif",
                            fontSize: 12, textAlign: "left", cursor: "pointer", borderBottom: "1px solid #F0EBE3",
                          }}
                        >
                          Add to {tierNames[tid]}
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Expanded detail tooltip */}
                  {expandedService === s.id && (
                    <div
                      onClick={e => e.stopPropagation()}
                      style={{
                        position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 20,
                        background: "#fff", border: `1px solid ${color.border}`, borderRadius: 10,
                        padding: 14, width: 280, boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, color: "#2C2825" }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: "#8A7F72", lineHeight: 1.5, marginBottom: 6 }}>{s.desc}</div>
                      <div style={{ display: "flex", gap: 12, fontSize: 11, color: "#B0A89C" }}>
                        <span>{s.duration}</span>
                        <span>{formatPrice(s.suggestedPrice)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tiers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
          {["tier1", "tier2", "tier3"].map((tierId, ti) => {
            const theme = TIER_THEMES[tierId];
            const isDark = tierId === "tier2";
            const tierServices = tiers[tierId].map(getService).filter(Boolean);
            const alaCarteValue = getTierValue(tierId);
            const savings = alaCarteValue > 0 ? Math.round((1 - prices[tierId] / alaCarteValue) * 100) : 0;
            const isOver = dragOver === tierId;

            return (
              <div
                key={tierId}
                className={`tier-drop-zone ${isOver ? "drag-over" : ""}`}
                onDragOver={e => handleDragOver(e, tierId)}
                onDragEnter={e => handleDragEnter(e, tierId)}
                onDragLeave={e => handleDragLeave(e, tierId)}
                onDrop={e => handleDrop(e, tierId)}
                style={{
                  background: theme.bg, borderRadius: 16,
                  border: `2px solid ${isOver ? theme.accent : theme.border}`,
                  overflow: "hidden", display: "flex", flexDirection: "column",
                  transition: "border-color 0.2s", position: "relative",
                }}
              >
                {ti === 1 && (
                  <div style={{
                    position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)",
                    background: theme.accent, color: "#fff", fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10, fontWeight: 600, letterSpacing: "0.06em",
                    padding: "4px 14px", borderRadius: "0 0 8px 8px", textTransform: "uppercase",
                  }}>
                    Most Popular
                  </div>
                )}

                {/* Tier Header */}
                <div style={{ padding: "26px 20px 16px", background: theme.headerBg }}>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: isDark ? "#A09888" : "#8A7F72", marginBottom: 6,
                  }}>
                    Tier {ti + 1}
                  </div>

                  {/* Editable tier name */}
                  {editingName === tierId ? (
                    <input
                      className="name-input"
                      autoFocus
                      value={tierNames[tierId]}
                      onChange={e => setTierNames(prev => ({ ...prev, [tierId]: e.target.value }))}
                      onBlur={() => setEditingName(null)}
                      onKeyDown={e => e.key === "Enter" && setEditingName(null)}
                      style={{ color: isDark ? "#F5EDE4" : "#2C2825", marginBottom: 10, width: "80%" }}
                    />
                  ) : (
                    <div
                      onClick={() => setEditingName(tierId)}
                      style={{
                        fontSize: 24, fontWeight: 400, color: isDark ? "#F5EDE4" : "#2C2825",
                        marginBottom: 10, cursor: "pointer",
                      }}
                      title="Click to rename"
                    >
                      {tierNames[tierId]}
                    </div>
                  )}

                  {/* Price */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
                    {editingPrice === tierId ? (
                      <div style={{ display: "flex", alignItems: "baseline" }}>
                        <span style={{ fontSize: 28, color: theme.accent }}>$</span>
                        <input
                          className="price-input"
                          autoFocus
                          type="number"
                          value={prices[tierId]}
                          onChange={e => setPrices(prev => ({ ...prev, [tierId]: Number(e.target.value) || 0 }))}
                          onBlur={() => setEditingPrice(null)}
                          onKeyDown={e => e.key === "Enter" && setEditingPrice(null)}
                          style={{ color: theme.accent }}
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => setEditingPrice(tierId)}
                        style={{ cursor: "pointer", display: "flex", alignItems: "baseline" }}
                        title="Click to edit price"
                      >
                        <span style={{ fontSize: 28, color: theme.accent }}>
                          ${prices[tierId].toLocaleString()}
                        </span>
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                          color: isDark ? "#6B6258" : "#B0A89C", marginLeft: 8,
                        }}>
                          ✎
                        </span>
                      </div>
                    )}
                  </div>

                  {alaCarteValue > 0 && (
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: isDark ? "#8A7F72" : "#8A7F72", lineHeight: 1.4 }}>
                      Value: <strong>${alaCarteValue.toLocaleString()}</strong>
                      {savings > 0 && (
                        <span style={{
                          marginLeft: 8, background: savings > 20 ? "#D4F5DC" : "#FFF4ED",
                          color: savings > 20 ? "#2D6B4A" : "#9B5B3A",
                          padding: "2px 8px", borderRadius: 4, fontWeight: 600,
                        }}>
                          {savings}% savings
                        </span>
                      )}
                      {savings < 0 && (
                        <span style={{
                          marginLeft: 8, background: "#FEE2E2", color: "#991B1B",
                          padding: "2px 8px", borderRadius: 4, fontWeight: 600,
                        }}>
                          Over value!
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Services in tier */}
                <div style={{ padding: "12px 14px", flex: 1, minHeight: 100, display: "flex", flexDirection: "column", gap: 5 }}>
                  {tierServices.length === 0 && (
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                      color: isDark ? "#6B6258" : "#B0A89C", textAlign: "center",
                      padding: "20px 14px", border: `1px dashed ${isDark ? "#4A4540" : "#E8DFD3"}`,
                      borderRadius: 8,
                    }}>
                      Drop services here
                    </div>
                  )}
                  {tierServices.map(s => {
                    const color = CAT_COLORS[s.category];
                    return (
                      <div
                        key={s.id}
                        className="service-in-tier service-chip"
                        draggable
                        onDragStart={() => handleDragStart(s.id, tierId)}
                        style={{
                          padding: "7px 10px", borderRadius: 8,
                          background: isDark ? "#3A3632" : "#fff",
                          border: `1px solid ${isDark ? "#4A4540" : "#E8DFD3"}`,
                          display: "flex", alignItems: "center", gap: 7,
                          fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                        }}
                      >
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: color.dot, flexShrink: 0 }} />
                        <span style={{ flex: 1, fontWeight: 500, color: isDark ? "#E8DFD3" : "#2C2825" }}>
                          {s.name}
                        </span>
                        <span style={{ fontSize: 10, color: isDark ? "#6B6258" : "#B0A89C", whiteSpace: "nowrap" }}>
                          {formatPrice(s.suggestedPrice)}
                        </span>
                        <button
                          className="remove-btn"
                          onClick={(e) => { e.stopPropagation(); removeFromTier(s.id, tierId); }}
                          title="Remove"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M4 4L10 10M10 4L4 10" stroke={isDark ? "#8A7F72" : "#B0A89C"} strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div style={{
                  padding: "10px 14px", borderTop: `1px solid ${isDark ? "#4A4540" : "#E8DFD3"}`,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: isDark ? "#6B6258" : "#B0A89C",
                  display: "flex", justifyContent: "space-between",
                }}>
                  <span>{tierServices.length} service{tierServices.length !== 1 ? "s" : ""}</span>
                  <span>
                    {CATEGORIES.filter(c => tierServices.some(s => s.category === c)).map(c => c.slice(0, 3)).join(" · ")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick stats */}
        <div style={{
          marginTop: 24, padding: 18, background: "#fff", borderRadius: 12,
          border: "1px solid #E8DFD3", display: "flex", gap: 28, flexWrap: "wrap",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7F72", marginBottom: 4 }}>Assigned</div>
            <div style={{ fontSize: 20, fontFamily: "'Instrument Serif', Georgia, serif" }}>{allAssigned.size} / {SERVICES.length}</div>
          </div>
          <div style={{ width: 1, background: "#E8DFD3" }} />
          {["tier1", "tier2", "tier3"].map(tid => (
            <div key={tid}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7F72", marginBottom: 4 }}>
                {tierNames[tid]}
              </div>
              <div style={{ fontSize: 20, fontFamily: "'Instrument Serif', Georgia, serif" }}>
                ${prices[tid].toLocaleString()}
              </div>
              <div style={{ fontSize: 11, color: "#B0A89C" }}>
                {tiers[tid].length} services · ${getTierValue(tid).toLocaleString()} value
              </div>
            </div>
          ))}
          <div style={{ width: 1, background: "#E8DFD3" }} />
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7F72", marginBottom: 4 }}>Avg Revenue / Client</div>
            <div style={{ fontSize: 20, fontFamily: "'Instrument Serif', Georgia, serif" }}>
              ${Math.round((prices.tier1 * 0.3 + prices.tier2 * 0.5 + prices.tier3 * 0.2)).toLocaleString()}
            </div>
            <div style={{ fontSize: 11, color: "#B0A89C" }}>weighted 30/50/20 mix</div>
          </div>
        </div>
      </div>

      {/* Summary Modal */}
      {showSummary && (
        <div className="summary-overlay" onClick={() => setShowSummary(false)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#FFFBF7", borderRadius: 20, width: "92%", maxWidth: 900,
              maxHeight: "85vh", overflow: "auto", padding: "32px 28px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 400, marginBottom: 4 }}>Package Summary</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#8A7F72" }}>
                  Your tier structure at a glance
                </p>
              </div>
              <button onClick={() => setShowSummary(false)} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#8A7F72", padding: 4 }}>
                ✕
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 18 }}>
              {["tier1", "tier2", "tier3"].map((tierId, ti) => {
                const theme = TIER_THEMES[tierId];
                const isDark = tierId === "tier2";
                const tierServices = tiers[tierId].map(getService).filter(Boolean);
                const alaCarteValue = getTierValue(tierId);
                const savings = alaCarteValue > 0 ? Math.round((1 - prices[tierId] / alaCarteValue) * 100) : 0;
                return (
                  <div key={tierId} style={{ background: theme.bg, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
                    <div style={{ padding: "18px 16px 12px", background: theme.headerBg }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: isDark ? "#A09888" : "#8A7F72", marginBottom: 4 }}>
                        Tier {ti + 1}
                      </div>
                      <div style={{ fontSize: 20, color: isDark ? "#F5EDE4" : "#2C2825", marginBottom: 6 }}>{tierNames[tierId]}</div>
                      <div style={{ fontSize: 26, color: theme.accent }}>${prices[tierId].toLocaleString()}</div>
                      {alaCarteValue > 0 && savings > 0 && (
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: isDark ? "#8A7F72" : "#8A7F72", marginTop: 4 }}>
                          ${alaCarteValue.toLocaleString()} value · <strong>{savings}% savings</strong>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "12px 16px" }}>
                      {CATEGORIES.map(cat => {
                        const catS = tierServices.filter(s => s.category === cat);
                        if (catS.length === 0) return null;
                        const color = CAT_COLORS[cat];
                        return (
                          <div key={cat} style={{ marginBottom: 10 }}>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: color.text, marginBottom: 4, display: "flex", alignItems: "center", gap: 5 }}>
                              <span style={{ width: 4, height: 4, borderRadius: 2, background: color.dot }} />
                              {cat}
                            </div>
                            {catS.map(s => (
                              <div key={s.id} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: isDark ? "#D4CBBF" : "#5A5248", padding: "2px 0", lineHeight: 1.4 }}>
                                {s.name}
                              </div>
                            ))}
                          </div>
                        );
                      })}
                      {tierServices.length === 0 && (
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: isDark ? "#6B6258" : "#B0A89C", fontStyle: "italic", padding: 8 }}>
                          No services assigned yet
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {allAssigned.size < SERVICES.length && (
              <div style={{ marginTop: 20 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#8A7F72", marginBottom: 6 }}>
                  {SERVICES.length - allAssigned.size} services not yet assigned:
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {SERVICES.filter(s => !allAssigned.has(s.id)).map(s => (
                    <span key={s.id} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, padding: "3px 10px", borderRadius: 6, background: "#F0EBE3", color: "#8A7F72" }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
