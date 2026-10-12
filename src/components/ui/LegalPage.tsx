// A plain text page for legal copy: a heading, the date it was last changed,
// then short numbered sections. Kept quiet on purpose, in the site's type.
export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <article className="px-4 pb-20 pt-[112px] md:px-[60px] md:pb-28 md:pt-[148px]">
      <div className="max-w-3xl">
        <h1 className="font-display text-[32px] uppercase leading-tight tracking-[0.06em] text-ink md:text-[44px]">
          {title}
        </h1>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-ink/45">Last updated {updated}</p>
        <p className="mt-8 text-lg leading-relaxed text-ink/75">{intro}</p>
        {sections.map((s, i) => (
          <section key={s.heading} className="mt-10">
            <h2 className="font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
              {i + 1}. {s.heading}
            </h2>
            {s.body.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-ink/70">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
