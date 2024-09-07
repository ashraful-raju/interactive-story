import PrimaryButton from "@/Components/PrimaryButton";
import { Media } from "@/Components/Web/Media";
import WebLayout from "@/Layouts/WebLayout";
import { Head, Link } from "@inertiajs/react";

export default function Chapter({ auth, story, item }) {
    console.log({ item });
    return (
        <WebLayout bgImage={item.image}>
            <Head title={item.title} />
            {item.media && <Media media={item.media} />}

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="fixed bottom-4 w-full flex justify-center items-end max-h-[36rem]">
                        <div className="text-white bg-opacity-40 hover:bg-opacity-100 bg-slate-700 p-6 rounded-md max-w-2xl max-h-[65vh] transition-all duration-150 overflow-hidden overflow-y-auto">
                            <h1 className="text-3xl mb-3">{item.title}</h1>
                            <p>{item.description}</p>

                            <div className="flex justify-between flex-wrap items-center space-y-1">
                                {item.childrens.map((child) => (
                                    <Link
                                        key={child.id}
                                        href={route("story.chapter", {
                                            story,
                                            item: child.slug,
                                        })}
                                    >
                                        <PrimaryButton>
                                            {child.name}
                                        </PrimaryButton>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}
