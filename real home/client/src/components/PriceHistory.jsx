import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import './PriceHistory.css';

const PriceHistory = ({ propertyId }) => {
    // Mock price history data
    const priceData = [
        { date: 'Jan 2023', price: 1400000, event: 'Listed' },
        { date: 'Mar 2023', price: 1450000, event: 'Price change' },
        { date: 'Jun 2023', price: 1420000, event: 'Price change' },
        { date: 'Sep 2023', price: 1480000, event: 'Price change' },
        { date: 'Nov 2023', price: 1500000, event: 'Current' },
    ];

    const taxData = [
        { year: 2020, amount: 12500 },
        { year: 2021, amount: 13200 },
        { year: 2022, amount: 13800 },
        { year: 2023, amount: 14500 },
    ];

    return (
        <div className="price-history">
            <h3>Price & Tax History</h3>

            <div className="history-section">
                <h4>Price History</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={priceData}>
                        <defs>
                            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#006AFF" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#006AFF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                        <XAxis dataKey="date" stroke="#767676" />
                        <YAxis
                            stroke="#767676"
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            formatter={(value) => `$${value.toLocaleString()}`}
                            contentStyle={{ borderRadius: '8px', border: '1px solid #e8e8e8' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#006AFF"
                            strokeWidth={3}
                            fill="url(#priceGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>

                <div className="price-events">
                    <h5>Event History</h5>
                    <div className="events-timeline">
                        {priceData.map((item, index) => (
                            <div key={index} className="event-item">
                                <div className="event-date">{item.date}</div>
                                <div className="event-details">
                                    <span className="event-type">{item.event}</span>
                                    <span className="event-price">${item.price.toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="history-section">
                <h4>Tax History</h4>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={taxData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                        <XAxis dataKey="year" stroke="#767676" />
                        <YAxis
                            stroke="#767676"
                            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                        />
                        <Tooltip
                            formatter={(value) => `$${value.toLocaleString()}`}
                            contentStyle={{ borderRadius: '8px', border: '1px solid #e8e8e8' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#00A300"
                            strokeWidth={3}
                            dot={{ fill: '#00A300', r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>

                <table className="tax-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Property Tax</th>
                            <th>Tax Assessment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taxData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.year}</td>
                                <td>${item.amount.toLocaleString()}</td>
                                <td>${(item.amount * 50).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PriceHistory;
