import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/ui/hero-section";
import CampaignsSection from "@/components/ui/campaigns-section";
import ChallengesSection from "@/components/ui/challenges-section";
import AuctionSection from "@/components/ui/auction-section";
import FeaturesSection from "@/components/ui/features-section";
import Footer from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CampaignsSection />
      <ChallengesSection />
      <AuctionSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;