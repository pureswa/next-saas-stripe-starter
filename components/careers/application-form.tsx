  "use client";

import { useState } from "react";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Notification } from "@/components/ui/notification";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { countryCodes } from '@/lib/country-codes';

interface ApplicationFormProps {
  position: string;
}

export default function ApplicationForm({ position }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
    coverLetter: "",
  });
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('coverLetter', formData.coverLetter);
    formDataToSend.append('position', position);
    formDataToSend.append('phoneNumber', `${countryCode}${phoneNumber}`);
    if (formData.resume) {
      formDataToSend.append('resume', formData.resume);
    }

    try {
    const response = await fetch('/api/submit-application', {
      method: 'POST',
        body: formDataToSend,
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setNotification({ message: data.message || "Your application has been successfully submitted!", type: 'success' });
        setIsSubmitted(true);
    } else {
      setNotification({ message: data.message || "There was an error submitting your application. Please try again.", type: 'error' });
    }
  } catch (error) {
    console.error('Error submitting application:', error);
    setNotification({ message: "An unexpected error occurred. Please try again later.", type: 'error' });
  } finally {
    setIsSubmitting(false);
  }
};

  if (isSubmitted) {
  return (
    <MaxWidthWrapper className="py-8 md:py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Thank You!</h1>
      <p className="mt-4 text-lg text-muted-foreground">
          Your application for the {position} position has been successfully submitted. We appreciate your interest in joining our team and will review your application shortly.
      </p>
        <p className="mt-4 text-lg text-muted-foreground">
          If your qualifications match our requirements, we will contact you for the next steps in the hiring process.
        </p>
    </MaxWidthWrapper>
  );
}

  return (
    <MaxWidthWrapper className="py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Apply for {position}</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        We're excited to learn more about you. Please fill out the form below to apply for an open position.
      </p>
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <Input 
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <div className="flex space-x-2">
          <Select value={countryCode} onValueChange={setCountryCode}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Country Code" />
            </SelectTrigger>
            <SelectContent>
            {countryCodes.map(code => (
              <SelectItem key={code} value={code}>
                {code}
              </SelectItem>
            ))}
            </SelectContent>
          </Select>
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1"
            required
            />
          </div>
        <Input
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
        />
        <Textarea
          name="coverLetter"
          placeholder="Cover Letter"
          value={formData.coverLetter}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </form>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      </MaxWidthWrapper>
  );
}
