import React, { useState } from 'react';
import { dummyDb, placeBid } from '../dummyDb';

const RecyclerFlow = () => {
  const [lots, setLots] = useState(dummyDb.lots);
  const [selectedLot, setSelectedLot] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [wonLot, setWonLot] = useState(null);
  const [status, setStatus] = useState('');
  const [bidStage, setBidStage] = useState('idle'); // idle | placed | outbid

  const [manifestCreated, setManifestCreated] = useState(false);
  const [pickupConfirmed, setPickupConfirmed] = useState(false);
  const [pickupMessage, setPickupMessage] = useState('');

  const handlePlaceBid = () => {
    if (!selectedLot || !bidAmount) return;

    placeBid(selectedLot.id, parseInt(bidAmount));
    setBidStage('placed');
    setStatus(`Bid of ₹${bidAmount} placed for Lot #${selectedLot.id}`);

    setTimeout(() => {
      setBidStage('outbid');
      setStatus(`❌ Someone has increased the bid for Lot #${selectedLot.id}!`);
    }, 1000);
  };

  const handleIncreaseBid = () => {
    const increasedAmount = parseInt(bidAmount) + 100;
    placeBid(selectedLot.id, increasedAmount);
    setBidStage('placed');
    setStatus(`Bid increased to ₹${increasedAmount} for Lot #${selectedLot.id}`);
    setBidAmount(String(increasedAmount));

    setTimeout(() => {
      setWonLot(selectedLot);
      setStatus(`🎉 You won Lot #${selectedLot.id} for ₹${increasedAmount}!`);
    }, 1000);
  };

  const getNextDayPickup = () => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);

    const randomHour = Math.floor(Math.random() * (18 - 8 + 1)) + 8;
    const randomMinute = Math.floor(Math.random() * 60);

    const pickupDate = nextDay.toLocaleDateString();
    const pickupTime = `${String(randomHour).padStart(2, '0')}:${String(randomMinute).padStart(2, '0')}`;

    return `Pickup scheduled for ${pickupDate} at ${pickupTime}`;
  };

  const handleManifestClick = () => {
    setManifestCreated(true);
  };

  const handlePickupClick = () => {
    setPickupConfirmed(true);
    setPickupMessage(getNextDayPickup());
  };

  return (
    <div className="flow-container">
      <h2>Recycler Workflow</h2>

      {/* Step 1 */}
      <div className="step">
        <div className="step-number">1</div>
        <div className="step-content">
          <h3>See Nearby Lots</h3>
          <ul>
            {lots.map((lot) => (
              <li key={lot.id}>
                Lot #{lot.id} - {lot.items.length} items
                <button onClick={() => setSelectedLot(lot)}>View Details</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Step 2 */}
      <div className="step">
        <div className="step-number">2</div>
        <div className="step-content">
          <h3>Place Bids</h3>
          {selectedLot && (
            <div>
              <p>Lot #{selectedLot.id} Details:</p>
              <ul>
                {selectedLot.items.map((item, index) => (
                  <li key={index}>
                    {item.type} -{' '}
                    {item.type.toLowerCase().includes('battery')
                      ? item.safe
                        ? 'Safe ✅'
                        : 'Unsafe ❌'
                      : item.working
                      ? 'Working'
                      : 'Not Working'}
                  </li>
                ))}
              </ul>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter bid amount"
              />

              {bidStage === 'idle' && (
                <button onClick={handlePlaceBid} style={{ backgroundColor: '#4CAF50' }}>
                  Place Bid
                </button>
              )}
              {bidStage === 'placed' && (
                <button disabled style={{ backgroundColor: '#4CAF50' }}>
                  Bid Placed
                </button>
              )}
              {bidStage === 'outbid' && (
                <button onClick={handleIncreaseBid} style={{ backgroundColor: '#f44336' }}>
                  Increase Bid
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Step 3 */}
      <div className="step">
        <div className="step-number">3</div>
        <div className="step-content">
          <h3>Win Lot</h3>
          {wonLot && (
            <div className="status-message success">
              <p>🎉 You won Lot #{wonLot.id}!</p>
              <p>Contains {wonLot.items.length} items</p>
            </div>
          )}
        </div>
      </div>

      {/* Step 4 */}
      <div className="step">
        <div className="step-number">4</div>
        <div className="step-content">
          <h3>Pick Up Lot & Digital Manifest</h3>
          {wonLot && (
            <div>
              <button onClick={handleManifestClick} disabled={manifestCreated}>
                {manifestCreated ? 'Created' : 'Generate Digital Manifest'}
              </button>
              <button
                onClick={handlePickupClick}
                disabled={!manifestCreated || pickupConfirmed}
                style={{
                  backgroundColor: pickupConfirmed ? '#4CAF50' : '#2196F3',
                  color: 'white',
                }}
              >
                {pickupConfirmed ? 'Pickup Confirmed' : 'Confirm Pickup'}
              </button>
              {pickupConfirmed && (
                <p style={{ marginTop: '10px', color: 'green' }}>{pickupMessage}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Status Message */}
      {status && (
        <div
          className={`status-message ${
            bidStage === 'outbid' ? 'danger' : bidStage === 'placed' ? 'info' : ''
          }`}
          style={{
            backgroundColor: bidStage === 'outbid' ? '#f8d7da' : '',
            color: bidStage === 'outbid' ? '#721c24' : '',
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
};

export default RecyclerFlow;
