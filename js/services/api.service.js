import { url } from "../api.config.js";


export async function doGet(value) {
    const res = await fetch(`${url}${value}`)
    return await res.json()
}
export async function doPost(value, data) {
    const res = await fetch(`${url}${value}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
    return await res.json();
}

export async function doDelete(value, data) {
    const res = await fetch(`${url}${value}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
    return await res.json();
}