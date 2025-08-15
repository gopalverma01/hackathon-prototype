// Simple in-memory database for our prototype
const dummyDb = {
  items: [
    { id: 1, type: 'phone', price: 500, image: 'battery.png', verified: false },
    { id: 2, type: 'laptop', price: 1000, image: 'battery.png', verified: false },
    { id: 3, type: 'battery', price: 1000, image: 'battery.png', verified: false },
    { id: 4, type: 'tablet', price: 1000, image: 'battery.png', verified: false }
  ],
  lots: [],
  bids: [],
  greenPasses: []
};

// Simulate AI classification
function classifyItem(image) {
  const types = ['battery','phone', 'laptop', 'tablet', 'battery'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomPrice = Math.floor(Math.random() * 900) + 100;
  return { type: randomType, price: randomPrice };
}

// Simulate battery safety check
function checkBatterySafety(item) {
  return Math.random() > 0.2; // 80% chance of being safe
}

// Simulate creating a lot
function createLot(items) {
  const newLot = {
    id: dummyDb.lots.length + 1,
    items: items,
    location: 'Local Warehouse',
    status: 'available'
  };
  dummyDb.lots.push(newLot);
  return newLot;
}

// Simulate placing a bid
function placeBid(lotId, amount) {
  const newBid = {
    id: dummyDb.bids.length + 1,
    lotId: lotId,
    amount: amount,
    status: 'pending'
  };
  dummyDb.bids.push(newBid);
  return newBid;
}

// Simulate generating GreenPass
function generateGreenPass(itemId) {
  const newPass = {
    id: dummyDb.greenPasses.length + 1,
    itemId: itemId,
    co2Saved: Math.floor(Math.random() * 50) + 10,
    date: new Date().toISOString()
  };
  dummyDb.greenPasses.push(newPass);
  return newPass;
}

export { dummyDb, classifyItem, checkBatterySafety, createLot, placeBid, generateGreenPass };