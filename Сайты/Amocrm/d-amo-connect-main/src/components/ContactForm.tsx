import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    phone: z.string().min(10, "Введите корректный номер телефона"),
    email: z.string().email("Введите корректный email"),
    message: z.string().optional(),
});

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            // Отправка на email через FormSubmit.co (работает без активации для первой отправки)
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("phone", values.phone);
            formData.append("email", values.email);
            formData.append("message", values.message || "Без сообщения");
            formData.append("_subject", "Новая заявка с сайта AmoCRM");
            formData.append("_template", "table");
            formData.append("_captcha", "false");

            const emailResponse = await fetch("https://formsubmit.co/alexandr.raisovich@gmail.com", {
                method: "POST",
                body: formData,
            });

            console.log("Email response status:", emailResponse.status);

            // Параллельно пытаемся отправить в Telegram
            try {
                const telegramMessage = `
🔔 *Новая заявка с сайта AmoCRM*

👤 *Имя:* ${values.name}
📱 *Телефон:* ${values.phone}
📧 *Email:* ${values.email}
💬 *Сообщение:* ${values.message || "Без сообщения"}
        `.trim();

                const TELEGRAM_BOT_TOKEN = "8461926946:AAHEOthNulTjBgk6INgeymFL-f89b6NgOxw";
                const TELEGRAM_CHAT_ID = "1430450627";

                await fetch(
                    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            chat_id: TELEGRAM_CHAT_ID,
                            text: telegramMessage,
                            parse_mode: "Markdown",
                        }),
                    }
                );
            } catch (telegramError) {
                console.warn("Telegram send failed, but email was sent:", telegramError);
            }

            console.log("Form submitted successfully:", values);
            toast.success("Заявка успешно отправлена!", {
                description: "Мы свяжемся с вами в ближайшее время.",
            });
            form.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Ошибка отправки", {
                description: "Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Имя</FormLabel>
                            <FormControl>
                                <Input placeholder="Ваше имя" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Телефон</FormLabel>
                            <FormControl>
                                <Input placeholder="+7 (999) 000-00-00" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@mail.ru" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Сообщение (необязательно)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Опишите вашу задачу..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Отправка...
                        </>
                    ) : (
                        "Отправить заявку"
                    )}
                </Button>
            </form>
        </Form>
    );
}
