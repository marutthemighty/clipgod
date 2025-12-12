import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/'); // Or handle unauth
}
