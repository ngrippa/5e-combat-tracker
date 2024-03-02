import { useImmer } from "use-immer";
import { useEffect, useState } from "react";

export const useSyncedObject = <
  T extends Record<string, unknown> | unknown[] | null,
>(
  key: string,
  initialStateValue: T,
  initialStoreValue: T,
  migrate?: (old: T) => T,
) => {
  const [obj, setObj] = useImmer<T>(initialStateValue);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem(key, JSON.stringify(obj));
  }, [obj, key, isLoading]);

  useEffect(() => {
    const local = localStorage.getItem(key);

    setObj((d) => {
      const read =
        local && local.length > 2 ? JSON.parse(local) : initialStoreValue;
      d = migrate?.(read) || read;
      return d;
    });
    setLoading(false);
  }, [key, initialStoreValue, migrate, setObj]);
  return [obj, setObj] as const;
};
