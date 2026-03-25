/**
 * Co-authored-by Extension
 *
 * Automatically appends git trailers to commit messages when the agent
 * runs `git commit`. Adds:
 *   - A fixed AI co-author identity
 *   - The pi version and model used
 *
 * Example commit message:
 *   fix: resolve null pointer
 *
 *   Generated-by: pi 0.52.12 (openai-codex/gpt-5.3-codex)
 *   Co-authored-by: AI <noreply@pi.dev>
 */

import type { ExtensionAPI, ExtensionContext } from "@mariozechner/pi-coding-agent";
import { isToolCallEventType, VERSION } from "@mariozechner/pi-coding-agent";
import { isGitCommit, appendTrailers } from "../lib/commit.ts";

/**
 * Prefer the assistant message's provider/model from session history (actual model used),
 * then fall back to the currently selected model from ctx.model.
 */
function getModelLabel(ctx: ExtensionContext): string {
	const branch = ctx.sessionManager.getBranch();
	for (let i = branch.length - 1; i >= 0; i--) {
		const entry = branch[i];
		if (entry.type !== "message") continue;
		const message = entry.message;
		if (message.role !== "assistant") continue;
		if (typeof message.provider === "string" && typeof message.model === "string") {
			return `${message.provider}/${message.model}`;
		}
	}

	const model = ctx.model;
	if (model && typeof model.provider === "string" && typeof model.id === "string") {
		return `${model.provider}/${model.id}`;
	}
	if (model?.name) return model.name;
	return "unknown";
}

export default function (pi: ExtensionAPI) {
	pi.on("tool_call", async (event, ctx) => {
		if (!isToolCallEventType("bash", event)) return;

		const cmd = event.input.command;
		if (!isGitCommit(cmd)) return;

		event.input.command = appendTrailers(cmd, getModelLabel(ctx), VERSION);
	});
}
