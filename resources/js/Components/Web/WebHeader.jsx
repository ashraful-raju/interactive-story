import Dropdown from "../Dropdown";
import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "../ApplicationLogo";
import PrimaryButton from "../PrimaryButton";

export function WebHeader() {
    const {
        props: {
            auth: { user },
        },
    } = usePage();
    return (
        <header className="fixed w-full top-0">
            <nav className="bg-transparent pt-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                        </div>

                        <div className="flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                {user ? (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                                                >
                                                    <span className="sr-only">
                                                        Open user menu
                                                    </span>
                                                    <img
                                                        className="w-8 h-8 rounded-full"
                                                        src={user.avatar}
                                                        alt="user photo"
                                                    />
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                ) : (
                                    <PrimaryButton>Login</PrimaryButton>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
