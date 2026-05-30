<script lang="ts" setup>
import { qisController } from '@/controllers/app-controller';
import { User } from '@/models/user-model';
import QisCard from './QisCard.vue';

const props = defineProps<{ user: User | undefined }>();


</script>
<template>
<h2>QIS History</h2>
<div v-if="props.user">
    <ul v-for="qis in qisController[props.user?._id.toString()]!.quality_indexes">
        <QisCard :qis="qis" />
    </ul>
</div>
<div v-else>
    <p>Please select user to view your QIS history.</p>
</div>
</template>
<style lang="css" scoped>
ul {
    padding: 0 16px 0 16px;
}
</style>
