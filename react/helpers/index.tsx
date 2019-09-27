export async function fetchEmail(): Promise<string> {
  try {
    const { Email: email } = await (await fetch(
      '/no-cache/profileSystem/getProfile'
    )).json()
    return email
  } catch (err) {
    console.log(`Couldn't fetch logged in use email`)
    console.log(err)
  }
  return ''
}
