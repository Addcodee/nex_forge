import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type SetStateAction<S> = S | ((prev: S) => S);

type HistoryMode = "push" | "replace";

type UseSearchStateOptions<T> = {
  /** Как менять URL при setState (по умолчанию: "replace") */
  history?: HistoryMode;
  /** Кастомная сериализация в строку (по умолчанию определяется по типу initialValue) */
  serialize?: (value: T) => string;
  /** Кастомная десериализация из строки (по умолчанию определяется по типу initialValue) */
  deserialize?: (raw: string | null) => T;
  /** Удалять параметр из URL, если значение === initialValue (по умолчанию true) */
  omitIfDefault?: boolean;
};

function defaultSerialize<T>(value: T): string {
  if (value === null || value === undefined) return "";
  const t = typeof value;
  if (t === "string") return value as unknown as string;
  if (t === "number" || t === "bigint") return String(value);
  if (t === "boolean") return (value as unknown as boolean) ? "1" : "0";
  return JSON.stringify(value);
}

function defaultDeserialize<T>(raw: string | null, initialValue: T): T {
  // Спец-кейс: если initial === null, трактуем значение как строку | null
  if (initialValue === null) return (raw ?? null) as unknown as T;

  if (raw == null) return initialValue;
  const t = typeof initialValue;
  try {
    if (t === "string") return raw as unknown as T;
    if (t === "number") return Number(raw) as unknown as T;
    if (t === "bigint") return BigInt(raw) as unknown as T;
    if (t === "boolean")
      return (raw === "1" || raw.toLowerCase() === "true") as unknown as T;
    return JSON.parse(raw) as T;
  } catch {
    return initialValue;
  }
}

function getInitial<T>(initial: T | (() => T)): T {
  return typeof initial === "function" ? (initial as () => T)() : initial;
}

/**
 * useSearchState — синхронизированный с URL state.
 *
 * @param key имя query-параметра
 * @param initialValue начальное значение (как в useState; можно передать функцию-инициализатор)
 * @param options опции: history, serialize/deserialize, omitIfDefault
 * @returns [value, setValue] — аналогично useState
 */
export function useSearchState<T>(
  key: string,
  initialValue: T | (() => T),
  options?: UseSearchStateOptions<T>
): [T, (next: SetStateAction<T>) => void] {
  const initial = useMemo(() => getInitial(initialValue), []);
  const serialize = options?.serialize ?? ((v: T) => defaultSerialize<T>(v));
  const deserialize =
    options?.deserialize ??
    ((s: string | null) => defaultDeserialize<T>(s, initial));
  const historyMode: HistoryMode = options?.history ?? "replace";
  const omitIfDefault = options?.omitIfDefault ?? true;

  const isClient = typeof window !== "undefined";
  const readFromUrl = useCallback((): T => {
    if (!isClient) return initial;
    const url = new URL(window.location.href);
    const raw = url.searchParams.get(key);
    return deserialize(raw);
  }, [deserialize, initial, isClient, key]);

  const [state, setState] = useState<T>(() => readFromUrl());

  const prevQSRef = useRef<string | null>(null);
  const keyRef = useRef(key);
  keyRef.current = key;

  // Обновляем state при навигации назад/вперёд
  useEffect(() => {
    if (!isClient) return;
    const onPop = () => {
      setState(readFromUrl());
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [isClient, readFromUrl]);

  const set = useCallback(
    (next: SetStateAction<T>) => {
      setState((prev) => {
        const computed =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;

        if (!isClient) return computed;

        const url = new URL(window.location.href);
        const params = url.searchParams;

        const nextStr = serialize(computed);
        const shouldOmit = omitIfDefault && nextStr === serialize(initial);

        if (shouldOmit) {
          params.delete(keyRef.current);
        } else {
          params.set(keyRef.current, nextStr);
        }

        const newSearch = params.toString();
        const newHref =
          url.pathname + (newSearch ? `?${newSearch}` : "") + url.hash;

        // Избегаем лишних записей в историю, если query не изменился
        const currentHref =
          window.location.pathname +
          (window.location.search ? window.location.search : "") +
          window.location.hash;

        if (newHref !== currentHref) {
          if (historyMode === "push") {
            window.history.pushState(null, "", newHref);
          } else {
            window.history.replaceState(null, "", newHref);
          }
        }

        prevQSRef.current = newSearch;
        return computed;
      });
    },
    [historyMode, initial, isClient, omitIfDefault, serialize]
  );

  return [state, set];
}
