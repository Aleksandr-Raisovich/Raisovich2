import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-card/90 backdrop-blur-md border-b border-border/50 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="font-bold text-xl text-foreground">
            <span className="text-primary">Amo</span>CRM Pro
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Услуги
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Контакты
            </button>
            <Button onClick={() => scrollToSection('contact')}>
              Заказать
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-md border-b border-border/50 py-4">
            <nav className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-foreground/80 hover:text-primary transition-colors py-2"
              >
                Услуги
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-foreground/80 hover:text-primary transition-colors py-2"
              >
                Контакты
              </button>
              <Button onClick={() => scrollToSection('contact')} className="w-full">
                Заказать
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
