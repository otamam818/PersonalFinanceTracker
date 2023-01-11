
export function allEmpty(userData) {
  // NOTE: Data handling should be done by rust whenever possible, where this
  //       function happens to make better sense in rust anyways
  // TODO: Port this to rust
  return userData.bought_items === null &&
         userData.category === null &&
         userData.items === null &&
         userData.receipts === null &&
         userData.stores === null;
}

