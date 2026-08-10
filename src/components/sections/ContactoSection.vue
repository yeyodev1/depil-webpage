<script setup lang="ts">
/**
 * Formulario de contacto.
 *
 * Sin backend todavía: al enviar se pide confirmación y se abre WhatsApp con el
 * mensaje ya redactado. Cuando exista endpoint, reemplazar `enviar()` por una
 * llamada al servicio (subclase de APIBase) manteniendo el mismo flujo de UI.
 */
import { computed, reactive, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { confirmar } from '@/composables/useModal'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useToast } from '@/composables/useToast'
import { SEDES, SITE, whatsappUrl } from '@/config/site'
import { ZONAS } from '@/config/zonas'

const raiz = ref<HTMLElement | null>(null)
useScrollReveal(raiz, { hijos: '[data-reveal]', cascada: 0.08, desplazamiento: 38 })

const toast = useToast()
const enviando = ref(false)

const form = reactive({
  nombre: '',
  email: '',
  telefono: '',
  zona: '',
  sede: '',
  mensaje: '',
  acepta: false,
})

const tocado = reactive<Record<string, boolean>>({})

const errores = computed(() => {
  const e: Record<string, string> = {}
  if (form.nombre.trim().length < 3) e.nombre = 'Ingresa tu nombre completo.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) e.email = 'Ingresa un correo válido.'
  if (form.telefono.replace(/\D/g, '').length < 9) e.telefono = 'Ingresa un teléfono válido.'
  if (!form.zona) e.zona = 'Selecciona la zona que te interesa.'
  if (!form.acepta) e.acepta = 'Debes aceptar el tratamiento de datos.'
  return e
})

const valido = computed(() => Object.keys(errores.value).length === 0)

function mostrarError(campo: string) {
  return tocado[campo] ? errores.value[campo] : undefined
}

function mensajeWhatsapp() {
  const partes = [
    `Hola 😁, soy ${form.nombre}.`,
    `Me interesa: ${form.zona}.`,
    form.sede ? `Sede: ${form.sede}.` : '',
    form.mensaje ? `\n${form.mensaje}` : '',
    `\nMi correo: ${form.email} · Tel: ${form.telefono}`,
  ]
  return partes.filter(Boolean).join(' ')
}

async function enviar() {
  Object.keys(form).forEach((k) => (tocado[k] = true))

  if (!valido.value) {
    toast.alerta('Revisa el formulario', 'Faltan datos por completar.')
    return
  }

  const confirmado = await confirmar({
    titulo: '¿Enviamos tus datos?',
    mensaje: `Abriremos WhatsApp con tu consulta sobre ${form.zona} para que una asesora te atienda de inmediato.`,
    textoConfirmar: 'Sí, continuar',
    textoCancelar: 'Revisar',
    icono: 'fa-brands fa-whatsapp',
  })
  if (!confirmado) return

  enviando.value = true
  try {
    window.open(whatsappUrl(mensajeWhatsapp()), '_blank', 'noopener')
    toast.exito('¡Listo!', 'Te redirigimos a WhatsApp con una asesora.')
    Object.assign(form, {
      nombre: '',
      email: '',
      telefono: '',
      zona: '',
      sede: '',
      mensaje: '',
      acepta: false,
    })
    Object.keys(tocado).forEach((k) => (tocado[k] = false))
  } catch {
    toast.error('No pudimos abrir WhatsApp', 'Escríbenos directamente al ' + SITE.telefono)
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <section id="contacto" ref="raiz" class="contacto">
    <div class="contenedor contacto__layout">
      <aside class="contacto__info" data-reveal>
        <SectionHeader
          kicker="¿Ya te animaste?"
          titulo="Hablemos de"
          resaltado="tu tratamiento"
          alineacion="izquierda"
          descripcion="Déjanos tus datos y una de nuestras asesoras se comunicará contigo de inmediato."
        />

        <ul class="contacto__datos">
          <li>
            <i class="fa-solid fa-phone" aria-hidden="true" />
            <a :href="`tel:${SITE.telefonoRaw}`">{{ SITE.telefono }}</a>
          </li>
          <li>
            <i class="fa-solid fa-envelope" aria-hidden="true" />
            <a :href="`mailto:${SITE.email}`">{{ SITE.email }}</a>
          </li>
          <li v-for="h in SITE.horarios" :key="h.dias">
            <i class="fa-regular fa-clock" aria-hidden="true" />
            <span>{{ h.dias }}: {{ h.horas }}</span>
          </li>
        </ul>
      </aside>

      <form class="formulario" novalidate data-reveal @submit.prevent="enviar">
        <div class="campo">
          <label for="nombre">Nombre <span aria-hidden="true">*</span></label>
          <input
            id="nombre"
            v-model.trim="form.nombre"
            type="text"
            autocomplete="name"
            placeholder="Tu nombre completo"
            :class="{ 'is-error': mostrarError('nombre') }"
            @blur="tocado.nombre = true"
          />
          <p v-if="mostrarError('nombre')" class="campo__error">{{ errores.nombre }}</p>
        </div>

        <div class="campo campo__fila">
          <div>
            <label for="email">Email <span aria-hidden="true">*</span></label>
            <input
              id="email"
              v-model.trim="form.email"
              type="email"
              autocomplete="email"
              placeholder="tucorreo@mail.com"
              :class="{ 'is-error': mostrarError('email') }"
              @blur="tocado.email = true"
            />
            <p v-if="mostrarError('email')" class="campo__error">{{ errores.email }}</p>
          </div>

          <div>
            <label for="telefono">Teléfono <span aria-hidden="true">*</span></label>
            <input
              id="telefono"
              v-model.trim="form.telefono"
              type="tel"
              autocomplete="tel"
              placeholder="09XXXXXXXX"
              :class="{ 'is-error': mostrarError('telefono') }"
              @blur="tocado.telefono = true"
            />
            <p v-if="mostrarError('telefono')" class="campo__error">{{ errores.telefono }}</p>
          </div>
        </div>

        <div class="campo campo__fila">
          <div>
            <label for="zona">Servicio que te interesa <span aria-hidden="true">*</span></label>
            <select
              id="zona"
              v-model="form.zona"
              :class="{ 'is-error': mostrarError('zona') }"
              @blur="tocado.zona = true"
            >
              <option value="" disabled>Selecciona una zona</option>
              <option v-for="z in ZONAS" :key="z.id" :value="z.nombre">{{ z.nombre }}</option>
            </select>
            <p v-if="mostrarError('zona')" class="campo__error">{{ errores.zona }}</p>
          </div>

          <div>
            <label for="sede">Sede de preferencia</label>
            <select id="sede" v-model="form.sede">
              <option value="">Cualquiera</option>
              <option v-for="s in SEDES" :key="s.id" :value="s.nombre">{{ s.nombre }}</option>
            </select>
          </div>
        </div>

        <div class="campo">
          <label for="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            v-model.trim="form.mensaje"
            rows="4"
            placeholder="Cuéntanos qué necesitas..."
          />
        </div>

        <label class="checkbox" :class="{ 'is-error': mostrarError('acepta') }">
          <input v-model="form.acepta" type="checkbox" @change="tocado.acepta = true" />
          <span>Acepto el tratamiento de mis datos para ser contactada por Depil Ec.</span>
        </label>

        <BaseButton
          type="submit"
          variante="dorado"
          tamano="lg"
          icono="fa-solid fa-paper-plane"
          bloque
          :cargando="enviando"
        >
          Enviar
        </BaseButton>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contacto {
  @include seccion;
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-alt) 100%);

  &__layout {
    display: grid;
    gap: 2rem;

    @include desde($bp-lg) {
      grid-template-columns: 0.9fr 1.1fr;
      gap: 3.5rem;
      align-items: start;
    }
  }

  &__info :deep(.encabezado) {
    margin-bottom: 1.75rem;
  }

  &__datos {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    list-style: none;
    color: var(--text-muted);
    font-size: 0.9rem;

    li {
      display: flex;
      align-items: center;
      gap: 0.7rem;
    }

    i {
      width: 1.1rem;
      color: $primary;
      text-align: center;
    }

    a {
      transition: color var(--dur-rapida) ease;

      @include puede-hover {
        &:hover {
          color: $primary;
        }
      }
    }
  }
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding: 1.5rem;
  border-radius: var(--radio-lg);
  background: var(--surface);
  @include borde-dorado(0.18);
  box-shadow: var(--sombra-suave);

  @include desde($bp-md) {
    padding: 2rem;
  }
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  &__fila {
    display: grid;
    gap: 1.1rem;

    @include desde($bp-sm) {
      grid-template-columns: 1fr 1fr;
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
  }

  label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-muted);

    span {
      color: $primary;
    }
  }

  &__error {
    margin: 0;
    color: $alert-error;
    font-size: 0.75rem;
  }
}

input,
select,
textarea {
  width: 100%;
  padding: 0.75rem 0.9rem;
  border-radius: var(--radio-sm);
  border: 1px solid var(--border);
  background: var(--surface-alt);
  color: var(--text);
  font-size: 0.9rem;
  transition:
    border-color var(--dur-rapida) ease,
    box-shadow var(--dur-rapida) ease;

  &::placeholder {
    color: rgba($text-muted, 0.6);
  }

  &:focus {
    outline: none;
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba($primary, 0.16);
  }

  &.is-error {
    border-color: $alert-error;
  }
}

textarea {
  resize: vertical;
  min-height: 6rem;
}

select {
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #{$primary} 50%),
    linear-gradient(135deg, #{$primary} 50%, transparent 50%);
  background-position:
    calc(100% - 1.1rem) 1.15rem,
    calc(100% - 0.75rem) 1.15rem;
  background-size: 6px 6px;
  background-repeat: no-repeat;
  padding-right: 2.25rem;
}

.checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
  cursor: pointer;

  input {
    width: 1.1rem;
    height: 1.1rem;
    margin-top: 0.15rem;
    flex-shrink: 0;
    accent-color: $primary;
  }

  &.is-error span {
    color: $alert-error;
  }
}
</style>
