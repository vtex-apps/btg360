interface Window extends Window {
  __btg360: BTG360Configs
  Btg360: Btg360
}

interface ProfileData {
  UserId: string
  IsReturningUser: boolean
  IsUserDefined: boolean
  IsPJ: boolean
  FirstName: string
  LastName: string
  Gender: null
  Email: string
}

interface BTG360Configs {
  BTGId: string
  BTGDomain: string
}

interface Btg360 {
  add(e: Btg360Event): void
  debug(): void
}

interface Btg360Event {
  account: string
  domain: string
  event: string
  items: (
    | Btg360EventItemTransaction
    | Btg360EventItemProduct
    | Btg360EventItemKeyword)[]
    | Array<>
}

interface BTG360EventItemClient {
  email: string
}

interface Btg360EventItemTransaction {
  email: string
  transactionId: string
  id: string
  name: string
  price: string
  department: string
  category: string
  subcategory: string
  brand: string
}

interface Btg360EventItemProduct {
  email: string
  id: string
  name: string
  price: string
  department: string
  category: string
  subcategory: string
  brand: string
}

interface Btg360EventItemKeyword {
  keyword: string
}
