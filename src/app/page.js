import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutMeSection from "@/components/AboutMeSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectSection from "@/components/ProjectSection";
import CodingStatsSection from "@/components/CodingStatsSection";
import EmailSection from "@/components/EmailSection";
import Footer from "@/components/Footer";
import AiChatbotSection from "@/components/AiChatbotSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <AboutMeSection />
        <SkillsSection />
        <ProjectSection />
        <CodingStatsSection />
        <EmailSection />
      </main>
      <Footer />
      <AiChatbotSection />
    </>
  );
}
