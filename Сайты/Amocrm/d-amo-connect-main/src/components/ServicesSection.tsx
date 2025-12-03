import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Smartphone, BarChart3, Users, Zap, Shield } from "lucide-react";

const services = [
  {
    icon: Settings,
    title: "Настройка AmoCRM",
    description: "Полная настройка воронки продаж, этапов сделок, пользовательских полей и автоматизации процессов под ваш бизнес."
  },
  {
    icon: Smartphone,
    title: "Интеграция мессенджеров",
    description: "Подключение WhatsApp, Telegram, VK, Instagram Direct для приёма и обработки заявок прямо в CRM."
  },
  {
    icon: BarChart3,
    title: "Аналитика и отчёты",
    description: "Настройка дашбордов, отчётов по менеджерам и воронкам для полного контроля над продажами."
  },
  {
    icon: Users,
    title: "Обучение команды",
    description: "Проведение тренингов для сотрудников по работе с системой и лучшим практикам продаж."
  },
  {
    icon: Zap,
    title: "Автоматизация",
    description: "Настройка автоматических задач, напоминаний, рассылок и триггеров для экономии времени."
  },
  {
    icon: Shield,
    title: "Техподдержка",
    description: "Постоянная поддержка и консультации по работе системы, оперативное решение вопросов."
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Наши услуги
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Комплексное внедрение AmoCRM для масштабирования вашего бизнеса
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
