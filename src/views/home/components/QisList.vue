<script lang="ts" setup>
import { qisController } from '@/controllers/app-controller';
import { ref } from 'vue';

const qisList = ref(qisController.value);
</script>
<template>
<div>
    <ul>
        <li v-for="qis in qisList">
            {{ qis.client_id }}
            {{ qis.start_time }}
            {{ qis.end_time }}
        </li>
    </ul>
</div>
</template>
<style lang="css" scoped></style>
