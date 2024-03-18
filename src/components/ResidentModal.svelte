<script lang="ts">
    import type { Resident } from '../types.ts';

    export let resident: Resident = null;

    export let close: () => void = () => {};
</script>

<div class="modal">
    <div class="modal-content">
        <h2>{resident?.name}</h2>
        <p>Height: {resident?.height}</p>
        <p>Mass: {resident?.mass}</p>
        <p>Hair color: {resident?.hair_color}</p>
        <p>Skin color: {resident?.skin_color}</p>
        <p>Eye color: {resident?.eye_color}</p>
        <p>Birth year: {resident?.birth_year}</p>
        <p>Gender: {resident?.gender}</p>
        <button on:click={close}>Close</button>
    </div>
</div>

<style>
    .modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.4);
    }

    .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }
</style>