import { useEffect } from "react";

export default function SpmsDemo({ onClose, project }) {
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
                        <button type="button" className="demo-back" onClick={onClose} aria-label="Back">
                            {"< Back"}
                        </button>
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

                <div className="mos-system">
                    <div className="blank-demo-content">
                        <h3>Blank demo placeholder</h3>
                        <p>This white panel is reserved for the Strategic Performance Management System demo.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
