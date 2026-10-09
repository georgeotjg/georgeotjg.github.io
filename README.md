# georgeotjg.github.io

Personal site of Jorge Alfredo Robles Calderón, physicist — Universidad Nacional de Colombia.
Live at **https://georgeotjg.github.io**.

Static site built with [Astro](https://astro.build). GitHub Pages serves the `docs/` folder of
`main`, which is the build output.

```bash
npm install
npm run dev       # local preview at http://127.0.0.1:4321
npm run build     # writes docs/
```

## Layout

| path | content |
|---|---|
| `src/data/site.ts` | all text of the site |
| `src/pages/` | home, research, lab, software, CV, 404 |
| `src/components/PhysicsScenes.astro` | animated backgrounds (canvas): crystal, vortices, Weyl nodes, light |
| `src/styles/global.css` | styles, light and dark themes |
| `public/` | figures, photo, CV and thesis PDFs |
| `scripts/` | Python scripts that generate data for the site (spinel cell, Tauc plot) |

The animated backgrounds are computed in the browser from analytic models and, for the crystal,
from measured X-ray diffraction data; they are illustrations, not output from the research codes.

Code under the MIT License; text, figures, photographs and documents © Jorge Alfredo Robles Calderón, all rights reserved. See `LICENSE`.
