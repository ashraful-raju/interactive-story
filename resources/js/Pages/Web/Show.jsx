import PrimaryButton from "@/Components/PrimaryButton";
import WebLayout from "@/Layouts/WebLayout";
import { Head, Link } from "@inertiajs/react";

export default function Story({ auth, story }) {
    console.log({ story });
    return (
        <WebLayout bgImage={story.cover}>
            <Head title={story.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="fixed bottom-4 w-full flex justify-center items-end max-h-[36rem]">
                        <div className="text-white bg-slate-700 p-6 rounded-md max-w-md prose">
                            <h1 className="text-3xl mb-3">{story.title}</h1>
                            <p>{story.description}</p>

                            <div className="flex justify-between flex-wrap items-center space-y-1">
                                {story.starting_items.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={route("story.chapter", {
                                            story,
                                            item: item.slug,
                                        })}
                                    >
                                        <PrimaryButton>
                                            {item.name}
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
