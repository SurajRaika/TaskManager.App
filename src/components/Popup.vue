<script setup>
import { useLayoutStore } from "../stores/Layout";
const storeLayout=useLayoutStore()
</script>
<template >
    <Teleport to="body">
        <div id="Popup" @click.self="storeLayout.HidePopup()"  class="backdrop-blur-sx fixed top-0 left-0  w-full h-screen  z-10  flex justify-center items-center"  v-show="storeLayout.Popup">
          <div class="PopupWidth bg-blue-800">
            {{}}
          </div>
        </div>
    </Teleport>

</template>
<style>
    .PopupWidth{
        /* min-width: 60%; */
        width:min(90%,900px);
        width:max(80%,250px);
        /* width: clamp(90%, 70% , 70%); */
        height: 20rem;
    }
</style>

