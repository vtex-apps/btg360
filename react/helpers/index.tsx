export async function fetchEmail() {
  const { Email: email = '' } = await fetch(
    '/no-cache/profileSystem/getProfile'
  ).then(res => res.json())
  return email
}