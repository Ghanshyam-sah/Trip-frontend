

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=600&fit=crop',
      title: 'Mountain Adventures',
      location: 'Swiss Alps',
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      title: 'Beach Paradise',
      location: 'Bali, Indonesia',
    },
    {
      url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
      title: 'Urban Exploration',
      location: 'Tokyo, Japan',
    },
    {
      url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=600&fit=crop',
      title: 'Desert Wonders',
      location: 'Moroccan Sahara',
    },
    {
      url: 'https://images.unsplash.com/photo-1724398915427-edc535c546fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VsdHVyYWwlMjBoZXJpdGFnZXxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Cultural Heritage',
      location: 'Rome, Italy',
    },
    {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop',
      title: 'Ocean Views',
      location: 'California Coast',
    },
  ];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Explore Inspiring Journeys
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover destinations from our community of travelers
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main featured image */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl aspect-square bg-secondary/10 group">
              <img
                src={images[selectedIndex].url}
                alt={images[selectedIndex].title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {images[selectedIndex].title}
                </h3>
                <p className="text-white/80">{images[selectedIndex].location}</p>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Thumbnail grid */}
          <div className="grid grid-cols-2 lg:grid-cols-1 col-span-1 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative overflow-hidden rounded-lg aspect-square group transition-all ${
                  selectedIndex === index
                    ? 'ring-2 ring-accent'
                    : 'hover:ring-1 hover:ring-border'
                }`}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
