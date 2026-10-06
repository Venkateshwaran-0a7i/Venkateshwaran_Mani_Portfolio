/**
 * Stack.tsx — technology stack grouped by category.
 *
 * Renders pill chips grouped by category headers.
 * Each group is a <ul> of <li> chips for correct list semantics.
 * A blinking dot prefixes each group label as a visual motif.
 */
import { stackGroups } from "../data/content";
import PulseDivider from "../components/PulseDivider";

export default function Stack() {
  return (
    <section id="stack" className="section stack-section reveal" aria-label="Technology stack">
      <div className="section-inner">
        <p className="section-label mono">// stack</p>
        <h2 className="section-title">Technologies</h2>
        <p className="section-sub muted">
          Tools and frameworks I work with regularly.
        </p>

        <div className="stack-groups">
          {Object.entries(stackGroups).map(([group, chips]) => (
            <div key={group} className="stack-group">
              <h3 className="stack-group-label mono">
                <span className="dot dot--sm" aria-hidden="true" />
                {group}
              </h3>
              <ul className="chips-list" role="list" aria-label={`${group} technologies`}>
                {chips.map((chip) => (
                  <li key={chip} className="chip">
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <PulseDivider />
    </section>
  );
}
