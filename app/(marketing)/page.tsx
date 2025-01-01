"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { infos } from "@/config/landing";
import { NavBar } from "@/components/layout/navbar";
import BentoGrid from "@/components/sections/bentogrid";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import Powered from "@/components/sections/powered";
import PreviewLanding from "@/components/sections/preview-landing";
import { ChatBot } from "@/components/chat/chat-bot";
const Testimonials = dynamic(() => import('@/components/sections/testimonials'));
const Features = dynamic(() => import('@/components/sections/features'));

export const revalidate = 3600 // revalidate every hour

export default function IndexPage() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      <NavBar openChatbot={() => setIsChatbotOpen(true)} />
      <HeroLanding />
      <PreviewLanding />
      <Powered />
      <BentoGrid />
      <InfoLanding data={infos[0]} reverse={true} />
      <Features />
      <Testimonials />
      <ChatBot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
    </>
  );
}
