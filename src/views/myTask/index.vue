<template>
  <div class="mytask-container">
    <div class="page-title">
      <div class="left"><i class="el-icon-bell" /> 全部任务</div>
    </div>
    <div class="mytaskitem">
      <div class="flexlabel">
        <span class="name" >任务状态</span>
        <el-radio-group class="label" v-model="searchData.judge_state" size="medium" border >
          <el-radio-button :label="0"  class="btn-radio" >全部</el-radio-button>
          <el-radio-button :label="2" class="btn-radio">待处理</el-radio-button>
          <el-radio-button :label="3" class="btn-radio">已处理</el-radio-button>
          <el-radio-button :label="1" class="btn-radio">未开始</el-radio-button>
        </el-radio-group>
      </div>
      <div class="flexlabel" >
        <span class="name">处理人</span>
        <el-radio-group class="label" v-model="searchData.scope" size="medium" border>
          <el-radio-button :label='0' class="btn-radio">全部</el-radio-button>
          <el-radio-button :label='1' class="btn-radio">个人</el-radio-button>
          <el-radio-button :label="2" class="btn-radio">本星评委</el-radio-button>
          <el-radio-button :label="3" class="btn-radio" v-if="searchData.judge_state!=1">下属辖区</el-radio-button>
          
        </el-radio-group>
      </div>
      <div class="flexlabel" >
        <span class="name">评审状态</span>
        <el-radio-group class="label" v-model="searchData.state" size="medium" border >
          <el-radio-button :label="0" class="btn-radio" >全部</el-radio-button>
          <el-radio-button :label="1" class="btn-radio">待分配（初评）</el-radio-button>
          <el-radio-button :label="2" class="btn-radio">待评审（初评）</el-radio-button>
          <el-radio-button :label="3" class="btn-radio">待确认（初评）</el-radio-button>
          <el-radio-button :label="4" class="btn-radio">待分配</el-radio-button>
          <el-radio-button :label="5" class="btn-radio">待评审</el-radio-button>
          <el-radio-button :label="6" class="btn-radio">待确认</el-radio-button>
          <el-radio-button :label="7" class="btn-radio">待审核</el-radio-button>
          <el-radio-button :label="8" class="btn-radio">待分析</el-radio-button>
          <el-radio-button :label="9" class="btn-radio">完成评级</el-radio-button>
        </el-radio-group>
      </div>
      <div class="searchbox">
        <el-input v-model="listQuery" placeholder="搜索" style="width: 75%;" class="filter-item" @keyup.enter.native="handleSeach" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSeach">搜索</el-button>
      </div>
      <el-row style="padding:10px"> 
        <div style="margin:10px auto"> 共计 {{taskPage.total}} 条</div>
        <el-table :data="taskList" style="width: 100%" border stripe empty-text='无数据'>
          <el-table-column prop="netbar_name" label="任务" width='260' align='center'></el-table-column>
          <el-table-column label="申请星级" align='center'>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.recommend_star?scope.row.recommend_star:scope.row.apply_star }}</span>
            </template>
          </el-table-column>
          <el-table-column label="任务状态" align='center'>
            <template slot-scope="scope">
              {{scope.row.is_me?scope.row.judge_state:'--'}}
              <!-- {{scope.row.judge_state}} -->
            </template>
          </el-table-column>
          <el-table-column prop="created" label="开始时间" align='center'></el-table-column>
          <el-table-column prop="judge_name" label="当事人" align='center'></el-table-column>
          <el-table-column label="评审状态" align='center'>
            <template slot-scope="scope">
              <!-- {{computeState(scope.row.state)}} -->
              {{scope.row.stateName}}
            </template>
          </el-table-column>
          <el-table-column label="操作时间" align='center'>
            <template slot-scope="scope">
              <!-- {{scope.row.is_me?scope.row.operation_time:'--'}} -->
              {{scope.row.operation_time}}
            </template>
          </el-table-column>
          <el-table-column label="完成时间" align='center'>
            <template slot-scope="scope">
              <!-- {{scope.row.is_me?scope.row.finish_time:'--'}} -->
              {{scope.row.finish_time?scope.row.finish_time:'--'}}
            </template>
          </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background style="text-align: right;" 
        :page-size=20 layout="prev, pager, next" 
        :total="taskPage.total" 
        @current-change='handleSizeChange' 
        :current-page="page">
        </el-pagination>
      </el-row>
    </div>

  </div>
</template>

<script>
import { roleName } from '@/utils/validate'
import { getList } from '@/api/user'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'Mytask',
  directives: { waves },
  data() {
    return {
      name:roleName(this.$store.state.user.roleid),
      searchData:{
        page:1,
        state:0,
        scope:-1,
        search:"",
        judge_state:0,
      },
      listQuery:'',
      page: 1,
      taskList:[],
      taskPage:{},
      showState:true,
      isQuery:false,
      defineState:[
      {name:'待审核' ,list:[1]},
      {name:'待分析' ,list:[2,12,102, 19,109]},
      {name:'待分配' ,list:[5, 15, 17, 105, 1003]},
      {name:'待评审' ,list:[10, 16, 18,100,106, 108]},
      {name:'待确认' ,list:[13, 103]},
      {name:'待处理' ,list:[3, 4, 11, 14, 101, 104, 1001, 1004]},
      {name:'结果分析' ,list:[107]},
      {name:'完成评级',list:[ 1000]},
    ],
    }
  },
  watch: {
    searchData:{
      handler(newValue, oldValue) {
        var _this=this;
        if(newValue.judge_state==1&&newValue.scope==3){
          newValue.scope=0;
        }else{
          getList(newValue).then(res=>{
            var taskList=res.task_list;
            taskList.forEach(function(item){
              _this.defineState.forEach(item2 => {
                if(item2.list.indexOf(item.state)>=0){
                  item.stateName=item2.name;
                }
              });
            })
            this.taskList=res.task_list;
            this.taskPage=res.page;
          })
        }
      },
      deep: true
    }
  },
  created(){
    let data=this.$route.query
    console.log(this.$store.state.user)
    if(data&&data.type){
      if(data.type==1){
        this.searchData.scope=1
        this.searchData.judge_state=2;
      }else if(data.type==2){
        this.showState?this.searchData.scope=1:'';
        this.searchData.judge_state=3;
      }else if(data.type==3){
        this.searchData.scope=2;
        this.searchData.judge_state=2;
      }else if(data.type==4){
        this.searchData.scope=2;
        this.searchData.judge_state=0;
      }
    }else{
      this.searchData.scope=0;
    }
  },
  methods: {
    handleSizeChange(val){
      console.log(val)
    },
    handleClick(item){
      this.$router.push({path:'/myTask/taskDetail',query:{netbarid:item.netbar_id,taskid:item.task_id}})
    },
    handleSeach(){
      this.searchData.search=this.listQuery;
    },
    
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
    .filter-item{
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
    .flexlabel{
      display: flex;
      .name{
        width:100px;
        text-align:right;
        line-height: 46px;
      }
      .label{
        flex: 1;
      }
      .btn-radio{
        margin:5px;
        border-radius: 3px;
        overflow: hidden;
        border-left:1px solid #DCDFE6;
        &:first-child{
          border-left:none;
        }
      }
    }
    .searchbox{
      width: 70%;
      margin:10px 0 0 105px;
    }
    
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  
}
</style>