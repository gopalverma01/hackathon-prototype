import React, { useState } from 'react';
import { classifyItem, generateGreenPass } from '../dummyDb';

const CitizenFlow = () => {
  const [image, setImage] = useState(null);
  const [classifiedItem, setClassifiedItem] = useState(null);
  const [greenPass, setGreenPass] = useState(null);
  const [status, setStatus] = useState('');

  const [pickupConfirmed, setPickupConfirmed] = useState(false);
  const [pickupMessage, setPickupMessage] = useState('');

  // New states
  const [extraDetail, setExtraDetail] = useState('');
  const [tempClassified, setTempClassified] = useState(null); // store initial classification
  const [needsExtraField, setNeedsExtraField] = useState(false); // controls question visibility

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgData = event.target.result;
      setImage(imgData);

      // Classify immediately but store temporarily
      const result = classifyItem(imgData);
      setTempClassified(result);

      // Decide if we need extra field
      if (['mobile', 'tablet', 'laptop'].includes(result.type.toLowerCase()) || result.type.toLowerCase() === 'battery') {
        setNeedsExtraField(true);
        setStatus('Please answer the additional question.');
      } else {
        // If no extra field needed, show prediction immediately
        setClassifiedItem(result);
        setStatus('Item classified successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleExtraDetailSubmit = () => {
    if (!tempClassified) return;
    const finalClassified = {
      ...tempClassified,
      extraDetail: extraDetail
    };
    setClassifiedItem(finalClassified); // now show prediction
    setNeedsExtraField(false);
    setStatus('Item classified successfully!');
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

  const handlePickupClick = () => {
    setPickupConfirmed(true);
    setPickupMessage(getNextDayPickup());
  };

  const handleGenerateGreenPass = () => {
    if (classifiedItem) {
      const pass = generateGreenPass(Math.floor(Math.random() * 1000));
      setGreenPass(pass);
      setStatus('GreenPass generated successfully!');
    }
  };

  return (
    <div className="flow-container">
      <h2>Citizen Workflow</h2>
      
      {/* Step 1 - Image Upload */}
      <div className="step">
        <div className="step-number">1</div>
        <div className="step-content">
          <h3>Snap photo of your e-waste</h3>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && <img src={image} alt="Uploaded" className="image-preview" />}
        </div>
      </div>

      {/* Step 1.5 - Extra Question */}
      {needsExtraField && tempClassified && (
        <div className="step">
          <div className="step-number">1.5</div>
          <div className="step-content">
            {['mobile', 'tablet', 'laptop'].includes(tempClassified.type.toLowerCase()) && (
              <>
                <h4>Condition</h4>
                <select value={extraDetail} onChange={(e) => setExtraDetail(e.target.value)}>
                  <option value="">Select condition</option>
                  <option value="working">Working</option>
                  <option value="not working">Not Working</option>
                </select>
              </>
            )}
            {tempClassified.type.toLowerCase() === 'battery' && (
              <>
                <h4>Is it bulky?</h4>
                <select value={extraDetail} onChange={(e) => setExtraDetail(e.target.value)}>
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </>
            )}
            <button 
              disabled={!extraDetail} 
              onClick={handleExtraDetailSubmit}
              style={{ marginTop: '10px' }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2 - AI Prediction */}
      {classifiedItem && (
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h3>AI Classifies and Provides Instant Price</h3>
            <p>Type: {classifiedItem.type}</p>
            {classifiedItem.extraDetail && <p>Extra: {classifiedItem.extraDetail}</p>}
            <p>Estimated Price: ₹{classifiedItem.price}</p>
          </div>
        </div>
      )}

      {/* Step 3 - Pickup */}
      <div className="step">
        <div className="step-number">3</div>
        <div className="step-content">
          <h3>Book Pickup</h3>
          <button
            disabled={!classifiedItem || pickupConfirmed}
            onClick={handlePickupClick}
            style={{
              backgroundColor: pickupConfirmed ? '#4CAF50' : '#2196F3',
              color: 'white'
            }}
          >
            {pickupConfirmed ? 'Pickup Confirmed' : 'Schedule Pickup'}
          </button>
          {pickupConfirmed && (
            <p style={{ marginTop: '10px', color: 'green' }}>{pickupMessage}</p>
          )}
        </div>
      </div>

      {/* Step 4 - GreenPass */}
      <div className="step">
        <div className="step-number">4</div>
        <div className="step-content">
          <h3>Scan GreenPass</h3>
          <button onClick={handleGenerateGreenPass} disabled={!classifiedItem}>
            Generate GreenPass
          </button>
          {greenPass && (
            <div className="status-message success">
              <p>Item recycled successfully!</p>
              <p>CO₂ saved: {greenPass.co2Saved} kg</p>
              <p>EPR proof ID: {greenPass.id}</p>
            </div>
          )}
        </div>
      </div>

      {status && <div className="status-message info">{status}</div>}
    </div>
  );
};

export default CitizenFlow;
