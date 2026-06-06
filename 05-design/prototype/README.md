# Hero-Prototypen — Designentscheidung

Gemäß `frontend-design`-Skill und `playbook-schritte-de/frontend-design-richtlinien.md`
wurden vor dem Build **drei** Hero-/Startseiten-Richtungen skizziert. Nur die gewählte
Richtung wurde ausgebaut; die anderen sind hier archiviert und werden nicht parallel
weitergeführt.

Öffne die `.html`-Dateien direkt im Browser (statisch, kein Build nötig). Die Prototypen
nutzen Fallback-Systemschriften; im Produktiv-Build sind es die lokal gehosteten
SIL-OFL-Schriften **Archivo** (Display) + **Source Sans 3** (Body).

## Richtungen

| Datei | Richtung | Kurzcharakter |
| --- | --- | --- |
| `A-schiefer-stahl.html` | **A — Schiefer & Stahl** ✅ gewählt | Dunkle Anthrazit/Schiefer-Bänder, Ziegelrot-CTAs, große Archivo-Headlines, diagonale Dachlinie, Materialfokus. Industriell-editorial, „Meisterhand". |
| `B-handwerk-hell.html` | B — Handwerk Hell | Helles, warmes Off-White, viel Weißraum, foto-forward, freundlich-premium. Leichter/zugänglicher. |
| `C-bauplan.html` | C — Bauplan / Blueprint | Technische Rasterlinien, Maß-/Mono-Kennzahlen, konzeptionell-distinktiv, aber riskanter für die konservative Zielgruppe. |

## Entscheidung: **A — Schiefer & Stahl**

**Begründung:** Passt am besten zur Quelle-der-Wahrheit (`05-design/design-direction.md`:
„solide, vertrauenswürdig, handwerklich, Meisterbetrieb-Seriosität") und zur Zielgruppe
(Hauseigentümer Raum Rackwitz/Leipzig). Der Materialbezug (Schiefer/Anthrazit) und die
diagonale Dachlinie machen die Seite unverwechselbar, ohne verspielt oder generisch zu
wirken. Vom Nutzer bestätigt.

**Was aus A in den Build übernommen wurde:**
- Farbsystem Anthrazit/Schiefer + Ziegelrot-Akzent (Tokens in `06-build/src/styles/global.css`).
- Diagonale Dachlinie als Leitmotiv (`.slate-texture`, Logo-Mark, Hero-Bildzuschnitt).
- Große Archivo-Display-Typografie, Uppercase-Eyebrows mit Tracking.
- USP-Badge „Hier arbeitet der Meister noch selbst." prominent im Hero.

**Verworfen:** B (zu leicht für den gewünschten „schweren", soliden Eindruck) und
C (zu konzeptionell/technisch für die Zielgruppe).
