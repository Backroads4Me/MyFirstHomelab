# Your First Homelab Made Simple

**Feeling overwhelmed about where to start?**
Don't worry—I've been there too, and this guide will walk you through it.

---

Embark on your journey into the exciting world of homelabbing with a little help getting started. Whether you're a complete beginner or a tech enthusiast, [MyFirstHomelab.com](https://myfirsthomelab.com) provides clear, structured guidance to help you build your first homelab.

Follow a carefully chosen set of tools and workflows—Proxmox VE, a Debian virtual machine, Docker, and real backups—to create a functional, educational setup that grows with your skills. When you're ready to take the next step, the curated further-reading suggestions will help you unlock the full potential of this rewarding hobby.

[**Get Started →**](https://myfirsthomelab.com)

![Home Server Logo](public/logo.png)

---

## About This Repository

The site is built with [Astro Starlight](https://starlight.astro.build/) and served from Cloudflare Workers. Guide content lives in `src/content/docs/`.

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build + Pagefind search index
```

When editing technical instructions: prefer official project documentation for commands and versions, use `docker compose` (not the retired v1 `docker-compose`), and keep examples suitable for an isolated home network.

## License

The site code is licensed under the [MIT License](LICENSE). The guide content (pages in `src/content/docs/` and site imagery) is licensed under [CC BY-SA 4.0](LICENSE-CONTENT) — share and adapt it with attribution, under the same terms.

## Feedback

Spotted an unclear step, stale link, or a command that no longer matches its upstream documentation? [Open an issue](https://github.com/Backroads4Me/my-first-homelab/issues) — small, focused pull requests are welcome too.
