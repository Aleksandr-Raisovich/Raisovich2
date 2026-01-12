import React, { Suspense } from 'react';
import Scene from './components/Scene';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => (
  <div className="w-full h-screen bg-[#0f0f11] flex flex-col items-center justify-center text-white">
    <Loader2 className="animate-spin mb-4 text-orange-500" size={48} />
    <p className="text-zinc-400 font-light tracking-widest">ЗАГРУЗКА 3D СЦЕНЫ...</p>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Scene />
    </Suspense>
  );
}

export default App;