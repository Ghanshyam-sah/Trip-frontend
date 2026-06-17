

import { Globe, Users, Zap } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Manage trips across 190+ countries with integrated planning tools and local insights.',
    },
    {
      icon: Users,
      title: 'Collaborate Easily',
      description: 'Invite friends and family to plan together in real-time with shared itineraries.',
    },
    {
      icon: Zap,
      title: 'Smart Planning',
      description: 'AI-powered recommendations help you discover hidden gems and optimize your routes.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Plan Your Adventure, Your Way
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              TripFlow makes travel planning effortless. Organize accommodations, activities, budgets, and documents all in one place. Whether you&apos;re planning a weekend getaway or a month-long expedition, we&apos;ve got you covered.
            </p>
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary rounded-full blur-3xl" />
              </div>
              <Globe className="w-32 h-32 text-accent/40 relative z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
