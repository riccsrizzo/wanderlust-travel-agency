import { testimonials } from "../data/testimonials";

export function Testimonials() {

  return (
    <section id="testimonials" className="testimonials-section py-20">
      <div className="max-w-full mx-auto px-6 sm:px-10 lg:px-16">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center">
          What Our Travelers Say
        </h2>

        <div className="testimonials-grid grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8 mt-12">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="testimonial-card bg-white p-8 rounded-2xl border border-slate-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] flex flex-col justify-between"
            >
              <p className="testimonial-text italic text-slate-700 mb-6">
                "{t.quote}"
              </p>
              <div className="testimonial-author flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-base text-slate-900">
                    {t.name}
                  </h4>
                  <span className="text-xs text-slate-500">
                    {t.destination}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
