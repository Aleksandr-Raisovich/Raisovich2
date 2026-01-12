import React from 'react';
import ChatInterface from './ChatInterface';
import { Wrench, Settings, Truck } from 'lucide-react';

const UI: React.FC = () => {
    return (
        // min-h-[200vh] ensures the HTML content matches the 2 pages of ScrollControls
        <div className="w-full min-h-[200vh] flex flex-col items-center justify-start py-6 px-4 md:px-8">

            {/* SECTION 1: HERO & CHAT */}
            <div className="w-full min-h-screen py-20 flex flex-col items-center">
                {/* Navbar */}
                <header className="w-full max-w-6xl flex items-center justify-between mb-8 z-10 pointer-events-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transform rotate-3">
                            <Wrench className="text-black" />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tighter text-white">
                            ТЕХНО<span className="text-orange-500">ПАРК</span>
                        </h1>
                    </div>
                    <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-300">
                        <a href="#" className="hover:text-orange-500 transition-colors">Каталог</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">О компании</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">Контакты</a>
                    </nav>
                </header>

                {/* Main Search Area */}
                <main className="w-full max-w-4xl z-10 pointer-events-auto flex flex-col items-center flex-1 justify-center -mt-20">
                    <div className="text-center mb-8">
                        <h2 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 leading-tight">
                            Запчасти для<br />спецтехники
                        </h2>
                        <p className="text-lg text-zinc-400 max-w-xl mx-auto">
                            Интеллектуальный поиск по артикулам и брендам. Введите запрос ниже.
                        </p>
                    </div>

                    <ChatInterface />
                </main>

                <div className="absolute bottom-10 animate-bounce text-zinc-500 text-xs">
                    Листайте вниз ↓
                </div>
            </div>

            {/* SECTION 2: ADDITIONAL INFO (Visible on scroll) */}
            <div className="w-full h-screen flex flex-col items-center justify-center max-w-6xl z-10 pointer-events-auto">
                <h3 className="text-4xl font-bold text-white mb-12">Почему выбирают нас</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 p-8 rounded-2xl hover:border-orange-500 transition-colors group">
                        <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                            <Wrench className="text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">Огромный склад</h4>
                        <p className="text-zinc-400">Более 50,000 позиций в наличии. Caterpillar, Komatsu, JCB и другие бренды.</p>
                    </div>

                    <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 p-8 rounded-2xl hover:border-orange-500 transition-colors group">
                        <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                            <Settings className="text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">Подбор по VIN</h4>
                        <p className="text-zinc-400">Наш AI агент поможет точно идентифицировать необходимую деталь по описанию.</p>
                    </div>

                    <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 p-8 rounded-2xl hover:border-orange-500 transition-colors group">
                        <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                            <Truck className="text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">Быстрая доставка</h4>
                        <p className="text-zinc-400">Отправка в день заказа. Работаем со всеми транспортными компаниями РФ.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UI;