<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="mmbrshps"
      item-key="mmbrshpSrno"
      class="elevation-1"
      :hide-default-footer=true
    >
    <template v-slot:item.chkYn="{item}">
        <v-btn color="yellow" @click="slctMmbrshp(item.mmbrshpSrno)">선택</v-btn>
    </template>

    </v-data-table>
  </div>
</template>
  
  
  
  </v-data-table>
</div>
</template>

<script>
export default {
    data : function () {
        return {
            mmbrshps : [
                {
                    userDcd : '회원',
                    mmbrshpDcd : '3개월',
                    offc : '영등포지점',
                    offcNm : '슬릭부스트' , 
                    workDcd : '크로스핏',
                    chkYn : false,
                    mmbrshpSrno : '123'
                },
                {
                    userDcd : '회원',
                    mmbrshpDcd : '12개월',
                    offc : '마포역지점',
                    offcNm : '인어스' , 
                    workDcd : '헬스장',
                    chkYn : false,
                    mmbrshpSrno : '1234'
                },
                {
                    userDcd : '강사',
                    mmbrshpDcd : '24개월',
                    offc : '여의도지점',
                    offcNm : 'f45' , 
                    workDcd : '크로스핏',
                    chkYn : false,
                    mmbrshpSrno : '125'
                }
            ]
        }
    } ,
    computed : {
        headers () {
            return [
                {text : '회원구분' , value: 'userDcd'},
                {text : '회원권 기간' , value: 'mmbrshpDcd'},
                {text : '지역구분' , value: 'offc'},
                {text : '지점명' , value: 'offcNm'},
                {text : '회원권종류' , value: 'workDcd'},
                {text : '선택여부' , value: 'chkYn'},
            ]
        }
    },
    methods : {
        slctMmbrshp : function (mmbrshpSrno) {
            this.$router.push({name : 'enrolclasses' , params : { mmbrshpSrno : mmbrshpSrno }}); // 수업 예약 탭으로 이동한다.
            alert("회원권 일련번호 : " + mmbrshpSrno + " 의 회원권 선택 완료");
        }
    }
}
</script>

<style>

</style>