import { useAppStore } from '@/stores/useAppStore';
import Image from 'next/image';

export const FireStreak = () => {
  const { streak } = useAppStore();
  return (
    <div className="flex items-center">
      <span>Streak: {streak.current}</span>
      {streak.fire_visible && <Image src="/fire-emoji.png" alt="fire" width={20} height={20} />}
      {streak.current === 0 && <div className="bg-red-500 p-2">Shame! Streak broken.</div>}
    </div>
  );
};
