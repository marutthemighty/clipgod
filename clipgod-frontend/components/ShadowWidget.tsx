import Image from 'next/image';

export const ShadowWidget = () => (
  <div className="flex">
    {Array.from({ length: 5 }).map((_, i) => (
      <Image key={i} src="/ghost-person.svg" alt="ghost" width={20} height={20} />
    ))}
    <p>Projected Reach: 1000</p>
  </div>
);
