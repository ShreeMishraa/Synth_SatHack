import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function Home() {
  const [data, setData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.spread_pct = parseFloat(data.spread_pct);
    data.expected_loss_pct = parseFloat(data.expected_loss_pct);
    data.risk_score = parseFloat(data.risk_score);
    data.first_loss_prob = parseFloat(data.first_loss_prob);
    data.temp_anomaly = parseFloat(data.temp_anomaly);

    fetch('http://127.0.0.1:5049/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  return (
    <div className="min-h-screen w-full text-white relative" style={{
      backgroundImage: "url('https://i.pinimg.com/originals/74/79/2b/74792bd3c5b7ee798f7b7712754a1ecc.gif')",
      backgroundSize: "cover",
    }}>
      {/* Black Overlay with opacity */}
      <div
        className="absolute inset-0 bg-[#333333] opacity-70"

      ></div>

      <Navbar tranparent />

      <div className="flex flex-col items-center justify-center text-center h-full pb-8 p-2 relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Catastrophic Bond <span className="text-indigo-400">Price Prediction</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-lg mx-auto">
          is a free online tool that allows you to know the current situation to buy, hold, or sell the bond.
        </p>

        <div className="flex flex-col md:flex-row justify-evenly w-full space-y-6 md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold mb-4">Input the data here</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="spread_pct"
                placeholder="Spread Percentage"
                className="w-full p-2 rounded-lg mb-4 text-black"
              />
              <input
                type="text"
                name="expected_loss_pct"
                placeholder="Expected Loss Percentage"
                className="w-full p-2 rounded-lg mb-4 text-black"
              />
              <input
                type="text"
                name="risk_score"
                placeholder="Risk Score"
                className="w-full p-2 rounded-lg mb-4 text-black"
              />
              <input
                type="text"
                name="first_loss_prob"
                placeholder="First Loss Probability"
                className="w-full p-2 rounded-lg mb-4 text-black"
              />
              <input
                type="text"
                name="temp_anomaly"
                placeholder="Temperature Anomaly"
                className="w-full p-2 rounded-lg mb-4 text-black"
              />
              <button
                type="submit"
                className="bg-indigo-400 text-white py-2 px-4 rounded-lg hover:bg-indigo-500"
              >
                Predict
              </button>
            </form>
            {
              data && (
                <div className='p-8 mt-8 rounded-lg mx-auto w-1/2 flex-col bg-indigo-400 flex justify-center items-center'>
                  <div className='text-4xl text-white font-bold'>
                    {data.recommendation}
                  </div>
                  <div>
                    <div className='text-white'>
                      Adjusted Probability: {data.adjusted_probability}
                    </div>
                    <div className='text-white'>
                      Relative Value: {data.relative_value}
                    </div>
                    <div className='text-white'>
                      Risk Level: {data.risk_level}
                    </div>
                    <div className='text-white'>
                      Risk Adjusted Spread: {data.risk_adjusted_spread}
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
