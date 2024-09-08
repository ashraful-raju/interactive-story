import { WebHeader } from "@/Components/Web/WebHeader";

export default function WebLayout({ children, bgImage = "" }) {
    return (
        <div className="min-h-screen">
            <WebHeader />
            <main
                className="h-screen bg-slate-200 dark:bg-slate-700"
                style={{
                    backgroundImage: bgImage ? `url(${bgImage})` : null,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                {children}
            </main>
        </div>
    );
}
