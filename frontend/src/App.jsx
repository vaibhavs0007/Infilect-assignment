import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function App() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const fetchMetrics = () => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/metrics`)
        .then(res => {
          setMetrics(prev => [
            ...prev.slice(-9),
            {
              ...res.data,
              time: new Date().toLocaleTimeString(),
            },
          ]);
        });
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Monitoring Dashboard</h1>
      <LineChart width={800} height={400} data={metrics}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cpu_usage" stroke="#8884d8" />
        <Line type="monotone" dataKey="memory_usage" stroke="#82ca9d" />
        <Line type="monotone" dataKey="latency_ms" stroke="#ff7300" />
      </LineChart>
      <h3>Total Requests: {metrics.length > 0 ? metrics[metrics.length - 1].request_counter : 0}</h3>
    </div>
  );
}

export default App;
