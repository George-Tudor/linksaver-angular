const host = 'http://localhost:8080'

export default {
    async postUnauthenticated (url, payload) {
        const rawResponse = await fetch(host + url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        return await rawResponse.json()
    },
    async post (url, payload) {
        await fetch(host + url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${window.localStorage.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    },
    async get (url, query) {
        const rawResponse = await fetch(host + url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${window.localStorage.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            query
        })
        return await rawResponse.json()
    },
    async delete (url) {
        await fetch(host + url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${window.localStorage.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
}
