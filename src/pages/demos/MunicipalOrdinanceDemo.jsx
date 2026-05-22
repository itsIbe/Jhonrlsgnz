import { useEffect, useRef, useState } from "react";
import auroraImage from "../../assets/aurora.jpg";
import bataanImage from "../../assets/bataan.jpg";
import bulacanImage from "../../assets/bulacan.jpg";
import nuevaEcijaImage from "../../assets/nuevaEcija.jpg";
import pampangaImage from "../../assets/pampanga.jpg";
import tarlacImage from "../../assets/tarlac.jpg";
import zambalesImage from "../../assets/zambales.jpg";

// ─── Dashboard Scoped CSS ────────────────────────────────────────────────────
const DASHBOARD_CSS = `
.mos-dash-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
  background: #f8fafc;
  color: #111827;
  position: relative;
}
.mos-dash-layout {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* ── Sidebar ── */
.mos-dash-sidebar {
  width: 210px;
  flex-shrink: 0;
  background: #fff;
  border-right: 1px solid #d8e2ea;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}
.mos-dash-sidebar-brand {
  padding: .95rem 1rem .75rem;
  border-bottom: 1px solid #d8e2ea;
}
.mos-dash-brand-name {
  font-weight: 700;
  font-size: .85rem;
  letter-spacing: -.2px;
  color: #2C687B;
}
.mos-dash-brand-sub {
  font-size: .69rem;
  color: #8b95a1;
  margin-top: .1rem;
}
.mos-dash-nav {
  flex: 1;
  padding: .55rem .55rem;
  overflow-y: auto;
}
.mos-dash-nav-section { margin-bottom: .85rem; }
.mos-dash-nav-section-title {
  font-size: .66rem;
  font-weight: 600;
  color: #8b95a1;
  letter-spacing: .08em;
  text-transform: uppercase;
  padding: 0 .5rem .28rem;
}
.mos-dash-nav-item {
  display: flex;
  align-items: center;
  gap: .55rem;
  padding: .46rem .6rem;
  border-radius: 7px;
  cursor: pointer;
  color: #28323d;
  font-size: .81rem;
  font-weight: 500;
  transition: background .12s;
  margin-bottom: 1px;
  border: none;
  background: none;
  width: 100%;
  font-family: inherit;
  text-align: left;
}
.mos-dash-nav-item:hover { background: rgba(0,0,0,.04); }
.mos-dash-nav-item.active {
  background: rgba(44,104,123,.11);
  color: #2C687B;
  font-weight: 600;
}
.mos-dash-nav-item i { font-size: .88rem; opacity: .85; }
.mos-dash-nav-badge {
  margin-left: auto;
  background: #fde8e8;
  color: #DB1A1A;
  font-size: .64rem;
  font-weight: 700;
  padding: .08rem .38rem;
  border-radius: 20px;
}
.mos-dash-nav-badge.green { background: #d1fae5; color: #16a34a; }
.mos-dash-sidebar-user {
  padding: .65rem .85rem;
  border-top: 1px solid #d8e2ea;
  display: flex;
  align-items: center;
  gap: .6rem;
}
.mos-dash-user-avatar {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: #2C687B;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: .7rem; font-weight: 700; flex-shrink: 0;
}
.mos-dash-user-name { font-size: .8rem; font-weight: 600; }
.mos-dash-user-role { font-size: .68rem; color: #8b95a1; }

/* ── Main ── */
.mos-dash-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
.mos-dash-topbar {
  background: rgb(44, 104, 123);
  border-bottom: 1px solid #rgb(44, 104, 123);
  padding: 0 1.2rem;
  height: 48px;
  display: flex; align-items: center; gap: .7rem;
  flex-shrink: 0; color: #fff;
  box-shadow: 0 2px 10px rgba(219,26,26,.25);
}
.mos-dash-topbar h1 { font-size: .9rem; font-weight: 600; flex: 1; color: #fff; }
.mos-dash-topbar-actions { display: flex; align-items: center; gap: .5rem; }
.mos-dash-search {
  display: flex; align-items: center; gap: .38rem;
  background: rgb(44, 104, 123); border: 1px solid rgba(255,255,255,.2);
  border-radius: 8px; padding: .3rem .65rem; min-width: 165px;
}
.mos-dash-search input {
  border: none; background: transparent; font-size: .79rem;
  outline: none; font-family: inherit; color: #fff; width: 115px;
}
.mos-dash-search input::placeholder { color: rgba(255,255,255,.6); }
.mos-dash-search i { color: rgba(255,255,255,.75); font-size: .85rem; }
.mos-dash-notif-btn {
  width: 30px; height: 30px; border-radius: 7px;
  border: 1px solid rgba(255,255,255,.2); background: rgba(255,255,255,.14);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; position: relative; color: #fff;
}
.mos-dash-notif-dot {
  width: 6px; height: 6px; background: #fff; border-radius: 50%;
  position: absolute; top: 5px; right: 5px; border: 1.5px solid #DB1A1A;
}
.mos-dash-btn-sm {
  background: #2C687B; color: #fff; border: none;
  padding: .36rem .82rem; border-radius: 7px;
  font-weight: 600; font-size: .76rem; cursor: pointer;
  font-family: inherit; display: flex; align-items: center;
  gap: .28rem; transition: background .15s;
}
.mos-dash-btn-sm:hover { background: #1a4a5a; }
.mos-dash-btn-sm.dark { background: #28323d; }
.mos-dash-btn-sm.dark:hover { background: #111827; }
.mos-dash-btn-sm-outline {
  background: #fff; color: #28323d; border: 1px solid #d8e2ea;
  padding: .36rem .82rem; border-radius: 7px;
  font-weight: 500; font-size: .76rem; cursor: pointer;
  font-family: inherit; display: flex; align-items: center; gap: .28rem; transition: background .15s;
}
.mos-dash-btn-sm-outline:hover { background: #f8fafc; }
.mos-dash-content { padding: 1rem 1.35rem; flex: 1; overflow-y: auto; }

/* ── Metrics ── */
.mos-dash-metrics-grid {
  display: grid; grid-template-columns: repeat(4,1fr);
  gap: .7rem; margin-bottom: 1rem;
}
.mos-dash-metric-card {
  background: #fff; border: 1px solid #d8e2ea;
  border-radius: 11px; padding: .82rem .9rem;
}
.mos-dash-metric-label {
  font-size: .72rem; color: #5c6b7a; font-weight: 500;
  margin-bottom: .35rem; display: flex; align-items: center; gap: .28rem;
}
.mos-dash-metric-value { font-size: 1.5rem; font-weight: 700; color: #111827; line-height: 1; }
.mos-dash-metric-value.sm { font-size: 1.05rem; margin-top: .1rem; }
.mos-dash-metric-change { font-size: .69rem; margin-top: .28rem; font-weight: 500; }
.mos-dash-metric-change.up { color: #16a34a; }
.mos-dash-metric-change.neutral { color: #8b95a1; }
.mos-dash-metric-change.warn { color: #d97706; }

/* ── Content rows ── */
.mos-dash-content-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: .7rem; margin-bottom: .7rem;
}
.mos-dash-content-row.full { grid-template-columns: 1fr; }

/* ── Panel ── */
.mos-dash-panel { background: #fff; border: 1px solid #d8e2ea; border-radius: 11px; overflow: hidden; }
.mos-dash-panel-header {
  padding: .6rem .9rem; border-bottom: 1px solid #d8e2ea;
  display: flex; align-items: center; justify-content: space-between;
}
.mos-dash-panel-header h3 { font-size: .83rem; font-weight: 600; }
.mos-dash-panel-body { padding: .75rem .9rem; }

/* ── Table ── */
.mos-dash-table { width: 100%; border-collapse: collapse; font-size: .77rem; }
.mos-dash-table th {
  text-align: left; font-size: .67rem; font-weight: 600;
  color: #5c6b7a; text-transform: uppercase; letter-spacing: .04em;
  padding: .4rem .62rem; border-bottom: 1px solid #d8e2ea;
}
.mos-dash-table td { padding: .48rem .62rem; border-bottom: 1px solid #f1f5f9; color: #28323d; }
.mos-dash-table tr:last-child td { border-bottom: none; }
.mos-dash-table tr:hover td { background: #f8fafc; }

/* ── Badges ── */
.mos-dash-badge {
  display: inline-flex; align-items: center; gap: .2rem;
  font-size: .66rem; font-weight: 600; padding: .15rem .46rem; border-radius: 20px;
}
.mos-dash-badge.approved { background: #d1fae5; color: #16a34a; }
.mos-dash-badge.pending  { background: #fef9c3; color: #a16207; }
.mos-dash-badge.rejected { background: #fde8e8; color: #DB1A1A; }
.mos-dash-badge.draft    { background: #f1f5f9; color: #5c6b7a; }
.mos-dash-badge.active   { background: #FFF6F6; color: #2C687B; }
.mos-dash-badge.env      { background: #FFF6F6; color: #2C687B; }
.mos-dash-badge.order    { background: #f3e8ff; color: #7c3aed; }
.mos-dash-badge.commerce { background: #ecfdf5; color: #059669; }
.mos-dash-badge.transport{ background: #fff7ed; color: #c2410c; }
.mos-dash-badge.welfare  { background: #fdf4ff; color: #a21caf; }

/* ── Bar chart ── */
.mos-dash-bar-chart {
  display: flex; align-items: flex-end; gap: .35rem; height: 90px; padding-top: .4rem;
}
.mos-dash-bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: .25rem; }
.mos-dash-bar { width: 100%; background: #8CC7C4; border-radius: 3px 3px 0 0; cursor: pointer; transition: background .2s; }
.mos-dash-bar:hover { background: #2C687B; }
.mos-dash-bar-label { font-size: .57rem; color: #5c6b7a; }
.mos-dash-bar-val   { font-size: .58rem; font-weight: 600; color: #28323d; }

/* ── Activity ── */
.mos-dash-activity-list { display: flex; flex-direction: column; gap: .35rem; }
.mos-dash-activity-item {
  display: flex; gap: .52rem; align-items: flex-start;
  padding: .35rem 0; border-bottom: 1px solid #f1f5f9;
}
.mos-dash-activity-item:last-child { border-bottom: none; }
.mos-dash-act-dot { width: 7px; height: 7px; border-radius: 50%; margin-top: .28rem; flex-shrink: 0; }
.mos-dash-act-dot.green { background: #22c55e; }
.mos-dash-act-dot.amber { background: #f59e0b; }
.mos-dash-act-dot.red   { background: #DB1A1A; }
.mos-dash-act-dot.blue  { background: #2C687B; }
.mos-dash-act-text { font-size: .76rem; color: #28323d; line-height: 1.4; }
.mos-dash-act-time { font-size: .68rem; color: #8b95a1; margin-top: .03rem; }

/* ── LGU list ── */
.mos-dash-lgu-list { display: flex; flex-direction: column; gap: .38rem; }
.mos-dash-lgu-item {
  display: flex; align-items: center; gap: .58rem;
  padding: .48rem .58rem; border: 1px solid #d8e2ea;
  border-radius: 8px; cursor: pointer; transition: background .12s;
}
.mos-dash-lgu-item:hover { background: #f8fafc; }
.mos-dash-lgu-icon {
  width: 28px; height: 28px; border-radius: 7px;
  background: #FFF6F6; display: flex; align-items: center; justify-content: center;
  color: #2C687B; font-size: .82rem; flex-shrink: 0;
}
.mos-dash-lgu-info { flex: 1; }
.mos-dash-lgu-name { font-size: .79rem; font-weight: 600; }
.mos-dash-lgu-sub  { font-size: .68rem; color: #8b95a1; }
.mos-dash-progress-bar { height: 3px; background: #d8e2ea; border-radius: 2px; margin-top: .26rem; overflow: hidden; }
.mos-dash-progress-fill { height: 100%; background: #2C687B; border-radius: 2px; }
.mos-dash-lgu-count { font-size: .76rem; font-weight: 700; color: #2C687B; }

/* ── Pending cards ── */
.mos-dash-pending-card {
  border: 1px solid #d8e2ea; border-radius: 9px; padding: .75rem .9rem;
  margin-bottom: .52rem; display: flex; gap: .75rem;
  align-items: flex-start; transition: box-shadow .12s; background: #fff;
}
.mos-dash-pending-card:hover { box-shadow: 0 2px 12px rgba(0,0,0,.07); }
.mos-dash-pending-card.resolved { opacity: .42; pointer-events: none; }
.mos-dash-pending-icon {
  width: 34px; height: 34px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; font-size: .9rem; flex-shrink: 0;
}
.mos-dash-pending-icon.amber { background: #fef9c3; color: #d97706; }
.mos-dash-pending-icon.red   { background: #fde8e8; color: #DB1A1A; }
.mos-dash-pending-info { flex: 1; }
.mos-dash-pending-title { font-size: .82rem; font-weight: 600; margin-bottom: .15rem; }
.mos-dash-pending-meta  { font-size: .71rem; color: #8b95a1; margin-bottom: .35rem; }
.mos-dash-pending-actions { display: flex; gap: .35rem; margin-top: .35rem; }
.mos-dash-btn-approve {
  border: none; background: #d1fae5; color: #16a34a;
  font-size: .7rem; font-weight: 600; padding: .24rem .6rem;
  border-radius: 5px; cursor: pointer; font-family: inherit; transition: background .12s;
}
.mos-dash-btn-approve:hover { background: #bbf7d0; }
.mos-dash-btn-reject {
  border: none; background: #fde8e8; color: #DB1A1A;
  font-size: .7rem; font-weight: 600; padding: .24rem .6rem;
  border-radius: 5px; cursor: pointer; font-family: inherit; transition: background .12s;
}
.mos-dash-btn-reject:hover { background: #fecaca; }
.mos-dash-btn-view {
  border: 1px solid #d8e2ea; background: #fff; color: #28323d;
  font-size: .7rem; font-weight: 500; padding: .24rem .6rem;
  border-radius: 5px; cursor: pointer; font-family: inherit; transition: background .12s;
}
.mos-dash-btn-view:hover { background: #f8fafc; }

/* ── Forms ── */
.mos-dash-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; margin-bottom: .75rem; }
.mos-dash-form-field { margin-bottom: .75rem; }
.mos-dash-form-field label { display: block; font-size: .76rem; font-weight: 500; color: #28323d; margin-bottom: .26rem; }
.mos-dash-form-field input,
.mos-dash-form-field select,
.mos-dash-form-field textarea {
  width: 100%; border: 1px solid #d8e2ea; border-radius: 7px;
  padding: .5rem .75rem; font-size: .79rem; font-family: inherit;
  outline: none; color: #111827; transition: border-color .15s, box-shadow .15s; background: #fff;
}
.mos-dash-form-field input:focus,
.mos-dash-form-field select:focus,
.mos-dash-form-field textarea:focus {
  border-color: #2C687B; box-shadow: 0 0 0 3px rgba(44,104,123,.11);
}
.mos-dash-form-field textarea { resize: vertical; min-height: 72px; }
.mos-dash-form-actions {
  display: flex; gap: .52rem; justify-content: flex-end;
  margin-top: .75rem; padding-top: .75rem; border-top: 1px solid #d8e2ea;
}
.mos-dash-filter {
  border: 1px solid #d8e2ea; border-radius: 6px; padding: .3rem .58rem;
  font-size: .76rem; font-family: inherit; background: #fff; color: #28323d; outline: none; cursor: pointer;
}

/* ── Sections ── */
.mos-dash-page-section { display: none; }
.mos-dash-page-section.active { display: block; }
.mos-dash-page-header { margin-bottom: 1rem; }
.mos-dash-page-header h2 { font-size: 1.02rem; font-weight: 700; }
.mos-dash-page-header p { font-size: .78rem; color: #5c6b7a; margin-top: .1rem; }

/* ── Report bars ── */
.mos-dash-report-bars { display: flex; flex-direction: column; gap: .58rem; }
.mos-dash-report-bar-row { display: flex; justify-content: space-between; font-size: .77rem; margin-bottom: .2rem; }

/* ── Link ── */
.mos-dash-link { font-size: .76rem; color: #2C687B; text-decoration: none; }
.mos-dash-link:hover { text-decoration: underline; }

/* ── Toast ── */
.mos-dash-toast {
  position: absolute; bottom: 1rem; right: 1rem;
  background: #111827; color: #fff; padding: .58rem .92rem;
  border-radius: 9px; font-size: .78rem; font-weight: 500;
  z-index: 9999; display: flex; align-items: center; gap: .36rem;
  animation: dashSlideUp .22s ease; pointer-events: none;
  box-shadow: 0 4px 16px rgba(0,0,0,.25);
}
@keyframes dashSlideUp {
  from { opacity: 0; transform: translateY(7px); }
  to   { opacity: 1; transform: translateY(0);   }
}
`;

// ─── Chart Data ──────────────────────────────────────────────────────────────
const CHART_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const CHART_VALS   = [18, 24, 15, 32, 28, 41, 36, 29, 44, 38, 52, 47];
const CHART_MAX    = Math.max(...CHART_VALS);

// ─── Initial Pending Data ────────────────────────────────────────────────────
const INITIAL_PENDING = [
    { id:1, num:"#2025-048", title:"Noise Control Regulation",         loc:"Aurora · Baler · Centro",                     date:"Jan 16, 2025", author:"Councilor Reyes",   urgent:false, status:"pending" },
    { id:2, num:"#2025-031", title:"Road Safety & Speed Limits",       loc:"Nueva Ecija · Cabanatuan City · Aduas Centro",date:"Jan 5, 2025",  author:"Mayor Dela Cruz",  urgent:false, status:"pending" },
    { id:3, num:"#2025-043", title:"Business Permit Processing Reform",loc:"Tarlac · Capas · San Miguel",                date:"Jan 13, 2025", author:"Councilor Santos",  urgent:true,  status:"pending" },
    { id:4, num:"#2025-052", title:"Public Market Sanitation Code",    loc:"Bulacan · Meycauayan · Malhacan",             date:"Jan 17, 2025", author:"Councilor Garcia",  urgent:false, status:"pending" },
    { id:5, num:"#2025-055", title:"Youth Sports Development Act",     loc:"Zambales · Olongapo City · West Bajac-Bajac", date:"Jan 18, 2025", author:"Councilor Lim",     urgent:false, status:"pending" },
];

const SECTION_TITLES = {
    dashboard:      "Dashboard Overview",
    tracking:       "LGU Tracking",
    ordinances:     "All Ordinances",
    "add-ordinance":"Add New Ordinance",
    pending:        "Pending Ordinances",
    approved:       "Approved Ordinances",
    reports:        "Analytics & Reports",
    barangay:       "Barangay Monitor",
    settings:       "Settings",
    users:          "Users & Roles",
};

// ─── Dashboard Component ─────────────────────────────────────────────────────
function MosDashboard({ onLogout, username }) {
    const [section, setSection] = useState("dashboard");
    const [pending, setPending] = useState(INITIAL_PENDING);
    const [toast,   setToast  ] = useState({ visible:false, msg:"" });
    const [ordForm, setOrdForm] = useState({
        number:"", date:"", title:"", province:"", city:"",
        barangay:"", street:"", category:"Environment", author:"", desc:"", remarks:"",
    });
    const toastTimerRef = useRef(null);

    // Inject Tabler Icons if not already present
    useEffect(() => {
        if (!document.getElementById("tabler-icons-dash")) {
            const link  = document.createElement("link");
            link.id     = "tabler-icons-dash";
            link.rel    = "stylesheet";
            link.href   = "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css";
            document.head.appendChild(link);
        }
    }, []);

    const showToast = (msg) => {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setToast({ visible:true, msg });
        toastTimerRef.current = setTimeout(() => setToast(t => ({ ...t, visible:false })), 3000);
    };

    const nav = (id) => setSection(id);

    const approveOrd = (id) => {
        setPending(p => p.map(x => x.id === id ? { ...x, status:"approved" } : x));
        showToast("Ordinance approved successfully");
    };
    const rejectOrd = (id) => {
        setPending(p => p.map(x => x.id === id ? { ...x, status:"rejected" } : x));
        showToast("Ordinance returned for revision");
    };
    const submitOrd = () => {
        if (!ordForm.number || !ordForm.title) { showToast("Please fill in Ordinance Number and Title"); return; }
        showToast("Ordinance submitted for review!");
        setOrdForm({ number:"", date:"", title:"", province:"", city:"", barangay:"", street:"", category:"Environment", author:"", desc:"", remarks:"" });
    };

    const userInitials = username ? username.slice(0, 2).toUpperCase() : "AD";
    const pendingCount = pending.filter(x => x.status === "pending").length;

    const NavItem = ({ id, icon, label, badge, badgeColor }) => (
        <button
            type="button"
            className={`mos-dash-nav-item ${section === id ? "active" : ""}`}
            onClick={() => nav(id)}
        >
            <i className={`ti ti-${icon}`} />
            {label}
            {badge && <span className={`mos-dash-nav-badge ${badgeColor || ""}`}>{badge}</span>}
        </button>
    );

    return (
        <div className="mos-dash-wrapper">
            <style dangerouslySetInnerHTML={{ __html: DASHBOARD_CSS }} />

            <div className="mos-dash-layout">

                {/* ── Sidebar ── */}
                <aside className="mos-dash-sidebar">
                    <div className="mos-dash-sidebar-brand">
                        <div className="mos-dash-brand-name">MUNICIPAL ORDINANCE</div>
                        <div className="mos-dash-brand-sub">LGU Management System</div>
                    </div>
                    <nav className="mos-dash-nav">
                        <div className="mos-dash-nav-section">
                            <div className="mos-dash-nav-section-title">Main</div>
                            <NavItem id="dashboard"   icon="layout-dashboard"  label="Dashboard" />
                            <NavItem id="tracking"    icon="map-pin"           label="LGU Tracking" />
                            <NavItem id="ordinances"  icon="file-text"         label="All Ordinances" />
                        </div>
                        <div className="mos-dash-nav-section">
                            <div className="mos-dash-nav-section-title">Actions</div>
                            <NavItem id="add-ordinance" icon="circle-plus"  label="Add Ordinance" />
                            <NavItem id="pending"       icon="clock"        label="Pending" badge={pendingCount || null} />
                            <NavItem id="approved"      icon="circle-check" label="Approved" badge="48" badgeColor="green" />
                        </div>
                        <div className="mos-dash-nav-section">
                            <div className="mos-dash-nav-section-title">Reports</div>
                            <NavItem id="reports"   icon="chart-bar"          label="Analytics & Reports" />
                            <NavItem id="barangay"  icon="building-community" label="Barangay Monitor" />
                            <NavItem id="settings"  icon="settings"           label="Settings" />
                        </div>
                        <div className="mos-dash-nav-section">
                            <div className="mos-dash-nav-section-title">Admin</div>
                            <NavItem id="users" icon="users" label="Users & Roles" />
                            <button type="button" className="mos-dash-nav-item" onClick={onLogout}>
                                <i className="ti ti-logout" /> Sign Out
                            </button>
                        </div>
                    </nav>
                    <div className="mos-dash-sidebar-user">
                        <div className="mos-dash-user-avatar">{userInitials}</div>
                        <div>
                            <div className="mos-dash-user-name">{username || "Admin User"}</div>
                            <div className="mos-dash-user-role">LGU Administrator</div>
                        </div>
                    </div>
                </aside>

                {/* ── Main ── */}
                <main className="mos-dash-main">
                    <div className="mos-dash-topbar">
                        <h1>{SECTION_TITLES[section] || "Dashboard"}</h1>
                        <div className="mos-dash-topbar-actions">
                            <div className="mos-dash-search">
                                <i className="ti ti-search" />
                                <input type="text" placeholder="Search ordinances..." />
                            </div>
                            <button type="button" className="mos-dash-notif-btn">
                                <i className="ti ti-bell" />
                                <span className="mos-dash-notif-dot" />
                            </button>
                            <button type="button" className="mos-dash-btn-sm" onClick={() => nav("add-ordinance")}>
                                <i className="ti ti-plus" /> New Ordinance
                            </button>
                        </div>
                    </div>

                    <div className="mos-dash-content">

                        {/* ── DASHBOARD SECTION ── */}
                        <div className={`mos-dash-page-section ${section === "dashboard" ? "active" : ""}`}>
                            <div className="mos-dash-metrics-grid">
                                {[
                                    { label:"Total Ordinances",   icon:"file-text",          value:"3,240", change:"↑ 12% this month",    type:"up"      },
                                    { label:"Pending Review",     icon:"clock",               value:"5",     change:"Needs attention",      type:"warn"    },
                                    { label:"Approved",           icon:"circle-check",        value:"48",    change:"↑ 8% vs last mo.",     type:"up"      },
                                    { label:"Active Barangays",   icon:"building-community",  value:"142",   change:"Across 7 provinces",   type:"neutral" },
                                ].map(m => (
                                    <div className="mos-dash-metric-card" key={m.label}>
                                        <div className="mos-dash-metric-label"><i className={`ti ti-${m.icon}`} /> {m.label}</div>
                                        <div className="mos-dash-metric-value">{m.value}</div>
                                        <div className={`mos-dash-metric-change ${m.type}`}>{m.change}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mos-dash-content-row">
                                <div className="mos-dash-panel">
                                    <div className="mos-dash-panel-header">
                                        <h3>Monthly Ordinances Filed</h3>
                                        <select className="mos-dash-filter"><option>2025</option><option>2024</option></select>
                                    </div>
                                    <div className="mos-dash-panel-body">
                                        <div className="mos-dash-bar-chart">
                                            {CHART_VALS.map((v, i) => (
                                                <div className="mos-dash-bar-wrap" key={i}>
                                                    <div className="mos-dash-bar-val">{v}</div>
                                                    <div className="mos-dash-bar" style={{ height:`${Math.round((v / CHART_MAX) * 78)}px` }} title={`${CHART_MONTHS[i]}: ${v}`} />
                                                    <div className="mos-dash-bar-label">{CHART_MONTHS[i]}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mos-dash-panel">
                                    <div className="mos-dash-panel-header">
                                        <h3>Recent Activity</h3>
                                        <a href="#" className="mos-dash-link" onClick={e => e.preventDefault()}>View all</a>
                                    </div>
                                    <div className="mos-dash-panel-body">
                                        <div className="mos-dash-activity-list">
                                            {[
                                                { dot:"green", text:"Ordinance #2025-047 approved by Mayor Santos",              time:"10 minutes ago · Pampanga" },
                                                { dot:"amber", text:"Ordinance #2025-048 submitted for review — Noise Control",  time:"1 hour ago · Aurora"       },
                                                { dot:"blue",  text:"New barangay Sto. Niño added to Bulacan LGU",              time:"2 hours ago"                },
                                                { dot:"red",   text:"Ordinance #2025-039 returned for revision",                 time:"Yesterday · Zambales"       },
                                                { dot:"green", text:"5 ordinances batch-approved for Tarlac LGU",               time:"Yesterday"                  },
                                            ].map((a, i) => (
                                                <div className="mos-dash-activity-item" key={i}>
                                                    <div className={`mos-dash-act-dot ${a.dot}`} />
                                                    <div>
                                                        <div className="mos-dash-act-text">{a.text}</div>
                                                        <div className="mos-dash-act-time">{a.time}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mos-dash-content-row full">
                                <div className="mos-dash-panel">
                                    <div className="mos-dash-panel-header">
                                        <h3>Recent Ordinances</h3>
                                        <button type="button" className="mos-dash-btn-sm-outline" onClick={() => nav("ordinances")}>
                                            <i className="ti ti-external-link" /> View All
                                        </button>
                                    </div>
                                    <div className="mos-dash-panel-body" style={{ padding:0 }}>
                                        <table className="mos-dash-table">
                                            <thead><tr><th>No.</th><th>Title</th><th>Province</th><th>Barangay</th><th>Date Filed</th><th>Status</th></tr></thead>
                                            <tbody>
                                                {[
                                                    { num:"#2025-047", title:"Solid Waste Management Act",   prov:"Pampanga", brgy:"San Fernando", date:"Jan 15, 2025", status:"approved" },
                                                    { num:"#2025-048", title:"Noise Control Regulation",     prov:"Aurora",   brgy:"Baler",        date:"Jan 16, 2025", status:"pending"  },
                                                    { num:"#2025-039", title:"Market Vendor Code of Conduct",prov:"Zambales", brgy:"Olongapo City", date:"Jan 10, 2025", status:"rejected" },
                                                    { num:"#2025-041", title:"Anti-Littering Ordinance",     prov:"Bulacan",  brgy:"Malolos",       date:"Jan 12, 2025", status:"approved" },
                                                    { num:"#2025-043", title:"Business Permit Processing",   prov:"Tarlac",   brgy:"Capas",         date:"Jan 13, 2025", status:"draft"    },
                                                ].map(r => (
                                                    <tr key={r.num}>
                                                        <td><strong>{r.num}</strong></td>
                                                        <td>{r.title}</td><td>{r.prov}</td><td>{r.brgy}</td><td>{r.date}</td>
                                                        <td>
                                                            <span className={`mos-dash-badge ${r.status}`}>
                                                                {r.status === "approved" && <i className="ti ti-check" />}
                                                                {r.status === "pending"  && <i className="ti ti-clock" />}
                                                                {r.status === "rejected" && <i className="ti ti-x" />}
                                                                {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── LGU TRACKING ── */}
                        <div className={`mos-dash-page-section ${section === "tracking" ? "active" : ""}`}>
                            <div className="mos-dash-page-header">
                                <h2>LGU Tracking — By Barangay, Street &amp; City</h2>
                                <p>Monitor ordinance compliance per local government unit</p>
                            </div>
                            <div className="mos-dash-content-row">
                                <div className="mos-dash-panel">
                                    <div className="mos-dash-panel-header"><h3>By Province</h3></div>
                                    <div className="mos-dash-panel-body">
                                        <div className="mos-dash-lgu-list">
                                            {[
                                                { name:"Pampanga",    sub:"22 municipalities · 592 barangays", pct:92 },
                                                { name:"Bulacan",     sub:"21 municipalities · 569 barangays", pct:85 },
                                                { name:"Nueva Ecija", sub:"27 municipalities · 845 barangays", pct:78 },
                                                { name:"Tarlac",      sub:"17 municipalities · 511 barangays", pct:88 },
                                                { name:"Zambales",    sub:"13 municipalities · 237 barangays", pct:71 },
                                                { name:"Bataan",      sub:"11 municipalities · 237 barangays", pct:82 },
                                                { name:"Aurora",      sub:"8 municipalities · 143 barangays",  pct:66 },
                                            ].map(p => (
                                                <div className="mos-dash-lgu-item" key={p.name}>
                                                    <div className="mos-dash-lgu-icon"><i className="ti ti-map-2" /></div>
                                                    <div className="mos-dash-lgu-info">
                                                        <div className="mos-dash-lgu-name">{p.name}</div>
                                                        <div className="mos-dash-lgu-sub">{p.sub}</div>
                                                        <div className="mos-dash-progress-bar">
                                                            <div className="mos-dash-progress-fill" style={{ width:`${p.pct}%` }} />
                                                        </div>
                                                    </div>
                                                    <div className="mos-dash-lgu-count">{p.pct}%</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mos-dash-panel">
                                    <div className="mos-dash-panel-header">
                                        <h3>Barangay Detail — Pampanga</h3>
                                        <select className="mos-dash-filter">
                                            <option>San Fernando</option><option>Angeles City</option><option>Mabalacat</option>
                                        </select>
                                    </div>
                                    <div className="mos-dash-panel-body" style={{ padding:0 }}>
                                        <table className="mos-dash-table">
                                            <thead><tr><th>Barangay</th><th>Street/Sitio</th><th>Ordinances</th><th>Compliance</th></tr></thead>
                                            <tbody>
                                                {[
                                                    { brgy:"Sto. Rosario", street:"MacArthur Hwy",      ords:14, comp:"High", cls:"approved" },
                                                    { brgy:"San Jose",     street:"Del Pilar St.",       ords:9,  comp:"High", cls:"approved" },
                                                    { brgy:"Dolores",      street:"Olongapo-Gapan Rd.",  ords:7,  comp:"Mid",  cls:"pending"  },
                                                    { brgy:"Sta. Lucia",   street:"Jose Abad Santos",    ords:5,  comp:"Mid",  cls:"pending"  },
                                                    { brgy:"Del Carmen",   street:"Sindalan Rd.",        ords:3,  comp:"Low",  cls:"rejected" },
                                                    { brgy:"Lourdes",      street:"Fernandez Blvd.",     ords:11, comp:"High", cls:"approved" },
                                                ].map(r => (
                                                    <tr key={r.brgy}>
                                                        <td>{r.brgy}</td><td>{r.street}</td><td>{r.ords}</td>
                                                        <td><span className={`mos-dash-badge ${r.cls}`}>{r.comp}</span></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── ALL ORDINANCES ── */}
                        <div className={`mos-dash-page-section ${section === "ordinances" ? "active" : ""}`}>
                            <div className="mos-dash-page-header" style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                                <div><h2>All Ordinances</h2><p>Complete registry of municipal ordinances</p></div>
                                <div style={{ display:"flex", gap:".5rem" }}>
                                    <select className="mos-dash-filter"><option>All Provinces</option><option>Pampanga</option><option>Bulacan</option><option>Aurora</option></select>
                                    <select className="mos-dash-filter"><option>All Status</option><option>Approved</option><option>Pending</option><option>Draft</option></select>
                                </div>
                            </div>
                            <div className="mos-dash-panel">
                                <div className="mos-dash-panel-body" style={{ padding:0 }}>
                                    <table className="mos-dash-table">
                                        <thead><tr><th>No.</th><th>Title</th><th>Province</th><th>City/Muni.</th><th>Barangay</th><th>Category</th><th>Filed</th><th>Status</th></tr></thead>
                                        <tbody>
                                            {[
                                                { num:"#2025-047", title:"Solid Waste Management Act",    prov:"Pampanga",    city:"San Fernando City", brgy:"Sto. Rosario", cat:"Environment", catCls:"env",       filed:"Jan 15", status:"approved" },
                                                { num:"#2025-048", title:"Noise Control Regulation",      prov:"Aurora",      city:"Baler",             brgy:"Centro",       cat:"Public Order",catCls:"order",     filed:"Jan 16", status:"pending"  },
                                                { num:"#2025-046", title:"Anti-Littering Ordinance",      prov:"Bulacan",     city:"Malolos City",      brgy:"Cofradia",     cat:"Environment", catCls:"env",       filed:"Jan 14", status:"approved" },
                                                { num:"#2025-043", title:"Business Permit Processing",    prov:"Tarlac",      city:"Capas",             brgy:"San Miguel",   cat:"Commerce",    catCls:"commerce",  filed:"Jan 13", status:"draft"    },
                                                { num:"#2025-039", title:"Market Vendor Code of Conduct", prov:"Zambales",    city:"Olongapo City",     brgy:"East Tapinac", cat:"Commerce",    catCls:"commerce",  filed:"Jan 10", status:"rejected" },
                                                { num:"#2025-035", title:"Senior Citizen Priority Lane",  prov:"Bataan",      city:"Balanga City",      brgy:"Poblacion",    cat:"Welfare",     catCls:"welfare",   filed:"Jan 8",  status:"approved" },
                                                { num:"#2025-031", title:"Road Safety & Speed Limits",    prov:"Nueva Ecija", city:"Cabanatuan City",   brgy:"Aduas Centro", cat:"Transport",   catCls:"transport", filed:"Jan 5",  status:"pending"  },
                                                { num:"#2025-028", title:"Animal Control Ordinance",      prov:"Pampanga",    city:"Angeles City",      brgy:"Balibago",     cat:"Environment", catCls:"env",       filed:"Jan 3",  status:"approved" },
                                            ].map(r => (
                                                <tr key={r.num}>
                                                    <td><strong>{r.num}</strong></td>
                                                    <td>{r.title}</td><td>{r.prov}</td><td>{r.city}</td><td>{r.brgy}</td>
                                                    <td><span className={`mos-dash-badge ${r.catCls}`}>{r.cat}</span></td>
                                                    <td>{r.filed}</td>
                                                    <td><span className={`mos-dash-badge ${r.status}`}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* ── ADD ORDINANCE ── */}
                        <div className={`mos-dash-page-section ${section === "add-ordinance" ? "active" : ""}`}>
                            <div className="mos-dash-page-header">
                                <h2>Add New Ordinance</h2>
                                <p>Submit a new ordinance for review and approval</p>
                            </div>
                            <div className="mos-dash-panel" style={{ maxWidth:700 }}>
                                <div className="mos-dash-panel-body">
                                    <div className="mos-dash-form-row">
                                        <div className="mos-dash-form-field">
                                            <label>Ordinance Number</label>
                                            <input type="text" placeholder="e.g. 2025-049" value={ordForm.number}
                                                onChange={e => setOrdForm(f => ({ ...f, number:e.target.value }))} />
                                        </div>
                                        <div className="mos-dash-form-field">
                                            <label>Date Filed</label>
                                            <input type="date" value={ordForm.date}
                                                onChange={e => setOrdForm(f => ({ ...f, date:e.target.value }))} />
                                        </div>
                                    </div>
                                    <div className="mos-dash-form-field">
                                        <label>Title / Short Description</label>
                                        <input type="text" placeholder="Enter ordinance title..." value={ordForm.title}
                                            onChange={e => setOrdForm(f => ({ ...f, title:e.target.value }))} />
                                    </div>
                                    <div className="mos-dash-form-row">
                                        <div className="mos-dash-form-field">
                                            <label>Province</label>
                                            <select value={ordForm.province} onChange={e => setOrdForm(f => ({ ...f, province:e.target.value }))}>
                                                <option value="">Select province...</option>
                                                {["Aurora","Bataan","Bulacan","Nueva Ecija","Pampanga","Tarlac","Zambales"].map(p => <option key={p}>{p}</option>)}
                                            </select>
                                        </div>
                                        <div className="mos-dash-form-field">
                                            <label>City / Municipality</label>
                                            <input type="text" placeholder="Enter city or municipality" value={ordForm.city}
                                                onChange={e => setOrdForm(f => ({ ...f, city:e.target.value }))} />
                                        </div>
                                    </div>
                                    <div className="mos-dash-form-row">
                                        <div className="mos-dash-form-field">
                                            <label>Barangay</label>
                                            <input type="text" placeholder="Enter barangay name" value={ordForm.barangay}
                                                onChange={e => setOrdForm(f => ({ ...f, barangay:e.target.value }))} />
                                        </div>
                                        <div className="mos-dash-form-field">
                                            <label>Street / Sitio</label>
                                            <input type="text" placeholder="Enter street or sitio" value={ordForm.street}
                                                onChange={e => setOrdForm(f => ({ ...f, street:e.target.value }))} />
                                        </div>
                                    </div>
                                    <div className="mos-dash-form-row">
                                        <div className="mos-dash-form-field">
                                            <label>Category</label>
                                            <select value={ordForm.category} onChange={e => setOrdForm(f => ({ ...f, category:e.target.value }))}>
                                                {["Environment","Public Order","Commerce","Transport","Welfare","Health","Education","Other"].map(c => <option key={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div className="mos-dash-form-field">
                                            <label>Author / Sponsor</label>
                                            <input type="text" placeholder="Councilor / Mayor name" value={ordForm.author}
                                                onChange={e => setOrdForm(f => ({ ...f, author:e.target.value }))} />
                                        </div>
                                    </div>
                                    <div className="mos-dash-form-field">
                                        <label>Full Text / Description</label>
                                        <textarea placeholder="Enter the full text or description of the ordinance..." value={ordForm.desc}
                                            onChange={e => setOrdForm(f => ({ ...f, desc:e.target.value }))} style={{ minHeight:95 }} />
                                    </div>
                                    <div className="mos-dash-form-field">
                                        <label>Remarks / Notes</label>
                                        <textarea placeholder="Optional remarks..." value={ordForm.remarks}
                                            onChange={e => setOrdForm(f => ({ ...f, remarks:e.target.value }))} style={{ minHeight:52 }} />
                                    </div>
                                    <div className="mos-dash-form-actions">
                                        <button type="button" className="mos-dash-btn-sm-outline"
                                            onClick={() => setOrdForm({ number:"", date:"", title:"", province:"", city:"", barangay:"", street:"", category:"Environment", author:"", desc:"", remarks:"" })}>
                                            <i className="ti ti-x" /> Clear
                                        </button>
                                        <button type="button" className="mos-dash-btn-sm dark"
                                            onClick={() => showToast("Draft saved successfully")}>
                                            <i className="ti ti-device-floppy" /> Save Draft
                                        </button>
                                        <button type="button" className="mos-dash-btn-sm" onClick={submitOrd}>
                                            <i className="ti ti-send" /> Submit for Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── PENDING ── */}
                        <div className={`mos-dash-page-section ${section === "pending" ? "active" : ""}`}>
                            <div className="mos-dash-page-header" style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                                <div><h2>Pending Ordinances</h2><p>Ordinances awaiting review and approval</p></div>
                                <select className="mos-dash-filter">
                                    <option>All Provinces</option><option>Pampanga</option><option>Aurora</option><option>Nueva Ecija</option>
                                </select>
                            </div>
                            {pending.map(item => (
                                <div key={item.id} className={`mos-dash-pending-card ${item.status !== "pending" ? "resolved" : ""}`}>
                                    <div className={`mos-dash-pending-icon ${item.urgent ? "red" : "amber"}`}>
                                        <i className={`ti ti-${item.urgent ? "urgent" : "file-alert"}`} />
                                    </div>
                                    <div className="mos-dash-pending-info">
                                        <div className="mos-dash-pending-title">{item.num} — {item.title}</div>
                                        <div className="mos-dash-pending-meta">{item.loc} · Filed {item.date} · By {item.author}</div>
                                        <span className={`mos-dash-badge ${item.status === "pending" ? "pending" : item.status === "approved" ? "approved" : "rejected"}`}>
                                            {item.status === "pending" ? "Pending Review" : item.status === "approved" ? "✓ Approved" : "✕ Returned"}
                                        </span>
                                        {item.status === "pending" && (
                                            <div className="mos-dash-pending-actions">
                                                <button type="button" className="mos-dash-btn-approve" onClick={() => approveOrd(item.id)}>
                                                    <i className="ti ti-check" /> Approve
                                                </button>
                                                <button type="button" className="mos-dash-btn-reject" onClick={() => rejectOrd(item.id)}>
                                                    <i className="ti ti-x" /> Return
                                                </button>
                                                <button type="button" className="mos-dash-btn-view" onClick={() => showToast(`Viewing ${item.num}`)}>
                                                    <i className="ti ti-eye" /> View
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ── APPROVED ── */}
                        <div className={`mos-dash-page-section ${section === "approved" ? "active" : ""}`}>
                            <div className="mos-dash-page-header">
                                <h2>Approved Ordinances</h2>
                                <p>All ordinances that have been approved and enacted</p>
                            </div>
                            <div className="mos-dash-panel">
                                <div className="mos-dash-panel-body" style={{ padding:0 }}>
                                    <table className="mos-dash-table">
                                        <thead><tr><th>No.</th><th>Title</th><th>Province</th><th>Barangay</th><th>Approved On</th><th>Approved By</th></tr></thead>
                                        <tbody>
                                            {[
                                                { num:"#2025-047", title:"Solid Waste Management Act",     prov:"Pampanga",    brgy:"Sto. Rosario",  date:"Jan 15, 2025", by:"Mayor Santos"     },
                                                { num:"#2025-046", title:"Anti-Littering Ordinance",       prov:"Bulacan",     brgy:"Cofradia",      date:"Jan 14, 2025", by:"Mayor Reyes"      },
                                                { num:"#2025-035", title:"Senior Citizen Priority Lane",   prov:"Bataan",      brgy:"Poblacion",     date:"Jan 8, 2025",  by:"Mayor Cruz"       },
                                                { num:"#2025-028", title:"Animal Control Ordinance",       prov:"Pampanga",    brgy:"Balibago",      date:"Jan 3, 2025",  by:"Mayor Santos"     },
                                                { num:"#2025-021", title:"Anti-Smoking in Public Areas",   prov:"Tarlac",      brgy:"San Roque",     date:"Dec 28, 2024", by:"Mayor Villanueva" },
                                                { num:"#2024-198", title:"Curfew Ordinance for Minors",    prov:"Nueva Ecija", brgy:"Sumacab Norte", date:"Dec 20, 2024", by:"Mayor Torres"     },
                                            ].map(r => (
                                                <tr key={r.num}>
                                                    <td><strong>{r.num}</strong></td>
                                                    <td>{r.title}</td><td>{r.prov}</td><td>{r.brgy}</td><td>{r.date}</td><td>{r.by}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* ── ANALYTICS & REPORTS ── */}
                        <div className={`mos-dash-page-section ${section === "reports" ? "active" : ""}`}>
                            <div className="mos-dash-page-header">
                                <h2>Analytics &amp; Reports</h2>
                                <p>Insights and statistics on ordinance management</p>
                            </div>
                            <div className="mos-dash-metrics-grid">
                                {[
                                    { label:"Approval Rate",        value:"89%",         change:"↑ 3% vs last quarter", type:"up"      },
                                    { label:"Avg. Review Time",     value:"4.2 days",    change:"↓ 0.8 days faster",    type:"up"      },
                                    { label:"Most Active Province", value:"Pampanga",    change:"247 this year",         type:"neutral" },
                                    { label:"Top Category",         value:"Environment", change:"38% of all filed",      type:"neutral" },
                                ].map(m => (
                                    <div className="mos-dash-metric-card" key={m.label}>
                                        <div className="mos-dash-metric-label">{m.label}</div>
                                        <div className={`mos-dash-metric-value ${m.value.length > 5 ? "sm" : ""}`}>{m.value}</div>
                                        <div className={`mos-dash-metric-change ${m.type}`}>{m.change}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="mos-dash-content-row">
                                <div className="mos-dash-panel">
                                    <div className="mos-dash-panel-header"><h3>Ordinances by Category</h3></div>
                                    <div className="mos-dash-panel-body">
                                        <div className="mos-dash-report-bars">
                                            {[
                                                { cat:"Environment",  pct:38, color:"#22c55e" },
                                                { cat:"Public Order", pct:24, color:"#2C687B" },
                                                { cat:"Commerce",     pct:18, color:"#f59e0b" },
                                                { cat:"Welfare",      pct:12, color:"#a855f7" },
                                                { cat:"Transport",    pct:8,  color:"#DB1A1A" },
                                            ].map(b => (
                                                <div key={b.cat}>
                                                    <div className="mos-dash-report-bar-row">
                                                        <span>{b.cat}</span><strong>{b.pct}%</strong>
                                                    </div>
                                                    <div className="mos-dash-progress-bar" style={{ height:7 }}>
                                                        <div className="mos-dash-progress-fill" style={{ width:`${b.pct}%`, background:b.color }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mos-dash-panel">
                                    <div className="mos-dash-panel-header"><h3>Top Provinces by Volume</h3></div>
                                    <div className="mos-dash-panel-body" style={{ padding:0 }}>
                                        <table className="mos-dash-table">
                                            <thead><tr><th>Province</th><th>Filed</th><th>Approved</th><th>Rate</th></tr></thead>
                                            <tbody>
                                                {[
                                                    { prov:"Pampanga",    filed:247, approved:231, rate:"93%", cls:"approved" },
                                                    { prov:"Bulacan",     filed:198, approved:175, rate:"88%", cls:"approved" },
                                                    { prov:"Nueva Ecija", filed:167, approved:142, rate:"85%", cls:"pending"  },
                                                    { prov:"Tarlac",      filed:143, approved:128, rate:"90%", cls:"pending"  },
                                                    { prov:"Zambales",    filed:98,  approved:79,  rate:"81%", cls:"pending"  },
                                                ].map(r => (
                                                    <tr key={r.prov}>
                                                        <td>{r.prov}</td><td>{r.filed}</td><td>{r.approved}</td>
                                                        <td><span className={`mos-dash-badge ${r.cls}`}>{r.rate}</span></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── BARANGAY MONITOR ── */}
                        <div className={`mos-dash-page-section ${section === "barangay" ? "active" : ""}`}>
                            <div className="mos-dash-page-header">
                                <h2>Barangay Monitor</h2>
                                <p>Track ordinance status per barangay across all LGUs</p>
                            </div>
                            <div className="mos-dash-panel">
                                <div className="mos-dash-panel-header">
                                    <h3>Barangay Compliance Status</h3>
                                    <select className="mos-dash-filter"><option>All Provinces</option><option>Pampanga</option><option>Bulacan</option></select>
                                </div>
                                <div className="mos-dash-panel-body" style={{ padding:0 }}>
                                    <table className="mos-dash-table">
                                        <thead><tr><th>Barangay</th><th>Municipality</th><th>Province</th><th>Total</th><th>Approved</th><th>Pending</th><th>Compliance</th></tr></thead>
                                        <tbody>
                                            {[
                                                { brgy:"Sto. Rosario", muni:"San Fernando",  prov:"Pampanga",    tot:14, appr:13, pend:1, comp:"93%",  cls:"approved" },
                                                { brgy:"Cofradia",     muni:"Malolos City",   prov:"Bulacan",     tot:11, appr:10, pend:1, comp:"91%",  cls:"approved" },
                                                { brgy:"Aduas Centro", muni:"Cabanatuan",     prov:"Nueva Ecija", tot:9,  appr:7,  pend:2, comp:"78%",  cls:"pending"  },
                                                { brgy:"Centro",       muni:"Baler",          prov:"Aurora",      tot:6,  appr:4,  pend:2, comp:"67%",  cls:"pending"  },
                                                { brgy:"Balibago",     muni:"Angeles City",   prov:"Pampanga",    tot:12, appr:12, pend:0, comp:"100%", cls:"approved" },
                                                { brgy:"East Tapinac", muni:"Olongapo City",  prov:"Zambales",    tot:8,  appr:5,  pend:2, comp:"63%",  cls:"rejected" },
                                                { brgy:"Poblacion",    muni:"Balanga City",   prov:"Bataan",      tot:10, appr:9,  pend:1, comp:"90%",  cls:"approved" },
                                                { brgy:"San Miguel",   muni:"Capas",          prov:"Tarlac",      tot:5,  appr:3,  pend:2, comp:"60%",  cls:"pending"  },
                                            ].map(r => (
                                                <tr key={r.brgy}>
                                                    <td>{r.brgy}</td><td>{r.muni}</td><td>{r.prov}</td>
                                                    <td>{r.tot}</td><td>{r.appr}</td><td>{r.pend}</td>
                                                    <td><span className={`mos-dash-badge ${r.cls}`}>{r.comp}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* ── SETTINGS ── */}
                        <div className={`mos-dash-page-section ${section === "settings" ? "active" : ""}`}>
                            <div className="mos-dash-page-header">
                                <h2>Settings</h2><p>System configuration and preferences</p>
                            </div>
                            <div className="mos-dash-panel" style={{ maxWidth:540 }}>
                                <div className="mos-dash-panel-body">
                                    <div className="mos-dash-form-field">
                                        <label>LGU Name</label>
                                        <input type="text" defaultValue="Region III — Central Luzon LGU System" />
                                    </div>
                                    <div className="mos-dash-form-field">
                                        <label>System Email</label>
                                        <input type="email" defaultValue="admin@lgu.gov.ph" />
                                    </div>
                                    <div className="mos-dash-form-row">
                                        <div className="mos-dash-form-field">
                                            <label>Default Province</label>
                                            <select><option>Pampanga</option><option>Bulacan</option></select>
                                        </div>
                                        <div className="mos-dash-form-field">
                                            <label>Review SLA (days)</label>
                                            <input type="number" defaultValue={5} />
                                        </div>
                                    </div>
                                    <div className="mos-dash-form-field">
                                        <label>Email Notifications</label>
                                        <select><option>All Events</option><option>Approvals Only</option><option>Pending Alerts</option><option>None</option></select>
                                    </div>
                                    <div className="mos-dash-form-actions">
                                        <button type="button" className="mos-dash-btn-sm" onClick={() => showToast("Settings saved successfully")}>
                                            <i className="ti ti-device-floppy" /> Save Settings
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── USERS & ROLES ── */}
                        <div className={`mos-dash-page-section ${section === "users" ? "active" : ""}`}>
                            <div className="mos-dash-page-header" style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                                <div><h2>Users &amp; Roles</h2><p>Manage system users and access levels</p></div>
                                <button type="button" className="mos-dash-btn-sm" onClick={() => showToast("Add user dialog coming soon")}>
                                    <i className="ti ti-user-plus" /> Add User
                                </button>
                            </div>
                            <div className="mos-dash-panel">
                                <div className="mos-dash-panel-body" style={{ padding:0 }}>
                                    <table className="mos-dash-table">
                                        <thead><tr><th>Name</th><th>Email</th><th>Province</th><th>Role</th><th>Status</th></tr></thead>
                                        <tbody>
                                            {[
                                                { name:"Admin User",      email:"admin@lgu.gov.ph",       prov:"All",      role:"Super Admin", roleCls:"active",   status:"Active",   stCls:"approved" },
                                                { name:"Maria Santos",    email:"m.santos@lgu.gov.ph",    prov:"Pampanga", role:"LGU Officer", roleCls:"pending",  status:"Active",   stCls:"approved" },
                                                { name:"Jose Reyes",      email:"j.reyes@lgu.gov.ph",     prov:"Bulacan",  role:"LGU Officer", roleCls:"pending",  status:"Active",   stCls:"approved" },
                                                { name:"Ana Cruz",        email:"a.cruz@lgu.gov.ph",      prov:"Aurora",   role:"Viewer",      roleCls:"draft",    status:"Inactive", stCls:"draft"    },
                                                { name:"Pedro Dela Cruz", email:"p.delacruz@lgu.gov.ph",  prov:"Zambales", role:"LGU Officer", roleCls:"pending",  status:"Active",   stCls:"approved" },
                                            ].map(r => (
                                                <tr key={r.email}>
                                                    <td><strong>{r.name}</strong></td>
                                                    <td>{r.email}</td><td>{r.prov}</td>
                                                    <td><span className={`mos-dash-badge ${r.roleCls}`}>{r.role}</span></td>
                                                    <td><span className={`mos-dash-badge ${r.stCls}`}>{r.status}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>{/* /.mos-dash-content */}
                </main>
            </div>

            {/* Toast */}
            {toast.visible && (
                <div className="mos-dash-toast">
                    <i className="ti ti-circle-check" /> {toast.msg}
                </div>
            )}
        </div>
    );
}

// ─── Public Site Data ────────────────────────────────────────────────────────
const provinceCards = [
    { name:"Aurora",      image:auroraImage      },
    { name:"Bataan",      image:bataanImage      },
    { name:"Bulacan",     image:bulacanImage     },
    { name:"Nueva Ecija", image:nuevaEcijaImage  },
    { name:"Pampanga",    image:pampangaImage    },
    { name:"Tarlac",      image:tarlacImage      },
    { name:"Zambales",    image:zambalesImage    },
];

const quickLinks = [
    { title:"News & Information", desc:"Publish news, regulations, and static pages with categories and tags." },
    { title:"Public Engagement",  desc:"Events, announcements, consultation, and polling for citizens."        },
    { title:"Media & Downloads",  desc:"Galleries, playlists, sliders, and secure document downloads."         },
];

const municipalStats = [
    { label:"Active Ordinances",    value:"245"   },
    { label:"Municipal Notices",    value:"18"    },
    { label:"Registered Citizens",  value:"1,250" },
    { label:"Downloaded Documents", value:"4,500" },
];

// ─── Main Demo Component ─────────────────────────────────────────────────────
export default function MunicipalOrdinanceDemo({ onClose }) {
    const MODAL_CLOSE_DELAY = 150;
    const LOGIN_CLOSE_DELAY = 140;

    const [showLoginModal,  setShowLoginModal ] = useState(false);
    const [isClosing,       setIsClosing      ] = useState(false);
    const [isLoginClosing,  setIsLoginClosing ] = useState(false);
    const [loginForm,       setLoginForm      ] = useState({ username:"", password:"" });
    const [activeProvince,  setActiveProvince ] = useState("Pampanga");
    const [loggedIn,        setLoggedIn       ] = useState(false);

    const demoAccounts = [
        { role:"Admin",  username:"admin",  password:"admin123",  icon:"👤" },
        { role:"Staff",  username:"staff",  password:"staff123",  icon:"👨‍💼" },
        { role:"Viewer", username:"viewer", password:"viewer123", icon:"👁️" },
    ];

    const fillDemoAccount = (account) => {
        setLoginForm({ username:account.username, password:account.password });
    };

    const [notification, setNotification] = useState({ visible:false, message:"", type:"info" });
    const notificationTimeoutRef  = useRef(null);
    const closeTimeoutRef         = useRef(null);
    const loginCloseTimeoutRef    = useRef(null);
    const provinceCarouselRef     = useRef(null);
    const isCarouselDraggingRef   = useRef(false);
    const carouselScrollEndTimeoutRef         = useRef(null);
    const carouselSettleTimeoutRef            = useRef(null);
    const carouselProgrammaticUnlockTimeoutRef= useRef(null);
    const isProgrammaticCarouselScrollRef     = useRef(false);
    const dragStartXRef           = useRef(0);
    const dragStartScrollLeftRef  = useRef(0);
    const previousHtmlOverflowRef = useRef("");
    const previousBodyOverflowRef = useRef("");
    const activeProvinceRef       = useRef("Pampanga");

    const showNotification = (message, type = "success", duration = 3600) => {
        if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
        setNotification({ visible:true, message, type });
        notificationTimeoutRef.current = setTimeout(() => {
            setNotification(prev => ({ ...prev, visible:false }));
            notificationTimeoutRef.current = null;
        }, duration);
    };

    const getAnimationDelay = () =>
        (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) ? 0 : MODAL_CLOSE_DELAY;

    const requestClose = () => {
        if (isClosing) return;
        setIsClosing(true);
        closeTimeoutRef.current = setTimeout(() => { onClose?.(); }, getAnimationDelay());
    };

    const requestLoginClose = () => {
        if (!showLoginModal || isLoginClosing) return;
        setIsLoginClosing(true);
        loginCloseTimeoutRef.current = setTimeout(() => {
            setShowLoginModal(false);
            setIsLoginClosing(false);
        }, (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) ? 0 : LOGIN_CLOSE_DELAY);
    };

    useEffect(() => { activeProvinceRef.current = activeProvince; }, [activeProvince]);

    useEffect(() => {
        previousHtmlOverflowRef.current = document.documentElement.style.overflow;
        previousBodyOverflowRef.current = document.body.style.overflow;
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        return () => {
            document.documentElement.style.overflow = previousHtmlOverflowRef.current;
            document.body.style.overflow = previousBodyOverflowRef.current;
            [closeTimeoutRef, loginCloseTimeoutRef, carouselSettleTimeoutRef,
             carouselScrollEndTimeoutRef, carouselProgrammaticUnlockTimeoutRef,
             notificationTimeoutRef].forEach(r => { if (r.current) clearTimeout(r.current); });
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                if (showLoginModal) { requestLoginClose(); return; }
                requestClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showLoginModal, isClosing, isLoginClosing]);

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        requestLoginClose();
        setLoggedIn(true);
        showNotification(`Welcome, ${loginForm.username || "User"}!`, "success", 3500);
    };

    // ── Carousel helpers ──
    const getProvinceCards = () => {
        const container = provinceCarouselRef.current;
        if (!container) return [];
        return Array.from(container.querySelectorAll(".mos-card"));
    };

    const getCenteredCardIndex = () => {
        const container = provinceCarouselRef.current;
        const cards = getProvinceCards();
        if (!container || !cards.length) return -1;
        const containerCenter = container.getBoundingClientRect().left + container.getBoundingClientRect().width / 2;
        let centeredIndex = 0, closestDistance = Infinity;
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const distance = Math.abs(containerCenter - (rect.left + rect.width / 2));
            if (distance < closestDistance) { closestDistance = distance; centeredIndex = index; }
        });
        return centeredIndex;
    };

    const scrollProvinceCardAtIndex = (index, behavior = "smooth") => {
        const cards = getProvinceCards();
        if (!cards.length) return;
        cards[(index + cards.length) % cards.length].scrollIntoView({ behavior, inline:"center", block:"nearest" });
    };

    const scrollProvinces = (direction, behavior = "smooth") => {
        const totalCards = provinceCards.length;
        if (!totalCards) return;
        const activeIndex = provinceCards.findIndex(p => p.name === activeProvinceRef.current);
        const baseIndex   = activeIndex >= 0 ? activeIndex : getCenteredCardIndex();
        if (baseIndex < 0) return;
        const targetIndex = (baseIndex + direction + totalCards) % totalCards;
        activeProvinceRef.current = provinceCards[targetIndex].name;
        isProgrammaticCarouselScrollRef.current = true;
        if (carouselProgrammaticUnlockTimeoutRef.current) clearTimeout(carouselProgrammaticUnlockTimeoutRef.current);
        carouselProgrammaticUnlockTimeoutRef.current = setTimeout(() => {
            isProgrammaticCarouselScrollRef.current = false;
            updateCenteredProvince();
        }, 320);
        setActiveProvince(provinceCards[targetIndex].name);
        scrollProvinceCardAtIndex(targetIndex, behavior);
    };

    const scrollProvinceIntoView = (provinceName, behavior = "smooth") => {
        const container = provinceCarouselRef.current;
        if (!container) return;
        container.querySelector(`[data-province="${provinceName}"]`)
            ?.scrollIntoView({ behavior, inline:"center", block:"nearest" });
    };

    const updateCenteredProvince = () => {
        const cards = getProvinceCards();
        if (!cards.length) return "";
        const centeredIndex = getCenteredCardIndex();
        if (centeredIndex < 0) return "";
        const closestProvince = cards[centeredIndex].getAttribute("data-province") || "";
        if (closestProvince) {
            activeProvinceRef.current = closestProvince;
            setActiveProvince(prev => (prev === closestProvince ? prev : closestProvince));
        }
        return closestProvince;
    };

    const handleCarouselPointerDown = (event) => {
        const container = provinceCarouselRef.current;
        if (!container) return;
        if (event.pointerType === "mouse" && event.button !== 0) return;
        isProgrammaticCarouselScrollRef.current = false;
        if (carouselProgrammaticUnlockTimeoutRef.current) clearTimeout(carouselProgrammaticUnlockTimeoutRef.current);
        isCarouselDraggingRef.current  = true;
        dragStartXRef.current          = event.clientX;
        dragStartScrollLeftRef.current = container.scrollLeft;
        container.classList.add("is-dragging");
        if (container.setPointerCapture) container.setPointerCapture(event.pointerId);
    };

    const handleCarouselPointerMove = (event) => {
        const container = provinceCarouselRef.current;
        if (!container || !isCarouselDraggingRef.current) return;
        container.scrollLeft = dragStartScrollLeftRef.current - (event.clientX - dragStartXRef.current);
    };

    const stopCarouselDragging = (event) => {
        const container = provinceCarouselRef.current;
        isCarouselDraggingRef.current = false;
        if (!container) return;
        if (event && container.hasPointerCapture?.(event.pointerId)) container.releasePointerCapture(event.pointerId);
        container.classList.remove("is-dragging");
        const centeredProvince = updateCenteredProvince();
        if (!centeredProvince) return;
        if (carouselSettleTimeoutRef.current) clearTimeout(carouselSettleTimeoutRef.current);
        carouselSettleTimeoutRef.current = setTimeout(() => { scrollProvinceIntoView(centeredProvince, "smooth"); }, 24);
    };

    useEffect(() => {
        const container = provinceCarouselRef.current;
        if (!container) return;
        const handleScroll = () => {
            if (carouselScrollEndTimeoutRef.current) clearTimeout(carouselScrollEndTimeoutRef.current);
            carouselScrollEndTimeoutRef.current = setTimeout(() => {
                if (!isProgrammaticCarouselScrollRef.current) updateCenteredProvince();
            }, 80);
        };
        container.addEventListener("scroll", handleScroll, { passive:true });
        window.addEventListener("resize", updateCenteredProvince);
        updateCenteredProvince();
        scrollProvinceIntoView(activeProvince, "auto");
        return () => {
            container.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateCenteredProvince);
        };
    }, []);

    // ── Render ──
    return (
        <div className={`demo-modal ${isClosing ? "is-closing" : ""}`} role="dialog" aria-modal="true" aria-label="Municipal Ordinance demo">
            <button type="button" className="demo-modal-backdrop" aria-label="Close demo" onClick={requestClose} />
            <div className="demo-shell">
                <header className="demo-topbar">
                    <div className="demo-topbar-left">
                        <button type="button" className="demo-back" onClick={requestClose} aria-label="Go back to portfolio">
                            {"< Back"}
                        </button>
                        <div>
                            <p className="demo-kicker">{loggedIn ? "A Capstone 1 Project" : "A Capstone 1 Project"}</p>
                            <h2>Municipal Ordinance System Demo</h2>
                        </div>
                    </div>
                    <div className="demo-topbar-right">
                        {/* {loggedIn && (
                            <button
                                type="button"
                                className="demo-close"
                                style={{ marginRight:".5rem", background:"transparent", border:"1px solid #d8e2ea", color:"#28323d" }}
                                onClick={() => setLoggedIn(false)}
                            >
                                Public Site
                            </button>
                        )} */}
                        <span className="demo-close-hint">Press Esc or close</span>
                        <button type="button" className="demo-close" onClick={requestClose}>
                            Close
                        </button>
                    </div>
                </header>

                {/* ── System Content ── */}
                <div
                    className="mos-system"
                    style={loggedIn
                        ? { display:"flex", flexDirection:"column", flex:"1", minHeight:0, overflow:"hidden" }
                        : {}
                    }
                >
                    {loggedIn ? (
                        <MosDashboard onLogout={() => setLoggedIn(false)} username={loginForm.username} />
                    ) : (
                        <>
                            {notification.visible && (
                                <div className={`mos-notification ${notification.type}`} role="status" aria-live="polite">
                                    <div className="mos-notification-body">
                                        <div className="mos-notification-icon" aria-hidden>
                                            {notification.type === "success" ? "✅" : "ℹ️"}
                                        </div>
                                        <div className="mos-notification-message">{notification.message}</div>
                                        <button className="mos-notification-close" onClick={() => setNotification(s => ({ ...s, visible:false }))} aria-label="Dismiss">×</button>
                                    </div>
                                </div>
                            )}

                            <nav className="mos-navbar">
                                <div className="mos-logo">MUNICIPAL ORDINANCE</div>
                                <div className="mos-nav-links">
                                    <a href="#" onClick={e => e.preventDefault()}>Home</a>
                                    <a href="#" onClick={e => e.preventDefault()}>Province</a>
                                    <a href="#" onClick={e => e.preventDefault()}>About Us</a>
                                    <a href="#" onClick={e => e.preventDefault()}>Contact</a>
                                </div>
                                <button type="button" className="mos-login-btn" onClick={() => { setIsLoginClosing(false); setShowLoginModal(true); }}>
                                    LOGIN
                                </button>
                            </nav>

                            <section className="mos-hero">
                                <h1>Provinces</h1>
                                <p>Aurora, Bataan, Bulacan, Nueva Ecija, Pampanga, Tarlac, and Zambales</p>
                            </section>

                            <section className="mos-province-carousel" aria-label="Province carousel">
                                <button type="button" className="mos-carousel-btn" aria-label="Previous provinces" onClick={() => scrollProvinces(-1)}>‹</button>
                                <div
                                    className="mos-province-section"
                                    ref={provinceCarouselRef}
                                    onPointerDown={handleCarouselPointerDown}
                                    onPointerMove={handleCarouselPointerMove}
                                    onPointerUp={e => stopCarouselDragging(e)}
                                    onPointerCancel={e => stopCarouselDragging(e)}
                                    onPointerLeave={() => { if (isCarouselDraggingRef.current) stopCarouselDragging(); }}
                                >
                                    {provinceCards.map(province => {
                                        const isActive = activeProvince === province.name;
                                        return (
                                            <article key={province.name} className={`mos-card ${isActive ? "is-centered" : ""}`} data-province={province.name}>
                                                <img src={province.image} alt={province.name} />
                                                <button
                                                    type="button"
                                                    className={`mos-view-btn ${isActive ? "active" : ""}`}
                                                    onClick={() => { setActiveProvince(province.name); scrollProvinceIntoView(province.name); }}
                                                >
                                                    {province.name}
                                                </button>
                                            </article>
                                        );
                                    })}
                                </div>
                                <button type="button" className="mos-carousel-btn" aria-label="Next provinces" onClick={() => scrollProvinces(1)}>›</button>
                            </section>

                            <section className="mos-quick-links">
                                {quickLinks.map(item => (
                                    <article key={item.title} className="mos-quick-card">
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </article>
                                ))}
                            </section>

                            <section className="mos-stats-strip" aria-label="Municipal statistics overview">
                                {municipalStats.map(stat => (
                                    <article key={stat.label} className="mos-stat-card">
                                        <p className="mos-stat-value">{stat.value}</p>
                                        <p className="mos-stat-label">{stat.label}</p>
                                    </article>
                                ))}
                            </section>

                            <footer className="mos-footer">© 2026 Municipal Ordinance System | All Rights Reserved</footer>

                            {showLoginModal && (
                                <div className={`mos-login-modal ${isLoginClosing ? "is-closing" : ""}`} role="dialog" aria-modal="true">
                                    <div className="mos-modal-content">
                                        <button type="button" className="mos-close" aria-label="Close login modal" onClick={requestLoginClose}>×</button>
                                        <h2>Municipal Ordinance System</h2>
                                        <p className="mos-modal-subtitle">Login to your account</p>
                                        <form onSubmit={handleLoginSubmit}>
                                            <div className="mos-form-field">
                                                <input type="text" placeholder="Username" value={loginForm.username}
                                                    onChange={e => setLoginForm(prev => ({ ...prev, username:e.target.value }))} required />
                                            </div>
                                            <div className="mos-form-field">
                                                <input type="password" placeholder="Password" value={loginForm.password}
                                                    onChange={e => setLoginForm(prev => ({ ...prev, password:e.target.value }))} required />
                                            </div>
                                            <button type="submit" className="mos-login-submit">Login</button>
                                        </form>
                                        <div className="mos-demo-divider"><span>Demo Accounts</span></div>
                                        <div className="mos-demo-accounts">
                                            {demoAccounts.map(account => (
                                                <button key={account.role} type="button" className="mos-demo-account"
                                                    onClick={() => fillDemoAccount(account)}
                                                    title={`${account.role}: ${account.username} / ${account.password}`}>
                                                    <span className="mos-account-icon">{account.icon}</span>
                                                    <div className="mos-account-info">
                                                        <p className="mos-account-role">{account.role}</p>
                                                        <p className="mos-account-creds">{account.username}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                        <p className="mos-demo-notice">For testing purposes only. Click any account to auto-fill the form.</p>
                                    </div>
                                    <button type="button" className="mos-modal-backdrop-hit" aria-label="Close login modal" onClick={requestLoginClose} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}