<template>
  <area-detail :is-edit="true" />
</template>

<script>
import AreaDetail from './studentDetail'

export default {
  name: 'EditForm',
  components: { AreaDetail }
}
</script>
