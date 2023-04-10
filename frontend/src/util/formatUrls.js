export function formatUrls(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank" style="color: blue; ">${url}</a>`
  );
}
