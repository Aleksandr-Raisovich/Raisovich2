import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Увеличение конверсии продаж до 30%",
  "Сокращение времени обработки заявок",
  "Полный контроль над работой менеджеров",
  "Единое окно для всех каналов коммуникации",
  "Автоматические напоминания и задачи",
  "Детальная аналитика по каждому этапу воронки",
  "Интеграция с сайтом и рекламными системами",
  "Мобильное приложение для работы из любой точки"
];

const BenefitsSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Почему выбирают <span className="text-primary">AmoCRM</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              AmoCRM — это не просто система учёта клиентов. Это мощный инструмент 
              для автоматизации продаж, который помогает вашей команде закрывать 
              больше сделок с меньшими усилиями.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-6xl md:text-8xl font-bold text-primary mb-2">5+</div>
                <div className="text-xl text-foreground mb-6">лет опыта внедрения</div>
                
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border/50">
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-foreground">100+</div>
                    <div className="text-muted-foreground">проектов</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-foreground">98%</div>
                    <div className="text-muted-foreground">довольных клиентов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
