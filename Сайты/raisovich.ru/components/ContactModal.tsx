
import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('userName'),
      contact: formData.get('userContact'),
      message: formData.get('userMessage'),
      source: 'Contact Form',
      url: window.location.href,
      timestamp: new Date().toLocaleString('ru-RU')
    };

    try {
      const response = await fetch('https://n8n.raisovich.ru/webhook/83c16952-0e3c-4bc1-8367-0a7261214ebd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setIsSent(true);
      setTimeout(() => {
        onClose();
        setIsSent(false);
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь со мной напрямую по телефону в футере.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg glass p-8 md:p-12 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white text-2xl"
        >
          ✕
        </button>

        {isSent ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-6">✨</div>
            <h3 className="text-2xl font-sync font-bold mb-4">СПАСИБО!</h3>
            <p className="text-white/60">Ваша заявка принята. Мы свяжемся с вами в ближайшее время.</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-sync font-bold mb-8">Обсудить проект</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-sync uppercase tracking-widest text-white/50 mb-2">Имя</label>
                <input name="userName" required className="w-full bg-white/5 border-b border-white/20 px-0 py-3 focus:outline-none focus:border-white transition-colors" type="text" placeholder="Иван Иванов" />
              </div>
              <div>
                <label className="block text-[10px] font-sync uppercase tracking-widest text-white/50 mb-2">Email / Telegram</label>
                <input name="userContact" required className="w-full bg-white/5 border-b border-white/20 px-0 py-3 focus:outline-none focus:border-white transition-colors" type="text" placeholder="@username or email" />
              </div>
              <div>
                <label className="block text-[10px] font-sync uppercase tracking-widest text-white/50 mb-2">О проекте</label>
                <textarea name="userMessage" rows={3} className="w-full bg-white/5 border-b border-white/20 px-0 py-3 focus:outline-none focus:border-white transition-colors resize-none" placeholder="Расскажите вкратце о вашей задумке..."></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black font-sync font-bold tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                ) : (
                  'ОТПРАВИТЬ'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
