import { Helmet } from "react-helmet-async";
import Scene3D from "@/components/Scene3D";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BenefitsSection from "@/components/BenefitsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Внедрение AmoCRM | Ахунов Александр - Автоматизация продаж</title>
        <meta 
          name="description" 
          content="Профессиональное внедрение AmoCRM под ключ. Настройка воронки продаж, интеграция мессенджеров, автоматизация бизнес-процессов. Ахунов Александр +7 (950) 552-76-22" 
        />
        <meta name="keywords" content="AmoCRM, внедрение CRM, автоматизация продаж, интеграция мессенджеров, настройка AmoCRM" />
      </Helmet>
      
      <div className="min-h-screen relative overflow-x-hidden">
        <Scene3D />
        <Header />
        
        <main>
          <HeroSection />
          <ServicesSection />
          <BenefitsSection />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
