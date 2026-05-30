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
    <div id="user-card" class="card">

        <h4>{{ qis!.device_type }}</h4>
        <p>ID: {{ qis!.device_id }}</p>
        <p>Location: {{ qis!.location }}</p>
        <p>Quality Index: {{ qis!.quality_index }}</p>


    </div>
</li>
</template>
<style lang="css" scoped>
#user-card:hover {
    cursor: pointer;
    background-color: #f0f0f0;
}

#user-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: white;
}

.card {
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

li {
    list-style: none;
    width: 100%;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
}
</style>
