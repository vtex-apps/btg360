export async function fetchEmail(): Promise<string> {
    const { Email: email } = await (await fetch(
      '/no-cache/profileSystem/getProfile'
    )).json()

    if(email == undefined) {
      return 'error'
    }

    return email
}

export async function clientEvent(account: string, domain: string, Btg360: any) {
  const email = await fetchEmail()
  const BTG360ClientEvent: Btg360Event = {
    account,
    domain,
    event: 'client',
    items: [{email}]
  }

  if (email != 'error') {
    Btg360.add(BTG360ClientEvent)
  }
}
