import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import graph1 from '../assets/graph1.jpeg'; // Ensure the file exists in this path
import graph2 from '../assets/graph2.jpeg'; // Ensure the file exists in this path

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
    <div className="min-h-screen w-full text-white font-sans">
      {/* Hero Section */}
      <div
        className="h-screen w-full flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: "url('https://i.pinimg.com/originals/74/79/2b/74792bd3c5b7ee798f7b7712754a1ecc.gif')",
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-[#333333] opacity-70"></div>
        <Navbar transparent />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">
            Catastrophic Bond <span className="text-indigo-400">Price Prediction</span>
          </h1>
          <p className="text-xl mb-6">
            Empowering businesses to mitigate risks with AI-driven insights.
          </p>
          <a href="#form" className="bg-indigo-400 py-3 px-6 rounded-lg hover:bg-indigo-500">
            Get Started
          </a>
        </div>
      </div>

      {/* Input Form Section */}
      <section id="form" className="py-16 px-4 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-8">Input Data for Prediction</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          {['spread_pct', 'expected_loss_pct', 'risk_score', 'first_loss_prob', 'temp_anomaly'].map((field, index) => (
            <input
              key={index}
              type="text"
              name={field}
              placeholder={field.replace('_', ' ').toUpperCase()}
              className="w-full p-3 rounded-lg mb-4 bg-white text-black"
            />
          ))}
          <button type="submit" className="bg-indigo-400 text-white py-3 px-6 rounded-lg hover:bg-indigo-500 w-full">
            Predict
          </button>
        </form>
        {data && (
          <div className="p-6 mt-8 bg-indigo-500 text-white rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">{data.recommendation}</h3>
            <p>Adjusted Probability: {data.adjusted_probability}</p>
            <p>Relative Value: {data.relative_value}</p>
            <p>Risk Level: {data.risk_level}</p>
            <p>Risk Adjusted Spread: {data.risk_adjusted_spread}</p>
          </div>
        )}
      </section>

      {/* Visualization Section */}
      <section id="visualization" className="py-16 px-4 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">Risk Predictions</h2>
        <div className="max-w-4xl mx-auto">
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <img src={graph1} alt="Graph" className="h-full w-auto" />
            <img src={graph2} alt="Graph" className="h-full w-auto" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-gray-900">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              question: 'What is a catastrophic bond?',
              answer:
                'Catastrophic bonds (cat bonds) are risk-linked securities that transfer the risks of natural disasters from insurers to investors.',
            },
            {
              question: 'How does the prediction model work?',
              answer:
                'Our model uses machine learning algorithms trained on historical data, such as risk scores and temperature anomalies, to predict outcomes.',
            },
            {
              question: 'Who can use this tool?',
              answer:
                'Insurance companies, financial analysts, and investors can use this tool to assess risks and returns of catastrophic bonds.',
            },
            {
              question: 'How accurate is the prediction?',
              answer:
                'The accuracy depends on input data quality. Our model uses real-world data and advanced simulations for reliability.',
            },
            {
              question: 'What technologies power this tool?',
              answer:
                'It leverages React for the frontend, Flask for the backend, and Python libraries like scikit-learn for machine learning.',
            },
          ].map((faq, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-indigo-400">{faq.question}</h3>
              <p className="text-gray-200">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-gray-800 text-center text-gray-400">
        <p>
          Made with ❤️ by <span className="text-white font-semibold">Team Synth</span>
        </p>
      </footer>
    </div>
  );
}

export default Home;
