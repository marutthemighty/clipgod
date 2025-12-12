import { Provider } from '@/components/Provider'; // Zustand
import { Nav } from '@/components/Nav';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/');
    });
  }, []);

  return (
    <Provider>
      <Nav />
      {children}
    </Provider>
  );
}
