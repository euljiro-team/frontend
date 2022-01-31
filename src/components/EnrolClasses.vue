<template>
    <body>
        <!-- <p> 
            멤버십 페이지에서 받아온 데이터 우선 여기 뿌려준다.
            &nbsp;
            {{ $route.params.list }}
        </p> -->
        <!-- <p> {{this.mmbrshpInfo}}</p> -->
        <ul>
            <li v-for="(classItem, index) in classes" v-bind:key="classItem">
                {{classItem[0]}} {{classItem[1]}} {{classItem[2]}} {{classItem[3]}} {{classItem[4]}} {{classItem[5]}}
                <span class="rsvBtn" v-on:click="rsvClass(index)">
                    <i class="far fa-check-square"></i>
                </span>
            </li> 
        </ul>

    </body>
</template>

<script>
export default {
    data : function () {
        return {
            classes : [
                ['08:00','50', '크로스핏1', '10' , '1',false],
                ['09:00','50', '크로스핏2', '10' , '2',false],
                ['10:00','50', '크로스핏3', '10' , '5',false],
                ['11:00','50', '크로스핏4', '10' , '2',false],
                ['12:00','50', '크로스핏5', '10' , '5',false],
                ['17:00','50', '크로스핏6', '10' , '4',false]
            ] ,
            mmbrshpInfo : this.$route.params.list
        }
    }, 

    methods : {
     rsvClass : function(index){
        this.classes[index][5] = !this.classes[index][5];
        if(this.classes[index][5]){
            this.classes[index][4]++;
        }else{
            this.classes[index][4]--;
        }
        alert("수업명 : " + this.classes[index][2] + "\n 예약인원 : " + this.classes[index][4] + "\n 예약여부 : " + this.classes[index][5]);

        if(this.classes[index][5]){
            alert("수업이 예약되었습니다.");
        }else{
            alert("예약이 취소되었습니다.");
        }

    }
    }
}
</script>

<style>
</style>