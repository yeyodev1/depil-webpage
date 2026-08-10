<script setup lang="ts">
/** /resultados — antes y después + reviews. */
import ResultadosSection from '@/components/sections/ResultadosSection.vue'
import TestimoniosSection from '@/components/sections/TestimoniosSection.vue'
import PageHero from '@/components/ui/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { migasLd, resenasLd } from '@/config/seo'

const migas = [
  { nombre: 'Inicio', ruta: '/' },
  { nombre: 'Resultados', ruta: '/resultados' },
]

useSeo(() => ({
  titulo: 'Resultados Antes y Después | Depilación Láser Depil Ec',
  descripcion:
    'Mira el antes y después real de nuestros tratamientos de depilación láser Tri-Laser & 4D y las reseñas de pacientes en Quito, Guayaquil, Samborondón, Ceibos y Manta.',
  ruta: '/resultados',
  jsonLd: [migasLd(migas), resenasLd()],
}))
</script>

<template>
  <div class="pagina">
    <PageHero
      titulo="Transformaciones asombrosas"
      kicker="Antes y después"
      descripcion="Cada imagen cuenta una historia de transformación. Desliza el comparador y mira el cambio real."
      imagen-fondo="depil/resultados/despues"
      :migas="migas"
    />

    <ResultadosSection />
    <TestimoniosSection />
  </div>
</template>
