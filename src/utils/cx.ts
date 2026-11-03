/** Une nombres de clase ignorando los valores vacíos. Sin estado, seguro en servidor. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
