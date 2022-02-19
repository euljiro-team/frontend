<template>
  <div class="container">
    <div class="filter-container">
      test
      <button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </button>
    </div>

    <table class="table table-dark  table-striped">
      <thead>
      <th  class="" >Title</th>
      <th  class="" >내용</th>
      </thead>
      <tbody>
      <tr v-for="row in noticeList" v-bind:key="row.noticeId">
        <td class="">{{ row.title }}</td>
        <td class="">{{ row.content }}</td>
      </tr>
      </tbody>
    </table>

<!--    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"-->
<!--                @pagination="getList"/>-->


  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import apiNotice from "@/api/modules/api-notice";
import {mapGetters} from "vuex";

export default {
  name: 'ManagerAssign',
  components: {Pagination},
  filters: {   },
  data() {
    return {
      tableKey: 0,
      total: 0,
      noticeList: [],
      listLoading: true,
      listQuery: {
        studentName: undefined,
        stat: 'ACTIVE',
        page: 1,
        size: 10,
        sort: 'createdAt'
      },
      sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
    }
  },
  computed: {
    // ...mapGetters(['app','user'])
  },
  created() {
    // this.listQuery = this.user.accountId;
  },
  async mounted() {
    this.handleFilter()
  },
  methods: {
    getList() {
      this.listLoading = true
      apiNotice.getList(this.listQuery)
        .then(response =>{
            this.noticeList = response.content
            this.total = response.totalElements
        })
        .then(() => this.listLoading = false)
        .catch(error => {console.log(error)})
        .finally(() => {console.log("end")})
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    updateData(row) {
      apiNotice.update(row)
          .then(res => {
            const index = this.noticeList.findIndex(v => v.noticeId === row.noticeId)
            this.noticeList.splice(index, 1, res)
            // this.$notify({title: 'Success',message: 'Update Successfully',type: 'success',duration: 1000})
          })
          .catch(err => console.log(err))
    },
    sortChange(data) {
      const {prop, order} = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
  }
}
</script>
