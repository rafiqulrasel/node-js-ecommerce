import i18next from "i18next";
import Backend from "i18next-fs-backend";
import i18nextMiddleware from "i18next-http-middleware";
import path from "path";

await i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        fallbackLng: "en",
        preload: ["en", "bn"],
        ns: [
            "common",
            "validation",
            "auth",
            "user",
            "product",
            "category",
            "brand",
            "cart",
            "order",
            "payment",
            "coupon",
            "review",
            "error",
        ],
        defaultNS: "common",
        backend: {
            loadPath: path.join(process.cwd(), "src/locales/{{lng}}/{{ns}}.json"),
        },
        detection: {
            order: ["header"],
            lookupHeader: "accept-language",
        },
    });

const i18nMiddleware = i18nextMiddleware.handle(i18next);

export { i18nMiddleware };
export default i18next;