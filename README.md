# TODOAPP

Angular to-do list with add/edit/delete/complete, filtering, and persistence to `localStorage`.

> Learning project built in November 2023 while practicing Angular signals, reactive forms and browser storage. Kept public as part of my learning history.

Live: https://todoapp-48982.web.app/

## What it does

`HomeComponent` manages a list of tasks as an Angular `signal`. Tasks can be added (via a reactive `FormControl` with a required validator), marked complete/incomplete, edited inline, and deleted. A computed signal (`taskByFilter`) filters the list into all/pending/completed. An `effect()` writes the task list to `localStorage` on every change, and `ngOnInit` reads it back on load so tasks survive a page refresh. There's a second route, `/labs`, used for separate experiments.

## Tech Stack

- Angular 17 (standalone components, signals, `computed`, `effect`)
- Reactive Forms (`ReactiveFormsModule`)
- TypeScript ~5.2

## Running Locally

```
npm install
npm start        # ng serve, http://localhost:4200
```

- `npm run build` — production build via `ng build`
- `npm test` — unit tests via Karma/Jasmine

## What I practiced

- Angular signals and `computed`/`effect` for derived state and side effects
- Reactive forms with validation
- Persisting state to `localStorage`
- CRUD operations (add, edit, toggle-complete, delete) on client-side state
