<script lang="ts" setup>
import { qisController } from '@/controllers/app-controller';
import { User } from '@/models/user-model';
import QisCard from './QisCard.vue';

const props = defineProps<{ user: User | undefined }>();


</script>
<template>
<div id="qis-list">
    <h2>History</h2>
    <div v-if="props.user">
        <ul v-for="qis in qisController[props.user?._id.toString()]!.quality_indexes">
            <QisCard :qis="qis" />
        </ul>
    </div>
    <p class="empty-hint" v-else>Please select a user to view your QIS history.</p>
</div>
</template>
<style lang="css" scoped>
#qis-list {
    text-align: left;
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
}

#qis-list h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-text-muted);
    margin-bottom: 12px;
}

#qis-list .empty-hint {
    font-size: 0.85rem;
    color: var(--color-text-muted);
}

ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0;
    margin: 0;
}
</style>
