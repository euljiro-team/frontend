<template>
  <div>
    <v-data-table
      :headers="metaHeader"
      :items="metaItems"
      item-key="word"
      class="elevation-1"
    >
    </v-data-table>
    <v-btn @click="getMetaItems">조회</v-btn>
    <!-- <v-btn @click="insertMetaItem">등록</v-btn>
    <meta-save
    :popup-val="isShowInsertMetaModal"
    @close:meta-save="popupClose"
    /> -->
  </div>
</template>

<script>
import metaSave from './MetaSave.vue'

export default {
    data : function () {
    return {
         metaItems : [],
         isShowInsertMetaModal : false
        }
    },
    computed : {
            metaHeader () {
                return [
                {text : '단어' , value : 'word'},
                {text : '코멘트' , value : 'comments'},
                {text : '최초생성자' , value : 'fstCrtId'},
                {text : '최초생성일' , value : 'fstCrtDt'},
                {text : '최종수정자' , value : 'lstMdfId'},
                {text : '최종수정일' , value : 'lstMdfDt'},
            ]
        }
    },
    methods : {
        getMetaItems : function () {
            var vm = this;
            this.axios.get('/api/meta')
            .then(res=>{
                console.log(res.data);
                this.metaItems = res.data;

            }).catch(err=>{
                console.log(err);
            });
        },
        insertMetaItem : function () { // 등록 팝업을 보여줄지 말지
            this.isShowInsertMetaModal = !this.isShowInsertMetaModal;
            alert(this.isShowInsertMetaModal)
        }
    },
    components : {
        'meta-save' : metaSave
    }
}
</script>

<style>

</style>
