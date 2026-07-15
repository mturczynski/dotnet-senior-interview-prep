# .NET Senior Interview Prep

A free, interactive, **bilingual (Polish / English)** study deck for **senior .NET developer** interviews — 240+ deep questions with answers, code examples, trade-offs and a quiz mode.

🔗 **Live:** https://mturczynski.github.io/dotnet-senior-interview-prep/

## Features
- 🌍 PL / EN language toggle
- 🔎 Full-text search (questions, answers, code, tags)
- 🎚️ Filter by topic (20 areas) and difficulty (Mid / Senior / Expert)
- 🧠 Quiz mode with active recall, self-rating and score summary
- 🔖 Bookmarks (saved locally)
- 🌓 Light / dark theme
- ♿ Keyboard-navigable, accessible, responsive
- ⚡ Zero dependencies — plain HTML/CSS/JS, works offline

## Topics
C# & type system · OOP & SOLID · LINQ & functional · Async/Await · Threading & concurrency ·
Advanced .NET (GC, memory) · ASP.NET Core · API design · Architecture (DDD/CQRS) · Design patterns ·
EF Core · Configuration & reliability · Security & identity · Performance · Caching · Messaging ·
SignalR/realtime · Deployment & DevOps · Testing · System design.

## Structure
- `site/index.html` — markup, SEO metadata
- `site/styles.css` — design system (light/dark)
- `site/app.js` — filtering, search, bookmarks, quiz engine, C# highlighter
- `site/data.js` — generated question bank (`window.QUESTIONS`)
- `build.js` — validates and assembles `content/group*.json` → `site/data.js`

## Build
```bash
node build.js   # validates content and regenerates site/data.js
```

Content is educational and independently written for interview preparation.
