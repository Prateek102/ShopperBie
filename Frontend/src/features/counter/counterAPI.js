export function fetchCount() {
  return new Promise(async (resolve) => {
    const response = await fetch("https://localhost:8080");
    const data = await response.json();
    resolve({ data });
  });
}
