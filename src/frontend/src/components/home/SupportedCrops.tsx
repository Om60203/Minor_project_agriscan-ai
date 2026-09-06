import { motion } from "motion/react";

const CROPS = [
  { name: "Tomato", image: "/assets/generated/crop-tomato.dim_600x400.jpg" },
  { name: "Potato", image: "/assets/generated/crop-potato.dim_600x400.jpg" },
  { name: "Corn", image: "/assets/generated/crop-corn.dim_600x400.jpg" },
  { name: "Apple", image: "/assets/generated/crop-apple.dim_600x400.jpg" },
  { name: "Pepper", image: "/assets/generated/crop-pepper.dim_600x400.jpg" },
  { name: "Grape", image: "/assets/generated/crop-grape.dim_600x400.jpg" },
] as const;

export function SupportedCrops() {
  return (
    <section className="bg-ambient relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-primary/10 blur-[110px]"
        style={{ animationDelay: "-8s" }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Supported Crops
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Disease detection for 50+ crops
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            From your kitchen garden to your farm, we've got your crops covered.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {CROPS.map((crop, index) => (
            <motion.div
              key={crop.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.08,
              }}
              className="glass-strong animate-card-swipe group relative overflow-hidden rounded-3xl shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated-lg focus-within:ring-2 focus-within:ring-ring"
              style={{ animationDelay: `${index * 0.08}s` }}
              data-ocid={`home.crop.${index + 1}`}
            >
              <img
                src={crop.image}
                alt={`Fresh ${crop.name} produce`}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
                  {crop.name}
                </h3>
                <p className="text-xs text-white/80 sm:text-sm">
                  Disease detection supported
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
