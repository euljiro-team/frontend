<template>
    <div>
        <el-dialog
            :visible.sync="isShowInsertMetaModal"
            :before-close="handleClose"
        >
            <span>hi popup</span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    methods: {
        handleClose: function() {
            this.$emit('close:meta-save', false);
        }
    }
}
</script>

<style>

</style>