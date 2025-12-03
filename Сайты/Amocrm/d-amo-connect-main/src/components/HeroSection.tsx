import { Button } from "@/components/ui/button";
import { ArrowDown, Zap } from "lucide-react";

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto bg-background/70 backdrop-blur-md rounded-3xl p-8 md:p-12">
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground/80">Профессиональное внедрение AmoCRM</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Автоматизируйте</span>
            <br />
            <span className="text-primary">продажи</span>
            <span className="text-foreground"> вашего бизнеса</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Внедрение AmoCRM под ключ: от настройки до интеграции с социальными сетями 
            и мессенджерами. Увеличьте конверсию и контролируйте каждую сделку.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={scrollToContact}
            >
              Получить консультацию
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 bg-card/50 backdrop-blur-sm"
              onClick={scrollToServices}
            >
              Узнать больше
            </Button>
          </div>
        </div>
        
        <button 
          onClick={scrollToServices}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-8 h-8 text-muted-foreground" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
