interface Event extends Event {
  data: any;
}

interface Window extends Window {
  __btg360: {
    BTGId: string;
    BTGDomain: string;
  };
}

declare module Btg360 {
  function add(o: Btg360Event): void;
  function debug(): void;
}

interface Btg360Event {
  account: string;
  domain: string;
  event: string;
  items: Btg360EventItemProduct[] | Btg360EventItemKeyword[];
}

interface Btg360EventItemProduct {
  id: string;
  name: string;
  price: string;
  department: string;
  category: string;
  subcategory: string;
  brand: string;
}

interface Btg360EventItemKeyword {
  keyword: string;
}
