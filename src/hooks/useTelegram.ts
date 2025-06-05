"use client";

import { useEffect, useState } from "react";

type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};

export function useTelegram() {
  const [tg, setTg] = useState<any>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const telegram = window.Telegram.WebApp;
      setTg(telegram);
      setUser(telegram.initDataUnsafe?.user || null);
    }
  }, []);

  return { tg, user };
}