/** Une `id`s para `aria-describedby`, saltando los vacíos. Devuelve `undefined` si no queda ninguno. */
export function joinIds(...ids: (string | undefined | false | null)[]): string | undefined {
  const out = ids.filter(Boolean).join(' ');
  return out || undefined;
}
