
export async function loadHtml(file) {
    const res = await fetch(file)
    return await res.text()
}

export function getHtml(id){
    return document.getElementById(id)
}