
export function allEmpty(userData) {
  return userData.bought_items.length === 0 &&
         userData.category.length     === 0 &&
         userData.items.length        === 0 &&
         userData.receipts.length     === 0 &&
         userData.stores.length       === 0 ;
}

