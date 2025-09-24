export function uniqBy(arr, key) {
  const seen = new Set();
  return (arr || []).filter(x => {
    const v = x[key];
    if (seen.has(v)) return false;
    seen.add(v);
    return true;
  });
}

export function localStamp() {
  const d = new Date();
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}