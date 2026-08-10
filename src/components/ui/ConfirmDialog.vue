<script setup lang="ts">
/** Host de confirmaciones. Se monta una sola vez en App.vue. */
import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'
import { useModal } from '@/composables/useModal'

const { confirmacion, hayConfirmacion, responderConfirmacion } = useModal()
</script>

<template>
  <BaseModal
    :abierto="hayConfirmacion"
    :titulo="confirmacion?.titulo"
    :descripcion="confirmacion?.mensaje"
    :icono="confirmacion?.icono"
    ancho="sm"
    @cerrar="responderConfirmacion(false)"
  >
    <template #pie>
      <BaseButton variante="fantasma" @click="responderConfirmacion(false)">
        {{ confirmacion?.textoCancelar }}
      </BaseButton>
      <BaseButton
        :variante="confirmacion?.tono === 'danger' ? 'peligro' : 'dorado'"
        @click="responderConfirmacion(true)"
      >
        {{ confirmacion?.textoConfirmar }}
      </BaseButton>
    </template>
  </BaseModal>
</template>
