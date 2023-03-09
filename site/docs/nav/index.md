---
layoutClass: m-nav-layout
---

<script setup>
import MNavLinks from './components/MNavLinks.vue'
import { NAV_DATA } from './data.ts'
</script>

<style src="./index.scss"></style>

# 前端导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>
