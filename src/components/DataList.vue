<template>
    <div>
        <ul>
            <template v-for="item in list">
                <li>{{item.name}}</li>
            </template>
        </ul>
    </div>
</template>


<script>
    export default {
        data: function() {
            return {
            }
        },
        props: ['list']
    }
</script>

