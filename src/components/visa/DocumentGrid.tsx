import { useState } from 'react';
import DocumentCard, { type DocumentItem } from './DocumentCard';

interface DocumentGridProps {
  documents: DocumentItem[];
}

export default function DocumentGrid({ documents }: DocumentGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto">
      {documents.map((doc, i) => (
        <DocumentCard
          key={doc.label}
          doc={doc}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
