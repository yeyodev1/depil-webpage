<script setup lang="ts">
import ContactoSection from '@/components/sections/ContactoSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import NosotrosSection from '@/components/sections/NosotrosSection.vue'
import PromosSection from '@/components/sections/PromosSection.vue'
import ResultadosSection from '@/components/sections/ResultadosSection.vue'
import SedesSection from '@/components/sections/SedesSection.vue'
import TestimoniosSection from '@/components/sections/TestimoniosSection.vue'
import ZonasSection from '@/components/sections/ZonasSection.vue'
import { useSeo } from '@/composables/useSeo'
import { organizacionLd, resenasLd, serviciosLd, sitioLd, SEO_DEFECTO } from '@/config/seo'

useSeo(() => ({
  ...SEO_DEFECTO,
  // Sin faqLd: el FAQPage vive solo en /preguntas-frecuentes — el mismo markup
  // repetido en varias URLs diluye el rich result (la sección visible se queda).
  jsonLd: [organizacionLd(), sitioLd(), serviciosLd(), resenasLd()],
}))
</script>

<template>
  <div class="pagina">
    <HeroSection />
    <NosotrosSection />
    <SedesSection />
    <ZonasSection />
    <ResultadosSection />
    <PromosSection />
    <TestimoniosSection />
    <FaqSection />
    <ContactoSection />
  </div>
</template>
