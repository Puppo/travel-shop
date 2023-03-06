interface UseEventBusEmitterResult {
  emit: <T>(event: string, data?: T) => void;
}

export function useEventBusEmitter(): UseEventBusEmitterResult {
  const emit = <T>(event: string, data?: T) =>
    window.dispatchEvent(new CustomEvent(event, { detail: data }));
  return {
    emit,
  };
}
