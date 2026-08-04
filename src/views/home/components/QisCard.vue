<script lang="ts" setup>
import { selectedQis } from '@/controllers/app-controller';
import type { QualityIndexItem } from '@/models/quality-index-item';

function selectQis(b: any) {
    selectedQis.value = [props.qis]
}

const props = defineProps<{
    qis: QualityIndexItem
}>()
</script>
<template>
    <li @click="selectQis">
        <div id="user-card">
            <h4>{{ qis!.device_type }}</h4>
            <p>ID: {{ qis!.device_id }}</p>
            <p>Location: {{ qis!.location }}</p>
            <p>Quality Index: {{ qis!.quality_index }}</p>
        </div>
    </li>
</template>
<style lang="css" scoped>
li {
    list-style: none;
    width: 100%;
}

#user-card {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
    padding: 10px 14px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-surface);
    text-align: left;
    cursor: pointer;
    transition: border-color 0.15s ease, background-color 0.15s ease;
}

#user-card:hover {
    border-color: var(--color-primary);
    background-color: var(--color-primary-light);
}

#user-card h4 {
    margin: 0 0 2px 0;
    font-size: 0.9rem;
    color: var(--color-text);
}

#user-card p {
    margin: 0;
    font-size: 0.8rem;
    color: var(--color-text-muted);
}
</style>
