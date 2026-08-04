<script setup lang="ts">
import { computed, ref } from "vue";
import QisCard from "./QisCard.vue";
import type { QualityIndex } from "@/models/quality-index";

const props = defineProps<{
    items: QualityIndex[];
}>();

const current = ref(0);

const total = computed(() => props.items.length);

function next() {
    if (current.value < total.value - 1) {
        current.value++;
    }
}

function previous() {
    if (current.value > 0) {
        current.value--;
    }
}

function goTo(index: number) {
    current.value = index;
}
</script>

<template>
    <div class="column">
        <div class="carousel">

            <button class="nav" @click="previous" :disabled="current === 0">
                ‹
            </button>
            <button class="nav" @click="next" :disabled="current === total - 1">
                ›
            </button>
        </div>
        <div class="viewport">
            <ul class="track" :style="{
                transform: `translateX(-${current * 100}%)`
            }">
                <li class="slide" v-for="qi in props.items!">
                    <div class="reading-header">
                        <div class="reading-date">
                            Start time: <br />
                            {{ new Date(qi.start_time).toLocaleString() }}
                        </div>

                        <div class="reading-date">
                            End time: <br />
                            {{ new Date(qi.end_time).toLocaleString() }}
                        </div>
                    </div>

                    <QisCard v-for="qis in qi.quality_indexes" :key="qis.device_id" :qis="qis" />
                </li>
            </ul>
        </div>
        <div class="dots">
            <button v-for="(_, index) in items" :key="index" class="dot" :class="{ active: current === index }"
                @click="goTo(index)" />
        </div>
    </div>
</template>

<style scoped>
.carousel {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
}

.viewport {
    overflow: hidden;
    flex: 1;
}

.track {
    display: flex;
    transition: transform 0.3s ease;
    padding: 0;
    margin: 0;
}

.slide {
    min-width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.nav {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    cursor: pointer;
    font-size: 20px;
}

.nav:disabled {
    opacity: 0.35;
    cursor: default;
}

.dots {
    margin-top: 12px;
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
    gap: 8px;

}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    background: var(--color-border);
    cursor: pointer;
}

.dot.active {
    background: var(--color-primary);
}

.reading-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    padding: 12px 16px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
}

.reading-date {
    font-weight: 600;
    font-size: 1rem;
    text-align: center;
}
</style>
