<template>
  <button class="vp-button" :class="buttonStyle"><slot /></button>
</template>

<script lang="ts" setup>
import "./style/index.scss";
import { computed } from "vue";
defineOptions({ name: "vp-button" });
type ButtonProps = {
  type?: string;
};
const buttonProps = defineProps<ButtonProps>();

const buttonStyle = computed(() => {
  return { [`vp-button--${buttonProps.type}`]: buttonProps.type };
});
</script>
