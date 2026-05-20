import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

const logos = [
  { id: 'oral-b',      src: '/client-logos-processed/Oral-B-logo.webp',              alt: 'Oral-B' },
  { id: 'pwc',         src: '/client-logos-processed/pwc-logo.webp',                 alt: 'PwC' },
  { id: 'sugar-baby',  src: '/client-logos-processed/Sugar-baby-logo.webp',          alt: 'Sugar Baby Care' },
  { id: 'dip',         src: '/client-logos-processed/Dip-logo.webp',                 alt: 'We Are Dip' },
  { id: 'luhxe',       src: '/client-logos-processed/Luhxe-logo.webp',               alt: 'Luhxe' },
  { id: 'qiqi',        src: '/client-logos-processed/Qiqi-logo.webp',                alt: 'Qiqi' },
  { id: 'hyge',        src: '/client-logos-processed/hyge-logo.webp',                alt: 'Hyge' },
  { id: 'oak-haven',   src: '/client-logos-processed/oak-haven-logo.webp',           alt: 'Oak Haven' },
  { id: 'innovative',  src: '/client-logos-processed/innovative-language-logo.webp', alt: 'Innovative Language' },
];

export function LogosSlider() {
  return (
    <section className='relative w-full border-t border-white/[0.06] py-10'>
      {/* Label */}
      <p className='mb-7 text-center font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground'>
        Brands I've worked with
      </p>

      <div className='relative h-10 w-full overflow-hidden'>
        <InfiniteSlider
          className='flex h-full w-full items-center'
          duration={35}
          gap={64}
        >
          {logos.map((logo) => (
            <div
              key={logo.id}
              className='flex shrink-0 items-center justify-center'
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className='h-7 w-auto object-contain'
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.45 }}
              />
            </div>
          ))}
        </InfiniteSlider>

        <ProgressiveBlur
          className='pointer-events-none absolute top-0 left-0 h-full w-[160px]'
          direction='left'
          blurIntensity={0.8}
        />
        <ProgressiveBlur
          className='pointer-events-none absolute top-0 right-0 h-full w-[160px]'
          direction='right'
          blurIntensity={0.8}
        />
      </div>
    </section>
  );
}
