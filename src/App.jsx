import React, { useState } from "react";
import "./app.css";

const BmiCalculator = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [weightToLose, setWeightToLose] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gender, setGender] = useState(null);

  const calculateBmi = () => {
    const bmiValue = weight / ((height / 100) ** 2);
    const healthyWeightRangeMin = 18.5 * ((height / 100) ** 2);
    const healthyWeightRangeMax = 24.9 * ((height / 100) ** 2);
    const weightDifference = weight - healthyWeightRangeMax;

    setBmi(bmiValue.toFixed(2));
    setWeightToLose(weightDifference.toFixed(2));
    setShowResult(true);
  };

  const calculateAgain = () => {
    setShowResult(false);
    setHeight(0);
    setWeight(0);
    setGender(null);
  };

  const isInputEmpty = height === 0 || weight === 0 || gender === null;

  const getAdvice = () => {
    if (bmi < 18.5) {
      return "You are underweight. It is recommended to consult with a healthcare professional for guidance.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "Congratulations! Your weight is within the healthy range.";
    } else if (bmi >= 25 && bmi <= 29.9) {
      return "You are overweight. It is recommended to adopt a balanced diet and engage in regular physical activity.";
    } else {
      return "You are obese. It is important to seek medical advice and make lifestyle changes to improve your health.";
    }
  };

  return (
    <div>
      <h2>BMI Calculator</h2>
      <div>
        <label className="bms">
          Height:
          <input
            className="bufn"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            disabled={showResult}
          />
          cm
        </label>
      </div>
      <div>
        <label>
          Weight:
          <input
            className="butm"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            disabled={showResult}
          />
          kg
        </label>
      </div>
      <div>
        <label className="gen">
          Gender:
          <select
            className="gender-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            disabled={showResult}
          >
            <option value="">Select Gender</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
          </select>
        </label>
      </div>
      {showResult ? (
        <div>
          <p className="bmires">
            Your BMI is: <span className="result">{bmi}</span>
          </p>
          {weightToLose < 0 ? (
            <p>
              You need to gain {Math.abs(weightToLose)} kg to reach a healthy weight.
            </p>
          ) : (
            <p>
              You need to lose {weightToLose} kg to reach a healthy weight.
            </p>
          )}
          <p>
            Your healthy weight range is {weight + Math.abs(weightToLose)} - {weight} kg.
          </p>
          <p>{getAdvice()}</p>
          <button onClick={calculateAgain}>Calculate Again</button>
        </div>
      ) : (
        <button onClick={calculateBmi} disabled={isInputEmpty}>
          Calculate BMI
        </button>
      )}
    </div>
  );
};

export default BmiCalculator;
