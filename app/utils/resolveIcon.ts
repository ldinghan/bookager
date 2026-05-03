import ICONS from '../iconsManifest';

// Strip URL/path wrapping so a pasted link like "https://x.com/leetcode_icon.png"
// reduces to "leetcode_icon.png" before matching.
function normalize(input: string): string {
    const trimmed = input.trim();
    if (!trimmed) return '';
    const noQuery = trimmed.split(/[?#]/)[0];
    const segments = noQuery.split('/');
    const basename = segments[segments.length - 1] || noQuery;
    return basename.toLowerCase();
}

export function resolveIcon(input: string | undefined | null): string | null {
    if (!input) return null;
    const needle = normalize(input);
    if (!needle) return null;

    const match = ICONS.find((filename) => {
        const lower = filename.toLowerCase();
        return lower.includes(needle) || needle.includes(lower);
    });

    return match ? `/icons/${match}` : null;
}
