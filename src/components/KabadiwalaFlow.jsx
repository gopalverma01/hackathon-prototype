import React, { useState } from 'react';
import { dummyDb, checkBatterySafety, createLot } from '../dummyDb';
import imgg from '../assets/imgg.png';

const KabadiwalaFlow = () => {
  const places = ['A-12 - Mayur vihar West', 'B-22 Dwarka East', 'A-55 Karol bagh ', 'C-54 New Delhi', 'G-12 Karol bagh', 'A-99 New Delhi'];

  const initialItems = dummyDb.items
    .filter(item => !item.verified)
    .map(item => ({
      ...item,
      place: places[Math.floor(Math.random() * places.length)]
    }));

  const [items, setItems] = useState(initialItems);
  const [verifiedItems, setVerifiedItems] = useState([]);
  const [createdLot, setCreatedLot] = useState(null);
  const [status, setStatus] = useState('');

const moveToVerified = (item, isSafe) => {
  // Remove the item from items
  const updatedItems = items.filter(i => i.id !== item.id);
  setItems(updatedItems);

  // Add to verified items
  const verifiedItem = { ...item, verified: true, safe: isSafe };
  setVerifiedItems(prev => [...prev, verifiedItem]);

  setStatus(
    `Item ${item.id} verified - ${
      isSafe === null ? 'Picked-up' : `Battery ${isSafe ? 'safe' : 'unsafe'}`
    }`
  );
};

  const handleSafe = (item) => {
    moveToVerified(item, true);
  };

  const handleUnsafe = (item) => {
    moveToVerified(item, false);
  };

  const handlePickedUp = (item) => {
    moveToVerified(item, true); // null means pickup without safety label
  };

  const handleCreateLot = () => {
    if (verifiedItems.length > 0) {
      const lot = createLot(verifiedItems);
      setCreatedLot(lot);
      setVerifiedItems([]);
      setStatus(`Created Lot #${lot.id} with ${lot.items.length} items`);
    }
  };

  return (
    <div className="flow-container">
      <h2>Kabadiwala Workflow</h2>

      <div className="pickup-map" style={{ marginTop: '15px' }}>
        <h4>Best Pickup Route</h4>
        <img
          src={imgg}
          alt="Pickup Route Map"
          style={{
            width: '100%',
            maxWidth: '600px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <div className="step">
        <div className="step-number">1</div>
        <div className="step-content">
          <h3>Pickup Items</h3>
          <p>Items to verify: {items.length}</p>
          <ul>
            {items.map(item => (
              <li key={item.id} style={{ marginBottom: '10px' }}>
                {item.type} (₹{item.price}) - 📍 {item.place}
                <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                  {item.type.toLowerCase().includes('battery') ? (
                    <>
                      <button
                        onClick={() => handleSafe(item)}
                        style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '5px' }}
                      >
                        Safe
                      </button>
                      <button id='unsafe'
                        onClick={() => handleUnsafe(item)}
                        // style={{ backgroundColor: '#dd2915ff', color: 'white', marginRight: '5px' }}
                      >
                        Unsafe
                      </button>
                      <button 
                        onClick={() => handlePickedUp(item)}
                        style={{ backgroundColor: '#2196F3', color: 'white' }}
                      >
                        Picked-up
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handlePickedUp(item)}
                      style={{ backgroundColor: '#2196F3', color: 'white' }}
                    >
                      Picked-up
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="step">
        <div className="step-number">2</div>
        <div className="step-content">
          <h3>Picked items</h3>
          <p>Verified items: {verifiedItems.length}</p>
          <ul>
            {verifiedItems.map(item => (
              <li key={item.id}>
                {item.type} -{' '}
                {item.safe === null
                  ? 'Picked-up 🚚'
                  : item.safe
                  ? 'picked - Safe ✅'
                  : 'Unsafe ❌'}{' '}
                - 📍 {item.place}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="step">
        <div className="step-number">3</div>
        <div className="step-content">
          <h3>Add to Inventory</h3>
          <p>Items are automatically added to inventory after verification</p>
        </div>
      </div>

      <div className="step">
        <div className="step-number">4</div>
        <div className="step-content">
          <h3>Create Lot</h3>
          <button onClick={handleCreateLot} disabled={verifiedItems.length === 0}>
            Create New Lot
          </button>
          {createdLot && (
            <div className="status-message success">
              <p>Created Lot #{createdLot.id}</p>
              <p>Contains {createdLot.items.length} items</p>
              <p>Status: {createdLot.status}</p>
            </div>
          )}
        </div>
      </div>

      {status && <div className="status-message info">{status}</div>}
    </div>
  );
};

export default KabadiwalaFlow;
