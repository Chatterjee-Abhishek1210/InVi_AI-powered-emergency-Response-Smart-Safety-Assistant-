import React, { useState } from 'react';
import axios from 'axios';

const AlertForm = () => {
  const [userId, setUserId] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [status, setStatus] = useState('');

  const sendAlert = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const res = await axios.post('http://localhost:5000/api/alert', {
          latitude,
          longitude,
          userId,
          mediaUrl,
        });

        setStatus('🚨 SOS Alert Sent!');
        console.log(res.data);
      });
    } catch (err) {
      setStatus('❌ Failed to send alert');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>SOS Alert</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Media URL (optional)"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
      />
      <button onClick={sendAlert}>Send SOS Alert</button>
      <p>{status}</p>
    </div>
  );
};

export default AlertForm;
