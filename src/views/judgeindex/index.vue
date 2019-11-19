<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ memberInfo.name }}</div> -->
    <div class="page-title">
      <div class="left">星评成员管理</div>
    </div>
    <div style="padding:10px;">
      <div class="add" style="margin-bottom:20px;">
        <el-button type="primary" size="mini" v-if='role_id>3' @click="handleAdd()">新增成员</el-button>
      </div>
      <el-table
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        v-loading="listLoading"
        empty-text='无数据'
        >
        <el-table-column label="姓名" prop="id" sortable="custom" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职务"  align="center">
          <template slot-scope="scope">
            <span>{{ roletype[scope.row.role_id]  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="待处理"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.pending_num  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="处理中" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.working_num  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已超时" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.timeout_num  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已处理"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.finish_num  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDel(row,'deleted')">
              解除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close='closedialog'>
      <el-form ref="dataForm"   label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="权限" prop="选择权限">
          <el-radio-group v-model="selsctroles" size="medium">
            <el-radio  label="1" border >星评员</el-radio>
            <el-radio  label="2" border >管理员</el-radio>
          </el-radio-group>
        </el-form-item>
         <el-form-item label="成员" prop="选择成员">
          <el-input  @focus="memlistshow=true"  clearable :disabled='ischose' style="position:relative" :placeholder="choseMember.name?'':'请点击选择成员'"/>
          <div style='position:absolute;left:20px;top:0;width:100%' v-show='ischose'>
            <span>已选择 {{choseMember.name}}-{{choseMember.mobile}}</span>
            <el-button icon="el-icon-close" size='mini' circle @click="delchoseItem()" v-if="dialogStatus=='create'"></el-button>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer left">
        <el-button @click="dialogFormVisible= false">
          取消
        </el-button>
        <el-button type="primary" @click="createData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <Memberchose :dialogFormVisible='memlistshow'  @closedialog='closeMemberdialog' @dialogchoseMember='dialogchoseMember'></Memberchose>
  </div>
</template>

<script>
import Memberchose from '@/components/Memberchose'

export default {
  name: 'Myspace',
  data() {
    return {
      role_id:this.$store.state.user.role_id,
      dialogFormVisible:false,
      dialogStatus: '',
      textMap: {
        update: '修改星评员权限',
        create: '添加星评员'
      },
      memberSeach:'',
      memberSeach2:'',
      selsctroles:'',
      memlistshow:false,
      memlist:[],
      choseMember:{},
      ischose:false,
      isOnfocus: false,
      listLoading:false,
      list:[],
      roletype:this.roletype
    }
  },
  components:{Memberchose},
  watch:{},
  created (){
    this.getbaseInfo();
  },
  methods: {
    dialogchoseMember(data){
      window.console.log(data);
      if(data.mobile!=''){
        this.choseMember=data;
        this.ischose=true;
      }
      this.memlistshow = false;
    },
    closeMemberdialog(){
      this.memlistshow=false;
      this.ischose=false;
      this.choseMember={};

    },
    closedialog() {
      this.dialogFormVisible = false;
      this.selsctroles='';
      this.choseMember={}
      this.memlist=[]
      this.ischose=false;
      this.isOnfocus=false;
    },
    choseItem(item){
      if(item.org_name!=''){
        this.$message.error('该用户是“'+item.org_name+'”的星评员。只有解除职务以后才可以选择')
      }else{
      this.memlistshow=false;
      this.choseMember=item;
      }
    },
    delchoseItem(){
      this.ischose=false;
      this.choseMember={};
    },
    createData(){
      var data={},url='',_this=this;
      url=this.selsctroles==1?'judge/add':'judge/admin/add';
      if(this.dialogStatus=='update'){
        url='judge/update';
        data.role_id=this.selsctroles==1?3:4;
        data.member_id=this.choseMember.member_id;
      }else{
      data.ids=this.choseMember.member_id.toString();
      }
      this.postAxios(url,data).then((res)=>{
        if(res.code==0){
          if(_this.dialogStatus=='update'){
            this.$message.success('修改成功');
            _this.getbaseInfo();
            _this.closedialog();
          }else{
            if(res.data){
              this.$message.info('没有改动');
              return false
            }
            if(res.id_success.length){
              this.$message.success('添加成功');
              this.getbaseInfo();
              this.closedialog()
            }
            if(res.id_works.length){
              this.$message.warning('已经存在');
              this.closedialog()
            }
          }
         
        }else{
          this.$message.error(res.msg)
        }
      } )
    },
    handleAdd(){
      this.dialogStatus = 'create';
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      console.log(row)
      this.choseMember=row;
      this.selsctroles= row.role_id==3?'1':'2';
      this.ischose=true;
      this.dialogStatus = 'update';
      this.dialogFormVisible = true
    },
    handleDel(row){
      var _this=this;
      let str=row.name?row.name:'未命名'+'('+row.mobile+')'
       this.$confirm('确定要将 '+str+' 从本星评委中移除么', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postAxios('org/work/remove',{judge_id:row.member_id}).then(res=>{
            if(res.code==0){
              this.$message({
                type: 'success',
                message: '已删除',
                onClose:function(){
                  _this.getbaseInfo();
                }
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    getbaseInfo(){
      this.postAxios('judge/list').then(res=>{
          if(res.code==0){
            this.list=res.judge_list
          }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    .page-title{
      margin-bottom: 30px;
      font-weight:bolder;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  
}
</style>
