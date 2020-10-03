<template>
  <div class="app-container">
    <el-form ref="formDetail" class="form-inline" :model="postForm" label-width="100px" label-position="left">
      <el-form-item label="类别：">
        <el-select v-model="postForm.cateCode" value-key="cateCode">
          <el-option v-for="item in cateList" :key="item.cateCode" :label="item.codeTitle" :value="item.cateCode" />
        </el-select>
      </el-form-item>
      <el-form-item label="标题：">
        <el-input v-model="postForm.title" maxlength="50" />
      </el-form-item>
      <el-form-item label="内容类型：">
        <el-select v-model="postForm.cntType" value-key="code">
          <el-option v-for="item in cntTypeList" :key="item.code" :label="item.title" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="显示目标：">
        <el-select v-model="postForm.target" value-key="code">
          <el-option v-for="item in targetList" :key="item.code" :label="item.title" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="连接地址：">
        <el-input v-model="postForm.href" maxlength="300" />
      </el-form-item>
      <el-form-item label="图片：">
        <el-upload
          ref="upload"
          class="el-upload"
          action="/image/upload"
          :accept="acceptFileType"
          :limit="1"
          :on-exceed="handleImage"
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">浏览</el-button>
          <div slot="tip" class="el-upload__tip">只能上传图片，且不超过1M</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editItem">确定</el-button>
        <el-button @click="console">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { bannerCatePageList } from '@/api/banner/bannerCate'
import { bannerInfoFindById, bannerInfoCreate, bannerInfoUpdate } from '@/api/banner/bannerInfo'

const cntTypeList = [
  { code: 'pic', title: '图片' },
  { code: 'video', title: '视频' }
]

const targetList = [
  { code: 'all', title: '全部' },
  { code: 'wechat', title: '微信小程序' },
  { code: 'app', title: 'app' }
]

export default {
  name: 'Detail',
  data() {
    return {
      cateList: [],
      codeTitle: '',
      upLoading: false,
      cntTypeList: cntTypeList,
      targetList: targetList,
      acceptFileType: '.jgp',
      fileList: [],
      postForm: {
        id: this.$route.params.id,
        cateCode: '',
        cntType: 'pic',
        coverImage: '',
        target: 'all'
      }
    }
  },
  created() {
    this.getBannerCateList()
    if (this.postForm.id) {
      this.findItem()
    }
  },
  methods: {
    handleImage(files, fileList) {
      this.$refs.upload.clearFiles()
    },
    handleRemove(file, fileList) {
      console.log(file)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeUpload(file) {
      const fileName = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (fileName !== 'jpg') {
        this.$message({
          type: 'error',
          showClose: true,
          duration: 3000,
          message: '文件类型不是图片文件'
        })
        return false
      }
      const fileSize = file.size
      console.log(fileSize)
      if (fileSize > 1048576) {
        this.$message({
          type: 'error',
          showClose: true,
          duration: 3000,
          message: '文件不能大于1M'
        })
        return false
      }
    },
    getBannerCateList() {
      const cateItem = {
        pageIndex: 1,
        pageSize: 50
      }
      bannerCatePageList(cateItem).then(res => {
        this.cateList = res.data
        this.postForm.cateCode = this.cateList[0].cateCode
      })
    },
    findItem() {
      bannerInfoFindById(this.postForm.name, this.postForm.id).then(res => {
        this.postForm.bookName = res.data.bookName
        this.postForm.shortName = res.data.shortName
        this.postForm.verId = res.data.verId
        this.postForm.theYear = res.data.theYear
        this.postForm.coverImage = res.data.coverImage
        this.postForm.cipImage = res.data.cipImage
        this.postForm.volume = res.data.volume
        this.postForm.elective = res.data.elective
        this.postForm.gradeId = res.data.gradeId
      })
    },
    editItem() {
      this.listLoading = true
      const bookInfo = {
        bookId: this.postForm.id,
        bookName: this.postForm.bookName,
        shortName: this.postForm.shortName,
        version: this.postForm.verId,
        theYear: this.postForm.theYear,
        coverImage: this.postForm.coverImage,
        cipImage: this.postForm.cipImage,
        volume: this.postForm.volume,
        elective: this.postForm.elective,
        subjectId: this.postForm.subjectId,
        gradeId: this.postForm.gradeId
      }
      if (!this.postForm.id) {
        console.log(bookInfo)
        bannerInfoCreate(bookInfo).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/book/bookList' })
        })
      } else {
        bannerInfoUpdate(bookInfo).then(() => {
          this.listLoading = false
          this.$message.success('操作成功!')
          this.$router.push({ path: '/book/bookList' })
        })
      }
    },
    console() {
      this.$router.push({ path: '/book/bookList' })
    }
  }
}
</script>

<style scoped lang="scss">
  .form-inline{
    width: 30%;
    .el-input {
      width:80%;
    }
    .el-select{
      width:80%;
      margin-right: 10px;
    }
  }
</style>
