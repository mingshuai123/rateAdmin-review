<template>
  <div class="mytask-container">
    <div class="page-title">
      <div class="left">{{name}}</div>
    </div>
     <!-- <el-alert style="margin-bottom:10px;" title="测试提示" type="error"></el-alert> -->
    <div class="mytaskitem">
      <!-- <div class="item-title"><span class="name"><i class="el-icon-menu" />我的任务</span></div> -->
      <el-row type='flex' justify='space-around' class="rowcenter item-content" >
        <el-col :span="5" @click.native='taskClick(1)'>
          <el-card shadow="hover" :body-style="{background:'#409EFF',color:'#fff',fontSize:'14px',cursor: 'pointer'}">
            <div style="font-size:24px">{{pendingList.page.total}}</div>
            <div><br/>待处理任务</div>
          </el-card>
        </el-col>
        <el-col :span="5" @click.native='taskClick(2)'>
          <el-card shadow="hover" :body-style="{background:'#E6A23C',color:'#fff',fontSize:'14px',cursor: 'pointer'}">
            <div style="font-size:24px">{{mytask.finish_cnt}}</div>
            <div><br/>已处理任务</div>
          </el-card>
        </el-col>
        <el-col :span="5" @click.native='taskClick(3)'>
          <el-card shadow="hover" :body-style="{background:'#F56C6C',color:'#fff',fontSize:'14px',cursor: 'pointer'}">
            <div style="font-size:24px">{{mytask.org_cnt}}</div>
            <div><br/>部门任务</div>
          </el-card>
        </el-col>
        <el-col :span="5" @click.native='taskClick(4)'>
          <el-card shadow="hover" :body-style="{background:'#67C23A',color:'#fff',fontSize:'14px',cursor: 'pointer'}">
            <div style="font-size:24px">{{newList.page.total}}</div>
            <div><br/>全部任务</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="mytaskitem">
      <div class="item-title">
        <span class="name"><i class="el-icon-menu" />待处理任务</span>
        <el-button type="primary" size='small' round @click='taskClick(1)'>查看全部</el-button>
      </div>
      <div class="item-content">
        <div style="margin:10px">待处理任务 共计 {{pendingList.page.total}}条</div>
        <el-table :data="pendingList.list" style="width: 100%;margin" v-loading='tableLoading' border stripe empty-text='无数据'>
          <el-table-column prop="netbar_name" label="任务" width='260' align='center'></el-table-column>
          <el-table-column label="申请星级" align='center'>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.recommend_star?scope.row.recommend_star:scope.row.apply_star }}</span>
            </template>
          </el-table-column>
          <el-table-column label="任务状态" align='center'>
            <template slot-scope="scope">
              {{scope.row.judgeName?scope.row.judgeName:'--'}}
            </template>
          </el-table-column>
          <el-table-column  label="开始时间" align='center'>
            <template slot-scope="scope">
              {{scope.row.created?scope.row.created:'--'}}
            </template>
          </el-table-column>
          <el-table-column label="当事人" align='center'>
            <template slot-scope="scope">
              {{scope.row.judge_name?scope.row.judge_name:'--'}}
            </template>
          </el-table-column>
          <el-table-column prop="stateName" label="评审状态" align='center'></el-table-column>
          <el-table-column label="操作时间" align='center'>
            <template slot-scope="scope">
              {{scope.row.is_me?scope.row.operation_time:'--'}}
            </template>
          </el-table-column>
          <el-table-column label="完成时间" align='center'>
            <template slot-scope="scope">
              {{scope.row.is_me?scope.row.finish_time:'--'}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="mytaskitem">
      <div class="item-title">
        <span class="name"><i class="el-icon-menu" />最新任务</span>
        <!-- <el-button type="primary" size='small' round @click='taskClick()'>查看全部</el-button> -->
      </div>
      <div class="item-content">
        <div style="margin:10px">最新任务 共计 {{newList.page.total}}条</div>
        <el-table :data="newList.list" style="width: 100%" border stripe empty-text='无数据'>
          <el-table-column prop="netbar_name" label="任务" width='260' align='center'></el-table-column>
          <el-table-column label="申请星级" align='center'>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.recommend_star?scope.row.recommend_star:scope.row.apply_star }}</span>
            </template>
          </el-table-column>
          <el-table-column label="任务状态" align='center'>
            <template slot-scope="scope">
              {{scope.row.judgeName?scope.row.judgeName:'--'}}
            </template>
          </el-table-column>
          <el-table-column label="开始时间" align='center'>
            <template slot-scope="scope">
              {{scope.row.created?scope.row.created:'--'}}
            </template>
          </el-table-column>
          <el-table-column label="当事人" align='center'>
            <template slot-scope="scope">
              {{scope.row.judge_name?scope.row.judge_name:'--'}}
            </template>
          </el-table-column>
          <el-table-column prop="stateName" label="评审状态" align='center'></el-table-column>
          <el-table-column label="操作时间" align='center'>
            <template slot-scope="scope">
              {{scope.row.is_me?scope.row.operation_time:'--'}}
            </template>
          </el-table-column>
          <el-table-column label="完成时间" align='center'>
            <template slot-scope="scope">
              {{scope.row.is_me?scope.row.finish_time:'--'}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      
    </div>
  </div>
</template>

<script>
import { roleName } from '@/utils/validate'
import { getList } from '@/api/user'

export default {
  name: 'Mytask',
  data() {
    return {
      tableLoading:false,
      newList:{page:{},list:[]},
      pendingList:{page:{},list:[]},
      name:roleName(this.$store.state.user.roleid),
      id:'123',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        starnum:'3',
        state:'初审中',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      mytask:{},
      defineState:[
      {name:'待审核' ,list:[1]},
      {name:'待分析' ,list:[2,12,102, 19,109]},
      {name:'待分配' ,list:[5, 15, 17, 105, 1003]},
      {name:'待评审' ,list:[10, 16, 18,100,106, 108]},
      {name:'待确认' ,list:[13, 103]},
      {name:'待处理' ,list:[3,4, 11, 14, 101, 104, 1001, 1004]},
      {name:'结果分析' ,list:[107]},
      {name:'完成评级',list:[ 1000]},
    ],
    judgeName:{
      1:'未开始',
      2:'待处理',
      3:'已处理',
    }
    }
  },
  
  created(){
    this.getTask();
  },
  methods: {
    taskClick(type){
      console.log(type)
      if(type){
        this.$router.push({path:'/myTask/Mytasklist',query:{type:type}});
      }else{
        this.$router.push({path:'/myTask/Mytasklist'});
      }
    },
    handleClick(item){
      this.$router.push({path:'/myTask/taskDetail',query:{netbarid:item.netbar_id,taskid:item.task_id}})
    },
    morelist(){
      this.tableLoading=true;
      
      setTimeout(()=>{
        var list=this.tableData[0];
        this.tableData.push(list);
        this.tableLoading=false;
      },2000)
    },
    getList(scope,status){
      var data={
        page:1,
        state:status,
        scope:scope,
        search:"",
        judge_state:0,
        _comment:"state:任务状态 0:全部 1:未开始 2:待处理 3:已处理；scope:处理人 0:全部 1:个人 2:本星评委 3:下属"
      }
      this.postAxios("judge/task/list",data).then(res=>{
        if(res.code==0){
          return res
        }
      })
    },
    getTask(){
      var _this=this;
       var data={page:1,state:0,scope:2,judge_state:0,search:""},data2={page:1,state:0,scope:0,judge_state:2,search:""}
      getList(data).then(res=>{
        var newList=res.task_list;
        newList.forEach(function(item){
          item.judgeName=_this.judgeName[item.judge_state]
          _this.defineState.forEach(item2 => {
            if(item2.list.indexOf(item.state)>=0){
              item.stateName=item2.name;
            }
          });
        })
        this.newList.list=newList;
        this.newList.page=res.page;
      })
      getList(data2).then(res=>{
        var pendingList=res.task_list;
        pendingList.forEach(function(item){
          item.judgeName=_this.judgeName[item.judge_state]
          _this.defineState.forEach(item2 => {
            if(item2.list.indexOf(item.state)>=0){
              item.stateName=item2.name;
            }
          });
        })
        this.pendingList.list=pendingList;
        this.pendingList.page=res.page;
      })
      this.postAxios('judge/mytask/stat').then((res)=>{
        if(res.code==0){
          this.mytask=res.data;
        }else{
          this.$message.error(res.message);
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mytask {
  &-container {
    margin: 30px;
    .page-title{
      margin-bottom: 30px;
      font-weight:bolder;
    }
    .rowcenter{
      text-align: center;
    }
    .mytaskitem{
      padding: 20px;
      // border: 1px solid #e6e6e6;
      background: #fff;
      border-radius: 5px;
      margin-bottom: 20px;
      .item-title{
        line-height: 30px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        color: cornflowerblue;
        font-size: 14px;
        .name{
            font-weight: bold;
            color: #333333;
            font-size: 18px;
        }
      }
      .item-content{
        padding: 0 10px;
      }
    }
    
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  
}
</style>