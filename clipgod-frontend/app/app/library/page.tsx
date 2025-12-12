'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function Library() {
  const [search, setSearch] = useState('');
  const [clips, setClips] = useState<any[]>([]);

  const handleSearch = async () => {
    const { data } = await supabase.from('clips').select('*').ilike('hook', `%${search}%`);
    setClips(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Clip Library</h1>
      <Input placeholder="Search clips" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch} className="mt-2">Search</button>
      {clips.map((clip) => (
        <Card key={clip.id} className="mb-4 p-4">
          <p>Hook: {clip.hook}</p>
          <p>File: {clip.file_url}</p>
        </Card>
      ))}
    </div>
  );
}
