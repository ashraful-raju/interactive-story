import { Story } from "@/Components/Web/Story";
import WebLayout from "@/Layouts/WebLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, stories }) {
    return (
        <WebLayout>
            <Head title="Dashboard" />

            <div className="py-12 pt-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                        {stories?.map((item) => (
                            <Story key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}
