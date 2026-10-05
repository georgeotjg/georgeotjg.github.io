"""Direct-gap Tauc plot of the Zn1-xMgxFe2O4 series for the site (English).

Same processing as the thesis analysis (analisis_optico_unificado.py):
Abs -> R = 10^-Abs -> Kubelka-Munk F(R) = (1-R)^2 / 2R -> (F(R) h nu)^2,
linear fit on the "auto" window recorded in resultados_optico.csv, gap = x-intercept.
The script refuses to write the figure unless each intercept reproduces the
reported thesis value to 5 meV.

Data (not in this repo): ../../proyectos/datos_tesis_uvvis/
Output: public/figs/lab_tauc_series.png
"""
import csv
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

HERE = Path(__file__).resolve().parent
DATA = HERE.parent.parent / "proyectos" / "datos_tesis_uvvis"
OUT = HERE.parent / "public" / "figs" / "lab_tauc_series.png"

SAMPLES = [  # label, file, wavelength column, Abs column, colour
    ("ZFO", "ZnFe$_2$O$_4$", "ZnFeO_Abs.csv", 0, 1, "#5c3b2c"),
    ("ZMFO", "Zn$_{0.5}$Mg$_{0.5}$Fe$_2$O$_4$", "ZnMgFeO_MgFeO_Abs.csv", 0, 1, "#7a2741"),
    ("MFO", "MgFe$_2$O$_4$", "ZnMgFeO_MgFeO_Abs.csv", 2, 3, "#6a4fc0"),
]


def read_columns(path, cl, cv):
    lam, val = [], []
    with open(path, encoding="utf-8", errors="ignore") as f:
        for row in csv.reader(f):
            try:
                x, y = float(row[cl]), float(row[cv])
            except (ValueError, IndexError):
                continue
            if x > 0:
                lam.append(x)
                val.append(y)
    return np.array(lam), np.array(val)


def reported():
    out = {}
    with open(DATA / "resultados_optico.csv") as f:
        for r in csv.DictReader(f):
            if r["tecnica"] == "directo" and r["modo"] == "auto":
                out[r["muestra"]] = (float(r["valor"]), float(r["e_min"]), float(r["e_max"]))
    return out


def main():
    ref = reported()
    plt.rcParams.update({
        "font.family": "Noto Sans", "font.size": 13, "axes.edgecolor": "#3a2f36",
        "axes.labelcolor": "#221a1f", "xtick.color": "#3a2f36", "ytick.color": "#3a2f36",
        "axes.spines.top": False, "axes.spines.right": False,
    })
    fig, ax = plt.subplots(figsize=(11, 5.6), dpi=220)
    fig.patch.set_facecolor("#fbf8f3")
    ax.set_facecolor("#fbf8f3")

    ymax = 0.0
    for key, label, fname, cl, cv, colour in SAMPLES:
        lam, absorb = read_columns(DATA / fname, cl, cv)
        R = np.clip(10.0 ** (-absorb), 1e-6, 1.0)
        F = (1 - R) ** 2 / (2 * R)
        E = 1240.0 / lam
        order = np.argsort(E)
        E, y = E[order], ((F * E) ** 2)[order]

        eg_ref, e0, e1 = ref[key]
        win = (E >= e0) & (E <= e1)
        m, b = np.polyfit(E[win], y[win], 1)
        eg = -b / m
        assert abs(eg - eg_ref) < 0.005, f"{key}: {eg:.4f} eV vs reported {eg_ref:.4f} eV"

        show = (E >= 1.6) & (E <= 2.8)
        ax.plot(E[show], y[show], color=colour, lw=2, label=f"{label}   $E_g$ = {eg_ref:.2f} eV")
        xs = np.linspace(eg, e1 + 0.12, 50)
        ax.plot(xs, m * xs + b, color=colour, lw=1.2, ls="--", alpha=0.8)
        ax.plot([eg], [0], "o", color=colour, ms=6, zorder=5)
        ymax = max(ymax, y[show].max())

    ax.set_xlim(1.6, 2.8)
    ax.set_ylim(-0.02 * ymax, 1.05 * ymax)
    ax.set_xlabel("Photon energy (eV)")
    ax.set_ylabel(r"$(F(R)\,h\nu)^2$  (arb. units)")
    ax.set_title("Direct optical gap from diffuse reflectance (Kubelka–Munk + Tauc)", loc="left", fontsize=14)
    ax.grid(alpha=0.25)
    ax.legend(frameon=False, loc="upper left")
    fig.tight_layout()
    fig.savefig(OUT, facecolor=fig.get_facecolor())
    print("wrote", OUT)


if __name__ == "__main__":
    main()
