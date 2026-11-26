import { useState } from 'react';
import { siteConfig, type GalleryItem } from './config/siteConfig';
import { useTrialCountdown } from './hooks/useTrialCountdown';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { FeaturedStoriesSection } from './components/FeaturedStoriesSection';
import { CinematicFeatureSection } from './components/CinematicFeatureSection';
import { ServicesSection } from './components/ServicesSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { InstagramSection } from './components/InstagramSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Lightbox } from './components/Lightbox';
import { TrialExpiredScreen } from './components/TrialExpiredScreen';

export function App() {
  const countdown = useTrialCountdown();

  const [lightboxState, setLightboxState] = useState<{
    items: GalleryItem[];
    index: number | null;
  }>({
    items: [...siteConfig.galleryItems],
    index: null,
  });

  const [selectedServiceForEnquiry, setSelectedServiceForEnquiry] = useState<string>(
    siteConfig.contact.eventTypes[0]
  );

  // When the free trial period has expired, replace the entire UI cleanly
  if (countdown.isExpired) {
    return <TrialExpiredScreen />;
  }

  const handleOpenLightbox = (item: GalleryItem, list: GalleryItem[]) => {
    const idx = list.findIndex((entry) => entry.id === item.id);
    setLightboxState({
      items: list,
      index: idx >= 0 ? idx : 0,
    });
  };

  const handleEnquireService = (eventType: string) => {
    setSelectedServiceForEnquiry(eventType);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#102923] text-[#F5F0E5]">
      <Navbar countdown={countdown} />

      <main>
        <HeroSection />
        <IntroSection />
        <FeaturedStoriesSection
          onSelectStory={(item) =>
            handleOpenLightbox(item, [...siteConfig.featuredStories])
          }
        />
        <CinematicFeatureSection />
        <ServicesSection onEnquireService={handleEnquireService} />
        <PhotoGallerySection onSelectPhoto={handleOpenLightbox} />
        <WhyChooseUsSection />
        <InstagramSection />
        <ContactSection preselectedEventType={selectedServiceForEnquiry} />
      </main>

      <Footer />

      <Lightbox
        items={lightboxState.items}
        activeIndex={lightboxState.index}
        onClose={() => setLightboxState((prev) => ({ ...prev, index: null }))}
        onNavigate={(newIndex) =>
          setLightboxState((prev) => ({ ...prev, index: newIndex }))
        }
      />
    </div>
  );
}

export default App;
