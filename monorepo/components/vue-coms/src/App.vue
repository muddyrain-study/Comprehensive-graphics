<template>
  <div>
    <div class="row">
      <duyi-button>默认</duyi-button>
      <duyi-button type="primary">primary</duyi-button>
      <duyi-button type="success">success</duyi-button>
      <duyi-button type="info">info</duyi-button>
      <duyi-button type="danger">danger</duyi-button>
      <duyi-button type="warning">wraning</duyi-button>
    </div>
    <div class="row">
      <duyi-button plain>默认</duyi-button>
      <duyi-button plain type="primary">primary</duyi-button>
      <duyi-button plain type="success">success</duyi-button>
      <duyi-button plain type="info">info</duyi-button>
      <duyi-button plain type="danger">danger</duyi-button>
      <duyi-button plain type="warning">wraning</duyi-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 800px;
  margin: 50px auto;
}
</style>
