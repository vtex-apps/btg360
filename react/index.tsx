import { PixelMessage } from './typings/events'
import { canUseDOM } from 'vtex.render-runtime'
import { fetchEmail, clientEvent } from './helpers'

const eventQueue: PixelMessage[] = []

function processMessageQueue() {
  for (const e of eventQueue) {
    handleMessage(e)
  }
}

function handleOrEnqueueMessage (e: PixelMessage) {
  if (window.__BTG_SCRIPTS_READY__) {
    handleMessage(e)
  } else {
    eventQueue.push(e)
  }
}

async function handleMessage(e: PixelMessage) {
  const {
    Btg360,
    __btg360: { BTGId: account, BTGDomain: domain },
    location: { pathname },
  } = window

  switch (e.data.eventName) {
    case 'vtex:pageInfo': {
      clientEvent(account, domain, Btg360)
      if (e.data.eventType === 'internalSiteSearchView') {
        const items = pathname
          .split('?')[0]
          .split('/')
          .filter(item => item.toLocaleLowerCase())
          .map(keyword => ({ keyword }))
        const event = 'search'
        const BTG360SearchEvent: Btg360Event = {
          account,
          domain,
          event,
          items,
        }
        Btg360.add(BTG360SearchEvent)
      }
      break
    }
    case 'vtex:orderPlaced': {
      const email = await fetchEmail()
      const { transactionId, transactionProducts: items } = e.data
      const BTG360TransactionEvent: Btg360Event = {
        account,
        domain,
        event: 'transaction',
        items: items.map(
          ({
            id,
            name,
            price,
            categoryTree: [department = '', category = '', subcategory = ''],
            brand,
          }): Btg360EventItemTransaction => ({
            email,
            transactionId,
            id,
            name,
            price: price.toFixed(2),
            department,
            category,
            subcategory,
            brand,
          })
        ),
      }

      Btg360.add(BTG360TransactionEvent)
      clientEvent(account, domain, Btg360)
      break
    }
    case 'vtex:productView': {
      const {
        product: {
          productId,
          productName: name,
          categories,
          brand,
          items: [
            {
              sellers: [
                {
                  commertialOffer: { Price: price },
                },
              ],
            },
          ],
        },
      } = e.data
      const email = await fetchEmail()
      const [categoryTree] = categories
      const [
        department = '',
        category = '',
        subcategory = '',
      ] = categoryTree.split('/').filter(item => item)
      const BTG360ProductEventItem: Btg360EventItemProduct = {
        id: productId,
        name,
        email,
        price: price.toFixed(2),
        department,
        category,
        subcategory,
        brand,
      }
      const BTG360ProductEvent: Btg360Event = {
        account,
        domain,
        event: 'product',
        items: [BTG360ProductEventItem],
      }

      Btg360.add(BTG360ProductEvent)
      break
    }
    case 'vtex:addToCart': {
      const { items } = e.data
      const email = await fetchEmail()
      const BTG360CartEvent = {
        account,
        domain,
        event: 'cart',
        items: items.map(
          ({ name, price, skuId: id, brand, category: categoryTree }) => {
            const [
              department = '',
              category = '',
              subcategory = '',
            ] = categoryTree.split('/')
            return {
              email,
              id,
              name: name.toUpperCase(),
              price: price.toFixed(2),
              department,
              category,
              subcategory,
              brand,
            }
          }
        ),
      }

      Btg360.add(BTG360CartEvent)
      break
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleOrEnqueueMessage)
  window.addEventListener('btgReady', processMessageQueue)
}
