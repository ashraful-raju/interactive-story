import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { slugify } from "@/utils";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function StoryCreate({ auth, story }) {
    const { data, setData, post, errors, processing } = useForm({
        title: story.title,
        slug: story.slug,
        status: story.status ?? "draft",
        cover: null,
        description: story.description,
    });

    const handleChange = (name) => (evt) => {
        setData(name, evt.target.value);
    };
    const submit = (e) => {
        e.preventDefault();

        if (story.id) {
            router.post(route("stories.update", story.id), {
                _method: "put",
                ...data,
            });
            return;
        }

        post(route("stories.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Story Create
                    </h2>
                    <Link href={route("stories.index")}>
                        <PrimaryButton>Back</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Story Create" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="bg-white dark:bg-gray-900">
                            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                    Add a new story
                                </h2>
                                <form
                                    onSubmit={submit}
                                    encType="multipart/form-data"
                                >
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                        <div className="flex col-span-2 space-x-2">
                                            <div className="w-1/2">
                                                <InputLabel value="Title" />
                                                <TextInput
                                                    className="w-full"
                                                    placeholder="Type story title"
                                                    required=""
                                                    value={data.title}
                                                    onChange={handleChange(
                                                        "title"
                                                    )}
                                                    onKeyUp={(evt) => {
                                                        setData(
                                                            "slug",
                                                            slugify(
                                                                evt.target.value
                                                            )
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <InputLabel value="Slug" />
                                                <TextInput
                                                    className="w-full"
                                                    placeholder="Url slug"
                                                    required=""
                                                    value={data.slug}
                                                    onChange={handleChange(
                                                        "slug"
                                                    )}
                                                />
                                                <InputError
                                                    message={errors.slug}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <InputLabel value="Description" />
                                            <TextInput
                                                type="textarea"
                                                defaultValue={data.description}
                                                onChange={handleChange(
                                                    "description"
                                                )}
                                            />
                                        </div>

                                        <div className="flex space-x-2 sm:col-span-2">
                                            <label className="flex items-center space-x-2">
                                                <Checkbox
                                                    type="radio"
                                                    name="status"
                                                    value="draft"
                                                    checked={
                                                        data.status === "draft"
                                                    }
                                                    onChange={handleChange(
                                                        "status"
                                                    )}
                                                />
                                                <span>Draft</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <Checkbox
                                                    type="radio"
                                                    name="status"
                                                    checked={
                                                        data.status ===
                                                        "published"
                                                    }
                                                    value="published"
                                                    onChange={handleChange(
                                                        "status"
                                                    )}
                                                />
                                                <span>Published</span>
                                            </label>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <TextInput
                                                type="file"
                                                onChange={(evt) => {
                                                    setData(
                                                        "cover",
                                                        evt.target.files[0]
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <PrimaryButton
                                        type="submit"
                                        className="mt-4"
                                        disabled={processing}
                                    >
                                        Submit
                                    </PrimaryButton>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
