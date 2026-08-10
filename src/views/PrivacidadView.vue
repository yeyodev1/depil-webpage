<script setup lang="ts">
/**
 * /politica-de-privacidad
 *
 * ⚠️ BORRADOR TÉCNICO, NO ASESORÍA LEGAL. Describe únicamente lo que el sitio
 * hace de verdad (formulario de contacto que abre WhatsApp, imágenes servidas
 * desde Cloudinary, tipografía de Google Fonts) y está redactado según la Ley
 * Orgánica de Protección de Datos Personales del Ecuador. Debe revisarlo un
 * abogado antes de publicar, y actualizarse si se añade analítica o píxeles.
 */
import PageHero from '@/components/ui/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { migasLd } from '@/config/seo'
import { SITE } from '@/config/site'

const migas = [
  { nombre: 'Inicio', ruta: '/' },
  { nombre: 'Política de privacidad', ruta: '/politica-de-privacidad' },
]

useSeo(() => ({
  titulo: 'Política de Privacidad | Depil Ec',
  descripcion:
    'Cómo Depil Ec recopila, usa y protege tus datos personales, y cómo ejercer tus derechos de acceso, rectificación y eliminación.',
  ruta: '/politica-de-privacidad',
  jsonLd: [migasLd(migas)],
}))

const actualizado = '10 de agosto de 2026'
</script>

<template>
  <div class="pagina">
    <PageHero
      titulo="Política de privacidad"
      kicker="Legal"
      :descripcion="`Última actualización: ${actualizado}`"
      :migas="migas"
    />

    <section class="legal">
      <div class="contenedor">
        <h2>1. Responsable del tratamiento</h2>
        <p>
          Depil Ec, con centros en Quito, Guayaquil, Samborondón, Ceibos y Manta (Ecuador), es el
          responsable del tratamiento de los datos personales recogidos a través de este sitio web.
          Para cualquier consulta: <a :href="`mailto:${SITE.email}`">{{ SITE.email }}</a> o
          <a :href="`tel:${SITE.telefonoRaw}`">{{ SITE.telefono }}</a>.
        </p>

        <h2>2. Qué datos recogemos</h2>
        <p>
          Solo los que nos entregas voluntariamente en el formulario de contacto:
          <strong>nombre, correo electrónico, teléfono, zona de interés, sede de preferencia y el
          mensaje</strong> que escribas. No recogemos datos de salud a través de la web; cualquier
          información clínica se trata presencialmente en la valoración.
        </p>

        <h2>3. Para qué los usamos</h2>
        <p>
          Únicamente para contactarte, resolver tu consulta y agendar tu valoración o tratamiento.
          No vendemos, alquilamos ni cedemos tus datos a terceros con fines comerciales.
        </p>

        <h2>4. Base legal</h2>
        <p>
          Tu consentimiento expreso, que otorgas al marcar la casilla de aceptación antes de enviar
          el formulario. Puedes retirarlo en cualquier momento escribiéndonos.
        </p>

        <h2>5. Cómo se envía tu consulta</h2>
        <p>
          Al enviar el formulario, los datos que escribiste se usan para redactar un mensaje que se
          abre en <strong>WhatsApp</strong> desde tu propio dispositivo. Esa conversación queda
          sujeta a la política de privacidad de WhatsApp (Meta Platforms), además de a la nuestra.
        </p>

        <h2>6. Servicios de terceros</h2>
        <ul>
          <li>
            <strong>Cloudinary</strong> — entrega las imágenes y el video del sitio. Su servidor
            recibe tu dirección IP y datos del navegador, como en cualquier petición web.
          </li>
          <li>
            <strong>Google Fonts</strong> — sirve la tipografía del sitio, con el mismo alcance.
          </li>
          <li>
            <strong>WhatsApp (Meta)</strong> — canal de conversación, si decides usarlo.
          </li>
        </ul>
        <p>
          Este sitio <strong>no usa cookies de analítica, publicidad ni seguimiento</strong>, y no
          crea perfiles de navegación.
        </p>

        <h2>7. Conservación</h2>
        <p>
          Conservamos tus datos de contacto mientras exista relación con la clínica y durante el
          plazo que exija la normativa ecuatoriana aplicable. Después se eliminan.
        </p>

        <h2>8. Tus derechos</h2>
        <p>
          Conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador, puedes solicitar
          <strong>acceso, rectificación, actualización, eliminación, oposición, portabilidad</strong>
          y la suspensión del tratamiento de tus datos. Escríbenos a
          <a :href="`mailto:${SITE.email}`">{{ SITE.email }}</a> y responderemos en los plazos
          legales. También puedes presentar un reclamo ante la Superintendencia de Protección de
          Datos Personales.
        </p>

        <h2>9. Menores de edad</h2>
        <p>
          Los tratamientos se realizan a mayores de 18 años. En menores se requiere autorización y
          acompañamiento de su representante legal.
        </p>

        <h2>10. Cambios</h2>
        <p>
          Si esta política cambia, se publicará aquí la versión actualizada con su nueva fecha.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.legal {
  @include seccion;
  background: var(--bg);

  .contenedor {
    max-width: 46rem;
  }

  h2 {
    margin-top: 2.25rem;
    margin-bottom: 0.75rem;
    font-size: clamp(1.05rem, 0.95rem + 0.5vw, 1.25rem);
    color: $primary;

    &:first-child {
      margin-top: 0;
    }
  }

  p,
  li {
    color: var(--text-muted);
    font-size: 0.9375rem;
    line-height: 1.75;
  }

  p + p {
    margin-top: 0.85rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin: 0.5rem 0 0.85rem 1.1rem;
  }

  strong {
    color: var(--text);
    font-weight: 600;
  }

  a {
    color: $primary;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}
</style>
