import type { Metadata } from "next";
import Image from "next/image";
import { IMG, SITE } from "@/data/site";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export const metadata: Metadata = { title: "Plan Your Visit" };

const INFO_CARDS = [
  {
    title: "Opening Hours",
    lines: [`Daily: ${SITE.hours}`, "Placeholder note about holiday hours."],
  },
  {
    title: "Getting Here",
    lines: [SITE.address, "Placeholder directions copy — one short line."],
  },
  {
    title: "Parking",
    lines: ["Placeholder parking info.", "Placeholder valet / EV note."],
  },
  {
    title: "Services",
    lines: ["Placeholder service one.", "Placeholder service two."],
  },
];

export default function PlanYourVisitPage() {
  return (
    <>
      {/* Short hero */}
      <section className="relative flex h-[46vh] min-h-[320px] items-center justify-center overflow-hidden">
        <Image src={IMG.hero} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent" />
        <h1 className="relative z-10 text-center font-display text-[40px] uppercase tracking-[0.08em] text-white md:text-[72px]">
          Plan Your Visit
        </h1>
      </section>

      {/* Info cards */}
      <section className="py-[50px] md:py-[70px]">
        <div className="px-4 md:px-[60px]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INFO_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <div className="h-full rounded-xl bg-surface p-8 transition-shadow duration-300 hover:shadow-lg">
                  <h3 className="font-display text-xl uppercase text-ink">
                    {card.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {card.lines.map((line) => (
                      <li key={line} className="leading-relaxed text-ink/70">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Map / contact strip */}
          <Reveal className="mt-14">
            <div className="grid items-center gap-10 overflow-hidden rounded-2xl bg-ink lg:grid-cols-2">
              <div className="p-10 md:p-14">
                <h2 className="font-display text-[26px] uppercase leading-tight text-white md:text-[36px]">
                  Find Us
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-white/70">
                  Placeholder copy inviting visitors to get directions or contact
                  guest services. Replace with your own details.
                </p>
                <ul className="mt-6 space-y-2 text-white/85">
                  <li>{SITE.address}</li>
                  <li>{SITE.phone}</li>
                  <li>{SITE.email}</li>
                </ul>
                <div className="mt-8">
                  <Button href="#" variant="light">
                    Get Directions
                  </Button>
                </div>
              </div>
              <div className="relative min-h-[280px] self-stretch">
                <Image
                  src={IMG.wide}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
