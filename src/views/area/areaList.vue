<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="编号">
        <template slot-scope="scope">{{ scope.row.areaCode }}</template>
      </el-table-column>
      <el-table-column label="名称" width="110" align="center">
        <template slot-scope="scope">
          <router-link :to="{ name: 'areaList', params: {pId: scope.row.areaCode}}">{{ scope.row.areaName }}</router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序值" width="200">
        <template slot-scope="scope">{{ scope.row.orderBy }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="remove(scope.row.appId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { areaList } from '@/api/area/areaInfo'

export default {
  name: 'AreaList',
  data() {
    return {
      pId: this.$route.params.pId,
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      areaList(this.pId).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
