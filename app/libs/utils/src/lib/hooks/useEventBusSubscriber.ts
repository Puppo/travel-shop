import { useEffect } from 'react';

export function useEventBusSubscriber<T>(
  event: string,
  handler: (data: T) => void
): void;
export function useEventBusSubscriber(event: string, handler: () => void): void;
export function useEventBusSubscriber(
  event: string,
  handler: (data?: unknown) => void
): void {
  useEffect(() => {
    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, [event, handler]);
}
