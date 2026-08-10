<script setup lang="ts">
/**
 * /nosotros — quiénes somos, tecnología y equipo.
 * Reutiliza las secciones de la home en vez de duplicar el contenido.
 */
import NosotrosSection from '@/components/sections/NosotrosSection.vue'
import SedesSection from '@/components/sections/SedesSection.vue'
import TestimoniosSection from '@/components/sections/TestimoniosSection.vue'
import PageHero from '@/components/ui/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { migasLd, organizacionLd, resenasLd } from '@/config/seo'

const migas = [
  { nombre: 'Inicio', ruta: '/' },
  { nombre: 'Nosotros', ruta: '/nosotros' },
]

useSeo(() => ({
  titulo: 'Sobre Depil Ec | Depilación Láser Tri-Laser & 4D en Ecuador',
  descripcion:
    'Conoce Depil Ec: tecnología Tri-Laser & 4D certificada por la FDA, especialistas capacitadas, protocolos personalizados y cinco sedes en Quito, Guayaquil, Samborondón, Ceibos y Manta.',
  ruta: '/nosotros',
  jsonLd: [organizacionLd(), migasLd(migas), resenasLd()],
}))
</script>

<template>
  <div class="pagina">
    <PageHero
      titulo="Resultados reales, tecnología de vanguardia"
      kicker="¿Quiénes somos?"
      descripcion="Transformamos la depilación láser en una experiencia exclusiva, con equipos aprobados por la FDA y un equipo de especialistas que te acompaña en cada sesión."
      imagen-fondo="depil/features/experiencia-premium"
      :migas="migas"
    />

    <NosotrosSection />
    <SedesSection />
    <TestimoniosSection />
  </div>
</template>
