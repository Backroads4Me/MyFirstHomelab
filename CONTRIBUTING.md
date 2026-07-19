# MyFirstHomelab.com — Guiding Principles

This document is the source of truth for the site's intent, scope, and voice.
Every future change — by a human or an AI agent — should be measured against
it. When a proposed change conflicts with this document, the change is wrong
or this document needs a deliberate update; never drift silently.

## Mission

Get a brand-new user from "old PC in a closet" to a small, working,
recoverable homelab — as simply as possible. Nothing else.

The reader is a beginner with limited technical experience. They are nervous
about breaking things. The site's job is to remove choices, remove fear, and
deliver a working result fast.

## The One Path

The site teaches exactly one opinionated path:

1. Install Proxmox VE on an old PC (direct install, no alternatives)
2. Set up VS Code with Remote-SSH on the reader's everyday computer
3. Create one unprivileged Debian LXC with **nesting enabled**
4. Install Docker + Compose in the LXC; snapshot (`docker-clean`)
5. Install Dockhand via a Compose file
6. Deploy Heimdall through the Dockhand UI; snapshot (`working-dashboard`)
7. **Break it on purpose**: delete the dashboard, roll back the snapshot,
   clone the container — proving recovery works is the emotional core of
   the site
8. Add Beszel and Dozzle through Dockhand

### The LXC decision (settled — do not reopen)

Proxmox's documentation prefers a VM for Docker, and the site says so in one
honest sentence. The site still uses an LXC, 100%, because snapshots, instant
rollback, cloning, and tiny overhead are what give a beginner confidence on
modest hardware. Nesting must be enabled or Docker will not run.

### Opinionated by design (say it, own it)

The path is deliberately opinionated for simplicity and speed. Readers are
fully expected to outgrow it — that is the guide working as intended. This
framing appears on the Start Here page and in the Next Steps send-off.

## Writing Rules

1. **One path, no alternatives.** Never present Option A/Option B. If a
   choice exists, this site has already made it.
2. **No caveats** unless ignoring one breaks the very next step. No "on older
   releases…", "advanced users might…", "in production you would…".
3. **Task-shaped pages.** One page = one sitting. Every page ends with
   something working and a link to the next page.
4. **Short.** Pages stay under ~150 lines of markdown. If it grows past
   that, cut — do not split into more pages.
5. **Single-author voice.** Neutral second-person instructions ("you",
   "this guide"). "I" sparingly for personal asides. NEVER "we/we're/our" —
   the site has one author.
6. **UI over shell** wherever the Proxmox web interface can do the job
   (updates, repositories, snapshots, clones). The shell appears only inside
   the VS Code integrated terminal, which the guide sets up early.
7. **Nothing intimidating above the fold.** No code blocks, ASCII diagrams,
   or jargon walls before the reader has been eased in. Prose first.
8. **Every command verified** against current official upstream docs before
   it lands on a page. Never trust an old page, a search summary, or memory
   for exact commands, image names, ports, or UI labels.
9. **Funnel, don't scatter.** The homepage sends everyone to Start Here.
   Deep links into the middle of the path are for cross-references inside
   the guide only.

## Technical Conventions

- Astro + Starlight (Six theme), static output, deployed to Cloudflare
  Workers from `dist/`. Content lives in `src/content/docs/`.
- `docker compose` (v2), never `docker-compose`. Compose files are named
  `compose.yaml`.
- Chosen stack: Dockhand (management UI, port 3000), Heimdall (dashboard,
  8080/8443), Beszel (monitoring, 8090), Dozzle (logs, 8888).
- No unattended updates (no Watchtower): back up, read release notes, update
  deliberately.
- Management interfaces stay on the trusted home network; never imply a port
  should be exposed to the internet.
- External links open in new tabs (handled globally — rehype plugin for
  content, head script for theme links; never hand-write `target="_blank"`
  in markdown).
- Licensing: code MIT (`LICENSE`), content CC BY-SA 4.0 (`LICENSE-CONTENT`).

## Scope Boundaries

In scope: the one path above, plus slim reference pages (troubleshooting
keyed to this path's exact steps, a trimmed glossary, next steps, further
reading).

Out of scope (future "advanced" material lives in the maintainer's local
roadmap, not on the site, until deliberately added): VMs, Proxmox Backup
Server, remote access/tunnels, TLS, VLANs, clustering, additional apps.

## Process

- Work on a branch; `main` is the published state. Merges to `main`,
  releases, and DNS changes require the maintainer's explicit approval.
- `npm run build` must pass with zero broken links before any deploy.
- Verify a content change by loading the affected pages via
  `npm run preview` or the live beta after deploy.
- The maintainer walks the full path on real hardware before major releases;
  commands that cannot be verified from a desk get flagged for that pass.
