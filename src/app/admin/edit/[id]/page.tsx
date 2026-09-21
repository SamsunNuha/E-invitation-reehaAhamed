'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { WeddingForm } from '@/components/WeddingForm';
import { storage } from '@/lib/storage';
import { WeddingData } from '@/lib/types';

export default function EditWeddingPage() {
  const params = useParams();
  const id = params?.id as string;
  const [wedding, setWedding] = useState<WeddingData | null>(null);

  useEffect(() => {
    if (id) {
      const data = storage.getWeddingById(id);
      if (data) setWedding(data);
    }
  }, [id]);

  if (!wedding) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center text-amber-300">
        Loading Wedding Details...
      </div>
    );
  }

  return <WeddingForm initialData={wedding} isEdit={true} />;
}
