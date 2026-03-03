import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Corações em Sincronia | Jai & Ana',
  description: 'Uma conexão de amor entre Índia e Brasil. Sincronizando o tempo e o carinho entre Surat e Curitiba.',
  openGraph: {
    title: 'Corações em Sincronia',
    description: 'Jai & Ana: O amor não conhece fuso horário.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/30">
        {children}
      </body>
    </html>
  );
}
