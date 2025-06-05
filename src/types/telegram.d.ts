export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name?: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
        };
        expand(): void;
        close(): void;
        sendData(data: string): void;
        // (можно добавить и другие методы SDK если нужно)
      };
    };
  }
}