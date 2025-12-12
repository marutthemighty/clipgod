'use client';
import { BadgeGenerator } from '@/components/BadgeGenerator'; // Public Commitment moat

export default function Commitment() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Commitment Badge</h1>
      <BadgeGenerator />
    </div>
  );
}
