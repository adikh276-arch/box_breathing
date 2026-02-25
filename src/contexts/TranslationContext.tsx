import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    useRef,
} from "react";

const GOOGLE_TRANSLATE_API_KEY = "AIzaSyDgyWwwmHOROsPZclCm-LGzZs_uoYNhVDk";

export interface Language {
    code: string;   // BCP-47 / Google language code  e.g. "fr"
    name: string;   // English name e.g. "French"
    native: string; // Native name e.g. "Français"
}

// ─── Google-supported languages (100+) ───────────────────────────────────────
export const LANGUAGES: Language[] = [
    { code: "af", name: "Afrikaans", native: "Afrikaans" },
    { code: "sq", name: "Albanian", native: "Shqip" },
    { code: "am", name: "Amharic", native: "አማርኛ" },
    { code: "ar", name: "Arabic", native: "العربية" },
    { code: "hy", name: "Armenian", native: "Հայերեն" },
    { code: "az", name: "Azerbaijani", native: "Azərbaycan" },
    { code: "eu", name: "Basque", native: "Euskara" },
    { code: "be", name: "Belarusian", native: "Беларуская" },
    { code: "bn", name: "Bengali", native: "বাংলা" },
    { code: "bs", name: "Bosnian", native: "Bosanski" },
    { code: "bg", name: "Bulgarian", native: "Български" },
    { code: "ca", name: "Catalan", native: "Català" },
    { code: "ceb", name: "Cebuano", native: "Cebuano" },
    { code: "zh-TW", name: "Chinese (Traditional)", native: "繁體中文" },
    { code: "zh-CN", name: "Chinese (Simplified)", native: "简体中文" },
    { code: "co", name: "Corsican", native: "Corsu" },
    { code: "hr", name: "Croatian", native: "Hrvatski" },
    { code: "cs", name: "Czech", native: "Čeština" },
    { code: "da", name: "Danish", native: "Dansk" },
    { code: "nl", name: "Dutch", native: "Nederlands" },
    { code: "en", name: "English", native: "English" },
    { code: "eo", name: "Esperanto", native: "Esperanto" },
    { code: "et", name: "Estonian", native: "Eesti" },
    { code: "fi", name: "Finnish", native: "Suomi" },
    { code: "fr", name: "French", native: "Français" },
    { code: "fy", name: "Frisian", native: "Frysk" },
    { code: "gl", name: "Galician", native: "Galego" },
    { code: "ka", name: "Georgian", native: "ქართული" },
    { code: "de", name: "German", native: "Deutsch" },
    { code: "el", name: "Greek", native: "Ελληνικά" },
    { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
    { code: "ht", name: "Haitian Creole", native: "Kreyòl Ayisyen" },
    { code: "ha", name: "Hausa", native: "Hausa" },
    { code: "haw", name: "Hawaiian", native: "ʻŌlelo Hawaiʻi" },
    { code: "iw", name: "Hebrew", native: "עברית" },
    { code: "hi", name: "Hindi", native: "हिन्दी" },
    { code: "hmn", name: "Hmong", native: "Hmong" },
    { code: "hu", name: "Hungarian", native: "Magyar" },
    { code: "is", name: "Icelandic", native: "Íslenska" },
    { code: "ig", name: "Igbo", native: "Igbo" },
    { code: "id", name: "Indonesian", native: "Bahasa Indonesia" },
    { code: "ga", name: "Irish", native: "Gaeilge" },
    { code: "it", name: "Italian", native: "Italiano" },
    { code: "ja", name: "Japanese", native: "日本語" },
    { code: "jw", name: "Javanese", native: "Basa Jawa" },
    { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
    { code: "kk", name: "Kazakh", native: "Қазақ" },
    { code: "km", name: "Khmer", native: "ភាសាខ្មែរ" },
    { code: "rw", name: "Kinyarwanda", native: "Kinyarwanda" },
    { code: "ko", name: "Korean", native: "한국어" },
    { code: "ku", name: "Kurdish", native: "Kurdî" },
    { code: "ky", name: "Kyrgyz", native: "Кыргызча" },
    { code: "lo", name: "Lao", native: "ລາວ" },
    { code: "la", name: "Latin", native: "Latina" },
    { code: "lv", name: "Latvian", native: "Latviešu" },
    { code: "lt", name: "Lithuanian", native: "Lietuvių" },
    { code: "lb", name: "Luxembourgish", native: "Lëtzebuergesch" },
    { code: "mk", name: "Macedonian", native: "Македонски" },
    { code: "mg", name: "Malagasy", native: "Malagasy" },
    { code: "ms", name: "Malay", native: "Bahasa Melayu" },
    { code: "ml", name: "Malayalam", native: "മലയാളം" },
    { code: "mt", name: "Maltese", native: "Malti" },
    { code: "mi", name: "Maori", native: "Māori" },
    { code: "mr", name: "Marathi", native: "मराठी" },
    { code: "mn", name: "Mongolian", native: "Монгол" },
    { code: "my", name: "Myanmar (Burmese)", native: "မြန်မာဘာသာ" },
    { code: "ne", name: "Nepali", native: "नेपाली" },
    { code: "no", name: "Norwegian", native: "Norsk" },
    { code: "ny", name: "Nyanja (Chichewa)", native: "Nyanja" },
    { code: "or", name: "Odia (Oriya)", native: "ଓଡ଼ିଆ" },
    { code: "ps", name: "Pashto", native: "پښتو" },
    { code: "fa", name: "Persian", native: "فارسی" },
    { code: "pl", name: "Polish", native: "Polski" },
    { code: "pt", name: "Portuguese", native: "Português" },
    { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
    { code: "ro", name: "Romanian", native: "Română" },
    { code: "ru", name: "Russian", native: "Русский" },
    { code: "sm", name: "Samoan", native: "Samoan" },
    { code: "gd", name: "Scots Gaelic", native: "Gàidhlig" },
    { code: "sr", name: "Serbian", native: "Српски" },
    { code: "st", name: "Sesotho", native: "Sesotho" },
    { code: "sn", name: "Shona", native: "Shona" },
    { code: "sd", name: "Sindhi", native: "سنڌي" },
    { code: "si", name: "Sinhala", native: "සිංහල" },
    { code: "sk", name: "Slovak", native: "Slovenčina" },
    { code: "sl", name: "Slovenian", native: "Slovenščina" },
    { code: "so", name: "Somali", native: "Soomaali" },
    { code: "es", name: "Spanish", native: "Español" },
    { code: "su", name: "Sundanese", native: "Basa Sunda" },
    { code: "sw", name: "Swahili", native: "Kiswahili" },
    { code: "sv", name: "Swedish", native: "Svenska" },
    { code: "tl", name: "Tagalog (Filipino)", native: "Tagalog" },
    { code: "tg", name: "Tajik", native: "Тоҷикӣ" },
    { code: "ta", name: "Tamil", native: "தமிழ்" },
    { code: "tt", name: "Tatar", native: "Татар" },
    { code: "te", name: "Telugu", native: "తెలుగు" },
    { code: "th", name: "Thai", native: "ภาษาไทย" },
    { code: "tr", name: "Turkish", native: "Türkçe" },
    { code: "tk", name: "Turkmen", native: "Türkmen" },
    { code: "uk", name: "Ukrainian", native: "Українська" },
    { code: "ur", name: "Urdu", native: "اردو" },
    { code: "ug", name: "Uyghur", native: "ئۇيغۇرچە" },
    { code: "uz", name: "Uzbek", native: "O'zbek" },
    { code: "vi", name: "Vietnamese", native: "Tiếng Việt" },
    { code: "cy", name: "Welsh", native: "Cymraeg" },
    { code: "xh", name: "Xhosa", native: "isiXhosa" },
    { code: "yi", name: "Yiddish", native: "יידיש" },
    { code: "yo", name: "Yoruba", native: "Yorùbá" },
    { code: "zu", name: "Zulu", native: "isiZulu" },
];

// ─── Context shape ────────────────────────────────────────────────────────────
interface TranslationContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    translate: (text: string) => Promise<string>;
    isTranslating: boolean;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

// ─── Helper: resolve initial language from ?lang=XX URL param ─────────────────
function getInitialLanguage(): Language {
    try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("lang");
        if (code) {
            const match = LANGUAGES.find(
                (l) => l.code.toLowerCase() === code.toLowerCase()
            );
            if (match) return match;
        }
    } catch (_) {
        // no-op
    }
    return LANGUAGES.find((l) => l.code === "en")!;
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [language, setLanguageState] = useState<Language>(getInitialLanguage);
    const [isTranslating, setIsTranslating] = useState(false);
    // Cache: Map of `${targetLang}:${text}` → translated string
    const cache = useRef<Map<string, string>>(new Map());

    /** Translate a string to the currently selected language */
    const translate = useCallback(
        async (text: string): Promise<string> => {
            if (language.code === "en") return text;

            const cacheKey = `${language.code}:${text}`;
            if (cache.current.has(cacheKey)) {
                return cache.current.get(cacheKey)!;
            }

            setIsTranslating(true);
            try {
                const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
                const res = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        q: text,
                        target: language.code,
                        source: "en",
                        format: "text",
                    }),
                });
                const data = await res.json();
                const translated: string =
                    data?.data?.translations?.[0]?.translatedText ?? text;
                cache.current.set(cacheKey, translated);
                return translated;
            } catch (err) {
                console.error("Translation error:", err);
                return text;
            } finally {
                setIsTranslating(false);
            }
        },
        [language.code]
    );

    /** Update language and sync URL param */
    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        try {
            const url = new URL(window.location.href);
            url.searchParams.set("lang", lang.code);
            window.history.replaceState({}, "", url.toString());
        } catch (_) {
            // no-op
        }
    }, []);

    return (
        <TranslationContext.Provider
            value={{ language, setLanguage, translate, isTranslating }}
        >
            {children}
        </TranslationContext.Provider>
    );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useTranslation() {
    const ctx = useContext(TranslationContext);
    if (!ctx) throw new Error("useTranslation must be used inside TranslationProvider");
    return ctx;
}

// ─── Convenience hook: translate a map of strings whenever language changes ───
export function useTranslated(
    strings: Record<string, string>
): Record<string, string> {
    const { translate, language } = useTranslation();
    const [translated, setTranslated] = useState<Record<string, string>>(strings);

    useEffect(() => {
        if (language.code === "en") {
            setTranslated(strings);
            return;
        }
        let cancelled = false;
        Promise.all(
            Object.entries(strings).map(async ([key, val]) => [key, await translate(val)])
        ).then((entries) => {
            if (!cancelled) setTranslated(Object.fromEntries(entries));
        });
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language.code]);

    return translated;
}
