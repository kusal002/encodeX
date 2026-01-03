// utils/encoding.ts

export function encodeText(text: string): string {
  try {
    return btoa(text); // simple Base64 encoding
  } catch {
    return "Error encoding text!";
  }
}

export function decodeText(text: string): string {
  try {
    return atob(text); // simple Base64 decoding
  } catch {
    return "Invalid input for decoding!";
  }
}
