import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { capitalize } from "@/utils";
import { Head, Link } from "@inertiajs/react";

export default function Stories({ auth, stories }) {
    console.log(stories);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Stories
                    </h2>
                    <Link href={route("stories.create")}>
                        <PrimaryButton>Create</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Stories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* <FlashMessage message={message} /> */}
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                All Stories
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    All the stories created by you...
                                </p>
                            </caption>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created At
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {stories.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                        >
                                            <Link
                                                href={route(
                                                    "stories.show",
                                                    item.id
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        </th>
                                        <td className="px-6 py-4">
                                            {new Date(
                                                item.created_at
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {capitalize(item.status)}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link
                                                href={route(
                                                    "stories.edit",
                                                    item.id
                                                )}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={route(
                                                    "stories.destroy",
                                                    item.id
                                                )}
                                                method="DELETE"
                                                onClick={(evt) =>
                                                    confirm("Are you sure?")
                                                        ? true
                                                        : evt.preventDefault()
                                                }
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
