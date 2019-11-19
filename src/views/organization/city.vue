<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ memberInfo.name }}</div> -->
    <div class="page-title">
      <div class="left">{{titleName}}市级管理</div>
    </div>
    <div class="item-content">
      <div class="add" style="margin-bottom:20px">
        <el-button type="primary" size="mini" @click="handleAddcity()">新增市星评委</el-button>
        <!-- <el-button type="primary" size="mini" @click="handleAdd()">新增城市</el-button> -->
      </div>
      <el-table
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        empty-text='无数据'
        >
        <el-table-column label="负责人"  align="center">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="职务"  align="center">
          <template slot-scope="scope">
            <span>{{scope.row.admin_name?scope.row.admin_name:'无名字'}}({{ scope.row.admin_mobile}})</span>
          </template>
        </el-table-column>
        <el-table-column label="负责地区"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.regions  }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleEdit(row)">修改</el-button>
            <!-- <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDel(row,'deleted')">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    


    <el-dialog :title='titleDir[handleType]' :model="dialoginfo" :rules="rules" ref="dialoginfo" :visible.sync="dialogFormVisible2" center :before-close='closedialogInfo' >
      <el-form ref="dialoginfo" :model="dialoginfo" :rules="rules"  label-position="right" label-width="100px" style="width: 100%; margin:0 auto;">
        <el-form-item label="名称" prop="name" aria-required="名称">
          <el-input v-model="dialoginfo.name"  clearable :disabled='dialoginfo.ischangeNmae' placeholder='请输入名称' />
        </el-form-item>
        <el-form-item label="主要负责人" prop="选择成员">
          <el-input v-model="dialoginfo.judge_name" @focus="MemberchoseVisible=true" :placeholder="choseMember.name?'':'请点击选择负责人'"  clearable :disabled='ischose' style="position:relative"/>
          <div style='position:absolute;left:20px;top:0;width:100%' v-show='ischose'>
            <span>已选择 {{choseMember.name}}-{{choseMember.mobile}}</span>
            <el-button icon="el-icon-close" size='mini' circle @click="delchoseItem()"></el-button>
          </div>
        </el-form-item>
        <el-form-item label="负责城市" prop="负责城市">
          <el-button  size="mini" v-for="(item,index) in dialoginfo.region_name" :key="index">{{item}}</el-button>
          <el-button icon="el-icon-edit" circle size="mini" @click='dialogFormVisible3=true'></el-button>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer left">
        <el-button @click="closedialogInfo">
          取消
        </el-button>
        <el-button type="primary" @click="handleUpdate">
          确认
        </el-button>
      </div>
    </el-dialog>
    <!-- 选择省份 -->
    <el-dialog title="选择城市" :visible.sync="dialogFormVisible3" >
      <el-scrollbar style="height:600px;">
        <el-tree
          ref='tree'
          :data="provinceList"
          show-checkbox
          node-key="id"
          :default-checked-keys="parentids"
          >
          <div class="custom-tree-node" slot-scope="{ node, data }" >
            <span style="flex:1;" >{{ data.name}}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click="()=>{append(node,data)}" v-if='data.children'>
                展开
              </el-button>
            </span>
          </div>
        </el-tree>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer left">
        <el-button @click="dialogFormVisible3=false">
          取消
        </el-button>
        <el-button type="primary" @click="provinceChose">
          确认
        </el-button>
      </div>
    </el-dialog>
    <Memberchose :dialogFormVisible='MemberchoseVisible' :dialogStatus='memberTitle'  @closedialog='closedialog' @dialogchoseMember='dialogchoseMember'></Memberchose>
  </div>
</template>

<script>
import Memberchose from '@/components/Memberchose'
export default {
  name: 'Myspace',
  data() {
    return {
      titleName:this.$store.state.user.org_name,
      rules:{
        name:[{required: true, message: '请输入名称', trigger: 'blur'}]
      },
      ischose:false,
      MemberchoseVisible:false,
      dialogFormVisible2:false,
      dialogFormVisible3:false,
      defaultProps: {
          children: 'children',
          label: 'name'
        },
      dialoginfo:{
        ischangeNmae:false,
        name:'',
        judge_name:'',
        org_id:'',
        region_ids:[],
        region_name:[],
        judge_id:''
      },
      parentids:[],
      choseCityid:[],
      choseCityname:[],
      memberTitle: 'create',
      handleType:'',
      titleDir:{
        create:'创建市级星评委',
        updata:'修改市级星评委',
      },
      memlistshow:true,
      provinceList:[],
      cityList:[],
      provinceList2:[],
      choseMember:{},
      isOnfocus: false,
      list:[],

    }
  },
  components:{Memberchose},
  watch:{
  },
  computed:{
    getName(){
      var list=this.provinceList,namelist=[],idslist=this.dialoginfo.region_ids;
      if(list.length>0&&idslist.length>0){
        list.forEach(item => {
          var  itemid=item.id;
          idslist.forEach(item2=>{
            if(item2==itemid){
              namelist.push(item.name);
            }
          })
        });
      }
      return namelist;
    }
  },
  created(){
    sessionStorage.setItem("routesInfo", true);
    this.getbaseInfo();
    this.getProvince();
  },
  methods: {
    closedialogInfo(){
      this.dialoginfo={
        ischangeNmae:false,
        name:'',
        judge_name:'',
        org_id:'',
        region_ids:[],
        region_name:[]
      }
      this.ischose=false;
      this.$refs.dialoginfo.resetFields();
      this.$refs.tree?this.$refs.tree.setCheckedKeys([]):false;
      this.dialogFormVisible2=false;
    },
    dialogchoseMember(data){
      console.log(data);
      if(data.mobile!=''){
        this.choseMember=data;
        this.ischose=true;
        this.dialoginfo.judge_name=''
        this.dialoginfo.judge_id=data.member_id;
      }
      this.MemberchoseVisible = false;
    },
    closedialog(){
      this.MemberchoseVisible = false;
    },
    delchoseItem (){
      this.choseMember={};
      this.ischose=false;
    },
    provinceChose(){
      console.log(this.$refs.tree.getCheckedNodes())
      var list=this.$refs.tree.getCheckedNodes();
      var nameList=[],idList=[],arrs=[];
      list.forEach(function(item){
        if(!item.children){
          arrs.push(item)
          nameList.push(item.name);
          idList.push(item.id);
        }
      })
      this.dialoginfo.region_ids=idList;
      this.dialoginfo.region_name=nameList;
      this.dialogFormVisible3=false;
      console.log(arrs);
      
    },
    handleEdit(row){
      var that=this;
      this.handleType='updata';
      this.editItem=row;
      console.log(row)
      this.dialoginfo.ischangeNmae=true;
      this.dialoginfo.judge_name=row.admin_name?row.admin_name:'未填写name';
      this.dialoginfo.name=row.name
      this.dialoginfo.region_ids=(row.region_ids).split(",");
      this.dialoginfo.region_name=row.regions.split(",");
      this.dialoginfo.judge_id=row.admin_id;
      this.dialoginfo.org_id=row.org_id;
      this.parentids[0]=row.parent_province_id;
      console.log(this.parentids)
      this.dialogFormVisible2=true;
    },
    handleAdd (){
      this.handleType='create';
      this.dialogFormVisible2 = true
    },
    handleAddcity(){
      this.handleType='create';
      this.dialogFormVisible2 = true
    },
    append(node,data) {
      console.log(data);
      this.postAxios('common/city/list',{ids:data.id.toString()}).then(res=>{
        if(res.code==0){
          var list=res.data.region_list
          this.$set(data, 'children', list);
        }
      })
    },
    handleUpdate() {
      var that=this;
      var data={},url='';
      data.name=this.dialoginfo.name;
      data.region_ids=this.dialoginfo.region_ids.join(',');
      data.judge_id=this.choseMember.member_id;
      if(this.handleType == 'create'){
        url='org/city/add';
      }else{
        url='org/city/update';
        data.org_id=this.dialoginfo.org_id;
      }
      console.log(data);
      console.log(url);
      this.postAxios(url,data).then(res=>{
        if(res.code==0){
          that.$message({
            duration:2000,
            message: '添加成功',
            type: 'success',
            onClose:function(){
              location.reload();
            }
          })
        }else{
          that.$message({
            type:'error',
            message:res.msg
          })
        }
      })
    },
    handleDel(row){
      let str=row.name?row.name:'未命名'+'('+row.mobile+')'
       this.$confirm('确定要将 '+str+' 从本星评委中移除么', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    getbaseInfo(){
      var data={
        "netbar_id":0,
        rank:2
      }
      this.postAxios('org/list',data).then(res=>{
          if(res.code==0){
            this.list=res.org_list;
          }
      })
    },
    getProvince(){
      this.postAxios('common/province/list',{}).then(res=>{
        if(res.code==0){
          var list=res.data.region_list;
          list.forEach(function(item){
            item.children=[];
          })
          this.provinceList=list;
        }
      })
    },
    getCity(id){
      this.postAxios('common/city/list',{ids:id.toString()}).then(res=>{
        if(res.code==0){
          return res.data.region_list;
        }
      })
    }
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
    .item-content{
      padding: 20px;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  
}
.custom-tree-node{
    width:100%;
    padding-right: 10px;
    display:flex;
    justify-content:space-between;
    align-items: center;
  }
</style>
