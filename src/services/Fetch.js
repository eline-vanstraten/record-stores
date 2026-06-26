const URL = process.env.EXPO_PUBLIC_URL

export async function FetchAPI() {
    const headers = {
        "Accept": "application/json",
        "x-delay-ms": "2000"
    }

    try {
        const res = await fetch(URL, {
            method: 'GET',
            headers: headers
        })

        if (res.status === 204) return null

        return await res.json()

    } catch (e) {
        return {
            items: [
                {
                    "error": "Something went wrong! Please try again later!",
                    "stack": e.stack
                }
            ]
        };
    }

}