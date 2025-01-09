"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export function TestingEnvironment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  // Mock questions - in a real app, these would come from an API or database
  const questions = [
    "Write a function that reverses a string.",
    "Implement a simple React component that displays a counter.",
    "Explain the concept of closures in JavaScript.",
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Here you would typically send the answers to your backend
    console.log("Submitting answers:", answers);
    // You could also use the api routes to handle this
    // fetch('/api/submit-test', { method: 'POST', body: JSON.stringify(answers) })
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Question {currentQuestion + 1}</h2>
      <p className="mb-4">{questions[currentQuestion]}</p>
      <Textarea
        className="mb-4"
        value={answers[currentQuestion] || ''}
        onChange={(e) => handleAnswerChange(e.target.value)}
        rows={10}
      />
      <div className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentQuestion === 0}>Previous</Button>
        {currentQuestion < questions.length - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </Card>
  );
}
