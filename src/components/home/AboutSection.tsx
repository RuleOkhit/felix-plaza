import Reveal from "@/components/ui/Reveal";
import { ABOUT } from "@/data/faq";

// Who Felix Plaza is, in a few lines, straight under the hero: the one place
// on the homepage with real words for visitors, search engines and AI tools
// to read. Plain type on white, centred, nothing boxed.
export default function AboutSection() {
  return (
    <section className="bg-white px-4 py-[52px] md:px-[60px] md:py-[84px]">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.24em] text-felix-pink">
          About Felix Plaza
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ink/80 md:text-[22px] md:leading-[1.6]">
          {ABOUT.body}
        </p>
        <span aria-hidden className="mx-auto mt-8 block h-px w-12 bg-ink/15" />
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ink/55 md:text-base">
          {ABOUT.name}
        </p>
      </Reveal>
    </section>
  );
}
