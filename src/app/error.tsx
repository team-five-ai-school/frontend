"use client";

import { RotateCcwIcon } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // Hook up an error reporter (Sentry etc.) here if needed.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-start justify-center gap-4 px-4 py-16">
      <h1 className="text-xl font-semibold tracking-tight">Щось пішло не так</h1>
      <p className="text-muted-foreground">
        Сторінку не вдалося завантажити. Спробуйте ще раз; якщо помилка повториться, оновіть сторінку.
      </p>
      <Button onClick={() => retry()}>
        <RotateCcwIcon data-icon="inline-start" />
        Спробувати ще раз
      </Button>
    </div>
  );
}
