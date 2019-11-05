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

export async function clientEvent(account: string, domain: string, Btg360: any) {
  const email = await fetchEmail()
  const BTG360ClientEvent: Btg360Event = {
    account,
    domain,
    event: 'client',
    items: [{email}]

  }

  Btg360.add(BTG360ClientEvent)
}
