import React, { useState } from 'react';
import './MortgageCalculator.css';

const MortgageCalculator = ({ price }) => {
    const [downPayment, setDownPayment] = useState(price * 0.2);
    const [interestRate, setInterestRate] = useState(6.5);
    const [loanTerm, setLoanTerm] = useState(30);

    const calculateMonthlyPayment = () => {
        const principal = price - downPayment;
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        const monthlyPayment = principal *
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        return monthlyPayment;
    };

    const monthlyPayment = calculateMonthlyPayment();
    const downPaymentPercent = ((downPayment / price) * 100).toFixed(0);

    return (
        <div className="mortgage-calculator">
            <h3>💰 Mortgage Calculator</h3>

            <div className="calc-result">
                <div className="monthly-payment">
                    <span className="label">Est. Monthly Payment</span>
                    <span className="amount">${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo</span>
                </div>
            </div>

            <div className="calc-inputs">
                <div className="input-group">
                    <label>
                        Down Payment ({downPaymentPercent}%)
                        <input
                            type="range"
                            min={price * 0.05}
                            max={price * 0.5}
                            step={1000}
                            value={downPayment}
                            onChange={(e) => setDownPayment(Number(e.target.value))}
                        />
                    </label>
                    <span className="value">${downPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>

                <div className="input-group">
                    <label>
                        Interest Rate
                        <input
                            type="range"
                            min={3}
                            max={10}
                            step={0.1}
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                        />
                    </label>
                    <span className="value">{interestRate.toFixed(2)}%</span>
                </div>

                <div className="input-group">
                    <label>
                        Loan Term
                        <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))}>
                            <option value={15}>15 years</option>
                            <option value={20}>20 years</option>
                            <option value={30}>30 years</option>
                        </select>
                    </label>
                </div>
            </div>

            <div className="calc-breakdown">
                <div className="breakdown-item">
                    <span>Principal & Interest</span>
                    <span>${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="breakdown-item">
                    <span>Property Tax</span>
                    <span>${((price * 0.012) / 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="breakdown-item">
                    <span>Home Insurance</span>
                    <span>${((price * 0.005) / 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>
            </div>
        </div>
    );
};

export default MortgageCalculator;
