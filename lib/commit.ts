/**
 * Pure logic for detecting and rewriting git commit commands with trailers.
 * Separated from the pi extension API for testability.
 */

/** Check if a command is a `git commit` with a -m message flag. */
export function isGitCommit(cmd: string): boolean {
	const normalized = cmd.replace(/\\\n/g, " ");
	return /\bgit\s+commit\b/.test(normalized) && /\s-[^\s]*m\b/.test(normalized);
}

/** Build the rewritten command with Generated-by and Co-authored-by trailers. */
export function appendTrailers(cmd: string, modelName: string, piVersion: string): string {
	const trailers = `Generated-by: pi ${piVersion} (${modelName})\\nCo-authored-by: AI <noreply@pi.dev>`;
	return `${cmd.trimEnd()} -m "" -m $'${trailers}'`;
}
