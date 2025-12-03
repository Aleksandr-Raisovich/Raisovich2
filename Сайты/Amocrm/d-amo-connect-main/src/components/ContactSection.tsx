import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, User, MessageCircle } from "lucide-react";
import { ContactForm } from "./ContactForm";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Свяжитесь со мной
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Оставьте заявку, и я свяжусь с вами для бесплатной консультации
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Контактная информация</CardTitle>
              <CardDescription>
                Готов ответить на ваши вопросы и обсудить проект
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Ахунов Александр Раисович</div>
                  <div className="text-sm text-muted-foreground">Специалист по внедрению AmoCRM</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Телефон</div>
                  <a
                    href="tel:+79505527622"
                    className="text-primary hover:underline"
                  >
                    +7 (950) 552-76-22
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Email</div>
                  <a
                    href="mailto:alexandr.raisovich@gmail.com"
                    className="text-primary hover:underline"
                  >
                    alexandr.raisovich@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Мессенджеры</div>
                  <div className="flex gap-3 mt-1">
                    <a
                      href="https://wa.me/79505527622"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      WhatsApp
                    </a>
                    <a
                      href="https://t.me/+79505527622"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      Telegram
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form Container */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Заявка на консультацию</CardTitle>
              <CardDescription>
                Заполните форму, и я свяжусь с вами в ближайшее время
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
