import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Silveira Athias',
  description: 'Personal website of Silveira Athias',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
