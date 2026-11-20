import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-start justify-center gap-4 px-4 py-16">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="text-xl font-semibold tracking-tight">Сторінку не знайдено</h1>
      <p className="text-muted-foreground">Можливо, посилання застаріло або в адресі помилка.</p>
      <Button asChild variant="outline">
        <Link href="/">На головну</Link>
      </Button>
    </div>
  );
}
