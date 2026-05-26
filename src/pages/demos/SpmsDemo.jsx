import { useState, useEffect, useRef } from "react";
import dhvsuImage from "../../assets/dhvsu.jpg";
import dhvsuLogo from "../../assets/dhvsulogo.png";

const MAROON = "#5c0017";
const GOLD = "#feba29";

// ── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useScrollReveal({ animation = "fade-up", delay = 0, threshold = 0.15 } = {}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);
    const base = { transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` };
    const hidden = {
        "fade-up": { opacity: 0, transform: "translateY(40px)" },
        "fade-left": { opacity: 0, transform: "translateX(40px)" },
        "zoom-in": { opacity: 0, transform: "scale(0.88)" },
    }[animation] || { opacity: 0 };
    const shown = { opacity: 1, transform: "none" };
    return { ref, style: { ...base, ...(visible ? shown : hidden) } };
}
function Reveal({ animation, delay, threshold, children, style: extraStyle, ...rest }) {
    const { ref, style } = useScrollReveal({ animation, delay, threshold });
    return <div ref={ref} style={{ ...style, ...extraStyle }} {...rest}>{children}</div>;
}

// ── DEMO DATA ─────────────────────────────────────────────────────────────────
const DEMO_USER = { name: "Dr. Maria Santos", role: "Associate Professor", college: "CCS", campus: "Main Campus", avatar: "MS" };

const IPCR_DATA = [
    { id: 1, kra: "Teaching & Learning", indicator: "Conduct 18 contact hours per week", target: 18, actual: 18, rating: 5, weight: 35, status: "Accomplished" },
    { id: 2, kra: "Teaching & Learning", indicator: "Submit course syllabus on time", target: 1, actual: 1, rating: 5, weight: 10, status: "Accomplished" },
    { id: 3, kra: "Research", indicator: "Publish 1 peer-reviewed journal article", target: 1, actual: 0, rating: 1, weight: 20, status: "Not Accomplished" },
    { id: 4, kra: "Extension", indicator: "Conduct 2 community extension activities", target: 2, actual: 2, rating: 5, weight: 15, status: "Accomplished" },
    { id: 5, kra: "Production", indicator: "Develop 1 instructional material", target: 1, actual: 1, rating: 5, weight: 10, status: "Accomplished" },
    { id: 6, kra: "Administrative", indicator: "Attend all faculty meetings", target: 12, actual: 11, rating: 4, weight: 10, status: "Partially Accomplished" },
];

const OPCR_DATA = [
    { id: 1, mfo: "Higher Education Services", success: "Quality instruction delivered", measure: "85% passing rate", target: "85%", actual: "88%", rating: 5, status: "Met" },
    { id: 2, mfo: "Higher Education Services", success: "Research outputs generated", measure: "No. of publications", target: "3", actual: "2", rating: 3, status: "Partial" },
    { id: 3, mfo: "Research Services", success: "Research utilization", measure: "No. of applied research", target: "2", actual: "2", rating: 5, status: "Met" },
    { id: 4, mfo: "Extension Services", success: "Community engagement", measure: "No. of beneficiaries", target: "200", actual: "245", rating: 5, status: "Exceeded" },
    { id: 5, mfo: "Support Services", success: "Administrative efficiency", measure: "Submission compliance rate", target: "100%", actual: "95%", rating: 4, status: "Partial" },
];

const RECENT_ACTIVITY = [
    { id: 1, name: "Dr. Maria Santos", email: "m.santos@dhvsu.edu.ph", date: "2025-05-20", type: "IPCR Submission", status: "Approved" },
    { id: 2, name: "Prof. Juan dela Cruz", email: "j.delacruz@dhvsu.edu.ph", date: "2025-05-19", type: "OPCR Review", status: "Pending" },
    { id: 3, name: "Dr. Ana Reyes", email: "a.reyes@dhvsu.edu.ph", date: "2025-05-18", type: "IPCR Submission", status: "For Review" },
    { id: 4, name: "Prof. Carlo Manalo", email: "c.manalo@dhvsu.edu.ph", date: "2025-05-17", type: "Evidence Upload", status: "Approved" },
    { id: 5, name: "Dr. Liza Ocampo", email: "l.ocampo@dhvsu.edu.ph", date: "2025-05-16", type: "IPCR Submission", status: "Approved" },
];

const FACULTY_LIST = [
    { id: 1, name: "Dr. Maria Santos", college: "CCS", position: "Associate Professor", ipcr: 4.2, status: "Submitted" },
    { id: 2, name: "Prof. Juan dela Cruz", college: "CEA", position: "Instructor I", ipcr: 3.8, status: "Pending" },
    { id: 3, name: "Dr. Ana Reyes", college: "COE", position: "Assistant Professor", ipcr: 4.6, status: "Approved" },
    { id: 4, name: "Prof. Carlo Manalo", college: "CCS", position: "Instructor II", ipcr: 4.0, status: "Submitted" },
    { id: 5, name: "Dr. Liza Ocampo", college: "CBE", position: "Professor II", ipcr: 4.8, status: "Approved" },
    { id: 6, name: "Prof. Rey Bautista", college: "CEA", position: "Instructor I", ipcr: 3.5, status: "Draft" },
];

const EVIDENCES = [
    { id: 1, title: "Certificate of Teaching Excellence", type: "Teaching", date: "2025-05-10", size: "2.4 MB", status: "Verified" },
    { id: 2, title: "Published Journal Article - IJCS Vol 12", type: "Research", date: "2025-04-22", size: "1.1 MB", status: "Verified" },
    { id: 3, title: "Community Extension Report Q1", type: "Extension", date: "2025-03-30", size: "3.2 MB", status: "Pending" },
    { id: 4, title: "Course Syllabus AY 2024-2025", type: "Teaching", date: "2025-02-15", size: "512 KB", status: "Verified" },
    { id: 5, title: "Seminar Attendance - ICT Summit", type: "Professional Dev.", date: "2025-01-28", size: "890 KB", status: "Verified" },
];

// ── IPCR FORM DATA (mirrors PHP tbl_si tables) ────────────────────────────────
const STRATEGIC_PRIORITIES = [
    {
        section: "KRA 1: Access and Equity",
        objectives: [
            {
                so: "SO 1. Advance students' holistic well-being",
                indicators: [
                    "100% of students with special needs are given appropriate interventions as needed",
                ],
            },
            {
                so: "SO 2. Widen access to quality and inclusive student services",
                indicators: [],
            },
        ],
    },
    {
        section: "KRA 2: Quality and Relevance of Instruction",
        objectives: [
            {
                so: "SO 3. Strengthen the quality and relevance of instruction",
                indicators: [],
            },
            {
                so: "SO 4. Produce globally competitive graduates",
                indicators: [],
            },
        ],
    },
    {
        section: "KRA 3: Excellence in Research and Creative Works",
        objectives: [
            {
                so: "SO 5. Engage in viable and relevant",
                indicators: [],
            },
        ],
    },
    {
        section: "KRA 4: Extension Services",
        objectives: [
            {
                so: "SO 6. Expand extension and training services",
                indicators: [],
            },
        ],
    },
    {
        section: "KRA 5: Good Governance and Management of Resources",
        objectives: [
            { so: "SO 7. Elevate human capital", indicators: [] },
            { so: "SO 8. Upgrade and safeguard physical facilities and its environs", indicators: [] },
            { so: "SO 9. Sustain prudent management of resources", indicators: [] },
            { so: "SO 10. Ensure adherance to good governance", indicators: [] },
            { so: "SO 11. Intensity gender and development advocacies", indicators: [] },
        ],
    },
];

const CORE_FUNCTIONS = [
    { label: "Attendance and Punctuality", indicators: [] },
    { label: "Appearance and Personality", indicators: [] },
    { label: "Submission of Reports", indicators: [] },
    { label: "Teaching & Learning Process", indicators: [] },
    { label: "Participate in official activities at the department, college, or university level", indicators: [] },
];

const SUPPORT_FUNCTIONS = [
    { label: "Designations (Chairperson, Coordinator, Liaison/Focal Person)", indicators: [] },
    { label: "Organization/Class Adviser/Research Adviser/Research Panel", indicators: [] },
    { label: "Participation in official activities at the department, college or university level", indicators: [] },
    { label: "Support to other University Units", indicators: [] },
    { label: "Socio-Civic and other Affiliations", indicators: [] },
];

// ── Shared UI atoms ───────────────────────────────────────────────────────────
const Badge = ({ children, color }) => {
    const palettes = {
        green: { bg: "#e6f4ea", color: "#2e7d32" },
        amber: { bg: "#fff8e1", color: "#f57f17" },
        red: { bg: "#fce8e6", color: "#c62828" },
        blue: { bg: "#e3f2fd", color: "#1565c0" },
        gray: { bg: "#f5f5f5", color: "#555" },
        maroon: { bg: "#fce4ec", color: MAROON },
    };
    const p = palettes[color] || palettes.gray;
    return (
        <span style={{ background: p.bg, color: p.color, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20, letterSpacing: 0.3, whiteSpace: "nowrap" }}>
            {children}
        </span>
    );
};

const statusBadge = (s) => {
    const map = {
        Approved: "green", Submitted: "blue", Pending: "amber", Draft: "gray",
        "For Review": "amber", "Not Accomplished": "red", Accomplished: "green",
        "Partially Accomplished": "amber", Met: "green", Partial: "amber",
        Exceeded: "green", Verified: "green", "Not Verified": "red",
    };
    return <Badge color={map[s] || "gray"}>{s}</Badge>;
};

const RatingBar = ({ rating }) => {
    const colors = ["#ef5350", "#ef5350", "#ffa726", "#ffa726", "#66bb6a", "#66bb6a"];
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 6, background: "#eee", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${(rating / 5) * 100}%`, height: "100%", background: colors[rating] || "#aaa", borderRadius: 4, transition: "width .5s" }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: colors[rating] || "#aaa", minWidth: 14 }}>{rating}</span>
        </div>
    );
};

// ── IPCR FORM ROW ─────────────────────────────────────────────────────────────
function IPCRFormRow({ indicator, rowData, onChange }) {
    const { aa, ev, q, e, t, r } = rowData;
    const avg = (q !== "" && e !== "" && t !== "")
        ? ((parseFloat(q) + parseFloat(e) + parseFloat(t)) / 3).toFixed(2)
        : "";

    const selectStyle = {
        padding: "3px 4px", fontSize: 11, border: "1px solid #ccc",
        borderRadius: 4, background: "#fff", cursor: "pointer",
        fontFamily: "'Poppins', sans-serif", width: 58,
    };
    const labelStyle = { fontSize: 10, fontWeight: 700, color: "#555", display: "block", marginBottom: 2 };

    return (
        <tr style={{ borderBottom: "1px solid #ccc" }}>
            {/* Success Indicator */}
            <td style={{ padding: "6px 8px", verticalAlign: "middle", minWidth: 200 }}>
                <textarea
                    disabled
                    value={indicator}
                    style={{
                        width: "100%", height: 70, resize: "none", fontSize: 11, padding: "4px 6px",
                        border: "1px solid #ccc", borderRadius: 4, background: "#f9f9f9",
                        fontFamily: "'Poppins', sans-serif", color: "#444", boxSizing: "border-box"
                    }}
                />
            </td>
            {/* Actual Accomplishment */}
            <td style={{ padding: "6px 8px", verticalAlign: "middle", minWidth: 150 }}>
                <textarea
                    value={aa}
                    onChange={e2 => onChange({ ...rowData, aa: e2.target.value })}
                    style={{
                        width: "100%", height: 70, resize: "none", fontSize: 11, padding: "4px 6px",
                        border: "1px solid #ccc", borderRadius: 4, fontFamily: "'Poppins', sans-serif",
                        boxSizing: "border-box"
                    }}
                />
            </td>
            {/* Evidence */}
            <td style={{ padding: "6px 8px", verticalAlign: "middle", minWidth: 160 }}>
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={e2 => onChange({ ...rowData, ev: e2.target.files[0]?.name || "" })}
                    style={{ fontSize: 11, width: "100%" }}
                />
            </td>
            {/* Q1 */}
            <td style={{ padding: "6px 8px", verticalAlign: "middle", textAlign: "center" }}>
                <label style={labelStyle}>Q1</label>
                <select value={q} onChange={e2 => onChange({ ...rowData, q: e2.target.value })} style={selectStyle}>
                    <option value="">-Select-</option>
                    {[0, 1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
            </td>
            {/* E2 */}
            <td style={{ padding: "6px 8px", verticalAlign: "middle", textAlign: "center" }}>
                <label style={labelStyle}>E2</label>
                <select value={e} onChange={e2 => onChange({ ...rowData, e: e2.target.value })} style={selectStyle}>
                    <option value="">-Select-</option>
                    {[0, 1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
            </td>
            {/* T3 */}
            <td style={{ padding: "6px 8px", verticalAlign: "middle", textAlign: "center" }}>
                <label style={labelStyle}>T3</label>
                <select value={t} onChange={e2 => onChange({ ...rowData, t: e2.target.value })} style={selectStyle}>
                    <option value="">-Select-</option>
                    {[0, 1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
            </td>
            {/* A4 average */}
            <td style={{ padding: "6px 8px", verticalAlign: "middle", textAlign: "center" }}>
                <label style={labelStyle}>A4</label>
                <input
                    type="text"
                    readOnly
                    value={avg}
                    style={{
                        width: 50, textAlign: "center", fontSize: 11, padding: "3px 4px",
                        border: "1px solid #ccc", borderRadius: 4, background: "#f9f9f9",
                        fontFamily: "'Poppins', sans-serif"
                    }}
                />
            </td>
            {/* Remarks */}
            <td style={{ padding: "6px 8px", verticalAlign: "middle", minWidth: 120 }}>
                <textarea
                    value={r}
                    onChange={e2 => onChange({ ...rowData, r: e2.target.value })}
                    style={{
                        width: "100%", height: 70, resize: "none", fontSize: 11, padding: "4px 6px",
                        border: "1px solid #ccc", borderRadius: 4, fontFamily: "'Poppins', sans-serif",
                        boxSizing: "border-box"
                    }}
                />
            </td>
        </tr>
    );
}

// ── IPCR FORM PAGE ────────────────────────────────────────────────────────────
function IPCRFormPage({ darkMode }) {
    const dm = darkMode;
    const bg = dm ? "#12000a" : "#fffbf0";

    // Build initial state: one row per indicator (or one empty row if none)
    const buildInitialRows = (indicators) => {
        const src = indicators.length > 0 ? indicators : [""];
        return src.map(ind => ({ indicator: ind, aa: "", ev: "", q: "", e: "", t: "", r: "" }));
    };

    const [spRows, setSpRows] = useState(() => {
        const obj = {};
        STRATEGIC_PRIORITIES.forEach(kra => {
            kra.objectives.forEach(obj2 => {
                const key = obj2.so;
                obj[key] = buildInitialRows(obj2.indicators);
            });
        });
        return obj;
    });

    const [cfRows, setCfRows] = useState(() => {
        const obj = {};
        CORE_FUNCTIONS.forEach(cf => { obj[cf.label] = buildInitialRows(cf.indicators); });
        return obj;
    });

    const [sfRows, setSfRows] = useState(() => {
        const obj = {};
        SUPPORT_FUNCTIONS.forEach(sf => { obj[sf.label] = buildInitialRows(sf.indicators); });
        return obj;
    });

    const updateRow = (setter, key, index, newData) => {
        setter(prev => {
            const updated = [...prev[key]];
            updated[index] = newData;
            return { ...prev, [key]: updated };
        });
    };

    const thStyle = {
        background: dm ? "#3a0010" : "#FFE6AC",
        color: dm ? "#fff" : "#333",
        border: "1px solid #999",
        padding: "7px 8px",
        fontSize: 12,
        fontWeight: 700,
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
        whiteSpace: "nowrap",
    };

    const sectionHeaderStyle = {
        background: dm ? "#2d4a00" : "#9FBB73",
        color: dm ? "#fff" : "#222",
        fontWeight: 700,
        textAlign: "center",
        padding: "7px 10px",
        fontSize: 13,
        border: "1px solid #999",
        fontFamily: "'Poppins', sans-serif",
    };

    const kraStyle = {
        background: dm ? "#1e3500" : "#C7DCA7",
        fontWeight: 700,
        textAlign: "left",
        padding: "6px 10px",
        fontSize: 12,
        border: "1px solid #999",
        fontFamily: "'Poppins', sans-serif",
        color: dm ? "#fff" : "#222",
    };

    const soStyle = {
        background: dm ? "#140010" : "#f5f5f5",
        fontWeight: 600,
        textAlign: "center",
        padding: "6px 10px",
        fontSize: 11,
        border: "1px solid #ccc",
        fontFamily: "'Poppins', sans-serif",
        color: dm ? "#ddd" : "#333",
        maxWidth: 200,
    };

    const noTargetStyle = {
        textAlign: "center",
        fontSize: 12,
        color: "#888",
        padding: "8px",
        border: "1px solid #ccc",
        fontStyle: "italic",
        fontFamily: "'Poppins', sans-serif",
    };

    const handleSubmit = () => {
        alert("IPCR Form submitted successfully!");
    };

    return (
        <div style={{ padding: 24, background: bg, minHeight: "100%" }}>
            {/* Header */}
            <div style={{
                background: dm ? "#200010" : "#fff",
                borderRadius: 12,
                padding: "16px 20px",
                marginBottom: 20,
                border: `2px solid ${dm ? "rgba(254,186,41,.2)" : "#c0a060"}`,
                boxShadow: "0 3px 12px rgba(0,0,0,.08)"
            }}>
                <h1 style={{
                    textAlign: "center",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 22,
                    fontWeight: 800,
                    color: dm ? GOLD : MAROON,
                    margin: "0 0 4px",
                    letterSpacing: 0.5
                }}>IPCR Form</h1>
                <p style={{ textAlign: "center", margin: 0, fontSize: 12, color: dm ? "#ccc" : "#777", fontFamily: "'Poppins', sans-serif" }}>
                    Individual Performance Commitment and Review — AY 2024-2025
                </p>
            </div>

            {/* Table wrapper */}
            <div style={{
                background: dm ? "#200010" : "beige",
                borderRadius: 12,
                border: `2px solid ${dm ? "rgba(254,186,41,.2)" : "#999"}`,
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,.1)"
            }}>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
                        {/* Column headers */}
                        <thead>
                            <tr>
                                <th style={{ ...thStyle, minWidth: 200 }}>Output</th>
                                <th style={{ ...thStyle, minWidth: 200 }}>Success Indicator (Targets + Measures)</th>
                                <th style={{ ...thStyle, minWidth: 150 }}>Actual Accomplishment</th>
                                <th style={{ ...thStyle, minWidth: 160 }}>Evidence</th>
                                <th style={{ ...thStyle, minWidth: 70 }} colSpan={4}>Ratings</th>
                                <th style={{ ...thStyle, minWidth: 120 }}>Remarks</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* ── STRATEGIC PRIORITIES ── */}
                            <tr>
                                <td colSpan={9} style={sectionHeaderStyle}>Strategic Priorities: (50%)</td>
                            </tr>

                            {STRATEGIC_PRIORITIES.map(kra => (
                                <>
                                    <tr key={kra.section}>
                                        <td colSpan={9} style={kraStyle}>{kra.section}</td>
                                    </tr>

                                    {kra.objectives.map(obj => {
                                        const rows = spRows[obj.so] || [];
                                        const hasIndicators = obj.indicators.length > 0;
                                        return (
                                            <>
                                                {/* SO row */}
                                                <tr key={obj.so}>
                                                    <td style={soStyle}>{obj.so}</td>
                                                    {hasIndicators ? (
                                                        /* First indicator row inline */
                                                        rows.length > 0 ? (
                                                            <>
                                                                <td style={{ padding: "6px 8px", verticalAlign: "middle", minWidth: 200 }}>
                                                                    <textarea disabled value={rows[0].indicator}
                                                                        style={{
                                                                            width: "100%", height: 70, resize: "none", fontSize: 11,
                                                                            padding: "4px 6px", border: "1px solid #ccc", borderRadius: 4,
                                                                            background: "#f9f9f9", fontFamily: "'Poppins', sans-serif",
                                                                            color: "#444", boxSizing: "border-box"
                                                                        }} />
                                                                </td>
                                                                <td style={{ padding: "6px 8px", verticalAlign: "middle" }}>
                                                                    <textarea style={{
                                                                        width: "100%", height: 70, resize: "none", fontSize: 11,
                                                                        padding: "4px 6px", border: "1px solid #ccc", borderRadius: 4,
                                                                        fontFamily: "'Poppins', sans-serif", boxSizing: "border-box"
                                                                    }} />
                                                                </td>
                                                                <td style={{ padding: "6px 8px", verticalAlign: "middle" }}>
                                                                    <input type="file" accept=".jpg,.jpeg,.png" style={{ fontSize: 11 }} />
                                                                </td>
                                                                {["Q1", "E2", "T3"].map(label => (
                                                                    <td key={label} style={{ padding: "6px 8px", verticalAlign: "middle", textAlign: "center" }}>
                                                                        <label style={{ fontSize: 10, fontWeight: 700, color: "#555", display: "block", marginBottom: 2 }}>{label}</label>
                                                                        <select style={{ padding: "3px 4px", fontSize: 11, border: "1px solid #ccc", borderRadius: 4, width: 58 }}>
                                                                            <option>-Select-</option>
                                                                            {[0, 1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
                                                                        </select>
                                                                    </td>
                                                                ))}
                                                                <td style={{ padding: "6px 8px", verticalAlign: "middle", textAlign: "center" }}>
                                                                    <label style={{ fontSize: 10, fontWeight: 700, color: "#555", display: "block", marginBottom: 2 }}>A4</label>
                                                                    <input readOnly style={{
                                                                        width: 50, textAlign: "center", fontSize: 11, padding: "3px 4px",
                                                                        border: "1px solid #ccc", borderRadius: 4, background: "#f9f9f9"
                                                                    }} />
                                                                </td>
                                                                <td style={{ padding: "6px 8px", verticalAlign: "middle" }}>
                                                                    <textarea style={{
                                                                        width: "100%", height: 70, resize: "none", fontSize: 11,
                                                                        padding: "4px 6px", border: "1px solid #ccc", borderRadius: 4,
                                                                        fontFamily: "'Poppins', sans-serif", boxSizing: "border-box"
                                                                    }} />
                                                                </td>
                                                            </>
                                                        ) : (
                                                            <td colSpan={8} style={noTargetStyle}>No Target Set</td>
                                                        )
                                                    ) : (
                                                        <td colSpan={8} style={noTargetStyle}>No Target Set</td>
                                                    )}
                                                </tr>

                                                {/* Additional indicator rows (if > 1) */}
                                                {hasIndicators && rows.slice(1).map((row, idx) => (
                                                    <IPCRFormRow
                                                        key={idx}
                                                        indicator={row.indicator}
                                                        rowData={row}
                                                        onChange={newData => updateRow(setSpRows, obj.so, idx + 1, newData)}
                                                    />
                                                ))}
                                            </>
                                        );
                                    })}
                                </>
                            ))}

                            {/* ── CORE FUNCTIONS ── */}
                            <tr>
                                <td colSpan={9} style={sectionHeaderStyle}>Core Functions: (35%)</td>
                            </tr>

                            {CORE_FUNCTIONS.map(cf => {
                                const rows = cfRows[cf.label] || [];
                                return (
                                    <tr key={cf.label}>
                                        <td style={soStyle}>{cf.label}</td>
                                        <td colSpan={8} style={noTargetStyle}>No Target Set</td>
                                    </tr>
                                );
                            })}

                            {/* ── SUPPORT FUNCTIONS ── */}
                            <tr>
                                <td colSpan={9} style={sectionHeaderStyle}>Support Functions: (15%)</td>
                            </tr>

                            {SUPPORT_FUNCTIONS.map(sf => (
                                <tr key={sf.label}>
                                    <td style={soStyle}>{sf.label}</td>
                                    <td colSpan={8} style={noTargetStyle}>No Target Set</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Submit button */}
                <div style={{ padding: "14px 20px", display: "flex", justifyContent: "flex-end", background: dm ? "#1a000c" : "#f5f0e8", borderTop: "1px solid #ccc" }}>
                    <button
                        onClick={handleSubmit}
                        style={{
                            padding: "10px 28px",
                            background: MAROON,
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            fontSize: 14,
                            fontWeight: 700,
                            cursor: "pointer",
                            fontFamily: "'Poppins', sans-serif",
                            letterSpacing: 0.5,
                            boxShadow: "0 3px 10px rgba(92,0,23,.35)",
                            transition: "background .2s, transform .15s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#8a0025"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = MAROON; e.currentTarget.style.transform = "none"; }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── LOGIN PAGE ────────────────────────────────────────────────────────────────
function LoginPage({ onBack, onLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => { setLoading(false); onLogin(); }, 900);
    };

    return (
        <>
            <style>{`
                @keyframes loginCircle1 { 0%, 100% { transform: scale(1) translate(0, 0); } 50% { transform: scale(1.06) translate(-10px, 12px); } }
                @keyframes loginCircle2 { 0%, 100% { transform: scale(1) translate(0, 0); } 50% { transform: scale(1.05) translate(10px, -10px); } }
                @keyframes loginFadeIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
                .lp-input:focus { outline: none; border-color: #90caf9 !important; box-shadow: 0 0 0 3px rgba(33,150,243,0.13) !important; }
                .lp-input::placeholder { color: #bbb; font-size: 13px; }
                .lp-btn:hover { background: #1565c0 !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(21,101,192,0.35) !important; }
                .lp-btn:active { transform: translateY(0); }
                .lp-link:hover { text-decoration: underline; }
                .lp-back:hover { color: ${MAROON} !important; }
            `}</style>
            <div style={{ minHeight: "100%", background: "#fef6e4", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 20px", position: "relative", overflow: "hidden", fontFamily: "'Poppins', sans-serif" }}>
                <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(254,186,41,0.22)", animation: "loginCircle1 9s ease-in-out infinite", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -90, left: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(254,186,41,0.16)", animation: "loginCircle2 11s ease-in-out infinite", pointerEvents: "none" }} />

                <button className="lp-back" onClick={onBack} style={{ position: "absolute", top: 16, left: 16, background: "none", border: "none", color: "#999", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "'Poppins', sans-serif", transition: "color 0.2s", padding: "6px 10px", borderRadius: 6 }}>
                    ← Back
                </button>

                <div style={{ animation: "loginFadeIn 0.45s ease both", width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>
                    <div style={{ textAlign: "center", marginBottom: 24 }}>
                        <div style={{ width: 84, height: 84, borderRadius: "50%", background: `radial-gradient(circle at 38% 32%, #8a0025, ${MAROON} 75%)`, display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 28px rgba(92,0,23,0.38)`, border: `3px solid ${GOLD}`, marginBottom: 14 }}>
                            <img src={dhvsuLogo} alt="DHVSU logo" style={{ width: 66, height: 66, objectFit: "contain", borderRadius: "50%" }}
                                onError={(e) => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<span style="font-size:9px;font-weight:800;color:${GOLD};text-align:center;line-height:1.3;padding:4px;display:block;">DON<br/>HONORIO<br/>VENTURA</span>`; }} />
                        </div>
                        <h2 style={{ margin: "0 0 5px", fontSize: 15, fontWeight: 800, color: MAROON, letterSpacing: 0.6, textTransform: "uppercase", lineHeight: 1.3 }}>Don Honorio Ventura State University</h2>
                        <p style={{ margin: 0, fontSize: 12.5, color: "#777", fontWeight: 500, letterSpacing: 0.2 }}>Strategic Performance Management System</p>
                    </div>

                    <div style={{ background: "#fff", borderRadius: 16, padding: "28px 28px 24px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", border: "1px solid rgba(0,0,0,0.055)" }}>
                        <p style={{ margin: "0 0 18px", textAlign: "center", fontSize: 12.5, color: "#999" }}>Enter Details to Login</p>
                        <div style={{ marginBottom: 12 }}>
                            <input className="lp-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
                                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", background: "#fafafa", transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif" }} />
                        </div>
                        <div style={{ marginBottom: 16, position: "relative" }}>
                            <input className="lp-input" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                                style={{ width: "100%", padding: "11px 42px 11px 14px", border: "1.5px solid #e8e8e8", borderRadius: 8, fontSize: 13.5, color: "#333", background: "#fafafa", transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif" }} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, color: "#bbb", lineHeight: 1, transition: "color 0.2s" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#555")} onMouseLeave={(e) => (e.currentTarget.style.color = "#bbb")}
                                aria-label={showPassword ? "Hide password" : "Show password"}>
                                {showPassword ? (
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <button className="lp-btn" type="button" onClick={handleLogin} disabled={loading}
                            style={{ width: "100%", padding: "12px", background: "#2196f3", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", letterSpacing: 0.4, transition: "background 0.2s, transform 0.15s, box-shadow 0.2s", boxShadow: "0 4px 14px rgba(33,150,243,0.28)", fontFamily: "'Poppins', sans-serif", marginBottom: 14, opacity: loading ? 0.7 : 1 }}>
                            {loading ? "Logging in…" : "Login"}
                        </button>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                            <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#777", cursor: "pointer", userSelect: "none" }}>
                                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ width: 13, height: 13, cursor: "pointer", accentColor: "#2196f3" }} />
                                Remember Me
                            </label>
                            <button type="button" className="lp-link" style={{ background: "none", border: "none", color: "#2196f3", fontSize: 12, cursor: "pointer", padding: 0, fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>Forgot Password?</button>
                        </div>
                        <div style={{ borderTop: "1px solid #f2f2f2", paddingTop: 14, textAlign: "center" }}>
                            <span style={{ fontSize: 12, color: "#aaa" }}>Don't have an account? </span>
                            <button type="button" className="lp-link" style={{ background: "none", border: "none", color: "#2196f3", fontSize: 12, cursor: "pointer", padding: 0, fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Create One</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// ── LANDING — Header ──────────────────────────────────────────────────────────
function Header({ onLoginClick }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navLinks = [
        { label: "HOME", href: "#hero" },
        { label: "VISION/MISSION", href: "#about" },
        { label: "DEPARTMENTS", href: "#courses" },
    ];
    return (
        <header style={{ background: MAROON, padding: "12px 0", borderBottom: `3px solid ${GOLD}`, fontFamily: "'Poppins', sans-serif" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <a href="#hero" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                    <span style={{ color: "#fff", marginLeft: 10, fontSize: 13, fontWeight: 500, letterSpacing: 1 }}>DHVSU SPMS</span>
                </a>
                <nav style={{ display: "flex", alignItems: "center" }} className="desktop-nav">
                    {navLinks.map((link) => (
                        <a key={link.label} href={link.href} style={{ color: GOLD, textDecoration: "none", padding: "10px 20px", fontSize: 14, fontWeight: 500, transition: "color 0.3s", letterSpacing: 0.5 }}
                            onMouseEnter={(e) => (e.target.style.color = "#fff")} onMouseLeave={(e) => (e.target.style.color = GOLD)}>{link.label}</a>
                    ))}
                </nav>
                <button onClick={onLoginClick}
                    style={{ background: GOLD, color: "#fff", padding: "8px 24px", borderRadius: 50, fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "background 0.3s", whiteSpace: "nowrap", border: "none", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}
                    onMouseEnter={(e) => (e.target.style.background = "#e0a520")} onMouseLeave={(e) => (e.target.style.background = GOLD)}>LOGIN</button>
                <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", color: "#fff", fontSize: 28, cursor: "pointer" }} className="mobile-toggle">
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>
            {menuOpen && (
                <div style={{ background: "#fff", padding: "10px 0", borderTop: `3px solid ${GOLD}` }}>
                    {navLinks.map((link) => (
                        <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 24px", color: MAROON, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>{link.label}</a>
                    ))}
                    <button onClick={() => { setMenuOpen(false); onLoginClick(); }}
                        style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 24px", color: MAROON, background: "none", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>LOGIN</button>
                </div>
            )}
            <style>{`
                @media (max-width: 991px) { .desktop-nav { display: none !important; } .mobile-toggle { display: block !important; } }
            `}</style>
        </header>
    );
}

// ── LANDING — Hero ────────────────────────────────────────────────────────────
function Hero() {
    const { ref, style: aoStyle } = useScrollReveal({ animation: "zoom-in", delay: 100, threshold: 0 });
    return (
        <section id="hero" style={{ width: "100%", minHeight: 400, background: `linear-gradient(rgba(0,0,0,0.55), rgba(92,0,23,0.55)), url('${dhvsuImage}') center/cover no-repeat`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div ref={ref} style={{ textAlign: "center", paddingTop: 40, ...aoStyle }}>
                <h1 style={{ margin: 0, fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.2, color: "#fff", fontFamily: "'Poppins', sans-serif", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
                    "Shaping Minds,<br />Advancing Technologies,
                </h1>
                <h1 style={{ margin: "4px 0 0", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700, color: GOLD, fontFamily: "'Poppins', sans-serif", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
                    and Creating Brighter Futures"
                </h1>
                <a href="#about" style={{ display: "inline-block", marginTop: 24, padding: "10px 30px", border: "2px solid #fff", color: "#fff", borderRadius: 50, fontSize: 14, fontWeight: 500, fontFamily: "'Raleway', sans-serif", textDecoration: "none", letterSpacing: 1, transition: "all 0.4s" }}
                    onMouseEnter={(e) => { e.target.style.background = GOLD; e.target.style.borderColor = GOLD; }}
                    onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.borderColor = "#fff"; }}>Get Started</a>
            </div>
        </section>
    );
}

// ── LANDING — About ───────────────────────────────────────────────────────────
function About() {
    return (
        <section id="about" style={{ padding: "60px 0", fontFamily: "'Open Sans', sans-serif" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center" }}>
                    <Reveal animation="fade-left" delay={100} style={{ flex: "1 1 280px", textAlign: "center" }}>
                        <div style={{ width: 220, height: 220, borderRadius: "50%", background: `linear-gradient(135deg, ${MAROON}, #8a0025)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", boxShadow: `0 12px 40px rgba(92,0,23,0.35)` }}>
                            <img src={dhvsuLogo} alt="DHVSU logo" style={{ width: 210, height: 210, objectFit: "contain", borderRadius: "50%" }} />
                        </div>
                    </Reveal>
                    <Reveal animation="fade-up" style={{ flex: "1 1 340px" }}>
                        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#37423b", fontFamily: "'Raleway', sans-serif", marginBottom: 20 }}>UNIVERSITY VISION AND MISSION</h2>
                        {[
                            { title: "VISION", text: "DHVSU envisions of becoming one of the lead universities in the ASEAN Region in producing globally competitive professionals." },
                            { title: "MISSION", text: "DHVSU commits itself to provide a conducive environment for the holistic development of students to become globally competitive professionals." },
                        ].map(({ title, text }) => (
                            <div key={title} style={{ marginBottom: 20 }}>
                                <h3 style={{ fontSize: 13, fontWeight: 700, color: MAROON, fontFamily: "'Raleway', sans-serif", textTransform: "uppercase", letterSpacing: 1, borderLeft: `4px solid ${GOLD}`, paddingLeft: 12, marginBottom: 8 }}>{title}</h3>
                                <p style={{ color: "#555", lineHeight: 1.6, fontSize: 13, margin: 0 }}>{text}</p>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

// ── LANDING — Counts ──────────────────────────────────────────────────────────
function useCounter(target, duration = 1500) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        if (!started) return;
        let current = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(current);
        }, 16);
        return () => clearInterval(timer);
    }, [started, target, duration]);
    return { ref, count };
}

function StatCard({ end, label, delay }) {
    const { ref, count } = useCounter(end);
    const { ref: revealRef, style: aoStyle } = useScrollReveal({ animation: "fade-up", delay });
    return (
        <div ref={(el) => { ref.current = el; revealRef.current = el; }} style={{ textAlign: "center", padding: "0 20px", ...aoStyle }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: MAROON, display: "block", fontFamily: "'Poppins', sans-serif", lineHeight: 1 }}>{count.toLocaleString()}</span>
            <p style={{ margin: "8px 0 0", fontSize: 13, fontWeight: 600, color: "#37423b", fontFamily: "'Raleway', sans-serif" }}>{label}</p>
        </div>
    );
}

function Counts() {
    const stats = [
        { end: 12322, label: "Students", delay: 0 },
        { end: 12, label: "Colleges", delay: 100 },
        { end: 42, label: "Courses", delay: 200 },
        { end: 7, label: "Campuses", delay: 300 },
    ];
    return (
        <section style={{ padding: "40px 0", background: "#f6f7f6" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: 32 }}>
                {stats.map((s) => <StatCard key={s.label} {...s} />)}
            </div>
        </section>
    );
}

// ── LANDING — Colleges ────────────────────────────────────────────────────────
function CollegeCard({ abbr, name, color, index }) {
    const [hovered, setHovered] = useState(false);
    const { ref, style: aoStyle } = useScrollReveal({ animation: "zoom-in", delay: index * 150 });
    return (
        <div ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                flex: "1 1 280px",
                border: `1px solid ${hovered ? GOLD : "#eef0ef"}`,
                borderRadius: 8, overflow: "hidden",
                transition: `opacity 0.7s ease ${index * 150}ms, transform 0.7s ease ${index * 150}ms, box-shadow 0.3s, border-color 0.3s`,
                transform: aoStyle.transform !== "none" ? aoStyle.transform : hovered ? "translateY(-6px)" : "translateY(0)",
                opacity: aoStyle.opacity,
                boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.05)",
                background: "#fff",
                fontFamily: "'Open Sans', sans-serif",
            }}>
            <div style={{ height: 160, background: `linear-gradient(135deg, ${MAROON}, ${color})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 64, fontWeight: 800, color: "rgba(255,255,255,0.15)", fontFamily: "'Poppins', sans-serif", letterSpacing: 2, userSelect: "none" }}>{abbr}</span>
            </div>
            <div style={{ padding: 20 }}>
                <span style={{ display: "inline-block", background: MAROON, color: "#fff", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 4, marginBottom: 10 }}>{abbr}</span>
                <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Raleway', sans-serif", margin: "0 0 10px", transition: "color 0.3s", color: hovered ? GOLD : "#37423b" }}>{name}</h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7, margin: 0 }}>Committed to excellence in education, research, and community service through innovative programs.</p>
            </div>
        </div>
    );
}

function Colleges() {
    const colleges = [
        { abbr: "CEA", name: "College of Engineering and Architecture", color: "#b5451b" },
        { abbr: "CCS", name: "College of Computing Studies", color: "#1b4db5" },
        { abbr: "COE", name: "College of Education", color: "#1b8a45" },
    ];
    return (
        <section id="courses" style={{ padding: "60px 0" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                <Reveal animation="fade-up" style={{ paddingBottom: 40 }}>
                    <h2 style={{ fontSize: 13, fontWeight: 500, color: "#aaa", textTransform: "uppercase", letterSpacing: 3, fontFamily: "'Poppins', sans-serif", marginBottom: 6 }}>
                        Colleges{" "}
                        <span style={{ display: "inline-block", width: 100, height: 1, background: GOLD, verticalAlign: "middle", marginLeft: 8 }} />
                    </h2>
                    <p style={{ fontSize: 28, fontWeight: 700, color: "#37423b", fontFamily: "'Poppins', sans-serif", textTransform: "uppercase", margin: 0 }}>Popular Colleges</p>
                </Reveal>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 28 }}>
                    {colleges.map((c, i) => <CollegeCard key={c.abbr} {...c} index={i} />)}
                </div>
            </div>
        </section>
    );
}

// ── LANDING — Footer ──────────────────────────────────────────────────────────
function Footer() {
    return (
        <footer style={{ background: "#f9faf9", color: "#37423b", fontFamily: "'Open Sans', sans-serif", padding: "40px 0" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "space-between" }}>
                    <Reveal animation="fade-up" delay={0} style={{ flex: "1 1 220px", minWidth: 180 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, fontFamily: "'Raleway', sans-serif", color: MAROON }}>DHVSU SPMS</h3>
                        <p style={{ fontSize: 12, color: "#777", lineHeight: 1.7, margin: 0 }}>
                            Don Honorio Ventura State University<br />Bacolor, Pampanga, Philippines<br /><br />
                            <strong>Phone:</strong> (045) 436-5840<br />
                            <strong>Email:</strong> info@dhvsu.edu.ph
                        </p>
                    </Reveal>
                    <Reveal animation="fade-up" delay={100} style={{ flex: "1 1 160px", minWidth: 140 }}>
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: "#444", marginBottom: 12 }}>Useful Links</h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {["Home", "About Us", "Services"].map((l) => (
                                <li key={l} style={{ padding: "4px 0" }}>
                                    <a href="#" style={{ color: "#777", textDecoration: "none", fontSize: 12, transition: "color 0.3s" }}
                                        onMouseEnter={(e) => (e.target.style.color = GOLD)} onMouseLeave={(e) => (e.target.style.color = "#777")}>› {l}</a>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
                <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #e0e5e2", textAlign: "center", fontSize: 12, color: "#999" }}>
                    © {new Date().getFullYear()} DHVSU SPMS
                </div>
            </div>
        </footer>
    );
}

// ── DASHBOARD SYSTEM ──────────────────────────────────────────────────────────
const NAV_ITEMS = [
    { id: "dashboard", icon: "⊞", label: "Dashboard" },
    { id: "ipcr-form", icon: "📋", label: "IPCR Form" },
    { id: "opcr", icon: "🏢", label: "OPCR Form" },
    { id: "activity", icon: "⚡", label: "Activity" },
    { id: "teaching", icon: "👩‍🏫", label: "Teaching Personnel Output" },
    { id: "evidences", icon: "📁", label: "Evidences" },
    { id: "report", icon: "📊", label: "Report" },
    { id: "profile", icon: "👤", label: "Profile" },
];

function Sidebar({ active, setActive, darkMode, setDarkMode, onLogout, collapsed, setCollapsed }) {
    const dm = darkMode;
    return (
        <aside style={{ width: collapsed ? 64 : 230, minHeight: "100%", background: dm ? "#1a0005" : MAROON, display: "flex", flexDirection: "column", transition: "width .25s", flexShrink: 0, position: "relative", zIndex: 10, boxShadow: "3px 0 16px rgba(0,0,0,.18)" }}>
            <div style={{ padding: collapsed ? "16px 0" : "20px 16px", borderBottom: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 10, fontWeight: 900, color: MAROON, lineHeight: 1.1, textAlign: "center" }}>DH<br />VS</span>
                </div>
                {!collapsed && <span style={{ color: "#fff", fontWeight: 700, fontSize: 14, letterSpacing: .5, fontFamily: "'Poppins', sans-serif" }}>SPMS</span>}
            </div>
            <button onClick={() => setCollapsed(!collapsed)} style={{ position: "absolute", top: 20, right: -12, width: 24, height: 24, borderRadius: "50%", background: GOLD, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: MAROON, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20, boxShadow: "0 2px 6px rgba(0,0,0,.2)" }}>
                {collapsed ? "›" : "‹"}
            </button>
            <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
                {NAV_ITEMS.map(item => {
                    const isActive = active === item.id;
                    return (
                        <button key={item.id} onClick={() => setActive(item.id)} title={collapsed ? item.label : ""}
                            style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: collapsed ? "12px 0" : "11px 18px", background: isActive ? "rgba(254,186,41,.2)" : "none", border: "none", cursor: "pointer", fontFamily: "'Poppins', sans-serif", fontSize: 13, color: isActive ? GOLD : "rgba(255,255,255,.75)", fontWeight: isActive ? 600 : 400, transition: "all .2s", borderLeft: isActive ? `3px solid ${GOLD}` : "3px solid transparent", justifyContent: collapsed ? "center" : "flex-start" }}
                            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,.08)"; }}
                            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "none"; }}>
                            <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                            {!collapsed && <span>{item.label}</span>}
                        </button>
                    );
                })}
            </nav>
            <div style={{ padding: collapsed ? "12px 0" : "12px 16px", borderTop: "1px solid rgba(255,255,255,.1)" }}>
                <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: collapsed ? "8px 0" : "8px 12px", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.7)", fontFamily: "'Poppins', sans-serif", fontSize: 13, borderRadius: 6, transition: "all .2s", justifyContent: collapsed ? "center" : "flex-start" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,.08)"} onMouseLeave={(e) => e.currentTarget.style.background = "none"}>
                    <span>🚪</span>{!collapsed && "Logout"}
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: collapsed ? "8px 0" : "6px 12px", justifyContent: collapsed ? "center" : "flex-start" }}>
                    {!collapsed && <span style={{ fontSize: 12, color: "rgba(255,255,255,.6)", fontFamily: "'Poppins', sans-serif" }}>Dark Mode</span>}
                    <div onClick={() => setDarkMode(!dm)} style={{ width: 36, height: 20, borderRadius: 10, background: dm ? GOLD : "rgba(255,255,255,.25)", cursor: "pointer", position: "relative", transition: "background .3s", flexShrink: 0 }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: dm ? 18 : 2, transition: "left .3s", boxShadow: "0 1px 3px rgba(0,0,0,.3)" }} />
                    </div>
                </div>
            </div>
        </aside>
    );
}

function TopBar({ active, darkMode, user }) {
    const label = NAV_ITEMS.find(n => n.id === active)?.label || "Dashboard";
    return (
        <div style={{ height: 56, background: darkMode ? "#1e0008" : MAROON, borderBottom: `2px solid ${GOLD}`, display: "flex", alignItems: "center", padding: "0 20px", gap: 12, flexShrink: 0 }}>
            <h2 style={{ flex: 1, margin: 0, fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "'Poppins', sans-serif", letterSpacing: .3 }}>{label}</h2>
            <div style={{ position: "relative" }}>
                <input placeholder="Search here…" style={{ background: "rgba(254,186,41,.18)", border: `1px solid ${GOLD}`, borderRadius: 20, padding: "6px 14px 6px 32px", color: "#fff", fontSize: 13, fontFamily: "'Poppins', sans-serif", width: 220, outline: "none" }} />
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: GOLD, fontSize: 14 }}>🔍</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: MAROON }}>{user.avatar}</div>
                <div>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#fff", fontFamily: "'Poppins', sans-serif", lineHeight: 1.2 }}>{user.name}</p>
                    <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,.6)", fontFamily: "'Poppins', sans-serif" }}>{user.role}</p>
                </div>
            </div>
        </div>
    );
}

// ── Dashboard Pages ───────────────────────────────────────────────────────────
function DashboardPage({ darkMode }) {
    const dm = darkMode;
    const bg = dm ? "#12000a" : "#fffbf0";
    const card = dm ? "#200010" : "#fff";
    const txt = dm ? "#fff" : "#333";
    const sub = dm ? "#ccc" : "#666";
    const statCards = [
        { label: "Total Evidences", value: 1, bg: "#2196f3", icon: "📂" },
        { label: "Evaluation Results", value: 12, bg: dm ? "#3d2200" : "#fff8e1", textColor: dm ? "#fff" : "#333", icon: "📊" },
        { label: "Campuses", value: 7, bg: dm ? "#1a003d" : "#f3e5f5", textColor: dm ? "#fff" : "#333", icon: "🏫" },
        { label: "Faculty Count", value: 352, bg: dm ? "#003320" : "#e8f5e9", textColor: dm ? "#fff" : "#333", icon: "👩‍🏫" },
    ];
    return (
        <div style={{ padding: 12, background: bg, minHeight: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <span style={{ background: GOLD, width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>⊞</span>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: dm ? GOLD : MAROON, fontFamily: "'Poppins', sans-serif" }}>Dashboard</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10, marginBottom: 14 }}>
                {statCards.map(s => (
                    <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: "12px 10px", boxShadow: "0 2px 6px rgba(0,0,0,.08)", transition: "transform .2s", cursor: "default" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                        <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
                        <p style={{ margin: "0 0 3px", fontSize: 10, color: s.textColor || "rgba(255,255,255,.85)", fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>{s.label}</p>
                        <p style={{ margin: 0, fontSize: 24, fontWeight: 800, color: s.textColor || "#fff", fontFamily: "'Poppins', sans-serif", lineHeight: 1 }}>{s.value.toLocaleString()}</p>
                    </div>
                ))}
            </div>
            <div style={{ background: card, borderRadius: 10, padding: 12, boxShadow: "0 2px 6px rgba(0,0,0,.06)", border: `1px solid ${dm ? "rgba(254,186,41,.1)" : "#f0e8d0"}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                    <span style={{ background: GOLD, width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>⏱</span>
                    <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: dm ? GOLD : MAROON, fontFamily: "'Poppins', sans-serif" }}>Recent Activity</h3>
                </div>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Poppins', sans-serif" }}>
                        <thead>
                            <tr style={{ borderBottom: `2px solid ${dm ? "rgba(255,255,255,.1)" : "#f0e8d0"}` }}>
                                {["Name", "Email", "Date", "Type", "Status"].map(h => (
                                    <th key={h} style={{ padding: "5px 8px", textAlign: "left", fontSize: 10, fontWeight: 600, color: sub, textTransform: "uppercase", letterSpacing: .3 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {RECENT_ACTIVITY.map((r, i) => (
                                <tr key={r.id} style={{ borderBottom: `1px solid ${dm ? "rgba(255,255,255,.06)" : "#f5ead8"}`, background: i % 2 === 0 ? "transparent" : (dm ? "rgba(255,255,255,.02)" : "#fffdf7") }}>
                                    <td style={{ padding: "6px 8px", fontSize: 11, fontWeight: 600, color: txt }}>{r.name}</td>
                                    <td style={{ padding: "6px 8px", fontSize: 10, color: sub }}>{r.email}</td>
                                    <td style={{ padding: "6px 8px", fontSize: 10, color: sub }}>{r.date}</td>
                                    <td style={{ padding: "6px 8px", fontSize: 10, color: txt }}>{r.type}</td>
                                    <td style={{ padding: "6px 8px" }}>{statusBadge(r.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function IPCRPage({ darkMode }) {
    const dm = darkMode;
    const bg = dm ? "#12000a" : "#fffbf0";
    const card = dm ? "#200010" : "#fff";
    const txt = dm ? "#fff" : "#333";
    const sub = dm ? "#ccc" : "#666";
    const [tab, setTab] = useState("view");
    const [filter, setFilter] = useState("All");
    const weighted = IPCR_DATA.reduce((acc, r) => acc + (r.rating * r.weight / 5), 0) / IPCR_DATA.reduce((acc, r) => acc + r.weight, 0) * 5;
    const kras = ["All", ...new Set(IPCR_DATA.map(r => r.kra))];
    const filtered = filter === "All" ? IPCR_DATA : IPCR_DATA.filter(r => r.kra === filter);
    return (
        <div style={{ padding: 12, background: bg, minHeight: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ background: GOLD, width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>📋</span>
                    <div>
                        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: dm ? GOLD : MAROON, fontFamily: "'Poppins', sans-serif" }}>IPCR Form</h2>
                        <p style={{ margin: 0, fontSize: 10, color: sub }}>Individual Performance Commitment and Review — AY 2024-2025</p>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                    {["view", "add"].map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{ padding: "5px 14px", borderRadius: 6, border: `1.5px solid ${GOLD}`, background: tab === t ? GOLD : "transparent", color: tab === t ? MAROON : (dm ? "#fff" : "#333"), fontWeight: 600, fontSize: 11, cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all .2s" }}>
                            {t === "view" ? "📄 View" : "➕ Add"}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 8, marginBottom: 12 }}>
                {[
                    { label: "Weighted Rating", value: weighted.toFixed(2), color: "#2196f3" },
                    { label: "KRAs", value: new Set(IPCR_DATA.map(r => r.kra)).size, color: "#4caf50" },
                    { label: "Accomplished", value: IPCR_DATA.filter(r => r.status === "Accomplished").length, color: "#4caf50" },
                    { label: "Pending", value: IPCR_DATA.filter(r => r.status !== "Accomplished").length, color: "#ff9800" },
                ].map(s => (
                    <div key={s.label} style={{ background: card, borderRadius: 8, padding: "10px 10px", border: `1px solid ${dm ? "rgba(254,186,41,.15)" : "#f0e8d0"}` }}>
                        <p style={{ margin: "0 0 2px", fontSize: 9, color: sub, fontFamily: "'Poppins', sans-serif", textTransform: "uppercase", letterSpacing: .3 }}>{s.label}</p>
                        <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: s.color, fontFamily: "'Poppins', sans-serif" }}>{s.value}</p>
                    </div>
                ))}
            </div>
            {tab === "view" ? (
                <div style={{ background: card, borderRadius: 10, padding: 12, border: `1px solid ${dm ? "rgba(254,186,41,.1)" : "#f0e8d0"}` }}>
                    <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                        {kras.map(k => (
                            <button key={k} onClick={() => setFilter(k)} style={{ padding: "4px 12px", borderRadius: 16, border: `1px solid ${filter === k ? MAROON : "#ddd"}`, background: filter === k ? MAROON : "transparent", color: filter === k ? "#fff" : sub, fontSize: 10, cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all .2s" }}>{k}</button>
                        ))}
                    </div>
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Poppins', sans-serif" }}>
                            <thead>
                                <tr style={{ borderBottom: `2px solid ${dm ? "rgba(255,255,255,.1)" : "#f0e8d0"}` }}>
                                    {["KRA", "Indicator", "Target", "Actual", "Rating", "Weight", "Status"].map(h => (
                                        <th key={h} style={{ padding: "5px 6px", textAlign: "left", fontSize: 9, fontWeight: 700, color: sub, textTransform: "uppercase", letterSpacing: .2, whiteSpace: "nowrap" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((r, i) => (
                                    <tr key={r.id} style={{ borderBottom: `1px solid ${dm ? "rgba(255,255,255,.06)" : "#f5ead8"}`, background: i % 2 === 0 ? "transparent" : (dm ? "rgba(255,255,255,.02)" : "#fffdf7") }}>
                                        <td style={{ padding: "6px 6px", fontSize: 10, fontWeight: 600, color: dm ? GOLD : MAROON, whiteSpace: "nowrap" }}>{r.kra}</td>
                                        <td style={{ padding: "6px 6px", fontSize: 10, color: txt, maxWidth: 180 }}>{r.indicator}</td>
                                        <td style={{ padding: "6px 6px", fontSize: 10, color: sub, textAlign: "center" }}>{r.target}</td>
                                        <td style={{ padding: "6px 6px", fontSize: 10, color: sub, textAlign: "center" }}>{r.actual}</td>
                                        <td style={{ padding: "6px 6px", minWidth: 80 }}><RatingBar rating={r.rating} /></td>
                                        <td style={{ padding: "6px 6px", fontSize: 10, color: sub, textAlign: "center" }}>{r.weight}%</td>
                                        <td style={{ padding: "6px 6px" }}>{statusBadge(r.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr style={{ borderTop: `2px solid ${dm ? "rgba(255,255,255,.15)" : "#e0d4b8"}`, background: dm ? "rgba(254,186,41,.08)" : "#fffbf0" }}>
                                    <td colSpan={5} style={{ padding: "6px 6px", fontSize: 10, fontWeight: 700, color: dm ? "#fff" : MAROON }}>Weighted Avg</td>
                                    <td colSpan={2} style={{ padding: "6px 6px", fontSize: 12, fontWeight: 800, color: dm ? GOLD : MAROON, textAlign: "center" }}>{weighted.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            ) : (
                <div style={{ background: card, borderRadius: 10, padding: 14, border: `1px solid ${dm ? "rgba(254,186,41,.15)" : "#f0e8d0"}` }}>
                    <h3 style={{ margin: "0 0 12px", color: dm ? "#fff" : MAROON, fontFamily: "'Poppins', sans-serif", fontSize: 14 }}>Add New IPCR Entry</h3>
                    {[["KRA", ["Teaching & Learning", "Research", "Extension", "Production", "Administrative"]], ["Performance Indicator"], ["Target (Numerical)"], ["Weight (%)"]].map(([label, opts]) => (
                        <div key={label} style={{ marginBottom: 10 }}>
                            <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: sub, marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>{label}</label>
                            {opts ? (
                                <select style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: `1.5px solid ${dm ? "rgba(254,186,41,.3)" : "#e0d4b8"}`, background: dm ? "#1a0008" : "#fafafa", color: txt, fontSize: 11, fontFamily: "'Poppins', sans-serif" }}>
                                    {opts.map(o => <option key={o}>{o}</option>)}
                                </select>
                            ) : (
                                <input type="text" placeholder={`Enter ${label.toLowerCase()}`} style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: `1.5px solid ${dm ? "rgba(254,186,41,.3)" : "#e0d4b8"}`, background: dm ? "#1a0008" : "#fafafa", color: txt, fontSize: 11, fontFamily: "'Poppins', sans-serif", boxSizing: "border-box" }} />
                            )}
                        </div>
                    ))}
                    <button style={{ padding: "7px 20px", background: MAROON, color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 11, cursor: "pointer", fontFamily: "'Poppins', sans-serif", marginTop: 6 }}>Save</button>
                </div>
            )}
        </div>
    );
}

function OPCRPage({ darkMode }) {
    const dm = darkMode;
    const bg = dm ? "#12000a" : "#fffbf0";
    const card = dm ? "#200010" : "#fff";
    const txt = dm ? "#fff" : "#333";
    const sub = dm ? "#ccc" : "#666";
    return (
        <div style={{ padding: 12, background: bg, minHeight: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <span style={{ background: GOLD, width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>🏢</span>
                <div>
                    <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: dm ? GOLD : MAROON, fontFamily: "'Poppins', sans-serif" }}>OPCR Form</h2>
                    <p style={{ margin: 0, fontSize: 10, color: sub }}>Office Performance Commitment and Review</p>
                </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 8, marginBottom: 12 }}>
                {["Higher Education Services", "Research Services", "Extension Services", "Support Services"].map((mfo, i) => (
                    <div key={mfo} style={{ background: card, borderRadius: 8, padding: "10px 10px", border: `1px solid ${dm ? "rgba(254,186,41,.15)" : "#f0e8d0"}` }}>
                        <p style={{ margin: "0 0 2px", fontSize: 8, color: sub, fontFamily: "'Poppins', sans-serif", textTransform: "uppercase", letterSpacing: .2, lineHeight: 1.2 }}>{mfo}</p>
                        <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: [MAROON, "#4caf50", "#2196f3", "#ff9800"][i], fontFamily: "'Poppins', sans-serif" }}>{[2, 1, 1, 1][i]}</p>
                        <p style={{ margin: 0, fontSize: 8, color: sub }}>indicators</p>
                    </div>
                ))}
            </div>
            <div style={{ background: card, borderRadius: 10, padding: 12, border: `1px solid ${dm ? "rgba(254,186,41,.1)" : "#f0e8d0"}` }}>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Poppins', sans-serif" }}>
                        <thead>
                            <tr style={{ borderBottom: `2px solid ${dm ? "rgba(255,255,255,.1)" : "#f0e8d0"}` }}>
                                {["MFO", "Indicator", "Measure", "Target", "Actual", "Rating", "Status"].map(h => (
                                    <th key={h} style={{ padding: "5px 6px", textAlign: "left", fontSize: 9, fontWeight: 700, color: sub, textTransform: "uppercase", letterSpacing: .2, whiteSpace: "nowrap" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {OPCR_DATA.map((r, i) => (
                                <tr key={r.id} style={{ borderBottom: `1px solid ${dm ? "rgba(255,255,255,.06)" : "#f5ead8"}`, background: i % 2 === 0 ? "transparent" : (dm ? "rgba(255,255,255,.02)" : "#fffdf7") }}>
                                    <td style={{ padding: "6px 6px", fontSize: 10, fontWeight: 600, color: dm ? GOLD : MAROON, whiteSpace: "nowrap", maxWidth: 100 }}>{r.mfo}</td>
                                    <td style={{ padding: "6px 6px", fontSize: 10, color: txt, maxWidth: 150 }}>{r.success}</td>
                                    <td style={{ padding: "6px 6px", fontSize: 10, color: sub }}>{r.measure}</td>
                                    <td style={{ padding: "6px 6px", fontSize: 10, color: sub, textAlign: "center" }}>{r.target}</td>
                                    <td style={{ padding: "6px 6px", fontSize: 10, fontWeight: 600, color: txt, textAlign: "center" }}>{r.actual}</td>
                                    <td style={{ padding: "6px 6px", minWidth: 80 }}><RatingBar rating={r.rating} /></td>
                                    <td style={{ padding: "6px 6px" }}>{statusBadge(r.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function ActivityPage({ darkMode }) {
    const dm = darkMode;
    const bg = dm ? "#12000a" : "#fffbf0";
    const card = dm ? "#200010" : "#fff";
    const txt = dm ? "#fff" : "#333";
    const sub = dm ? "#ccc" : "#666";
    const [search, setSearch] = useState("");
    const filtered = RECENT_ACTIVITY.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.type.toLowerCase().includes(search.toLowerCase()));
    return (
        <div style={{ padding: 12, background: bg, minHeight: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ background: GOLD, width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>⚡</span>
                    <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: dm ? GOLD : MAROON, fontFamily: "'Poppins', sans-serif" }}>Activity Log</h2>
                </div>
                <input placeholder="Search activity…" value={search} onChange={e => setSearch(e.target.value)}
                    style={{ padding: "5px 10px", borderRadius: 16, border: `1.5px solid ${dm ? "rgba(254,186,41,.3)" : "#e0d4b8"}`, background: dm ? "#1a0008" : "#fafafa", color: txt, fontSize: 11, fontFamily: "'Poppins', sans-serif", outline: "none", minWidth: 150 }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {filtered.map((r) => (
                    <div key={r.id} style={{ background: card, borderRadius: 8, padding: "8px 10px", border: `1px solid ${dm ? "rgba(254,186,41,.1)" : "#f0e8d0"}`, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", transition: "transform .2s", cursor: "default" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: MAROON, flexShrink: 0 }}>
                            {r.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div style={{ flex: 1, minWidth: 100 }}>
                            <p style={{ margin: "0 0 1px", fontSize: 11, fontWeight: 600, color: txt, fontFamily: "'Poppins', sans-serif" }}>{r.name}</p>
                            <p style={{ margin: 0, fontSize: 9, color: sub }}>{r.email}</p>
                        </div>
                        <Badge color="blue">{r.type}</Badge>
                        <span style={{ fontSize: 10, color: sub, minWidth: 70, textAlign: "right" }}>{r.date}</span>
                        {statusBadge(r.status)}
                    </div>
                ))}
                {filtered.length === 0 && <p style={{ textAlign: "center", color: sub, fontFamily: "'Poppins', sans-serif", padding: 20 }}>No activities found.</p>}
            </div>
        </div>
    );
}

function TeachingPage({ darkMode }) {
    const dm = darkMode;
    const bg = dm ? "#12000a" : "#fffbf0";
    const card = dm ? "#200010" : "#fff";
    const txt = dm ? "#fff" : "#333";
    const sub = dm ? "#ccc" : "#666";
    const [search, setSearch] = useState("");
    const filtered = FACULTY_LIST.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.college.includes(search.toUpperCase()));
    return (
        <div style={{ padding: 12, background: bg, minHeight: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ background: GOLD, width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>👩‍🏫</span>
                    <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: dm ? GOLD : MAROON, fontFamily: "'Poppins', sans-serif" }}>Teaching Personnel</h2>
                </div>
                <input placeholder="Search faculty…" value={search} onChange={e => setSearch(e.target.value)}
                    style={{ padding: "5px 10px", borderRadius: 16, border: `1.5px solid ${dm ? "rgba(254,186,41,.3)" : "#e0d4b8"}`, background: dm ? "#1a0008" : "#fafafa", color: txt, fontSize: 11, fontFamily: "'Poppins', sans-serif", outline: "none", minWidth: 150 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 8, marginBottom: 12 }}>
                {[{ label: "Total Faculty", value: 352, color: MAROON }, { label: "Submitted", value: 298, color: "#4caf50" }, { label: "Approved", value: 241, color: "#2196f3" }, { label: "Pending", value: 54, color: "#ff9800" }].map(s => (
                    <div key={s.label} style={{ background: card, borderRadius: 8, padding: "10px 10px", border: `1px solid ${dm ? "rgba(254,186,41,.15)" : "#f0e8d0"}` }}>
                        <p style={{ margin: "0 0 2px", fontSize: 9, color: sub, fontFamily: "'Poppins', sans-serif", textTransform: "uppercase", letterSpacing: .3 }}>{s.label}</p>
                        <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: s.color, fontFamily: "'Poppins', sans-serif" }}>{s.value}</p>
                    </div>
                ))}
            </div>
            <div style={{ background: card, borderRadius: 10, padding: 12, border: `1px solid ${dm ? "rgba(254,186,41,.1)" : "#f0e8d0"}` }}>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Poppins', sans-serif" }}>
                        <thead>
                            <tr style={{ borderBottom: `2px solid ${dm ? "rgba(255,255,255,.1)" : "#f0e8d0"}` }}>
                                {["#", "Name", "College", "Position", "Rating", "Status", "Action"].map(h => (
                                    <th key={h} style={{ padding: "5px 6px", textAlign: "left", fontSize: 9, fontWeight: 700, color: sub, textTransform: "uppercase", letterSpacing: .2 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((f, i) => (
                                <tr key={f.id} style={{ borderBottom: `1px solid ${dm ? "rgba(255,255,255,.06)" : "#f5ead8"}`, background: i % 2 === 0 ? "transparent" : (dm ? "rgba(255,255,255,.02)" : "#fffdf7") }}>
                                    <td style={{ padding: "6px 6px", fontSize: 10, color: sub }}>{f.id}</td>
                                    <td style={{ padding: "6px 6px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: MAROON }}>
                                                {f.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                            </div>
                                            <span style={{ fontSize: 10, fontWeight: 600, color: txt }}>{f.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: "6px 6px" }}><Badge color="blue">{f.college}</Badge></td>
                                    <td style={{ padding: "6px 6px", fontSize: 9, color: sub }}>{f.position}</td>
                                    <td style={{ padding: "6px 6px", minWidth: 100 }}><RatingBar rating={Math.round(f.ipcr)} /></td>
                                    <td style={{ padding: "6px 6px" }}>{statusBadge(f.status)}</td>
                                    <td style={{ padding: "6px 6px" }}>
                                        <button style={{ padding: "3px 10px", borderRadius: 4, border: `1px solid ${MAROON}`, background: "transparent", color: MAROON, fontSize: 9, cursor: "pointer", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function EvidencesPage({ darkMode }) {
    const dm = darkMode;
    const bg = dm ? "#12000a" : "#fffbf0";
    const card = dm ? "#200010" : "#fff";
    const txt = dm ? "#fff" : "#333";
    const sub = dm ? "#ccc" : "#666";
    const [dragging, setDragging] = useState(false);
    return (
        <div style={{ padding: 12, background: bg, minHeight: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <span style={{ background: GOLD, width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>📁</span>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: dm ? GOLD : MAROON, fontFamily: "'Poppins', sans-serif" }}>Evidences</h2>
            </div>
            <div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); }}
                style={{ border: `2px dashed ${dragging ? GOLD : "#d4c4a0"}`, borderRadius: 10, padding: "16px 14px", textAlign: "center", marginBottom: 12, background: dragging ? (dm ? "rgba(254,186,41,.1)" : "#fffbf0") : "transparent", transition: "all .2s", cursor: "pointer" }}>
                <p style={{ margin: "0 0 4px", fontSize: 20 }}>📤</p>
                <p style={{ margin: "0 0 3px", fontSize: 12, fontWeight: 600, color: dm ? GOLD : MAROON, fontFamily: "'Poppins', sans-serif" }}>Drag & drop files here</p>
                <p style={{ margin: "0 0 8px", fontSize: 10, color: sub }}>PDF, DOC, PNG, JPG — max 10MB</p>
                <button style={{ padding: "6px 16px", background: MAROON, color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>Browse</button>
            </div>
            <div style={{ background: card, borderRadius: 10, padding: 12, border: `1px solid ${dm ? "rgba(254,186,41,.1)" : "#f0e8d0"}` }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: dm ? "#fff" : MAROON, fontFamily: "'Poppins', sans-serif" }}>Uploaded</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {EVIDENCES.map(ev => (
                        <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 6, border: `1px solid ${dm ? "rgba(255,255,255,.08)" : "#f0e8d0"}`, background: dm ? "rgba(255,255,255,.03)" : "#fffdf7", flexWrap: "wrap" }}>
                            <span style={{ fontSize: 18, flexShrink: 0 }}>📄</span>
                            <div style={{ flex: 1, minWidth: 100 }}>
                                <p style={{ margin: "0 0 1px", fontSize: 11, fontWeight: 600, color: txt, fontFamily: "'Poppins', sans-serif" }}>{ev.title}</p>
                                <p style={{ margin: 0, fontSize: 9, color: sub }}>{ev.date} · {ev.size}</p>
                            </div>
                            <Badge color="blue">{ev.type}</Badge>
                            {statusBadge(ev.status)}
                            <button style={{ padding: "3px 10px", borderRadius: 4, border: `1px solid ${MAROON}`, background: "transparent", color: MAROON, fontSize: 9, cursor: "pointer", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>DL</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ReportPage({ darkMode }) {
    const dm = darkMode;
    const bg = dm ? "#12000a" : "#fffbf0";
    const card = dm ? "#200010" : "#fff";
    const txt = dm ? "#fff" : "#333";
    const sub = dm ? "#ccc" : "#666";
    const avgRating = (IPCR_DATA.reduce((a, r) => a + r.rating, 0) / IPCR_DATA.length).toFixed(2);
    const kras = [...new Set(IPCR_DATA.map(r => r.kra))];
    return (
        <div style={{ padding: 12, background: bg, minHeight: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ background: GOLD, width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>📊</span>
                    <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: dm ? GOLD : MAROON, fontFamily: "'Poppins', sans-serif" }}>Report</h2>
                </div>
                <button style={{ padding: "6px 14px", background: MAROON, color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 11, cursor: "pointer", fontFamily: "'Poppins', sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
                    📥 PDF
                </button>
            </div>
            <div style={{ background: card, borderRadius: 10, padding: 12, marginBottom: 10, border: `1px solid ${dm ? "rgba(254,186,41,.1)" : "#f0e8d0"}` }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: dm ? "#fff" : MAROON, fontFamily: "'Poppins', sans-serif" }}>Performance by KRA</h3>
                {kras.map(kra => {
                    const entries = IPCR_DATA.filter(r => r.kra === kra);
                    const avg = entries.reduce((a, r) => a + r.rating, 0) / entries.length;
                    const colors = ["#2196f3", "#4caf50", "#ff9800", "#e91e63", "#9c27b0"];
                    const color = colors[kras.indexOf(kra) % colors.length];
                    return (
                        <div key={kra} style={{ marginBottom: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, gap: 6 }}>
                                <span style={{ fontSize: 10, fontWeight: 600, color: txt, fontFamily: "'Poppins', sans-serif" }}>{kra}</span>
                                <span style={{ fontSize: 10, fontWeight: 700, color }}>{avg.toFixed(1)}/5</span>
                            </div>
                            <div style={{ height: 6, background: dm ? "rgba(255,255,255,.1)" : "#f0e8d0", borderRadius: 4, overflow: "hidden" }}>
                                <div style={{ width: `${(avg / 5) * 100}%`, height: "100%", background: color, borderRadius: 4, transition: "width .8s ease" }} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10 }}>
                {[
                    { label: "Avg Rating", value: avgRating, sub: "Out of 5", icon: "⭐" },
                    { label: "Success Rate", value: "83%", sub: "5 of 6 met", icon: "✅" },
                    { label: "Outstanding", value: "0", sub: "≥4.5", icon: "🏆" },
                    { label: "Very Good", value: "4", sub: "3.5–4.4", icon: "👍" },
                ].map(s => (
                    <div key={s.label} style={{ background: card, borderRadius: 10, padding: "10px 10px", border: `1px solid ${dm ? "rgba(254,186,41,.15)" : "#f0e8d0"}`, textAlign: "center" }}>
                        <p style={{ margin: "0 0 4px", fontSize: 18 }}>{s.icon}</p>
                        <p style={{ margin: "0 0 2px", fontSize: 18, fontWeight: 800, color: dm ? GOLD : MAROON, fontFamily: "'Poppins', sans-serif" }}>{s.value}</p>
                        <p style={{ margin: "0 0 1px", fontSize: 10, fontWeight: 600, color: txt, fontFamily: "'Poppins', sans-serif" }}>{s.label}</p>
                        <p style={{ margin: 0, fontSize: 8, color: sub }}>{s.sub}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProfilePage({ darkMode }) {
    const dm = darkMode;
    const bg = dm ? "#12000a" : "#fffbf0";
    const card = dm ? "#200010" : "#fff";
    const txt = dm ? "#fff" : "#333";
    const sub = dm ? "#ccc" : "#666";
    const [editing, setEditing] = useState(false);
    const fields = [
        { label: "Full Name", value: "Dr. Maria Santos" },
        { label: "Email", value: "m.santos@dhvsu.edu.ph" },
        { label: "Employee ID", value: "EMP-2018-00142" },
        { label: "Position", value: "Associate Professor II" },
        { label: "College", value: "College of Computing Studies" },
        { label: "Campus", value: "Main Campus" },
        { label: "Specialization", value: "IT / Software Engineering" },
        { label: "CSC Eligibility", value: "Career Service Professional" },
    ];
    return (
        <div style={{ padding: 12, background: bg, minHeight: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <span style={{ background: GOLD, width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>👤</span>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: dm ? GOLD : MAROON, fontFamily: "'Poppins', sans-serif" }}>Profile</h2>
            </div>
            <div style={{ background: card, borderRadius: 10, padding: 14, marginBottom: 10, border: `1px solid ${dm ? "rgba(254,186,41,.15)" : "#f0e8d0"}`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg,${MAROON},#8a0025)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: GOLD, flexShrink: 0, border: `2px solid ${GOLD}` }}>MS</div>
                <div style={{ flex: 1 }}>
                    <h3 style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 700, color: txt, fontFamily: "'Poppins', sans-serif" }}>Dr. Maria Santos</h3>
                    <p style={{ margin: "0 0 2px", fontSize: 10, color: sub }}>Associate Professor II · CCS</p>
                    <p style={{ margin: "0 0 6px", fontSize: 9, color: sub }}>Main Campus</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <Badge color="maroon">Permanent</Badge>
                        <Badge color="blue">Faculty</Badge>
                        <Badge color="green">Submitted</Badge>
                    </div>
                </div>
                <button onClick={() => setEditing(!editing)} style={{ padding: "6px 14px", background: editing ? GOLD : MAROON, color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, fontSize: 11, cursor: "pointer", fontFamily: "'Poppins', sans-serif", alignSelf: "flex-start" }}>
                    {editing ? "💾 Save" : "✏️ Edit"}
                </button>
            </div>
            <div style={{ background: card, borderRadius: 10, padding: 12, border: `1px solid ${dm ? "rgba(254,186,41,.1)" : "#f0e8d0"}` }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: dm ? "#fff" : MAROON, fontFamily: "'Poppins', sans-serif" }}>Information</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
                    {fields.map(f => (
                        <div key={f.label}>
                            <label style={{ display: "block", fontSize: 9, fontWeight: 700, color: sub, marginBottom: 3, fontFamily: "'Poppins', sans-serif", textTransform: "uppercase", letterSpacing: .2 }}>{f.label}</label>
                            {editing ? (
                                <input defaultValue={f.value} style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: `1.5px solid ${dm ? "rgba(254,186,41,.3)" : "#e0d4b8"}`, background: dm ? "#1a0008" : "#fafafa", color: txt, fontSize: 11, fontFamily: "'Poppins', sans-serif", boxSizing: "border-box" }} />
                            ) : (
                                <p style={{ margin: 0, fontSize: 11, color: txt, fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>{f.value}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Dashboard shell ───────────────────────────────────────────────────────────
function DashboardSystem({ onLogout }) {
    const [active, setActive] = useState("dashboard");
    const [darkMode, setDarkMode] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const dm = darkMode;
    const pages = {
        dashboard: <DashboardPage darkMode={dm} />,
        "ipcr-form": <IPCRFormPage darkMode={dm} />,
        opcr: <OPCRPage darkMode={dm} />,
        activity: <ActivityPage darkMode={dm} />,
        teaching: <TeachingPage darkMode={dm} />,
        evidences: <EvidencesPage darkMode={dm} />,
        report: <ReportPage darkMode={dm} />,
        profile: <ProfilePage darkMode={dm} />,
    };
    return (
        <div style={{ display: "flex", height: "100%", overflow: "hidden", fontFamily: "'Poppins', sans-serif", background: dm ? "#12000a" : "#fffbf0" }}>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            <Sidebar active={active} setActive={setActive} darkMode={dm} setDarkMode={setDarkMode} onLogout={onLogout} collapsed={collapsed} setCollapsed={setCollapsed} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
                <TopBar active={active} darkMode={dm} user={DEMO_USER} />
                <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
                    {pages[active]}
                </div>
            </div>
        </div>
    );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function SpmsDemo({ onClose, project }) {
    const [page, setPage] = useState("landing"); // "landing" | "login" | "dashboard"

    useEffect(() => {
        const prevBody = document.body.style.overflow;
        const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prevBody;
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    return (
        <div className="demo-modal" role="dialog" aria-modal="true" aria-label="SPMS demo">
            <button type="button" className="demo-modal-backdrop" aria-label="Close demo" onClick={onClose} />
            <div className="demo-shell">
                <header className="demo-topbar">
                    <div className="demo-topbar-left">
                        <button type="button" className="demo-back" onClick={onClose} aria-label="Back">{"< Back"}</button>
                        <div>
                            <p className="demo-kicker">Capstone Project</p>
                            <h2>Strategic Performance Management System</h2>
                        </div>
                    </div>
                    <div className="demo-topbar-right">
                        <span className="demo-close-hint">Press Esc or close</span>
                        <button type="button" className="demo-close" onClick={onClose}>Close</button>
                    </div>
                </header>

                <div
                    className="mos-system"
                    style={{
                        height: "calc(100% - 80px)",
                        overflowY: page === "landing" ? "auto" : "hidden",
                        overflowX: "hidden",
                    }}
                >
                    <style>{`
                        .mos-system { scrollbar-width: none; -ms-overflow-style: none; }
                        .mos-system::-webkit-scrollbar { width: 0; height: 0; }
                    `}</style>

                    {page === "landing" && (
                        <div style={{ fontFamily: "'Open Sans', sans-serif", color: "#444" }}>
                            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Raleway:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
                            <Header onLoginClick={() => setPage("login")} />
                            <Hero />
                            <About />
                            <Counts />
                            <Colleges />
                            <Footer />
                        </div>
                    )}

                    {page === "login" && (
                        <div style={{ height: "100%", overflow: "hidden" }}>
                            <LoginPage onBack={() => setPage("landing")} onLogin={() => setPage("dashboard")} />
                        </div>
                    )}

                    {page === "dashboard" && (
                        <div style={{ height: "100%", overflow: "hidden" }}>
                            <DashboardSystem onLogout={() => setPage("landing")} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}