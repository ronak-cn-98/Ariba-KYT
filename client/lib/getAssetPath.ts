const BASE_URL = import.meta.env.BASE_URL ?? "/";

export function getAssetPath(assetPath: string) {
  const normalizedBase = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
  const trimmedPath = assetPath.replace(/^\/+/, "");
  return `${normalizedBase}${encodeURI(trimmedPath)}`;
}
