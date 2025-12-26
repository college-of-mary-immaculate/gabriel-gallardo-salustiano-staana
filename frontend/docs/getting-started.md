# Getting Started

## Prerequisites
- Node.js (LTS) and npm
- Recommended editor: VS Code with code formatting and linting extensions

## Install
```bash
npm install
```

## Common scripts
- `npm run dev` — start local dev server (Vite)
- `npm run build` — create production bundle
- `npm run preview` — preview production build

## Local workflow
1. Create a branch: `git checkout -b feat/<description>`
2. Implement changes following the guides in `docs/coding-guidelines.md`
3. Run `npm run dev` and verify local behavior

## Where to look for examples
- Example page: `src/pages/home.js`
- Example component: `src/components/home/` (header.js, main.js, footer.js, event.js, component.module.css)
- Utility example: `src/utils/counter.js`