export async function fetchEmail(): Promise<string> {
    try {
       const {Email: email} = (await fetch('/no-cache/profileSystem/getProfile')).json()
       return email
    } catch () {
       console.log(`Couldn't fetch logged in use email`)
    }
    return ''
}
