<script setup lang="ts">
import { userController, currentUser } from '@/controllers/app-controller'
import type { User } from '@/models/user-model'
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const accountRef = ref<HTMLElement | null>(null)

const palette = ['#0d9488', '#2563eb', '#7c3aed', '#db2777', '#ea580c', '#65a30d']

function initials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return '?'
    return parts
        .slice(0, 2)
        .map((p) => p[0].toUpperCase())
        .join('')
}

function colorFor(id: string): string {
    let hash = 0
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0
    return palette[hash % palette.length]
}

function isCurrent(user: User): boolean {
    return currentUser.value?._id.toString() === user._id.toString()
}

function selectUser(user: User) {
    currentUser.value = user
    isOpen.value = false
}

function toggle() {
    isOpen.value = !isOpen.value
}

function onClickOutside(e: MouseEvent) {
    if (accountRef.value && !accountRef.value.contains(e.target as Node)) {
        isOpen.value = false
    }
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>

<template>
    <header id="app-header">
        <div class="brand">
            <span class="brand-dot"></span>
            <span>Quality Monitor</span>
        </div>

        <div class="account" ref="accountRef">
            <button type="button" class="account-trigger" @click="toggle">
                <span
                    class="avatar"
                    :style="{ backgroundColor: currentUser ? colorFor(currentUser._id.toString()) : '#94a3b8' }"
                >
                    {{ currentUser ? initials(currentUser.name) : '?' }}
                </span>
                <span class="account-name">{{ currentUser ? currentUser.name : 'Select account' }}</span>
                <svg class="chevron" :class="{ open: isOpen }" viewBox="0 0 12 8" width="12" height="8">
                    <path
                        d="M1 1l5 5 5-5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>

            <div v-if="isOpen" class="dropdown">
                <p class="dropdown-label">Switch account</p>
                <ul>
                    <li
                        v-for="user in userController"
                        :key="user._id.toString()"
                        class="dropdown-item"
                        :class="{ active: isCurrent(user) }"
                        @click="selectUser(user)"
                    >
                        <span class="avatar" :style="{ backgroundColor: colorFor(user._id.toString()) }">
                            {{ initials(user.name) }}
                        </span>
                        <span class="dropdown-text">
                            <span class="dropdown-name">{{ user.name }}</span>
                            <span class="dropdown-email">{{ user.email }}</span>
                        </span>
                        <svg v-if="isCurrent(user)" class="check" viewBox="0 0 16 16" width="16" height="16">
                            <path
                                d="M3 8l3.5 3.5L13 4.5"
                                stroke="currentColor"
                                stroke-width="1.6"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </li>
                    <li v-if="userController.length === 0" class="dropdown-empty">No users available</li>
                </ul>
            </div>
        </div>
    </header>
</template>

<style scoped>
#app-header {
    height: 64px;
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
}

.brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--color-text);
}

.brand-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--color-primary);
}

.account {
    position: relative;
}

.account-trigger {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 10px;
    border: 1px solid transparent;
    border-radius: 999px;
    background: none;
    cursor: pointer;
    font-family: var(--font-sans);
    transition: background-color 0.15s ease, border-color 0.15s ease;
}

.account-trigger:hover {
    background-color: var(--color-bg);
    border-color: var(--color-border);
}

.avatar {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 600;
}

.account-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text);
}

.chevron {
    color: var(--color-text-muted);
    transition: transform 0.15s ease;
}

.chevron.open {
    transform: rotate(180deg);
}

.dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 280px;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    overflow: hidden;
    z-index: 20;
}

.dropdown-label {
    margin: 0;
    padding: 12px 16px 8px 16px;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-text-muted);
    text-align: left;
}

.dropdown ul {
    list-style: none;
    margin: 0;
    padding: 0 6px 6px 6px;
    max-height: 320px;
    overflow-y: auto;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: var(--radius-md);
    cursor: pointer;
    text-align: left;
}

.dropdown-item:hover {
    background-color: var(--color-bg);
}

.dropdown-item.active {
    background-color: var(--color-primary-light);
}

.dropdown-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1;
}

.dropdown-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dropdown-email {
    font-size: 0.78rem;
    color: var(--color-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.check {
    flex-shrink: 0;
    color: var(--color-primary);
}

.dropdown-empty {
    padding: 12px 16px;
    font-size: 0.85rem;
    color: var(--color-text-muted);
}
</style>
