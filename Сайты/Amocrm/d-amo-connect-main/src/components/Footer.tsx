import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">AmoCRM Внедрение</h3>
            <p className="text-muted-foreground">
              Профессиональное внедрение AmoCRM для автоматизации 
              и масштабирования вашего бизнеса.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Услуги</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Настройка AmoCRM</li>
              <li>Интеграция мессенджеров</li>
              <li>Автоматизация процессов</li>
              <li>Обучение и поддержка</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+79505527622" className="hover:text-primary transition-colors">
                  +7 (950) 552-76-22
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:alexandr.raisovich@gmail.com" className="hover:text-primary transition-colors">
                  alexandr.raisovich@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Ахунов Александр Раисович. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
