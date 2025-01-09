"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ApplicationFormProps {
  jobId: string;
  position: string;
}

export function ApplicationForm({ jobId, position }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
    coverLetter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Submitted:", { jobId, position, ...formData });
      
      // Here you would typically send the data to your API
      // const response = await fetch('/api/applications', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ jobId, position, ...formData }),
      // });
      
      setFeedback({
        message: "Thank you for your application. We'll be in touch soon!",
        type: 'success'
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        resume: null,
        coverLetter: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      setFeedback({
        message: "There was an error submitting your application. Please try again.",
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {feedback && (
        <div className={`p-4 mb-4 rounded ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {feedback.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
          required
        />
        <Textarea
          placeholder="Cover Letter"
          value={formData.coverLetter}
          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
}
