import Link from "next/link";
import type { ReactNode } from "react";
import { FAQS, type Faq } from "@/data/faq";

// An answer with the words named in `links` turned into links.
function answer({ a, links = [] }: Faq): ReactNode[] {
  const parts: ReactNode[] = [];
  let rest = a;
  let key = 0;
  while (rest) {
    // The earliest link still to come in what is left of the answer.
    const next = links
      .map((l) => ({ l, at: rest.indexOf(l.text) }))
      .filter((m) => m.at >= 0)
      .sort((x, y) => x.at - y.at)[0];
    if (!next) {
      parts.push(rest);
      break;
    }
    if (next.at > 0) parts.push(rest.slice(0, next.at));
    const cls = "text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary";
    parts.push(
      next.l.external ? (
        <a key={key++} href={next.l.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {next.l.text}
        </a>
      ) : (
        <Link key={key++} href={next.l.href} className={cls}>
          {next.l.text}
        </Link>
      ),
    );
    rest = rest.slice(next.at + next.l.text.length);
  }
  return parts;
}

// The questions people ask before a visit, each opening to its answer. Built
// on <details>, so it works without scripts and every answer is in the page
// for search engines even while closed.
export default function FaqList() {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {FAQS.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-semibold text-ink md:text-lg">{f.q}</h3>
            <span
              aria-hidden
              className="relative h-4 w-4 shrink-0 text-primary before:absolute before:left-0 before:top-1/2 before:h-[1.5px] before:w-4 before:-translate-y-1/2 before:bg-current after:absolute after:left-1/2 after:top-0 after:h-4 after:w-[1.5px] after:-translate-x-1/2 after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
            />
          </summary>
          <p className="max-w-3xl pb-6 leading-relaxed text-ink/70 md:text-[17px]">{answer(f)}</p>
        </details>
      ))}
    </div>
  );
}
