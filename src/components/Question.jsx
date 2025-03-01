import { useState, useEffect } from "react";
import questions from "../questions";

const Question = () => {
  const [randomQuestion, setRandomQuestion] = useState('');

  useEffect(() => {
    // Function to set a new random question
    const updateQuestion = () => {
      setRandomQuestion(questions[Math.floor(Math.random() * questions.length)]);
    };

    // Set an initial random question
    updateQuestion();

    // Set interval to update the question every 15 minutes (900,000 milliseconds)
    const intervalId = setInterval(updateQuestion, 900000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="question-container">
      <h2>{randomQuestion}</h2>
    </div>
  );
};

export default Question;