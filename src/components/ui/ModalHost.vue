<script setup lang="ts">
/** Renderiza el modal global abierto con `abrirModal()`. Se monta una vez en App.vue. */
import BaseModal from './BaseModal.vue'
import { useModal } from '@/composables/useModal'

const { modalAbierto, opcionesModal, componenteModal, cerrarModal } = useModal()
</script>

<template>
  <BaseModal
    :abierto="modalAbierto"
    :titulo="opcionesModal.titulo"
    :descripcion="opcionesModal.descripcion"
    :ancho="opcionesModal.ancho"
    :persistente="opcionesModal.persistente"
    @cerrar="cerrarModal"
  >
    <component
      :is="componenteModal"
      v-if="componenteModal"
      v-bind="opcionesModal.props"
      @cerrar="cerrarModal"
    />
  </BaseModal>
</template>
