<template>
  <div class="app-container">
    <!-- <el-upload
      class="upload-demo"
      action="https://data.jesport.com/filecenter/image/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      name="img"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <el-upload
      class="avatar-uploader"
      action="https://data.jesport.com/filecenter/image/upload"
      :show-file-list="false"
      name='img'
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload> -->
    <el-row>
      <div class="borderItem">
        <div class="item-title">
            <span class="name"><i class="el-icon-menu" /> 相关文档</span>
        </div>
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="docname"
                label="文件"
                width="180">
            </el-table-column>
            <el-table-column
                prop="ver"
                label="版本"
                width="180">
            </el-table-column>
            <el-table-column
                prop="size"
                label="大小">
            </el-table-column>
            <el-table-column
                prop="download"
                label="下载">
                <template slot-scope="scope">
                    <el-button  type="text" size="small"><a :download="scope.row.docname" :href="'https://rate.iasac.org.cn/judgeAdmin/docs/'+scope.row.filename">中文版</a></el-button>
                    <!-- <el-button  type="text" size="small"><a download="pic" href="https://game.gtimg.cn/images/lol/act/a20190702loltftwf/zb-box.png">英文版</a></el-button> -->
                </template>
            </el-table-column>
            <el-table-column
                prop="info"
                label="说明">
            </el-table-column>
        </el-table>
      </div>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default{
  data(){
    return {
      imageUrl:'',
      tableData: [
        {
          "docname": "一星必要项目检查表",
          "ver": "1.0",
          "size": "18.59KB",
          "info": "由星评员打印后进行检查，检查完毕签字后上传至平台。",
          "filename": "一星必要项目检查表V1.0.docx"
        },
        {
          "docname": "二星必要项目检查表",
          "ver": "1.0",
          "size": "18.77KB",
          "info": "由星评员打印后进行检查，检查完毕签字后上传至平台。",
          "filename": "二星必要项目检查表V1.0.docx"
        },
        {
          "docname": "三星必要项目检查表",
          "ver": "1.0",
          "size": "19.87KB",
          "info": "由星评员打印后进行检查，检查完毕签字后上传至平台。",
          "filename": "三星必要项目检查表V1.0.docx"
        },
        {
          "docname": "四星必要项目检查表",
          "ver": "1.0",
          "size": "20.84KB",
          "info": "由星评员打印后进行检查，检查完毕签字后上传至平台。",
          "filename": "四星必要项目检查表V1.0.docx"
        },
        {
          "docname": "五星必要项目检查表",
          "ver": "1.0",
          "size": "21.12KB",
          "info": "由星评员打印后进行检查，检查完毕签字后上传至平台。",
          "filename": "五星必要项目检查表V1.0.docx"
        },
        {
          "docname": "管理能力评分检查表",
          "ver": "1.0",
          "size": "18.9KB",
          "info": "由星评员打印后进行检查，检查完毕签字后上传至平台。",
          "filename": "管理能力评分检查表V1.0.docx"
        },
        {
          "docname": "场所环境评分检查表",
          "ver": "1.0",
          "size": "39.17KB",
          "info": "由星评员打印后进行检查，检查完毕签字后上传至平台。",
          "filename": "场所环境评分检查表V1.0.docx"
        },
        {
          "docname": "服务质量评分检查表",
          "ver": "1.0",
          "size": "21.42KB",
          "info": "由星评员打印后进行检查，检查完毕签字后上传至平台。",
          "filename": "服务质量评分检查表V1.0.docx"
        },
        {
          "docname": "业主协议",
          "ver": "1.0",
          "size": "55KB",
          "info": "业主参与评级需要同意的协议，请仔细阅读。",
          "filename": "业主协议V1.0.doc"
        },
          {
          "docname": "实施办法手册",
          "ver": "2.0",
          "size": "2306KB",
          "info": "本评级的具体实施方法。",
          "filename": "实施办法手册V2.0 20190325.doc"
        }
      ]
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created(){
    axios('https://rate.iasac.org.cn/judgeAdmin/docs/json.json').then(res=>{
      if(res){
        this.tableData=res;
      }
    })
  },
  methods: {
    beforeAvatarUpload(){
      console.log('beforeAvatarUpload');
    },
    handleAvatarSuccess(res,file){
      this.imageUrl=res.errMsg
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>
<style lang="scss" scoped>
 .borderItem{
    background-color: #ffffff;
    margin: 10px auto;
    border-radius:5px;
    padding:20px ;
    .item-title{
        line-height: 30px;
        // padding: 20px;
        display: flex;
        justify-content: space-between;
        color: cornflowerblue;
        font-size: 14px;
        .name{
            font-weight: bold;
            color: #071830;
            font-size: 18px;
        }
        span:nth-child(2){
            cursor: pointer;
        }
    }
  }
</style>