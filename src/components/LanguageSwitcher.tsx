import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Search, Check } from "lucide-react";
import { useTranslation, LANGUAGES, Language } from "@/contexts/TranslationContext";

const LanguageSwitcher = () => {
    const { language, setLanguage } = useTranslation();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
                setQuery("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Focus search input when opener
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    const filtered = query.trim()
        ? LANGUAGES.filter(
            (l) =>
                l.name.toLowerCase().includes(query.toLowerCase()) ||
                l.native.toLowerCase().includes(query.toLowerCase()) ||
                l.code.toLowerCase().includes(query.toLowerCase())
        )
        : LANGUAGES;

    const handleSelect = (lang: Language) => {
        setLanguage(lang);
        setOpen(false);
        setQuery("");
    };

    return (
        <div ref={containerRef} style={{ position: "relative", zIndex: 100 }}>
            {/* Trigger button */}
            <button
                onClick={() => setOpen((o) => !o)}
                aria-label="Switch language"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 12px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "var(--foreground, #1c1c1e)",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 500,
                    transition: "background 0.2s",
                    whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.28)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
                }
            >
                <Globe size={15} strokeWidth={2} />
                <span>{language.code.toUpperCase()}</span>
                <ChevronDown
                    size={13}
                    style={{
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                    }}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        right: 0,
                        width: "240px",
                        maxHeight: "340px",
                        background: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border: "1px solid rgba(0,0,0,0.10)",
                        borderRadius: "14px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                    }}
                >
                    {/* Search */}
                    <div
                        style={{
                            padding: "10px 10px 6px",
                            borderBottom: "1px solid rgba(0,0,0,0.07)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                background: "rgba(0,0,0,0.06)",
                                borderRadius: "8px",
                                padding: "6px 10px",
                            }}
                        >
                            <Search size={13} style={{ color: "#888", flexShrink: 0 }} />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search languages…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    outline: "none",
                                    fontSize: "13px",
                                    color: "#1c1c1e",
                                    width: "100%",
                                }}
                            />
                        </div>
                    </div>

                    {/* Language list */}
                    <div style={{ overflowY: "auto", flex: 1 }}>
                        {filtered.length === 0 && (
                            <div
                                style={{
                                    padding: "16px",
                                    textAlign: "center",
                                    color: "#888",
                                    fontSize: "13px",
                                }}
                            >
                                No languages found
                            </div>
                        )}
                        {filtered.map((lang) => {
                            const isActive = lang.code === language.code;
                            return (
                                <button
                                    key={lang.code}
                                    onClick={() => handleSelect(lang)}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "9px 14px",
                                        background: isActive
                                            ? "rgba(99,102,241,0.08)"
                                            : "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        transition: "background 0.15s",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive)
                                            e.currentTarget.style.background = "rgba(0,0,0,0.04)";
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive)
                                            e.currentTarget.style.background = "transparent";
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                fontSize: "13px",
                                                fontWeight: isActive ? 600 : 400,
                                                color: isActive ? "#4f46e5" : "#1c1c1e",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {lang.native}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "11px",
                                                color: "#888",
                                                marginTop: "1px",
                                            }}
                                        >
                                            {lang.name} · {lang.code.toUpperCase()}
                                        </div>
                                    </div>
                                    {isActive && (
                                        <Check size={14} style={{ color: "#4f46e5", flexShrink: 0 }} />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
