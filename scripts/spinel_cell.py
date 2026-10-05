"""Ordered spinel cell Zn4Mg4Fe16O32 (x = 0.5) for the site's crystal backdrop.

The thesis electronic-structure model for x = 0.5 is a conventional cell
Zn4Mg4Fe16O32 with Zn and Mg ordered on the tetrahedral (A) sites in a pattern
that breaks cubic symmetry. That exact arrangement was not available, so this
script builds one of the same type: Zn and Mg in alternating layers along c.

Positions: Fd-3m origin 2 — A 8a (1/8,1/8,1/8), B 16d (1/2,1/2,1/2),
O 32e (u,u,u) — with a and u from COD 9003626 (the reference used to index
the x = 0.5 sample). Each cation gets its coordination polyhedron (oxygen
neighbours < 2.3 Å, periodic images included) and the polyhedron faces
(convex hull), so the page can draw it in the VESTA style.

Writes src/data/spinel.json.
"""
import json
from pathlib import Path

import numpy as np
from ase.spacegroup import crystal
from scipy.spatial import ConvexHull

A_LATTICE = 8.39514  # Å
U_OXYGEN = 0.25460

cell = crystal(
    ["Zn", "Fe", "O"],  # A, B, O placeholders
    basis=[(0.125, 0.125, 0.125), (0.5, 0.5, 0.5), (U_OXYGEN,) * 3],
    spacegroup=227,
    setting=2,
    cellpar=[A_LATTICE] * 3 + [90] * 3,
)
frac = cell.get_scaled_positions(wrap=True)
symbols = cell.get_chemical_symbols()
assert len(frac) == 56

oxygens = frac[[s == "O" for s in symbols]]
images = np.array([(i, j, k) for i in (-1, 0, 1) for j in (-1, 0, 1) for k in (-1, 0, 1)])
o_all = (oxygens[:, None, :] + images[None, :, :]).reshape(-1, 3)

cations = []
for s, p in zip(symbols, frac):
    if s == "O":
        continue
    if s == "Zn":  # tetrahedral A site: Zn below z = 1/2, Mg above
        kind = "Zn" if p[2] < 0.5 else "Mg"
    else:
        kind = "Fe"
    d = np.linalg.norm((o_all - p) * A_LATTICE, axis=1)
    verts = o_all[d < 2.3]
    assert len(verts) == (4 if kind != "Fe" else 6), (kind, len(verts))
    hull = ConvexHull(verts)
    cations.append({
        "k": kind,
        "c": np.round(p, 5).tolist(),
        "v": np.round(verts, 5).tolist(),
        "f": hull.simplices.tolist(),
    })

# Oxygen spheres at every polyhedron vertex (deduplicated), as VESTA draws them.
o_seen = {}
for cat in cations:
    for v in cat["v"]:
        o_seen[tuple(np.round(v, 4))] = v
counts = {k: sum(1 for c in cations if c["k"] == k) for k in ("Zn", "Mg", "Fe")}
assert counts == {"Zn": 4, "Mg": 4, "Fe": 16}, counts

out = {
    "source": "Fd-3m origin 2, a and u from COD 9003626; Zn/Mg layered along c (illustrative ordering)",
    "a": A_LATTICE,
    "u": U_OXYGEN,
    "formula": "Zn4Mg4Fe16O32",
    "cations": cations,
    "oxygens": list(o_seen.values()),
}
dest = Path(__file__).resolve().parent.parent / "src" / "data" / "spinel.json"
dest.write_text(json.dumps(out, separators=(",", ":")))
print(f"{counts}, {len(o_seen)} oxygen spheres, "
      f"{sum(len(c['f']) for c in cations)} faces -> {dest}")
