import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getRedirectPath } from "@/lib/auth-redirect";

import { Navbar } from "@/components/marketing/navbar";
import { HeroSection } from "@/components/marketing/hero-section";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { LearningPhilosophy } from "@/components/marketing/learning-philosophy";
import { LearningLoop } from "@/components/marketing/learning-loop";
import { ProjectShowcase } from "@/components/marketing/project-showcase";
import { AgeProgression } from "@/components/marketing/age-progression";
import { LearningPaths } from "@/components/marketing/learning-paths";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { ProjectJourney } from "@/components/marketing/project-journey";
import { PortfolioSection } from "@/components/marketing/portfolio-section";
import { AiTutorSection } from "@/components/marketing/ai-tutor-section";
import { CollaborationSection } from "@/components/marketing/collaboration-section";
import { LiveLearningSection } from "@/components/marketing/live-learning-section";
import { ParentExperience } from "@/components/marketing/parent-experience";
import { OfflineBandwidth } from "@/components/marketing/offline-bandwidth";
import { SafetySection } from "@/components/marketing/safety-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCta } from "@/components/marketing/final-cta";
import { Footer } from "@/components/marketing/footer";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    const role = (session.user as any).role
    redirect(getRedirectPath(role));
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#3C4044] text-[#DDDCDB] font-sans overflow-x-hidden selection:bg-[#FD7B41]/30 selection:text-white">
      <Navbar />

      <main className="flex-1 flex flex-col w-full">
        <HeroSection />
        <TrustStrip />
        <LearningPhilosophy />
        <LearningLoop />
        <ProjectShowcase />
        <AgeProgression />
        <LearningPaths />
        <ProductShowcase />
        <ProjectJourney />
        <PortfolioSection />
        <CollaborationSection />
        <LiveLearningSection />
        <ParentExperience />
        <OfflineBandwidth />
        <SafetySection />
        <FaqSection />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
