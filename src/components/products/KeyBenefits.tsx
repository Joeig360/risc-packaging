export function KeyBenefits({ benefits, emptyMessage = "Contact us to discuss product-specific benefits and suitability." }: { benefits: string[]; emptyMessage?: string }) {
  return <div>
    <p className="text-xs font-semibold tracking-[.14em] text-graphite">KEY BENEFITS</p>
    {benefits.length ? <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate">
      {benefits.slice(0, 4).map((benefit) => <li key={benefit}>{benefit}</li>)}
    </ul> : <p className="mt-4 text-sm leading-6 text-slate">{emptyMessage}</p>}
  </div>;
}
