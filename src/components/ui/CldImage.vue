<script setup lang="ts">
/** Imagen de Cloudinary con srcset responsive y blur-up al cargar. */
import { computed, ref } from 'vue'
import { cldPlaceholder, cldSrcset, cldUrl, type OpcionesImagen } from '@/composables/useCloudinary'

const props = withDefaults(
  defineProps<{
    publicId: string
    alt: string
    ancho?: number
    alto?: number
    aspecto?: string
    recorte?: OpcionesImagen['recorte']
    gravedad?: OpcionesImagen['gravedad']
    sizes?: string
    /** `eager` para imágenes above-the-fold (hero). */
    carga?: 'lazy' | 'eager'
    /** Desactiva el placeholder borroso. */
    sinBlur?: boolean
  }>(),
  {
    ancho: 960,
    aspecto: undefined,
    alto: undefined,
    recorte: 'fill',
    gravedad: 'auto',
    sizes: '(max-width: 767px) 100vw, 50vw',
    carga: 'lazy',
    sinBlur: false,
  },
)

const cargada = ref(false)

const opciones = computed<OpcionesImagen>(() => ({
  ancho: props.ancho,
  alto: props.alto,
  aspecto: props.aspecto,
  recorte: props.recorte,
  gravedad: props.gravedad,
}))

const src = computed(() => cldUrl(props.publicId, opciones.value))
const srcset = computed(() => cldSrcset(props.publicId, opciones.value))
const placeholder = computed(() =>
  props.sinBlur ? '' : cldPlaceholder(props.publicId, opciones.value),
)
</script>

<template>
  <div class="cld-imagen" :class="{ 'cld-imagen--lista': cargada }">
    <img
      v-if="placeholder && !cargada"
      class="cld-imagen__placeholder"
      :src="placeholder"
      alt=""
      aria-hidden="true"
    />
    <img
      class="cld-imagen__real"
      :src="src"
      :srcset="srcset"
      :sizes="sizes"
      :alt="alt"
      :loading="carga"
      :fetchpriority="carga === 'eager' ? 'high' : 'auto'"
      decoding="async"
      @load="cargada = true"
    />
  </div>
</template>

<style scoped lang="scss">
.cld-imagen {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--surface-alt);

  &__placeholder,
  &__real {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__placeholder {
    position: absolute;
    inset: 0;
    transform: scale(1.08);
    filter: blur(14px);
    transition: opacity var(--dur-media) ease;
  }

  &__real {
    opacity: 0;
    transition: opacity var(--dur-lenta) var(--ease-suave);
  }

  &--lista &__real {
    opacity: 1;
  }
}
</style>
