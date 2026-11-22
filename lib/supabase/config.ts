export function normalizeSupabaseUrl(rawUrl?: string): string {
  if (!rawUrl) return 'https://placeholder-project.supabase.co';
  const url = rawUrl.trim();
  if (url.includes('supabase.com/dashboard/project/')) {
    const match = url.match(/project\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://${match[1]}.supabase.co`;
    }
  }
  return url;
}
