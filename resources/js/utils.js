export function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str
        .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-"); // remove consecutive hyphens
    return str;
}

export function capitalize(str) {
    if (typeof str !== "string" || str.length === 0) {
        return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function wordLimit(str, len = 10) {
    const words = str.split(" ");

    const text = words.slice(0, len).join(" ");

    return words.length > len ? `${text}...` : text;
}
