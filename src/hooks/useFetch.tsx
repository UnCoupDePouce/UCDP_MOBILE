import { useEffect, useState } from "react";

export function useFetch<T>(asyncFn: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    asyncFn()
      .then((result) => {
        if (isMounted) setData(result);
      })
      .catch((err: any) => {
        if (isMounted) setError(err.message || "Erreur serveur");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, deps);
  return { data, loading, error };
}
