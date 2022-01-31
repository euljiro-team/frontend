<template>
  <div>
      <ul>
        <li v-for="(noticeItem , index) in noticeList" v-bind:key="noticeItem">
                {{ index + " " +noticeItem}}
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data: function () {
        return {
            noticeList : [
                [ '영등포지점' , '슬릭부스트' , '작성자' , '2021-12-31' , '설연휴 안쉽니다.' ] ,
                [ '마포지점' , '인어스', '윤가영' , '2022-02-01' , '설연휴 쉽니다' ]
            ] 
        }
    }

}
</script>

<style>

</style>