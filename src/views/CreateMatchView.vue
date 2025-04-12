<template>
    <div class="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 class="mb-4">Add Match Details</h1>
        <form class="w-25" @submit.prevent="save">

            <Input type="text" placeholder="Match Name" v-model:value="matchName" />
            <Input type="text" placeholder="Match Organizer Name" v-model:value="matchOrganizer" />
            <Input type="file" placeholder="Match Logo" @change="onFileChange" />
            
            <hr />
            
            <h2 class="mb-4">Add Teams Details</h2>
            
            <div class="row">
                <div class="col-6">
                <Input type="text" placeholder="First Team's Name" v-model:value="firstTeamName" />
                <Input type="color" placeholder="Team Color" v-model:value="firstTeamColor" value="#ff0000" />
            </div>
            
            <div class="col-6">
                <Input type="text" placeholder="Second Team's Name" v-model:value="secondTeamName" />
                <Input type="color" placeholder="Team Color" v-model:value="secondTeamColor" value="#0000ff" />
            </div>
            </div>

            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useMatchStore } from '@/stores/useMatchStore';
    import Input from '../components/form/Input.vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const matchStore = useMatchStore();
    const matchName = ref('');
    const matchLogo = ref(null);
    const firstTeamName = ref('');
    const secondTeamName = ref('');
    const firstTeamColor = ref('');
    const secondTeamColor = ref('');
    const matchOrganizer = ref('');

    function onFileChange(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            matchLogo.value = file;
        }
        else {
            matchLogo.value = null;
        }
    }

    function save() {

        const formData = new FormData();
        formData.append('name', matchName.value);
        formData.append('logo', matchLogo.value);
        formData.append('firstTeamName', firstTeamName.value);
        formData.append('organizer', matchOrganizer.value);
        formData.append('secondTeamName', secondTeamName.value);
        formData.append('firstTeamColor', firstTeamColor.value);
        formData.append('secondTeamColor', secondTeamColor.value);
        formData.append('firstTeamScore', 0);
        formData.append('secondTeamScore', 0);
        
        matchStore.createMatch(formData);
    }

    matchStore.$onAction(({ name, after }) => {
        if (name === 'createMatch') {
            after(() => {
                console.log({ name: 'scoreboard', params: { id: matchStore.getLastMatchId, admin: '1' } });
                
                // router.push({ name: 'scoreboard', params: { id: matchStore.getLastMatchId, admin: '1' } });
            });
        }
    });
</script>