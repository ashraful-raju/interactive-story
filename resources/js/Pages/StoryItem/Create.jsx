import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { slugify } from "@/utils";
import { Select } from "@headlessui/react";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function StoryItemCreate({ auth, story, items, story_item }) {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("item");

    const { data, setData, post, errors, processing } = useForm({
        name: story_item.name,
        title: story_item.title,
        parent_id: queryParam,
        slug: story_item.slug,
        description: story_item.description,
        image: null,
        media: null,
    });

    const handleChange = (name) => (evt) => {
        setData(name, evt.target.value);
    };
    const submit = (e) => {
        e.preventDefault();

        if (story_item.id) {
            router.post(
                route("stories.items.update", {
                    story: story.id,
                    item: story_item.id,
                }),
                {
                    _method: "put",
                    ...data,
                }
            );
            return;
        }

        post(route("stories.items.store", story.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Story Item create
                    </h2>
                    <Link href={route("stories.show", story.id)}>
                        <PrimaryButton>Back</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Story Item create" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="bg-white dark:bg-gray-900">
                            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                    Add a new story item
                                </h2>
                                <form
                                    onSubmit={submit}
                                    encType="multipart/form-data"
                                >
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                        <div className="col-span-2">
                                            <InputLabel value="Name" />
                                            <TextInput
                                                className="w-full"
                                                placeholder="The text show in story option"
                                                required=""
                                                value={data.name}
                                                onChange={handleChange("name")}
                                            />
                                            <InputError message={errors.name} />
                                        </div>
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
                                                <InputError
                                                    message={errors.title}
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
                                                placeholder="Write something..."
                                                onChange={handleChange(
                                                    "description"
                                                )}
                                            />
                                            <InputError
                                                message={errors.description}
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <InputLabel value="Image" />
                                            <TextInput
                                                type="file"
                                                onChange={(evt) => {
                                                    setData(
                                                        "image",
                                                        evt.target.files[0]
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <InputLabel value="Media" />
                                            <TextInput
                                                type="file"
                                                onChange={(evt) => {
                                                    setData(
                                                        "media",
                                                        evt.target.files[0]
                                                    );
                                                }}
                                            />
                                        </div>

                                        <InputError
                                            message={
                                                errors.image ?? errors.media
                                            }
                                        />

                                        <div className="sm:col-span-2">
                                            <InputLabel value="Parent" />
                                            <Select
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
                                                defaultValue={data.parent_id}
                                                onChange={handleChange(
                                                    "parent_id"
                                                )}
                                            >
                                                <option value={null}>
                                                    Select Parent
                                                </option>
                                                {Object.entries(items).map(
                                                    ([key, label]) => (
                                                        <option
                                                            key={key}
                                                            value={key}
                                                        >
                                                            {label}
                                                        </option>
                                                    )
                                                )}
                                            </Select>
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
