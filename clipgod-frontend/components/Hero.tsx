import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const Hero = () => {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const generate = async () => {
    // Call backend /generate, get jobId
    const jobId = 'example'; // Placeholder
    router.push(`/app/generate/${jobId}`);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">ClipGod AI</h1>
      <Input placeholder="Paste URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <Button onClick={generate}>Generate</Button>
    </div>
  );
};
