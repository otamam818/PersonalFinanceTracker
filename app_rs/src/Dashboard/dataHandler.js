
export function allEmpty(userData) {
  return Object.keys(userData.bought_items).length === 0 &&
         Object.keys(userData.category).length     === 0 &&
         Object.keys(userData.items).length        === 0 &&
         Object.keys(userData.receipts).length     === 0 &&
         Object.keys(userData.stores).length       === 0 ;
}

