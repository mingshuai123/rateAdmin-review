<template>
    <div class="detail-container" v-loading.fullscreen.lock="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="page-title">
        <div class="left"><i class="el-icon-bell" /> 场所详情</div>
        </div>
        <el-row :gutter="0" >
            <el-col :span="10" class='mainItem' >
                <div class="borderItem">
                    <div class="item-title">
                        <span class="name"><i class="el-icon-menu" /> 操作</span>
                        <el-tooltip class="item" effect="dark" placement="right-start" v-if='state==1'>
                            <div slot="content">收到了该场所的评级申请：<br/>•分配：您可以选择将场所任务“分配”给星评员进行线下审核。<br/>• 拒绝：如果发现问题，请点“拒绝”。<br/>• 推荐星级</div>
                            <span><i class="el-icon-question" />操作说明</span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" placement="right-start" v-if='state==2||state==17'>
                            <div slot="content">收到了该场所的评级申请：<br/>•分配：您可以选择将场所任务“分配”给星评员进行线下审核。<br/>• 拒绝：如果发现问题，请点“拒绝”。<br/>• 推荐星级</div>
                            <span><i class="el-icon-question" />操作说明</span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" placement="right-start" v-if='state==10||state==100'>
                            <div slot="content">您被分配该场所评审任务，请联系场所负责人安排线下评审时间。评审时，请<br/>携带打分表。评审完毕后，点击“评分”，将分数提交到平台<br/>搁置：如果无法联系、或者要推荐申请其他星级，请点击搁置</div>
                            <span><i class="el-icon-question" />操作说明</span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" placement="right-start" v-if='state==13||state==103'>
                            <div slot="content">您被分配该场所评审任务，请联系场所负责人安排线下评审时间。评审时，请<br/>携带打分表。评审完毕后，点击“评分”，将分数提交到平台。</div>
                            <span><i class="el-icon-question" />操作说明</span>
                        </el-tooltip>
                    </div>
                    <div class="item-content">
                        <div v-if='state==1'>
                            <el-button v-waves class="filter-item" type="success" icon="el-icon-success" @click="handleClick(2)"> 通   过 </el-button>
                            <el-button v-waves class="filter-item" type="danger" icon="el-icon-error" @click="handleClick(3)"> 不 通 过 </el-button>
                            <el-button v-waves class="filter-item" type="primary" icon="el-icon-warning" @click="handleClick(4)"> 无法处理 </el-button>
                        </div>
                        <div v-if='state==2'>
                            <el-button v-waves class="filter-item" type="success" icon="el-icon-success" @click="handleClick(5)"> 分   配 </el-button>
                            <el-button v-waves class="filter-item" type="danger" icon="el-icon-error" @click="handleClick(6)"> 不 通 过 </el-button>
                        </div>
                        <div v-if='(state==5)&& role_id!=1'>
                            <el-button v-waves class="filter-item" type="success" icon="el-icon-success" @click="handleClick(10)"> 分   配 </el-button>
                            <el-button v-waves class="filter-item" type="danger" icon="el-icon-error" @click="handleClick(11)"> 不 通 过 </el-button>
                            <el-button v-waves class="filter-item" type="warning" icon="el-icon-warning" @click="handleClick(12)"> 推荐星级 </el-button>
                        </div>
                        <div v-if='(state == 10||state==18) && role_id!=1'>
                            <el-button v-waves class="filter-item" type="success" icon="el-icon-success" @click="handleClick(13)"> 审核通过 </el-button>
                            <el-button v-waves class="filter-item" type="danger" icon="el-icon-error" @click="handleClick(14)"> 审核不通过 </el-button>
                            <el-button v-waves class="filter-item" type="warning" icon="el-icon-warning" @click="handleClick(15)"> 搁   置 </el-button>
                            <el-button v-waves class="filter-item" type="primary" icon="el-icon-warning" @click="handleClick(16)" v-if='role_id==5'> 重新分配 </el-button>
                        </div>
                        <div v-if='state==13'>
                            <el-button v-waves class="filter-item" type="success" icon="el-icon-success" @click="handleClick(17)"> 确认结果 </el-button>
                            <el-button v-waves class="filter-item" type="danger" icon="el-icon-error" @click="handleClick(18)"> 重新审核 </el-button>
                            <el-button v-waves class="filter-item" type="warning" icon="el-icon-warning" @click="handleClick(19)"> 无法审核 </el-button>
                        </div>
                        <div v-if='state==17'>
                            <el-button v-waves class="filter-item" type="success" icon="el-icon-success" @click="handleClick(100)"> 分    配 </el-button>
                            <el-button v-waves class="filter-item" type="danger" icon="el-icon-error" @click="handleClick(101)"> 拒    绝 </el-button>
                            <el-button v-waves class="filter-item" type="warning" icon="el-icon-warning" @click="handleClick(102)"> 推荐星级 </el-button>
                        </div>
                        <div v-if='state==100'>
                            <el-button v-waves class="filter-item" type="success" icon="el-icon-success" @click="handleClick(103)"> 审核通过 </el-button>
                            <el-button v-waves class="filter-item" type="danger" icon="el-icon-error" @click="handleClick(104)"> 审核不通过 </el-button>
                            <el-button v-waves class="filter-item" type="warning" icon="el-icon-warning" @click="handleClick(105)"> 搁    置 </el-button>
                            <el-button v-waves class="filter-item" type="primary" icon="el-icon-warning" @click="handleClick(106)" v-if='role_id==5'> 重新分配 </el-button>
                        </div>
                        <div v-if='(state==5||state == 10||state == 100||state == 18) && role_id==1'>
                            <el-button v-waves class="filter-item" type="danger" icon="el-icon-warning" @click="handleClick(10000)"> 收回任务 </el-button>
                        </div>
                        <div v-if='state==103'>
                            <el-button v-waves class="filter-item" type="success" icon="el-icon-success" @click="handleClick(107)"> 确认结果 </el-button>
                            <el-button v-waves class="filter-item" type="danger" icon="el-icon-error" @click="handleClick(108)"> 重新审核 </el-button>
                            <el-button v-waves class="filter-item" type="warning" icon="el-icon-warning" @click="handleClick(109)"> 无法审核 </el-button>
                        </div>
                        <div v-if='state==107'>
                            <el-button v-waves class="filter-item" type="success" icon="el-icon-success" @click="handleClick(1000)"> 通   过 </el-button>
                            <el-button v-waves class="filter-item" type="danger" icon="el-icon-error" @click="handleClick(1001)"> 不 通 过 </el-button>
                        </div>
                        <div v-if='state==1000'>
                            <el-button v-waves class="filter-item" type="success" icon="el-icon-success" @click="handleClick(1003)"> 重    审 </el-button>
                        </div>
                        <!-- 不通过 -->
                        <!-- <div v-if='state==3'>
                            <el-button v-waves class="filter-item" type="success" icon="el-icon-success" @click="handleClick(5)"> 分   配 </el-button>
                            <el-button v-waves class="filter-item" type="danger" icon="el-icon-error" @click="handleClick(6)"> 不 通 过 </el-button>
                        </div> -->
                        <!-- 无法处理 -->
                        <div v-if='role_id==1&(state==4||state==3)'>
                            <el-button v-waves class="filter-item" type="primary" icon="el-icon-success" @click="handleClick(1006)" v-if='netbarInfo.apply_star>3'> 重新初评 </el-button>
                            <el-button v-waves class="filter-item" type="primary" icon="el-icon-error" @click="handleClick(1006)" v-else> 重新复评 </el-button>
                            <el-button v-waves class="filter-item" type="primary" icon="el-icon-warning" @click="handleClick(1002)"> 资料重审 </el-button>
                            <el-button v-waves class="filter-item" type="primary" icon="el-icon-warning" @click="handleClick(1004)"> 关闭申请 </el-button>
                        </div>
                        <div v-if="role_id!=1&(state==4||state==3)">
                            无操作
                        </div>
                        <!-- 重新开放 -->
                        <div v-if="state==1004">
                            <el-button v-waves class="filter-item" type="success" icon="el-icon-success" @click="handleClick(1005)"> 重新开放 </el-button>
                        </div>
                                               
                    </div>
                </div>
                <!-- 填写评分 -->
                <div class="borderItem" v-if='state==10 ||state==100'>
                    <div class="item-title"><span class="name"><i class="el-icon-menu" /> 填写评分</span></div>
                    <div style="margin:10px auto;padding:0 10px">
                        <router-link :to="{path:'/myTask/statDetail',query: { netbarid: netbar_id }}">
                        <el-button v-waves class="filter-item" type="primary"> 填写评分 </el-button>
                        </router-link>
                        <!-- <router-link :to="{path:'/myTask/statDetail',query: { netbarid: netbar_id }}">
                        <el-button v-waves class="filter-item" type="primary" icon="el-icon-error" > 修改评分 </el-button>
                        </router-link> -->
                    </div>
                </div>
                
                <div class="borderItem" v-if="state>10 || state=='A' ||state=='B'">
                    <div class="item-title">
                        <span class="name"><i class="el-icon-menu" /> 查看评分</span>
                        <!-- <span><i class="el-icon-question" />操作说明</span> -->
                    </div>
                    <div style="margin:10px auto;padding:0 10px;">
                        <router-link :to="{path:'/myTask/statDetail',query: { netbarid: netbar_id }}" v-if='state==13||state==17||state==103||state==107||state==1004'>
                            <el-button v-waves class="filter-item" type="success"  > 查看初评评分 </el-button>
                        </router-link>
                        <router-link :to="{path:'/myTask/statDetail',query: { netbarid: netbar_id }}" v-else>
                        <el-button v-waves class="filter-item" type="danger" @click="handleClick()" > 复评评分 </el-button>
                        </router-link>
                        <router-link :to="{path:'/myTask/statDetail',query: { netbarid: netbar_id }}" v-if='state==103||state==107||state==1004'>
                            <el-button v-waves class="filter-item"> 查看复评评分 </el-button>
                        </router-link>
                    </div>
                </div>
                <!-- 服务评分 -->
                <div class="borderItem">
                    <div class="item-title">
                        <span class="name"><i class="el-icon-menu" /> 服务评分</span>
                        <el-tooltip class="item" effect="dark" placement="right-start" v-if='state==1'>
                            <div slot="content">每年提供相应活动<br/>10次及以上得3分<br/>5次及以上得2分<br/>3次及以上得1分<br/>3次以下得0分</div>
                            <span><i class="el-icon-question" />说明</span>
                        </el-tooltip>
                    </div>
                    <div class="item-content">
                        <el-button v-waves class="filter-item" type="success" @click="handlehistory(1)">公共文化服务</el-button>
                        <el-button v-waves class="filter-item" type="danger" @click="handlehistory(2)">企业文化培训</el-button>
                        <el-button v-waves class="filter-item" type="primary" @click="handlehistory(3)">赛事活动服务</el-button>
                    </div>
                </div>
                <!-- 星评员备注 -->
                <div class="borderItem">
                    <div class="item-title"><span class="name"><i class="el-icon-tickets" /> 星评员备注</span><span @click='commentVisible=!commentVisible'><i class="el-icon-edit" />写备注</span></div>
                    <div class="remark y-scroll2" v-if='commentlist.length>0'>
                        <div class="item" v-for='(item,index) in commentlist' :key='index'>
                            <div class="avatar"><img src="@/assets/page_images/avatar.png" alt=""></div>
                            <div class="itemmain">
                                <div class="top"><span>{{item.judge_name}} {{item.org_name}}</span><span class="date">{{item.created}}</span></div>
                                <div class="remarkcontent">{{item.memo}}</div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="item-content">暂无记录</div>
                </div>
                <!-- 历史记录 -->
                <div class="borderItem">
                    <div class="item-title"><span class="name"><i class="el-icon-menu" /> 评级历史记录</span></div>
                    <div class="y-scroll" v-if='activities.length>0'>
                     <el-timeline >
                        <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :color="index==0?'#409EFF':'none'"
                        :timestamp="activity.created"
                        placement="top"
                        >
                        <el-card>
                        <h4>操作人:{{activity.operator}} </h4>
                        <p>{{activity.memo}}</p>

                        </el-card>
                        </el-timeline-item>
                    </el-timeline>
                    </div>
                    <dir v-else>暂无记录</dir>
                </div>
            </el-col>
            <el-col :span="14" class="mainItem">
                <!-- 当前状态 -->
                <div class="borderItem">
                    <div class="item-title"><span class="name"><i class="el-icon-menu" />当前状态</span></div>
                    <div class="item-content">
                        <el-form :inline="true" class="item-content" size='mini'>
                            <el-form-item  style="width:40%">
                                <span scope='label' style='font-weight:bold;'>状态 : </span>
                                <span>{{stateInfo.state_title}}</span>
                            </el-form-item>
                            <el-form-item  style="width:40%">
                                <span scope='label' style='font-weight:bold;'>星评委 : </span>
                                <span>{{stateInfo.org_name?stateInfo.org_name:"未分配"}}</span>
                            </el-form-item>
                            <el-form-item style="width:40%">
                                <span scope='label' style='font-weight:bold;'>星级 : </span>
                                <span>{{num[stateInfo.star]}}星</span>
                            </el-form-item>
                            <el-form-item style="width:40%">
                                <span scope='label' style='font-weight:bold;'>处理人 : </span>
                                <span>{{stateInfo.operator?stateInfo.operator:'未分配'}}</span>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                
                <div class="borderItem">
                    <div class="item-title"><span class="name"><i class="el-icon-menu" /> 场所资料</span></div>
                    <div class="spaceInfo">
                        <div class="space-title" style="margin:10px 0;"><i class="el-icon-location" /> {{netbarInfo.name}}</div>
                        <el-carousel :interval="4000"  height="300px" indicator-position='none' >
                            <el-carousel-item v-for="(item,index) in imgList" :key="index">
                                <img :src="item" alt="" style="width:100%;margin:0 auto;" @click="handlePictureCardPreview(item)"/>
                            </el-carousel-item>
                        </el-carousel>

                        <el-form :inline="true">
                            <el-form-item label="机位数量" style="width:65%;margin-bottom:10px;">
                                <span>{{netbarInfo.mnum_option_name}}</span>
                            </el-form-item>
                            <el-form-item label="联系人"  style="width:30%;margin-bottom:10px;">
                                <span>{{netbarInfo.linkman}}</span>
                            </el-form-item>
                            <el-form-item label="场所面积" style="width:65%;margin-bottom:10px;">
                                <span>{{netbarInfo.area_option_name}}</span>
                            </el-form-item>
                            <el-form-item label="联系电话" style="width:30%;margin-bottom:10px;">
                                <span>{{netbarInfo.tel}}</span>
                            </el-form-item>
                            <el-form-item label="场所地址" style="width:100%;margin-bottom:10px;">
                                <span>{{netbarInfo.addr}}</span>
                            </el-form-item>
                        </el-form>
                        <div>
                            <div class="images-container">
                                <div class="item">
                                    <img class="pic-404__parent" :src="netbarInfo.license_img" alt="file"  @click="handlePictureCardPreview(netbarInfo.license_img)">
                                    <div class="name">营业执照</div>
                                </div>
                                <div class="item">
                                    <img class="pic-404__parent" :src="netbarInfo.fire_img" alt="file" @click="handlePictureCardPreview(netbarInfo.fire_img)">
                                    <div class="name">消防验收合格证</div>
                                </div>
                                <div class="item">
                                    <img class="pic-404__parent" :src="netbarInfo.permission_img" alt="file" @click="handlePictureCardPreview(netbarInfo.permission_img)">
                                    <div class="name">网络文化经营许可证</div>
                                </div>
                                <div class="item">
                                    <img class="pic-404__parent" :src="netbarInfo.building_flat_img" alt="file" @click="handlePictureCardPreview(netbarInfo.building_flat_img)">
                                    <div class="name">场所平面图</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </el-col>
        </el-row>
        <Audit :dialogFormVisible='auditShow' :auditTitle='netbarInfo.name' :star='stateInfo.star' :type='auditStatus' :netbar_id='netbar_id' @closeAuditdialog='closeAuditdialog'></Audit>
        <!-- 添加备注 -->
        <el-dialog :visible.sync="commentVisible" title='添加备注'>
            <el-form label-position="top" label-width="100px" style="width: 400px; margin-left:50px;">
                <el-form-item label="备注：" >
                    <el-input type="textarea" v-model="commentForm.memo" :rows="7"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer right">
                <el-button @click="commentVisible=!commentVisible">取消</el-button>
                <el-button type="primary" @click="submitCommont()">确认</el-button>
            </div>
        </el-dialog>
        <!-- 展示图片 -->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <!-- 历史图片 -->
        <el-dialog :visible.sync="dialogVisible2"  title="历史图片" style="margin-top: -8vh;">
            <div style="font-weight:bold;">得分 {{score}} 分</div>
          <div style="max-height:800px;overflow:hidden;overflow-y:auto;">
            <div v-for="(item,index) in historyPics" :key='index'>
              <img width="auto" :src="item" alt="">
            </div>
            <div class="nodata" v-if='historyPics.length==0'>未上传图片</div>
          </div>
          
        </el-dialog>
    </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Audit from '@/components/Popup/audit.vue'
const define={0:'开始',1:'待审核',2:'待分析',3:'待分配(初评)',4:'待评审(初评)',5:'待确认(初评)',6:'待分配(复评)',7:'待评审(复评)',8:'待确认(复评)',9:'结果分析',10:'完成',A:'待处理',B:'关闭评审'}
export default {
  name: 'Detail',
  directives: { waves },
  components:{Audit},
  data() {
    return {
        role_id:this.$store.state.user.role_id,
        define,
        state:'',
        taskid:'',
        num:['未选择','一','二','三','四','五'],
        netbar_id:'',
        loading:false,
        activities: [],
        netbarInfo:{},
        imgList:[],
        stateInfo:{},
        auditStatus:0,
        auditShow:false,
        commentlist:[],
        commentVisible:false,
        commentForm:{
            memo:''
        },
        dialogImageUrl:'',
        dialogVisible:false,
        dialogVisible2:false,
        historyPic:{},
        score:0,
        historyPics:[],
    }
  },
  created(){
      var data=(this.$route.query)
      this.netbar_id=Number(data.netbarid);
      this.taskid=Number(data.taskid);
      this.getNetbarInfo();
      this.getHistoryPic();
  },
  methods: {
    handlePictureCardPreview(url) {
        this.dialogImageUrl = url;
        this.dialogVisible = true;
    },
    async handleClick(type){
        console.log(this.state)
        console.log(this.role_id);
        if(this.state!=1&&this.role_id==2){
            this.$message.error("无操作权限")
            return false;
        }else if((this.state==5||this.state==100) && this.role_id==1 && type!=10000){
            this.$message.error("无操作权限")
            return false;
        }else if(this.state==10 && this.role_id==3 && type!=10000){
            this.$message.error("请先填写评分")
            return false;
        }else if((this.state==107||this.state==1000) && this.role_id!=1){
            this.$message.error("无操作权限")
            return false;
        }else{
            this.auditStatus=type;
            await this.auditShowfun();
        }
    },
    auditShowfun(){
        this.auditShow=true;
    },
    submitCommont(){
        var that=this;
        var data=this.commentForm;
        data.netbar_id=this.netbar_id;
        this.postAxios('common/netbar/remark/add',data).then(res=>{
            if(res.code==0){
                this.$message({
                    duration:1000,
                    type:'success',
                    message:'添加成功',
                    onClose:function(){
                        that.getCommentList();
                        that.commentVisible=false;
                    }
                })
            }
        })
    },
    getNetbarInfo(){
        // 场所信息
        this.postAxios('common/netbar/info',{netbar_id:this.netbar_id}).then(res=>{
            this.netbarInfo=res.info
            this.netbarInfo.mnum_option_name=res.info.mnum_option_name.replace(/可以提供服务的机位/g,'');
            var list=[];
            for(let x=1;x<6;x++){
                if(res.info['building_img'+x]!=''){
                    list.push(res.info['building_img'+x])
                }
            }
            this.imgList=list;
        })
        // 场所评级历史记录
        this.postAxios('common/progress/list',{netbar_id:this.netbar_id}).then(res=>{
            if(res.code==0){
                this.activities=res.data.history_list;
            }
        })
        // 评级状态
        this.postAxios('common/task/info',{member_id:this.$store.state.user.member_id,task_id:this.taskid}).then(res=>{
            if(res.code==0){
                this.stateInfo=res.info
                this.state=res.info.state;
            }
        })
        this.getCommentList();
        
    },
    getCommentList(){
        // 备注列表
        this.postAxios('common/netbar/remark/list',{netbar_id:this.netbar_id}).then(res=>{
            if(res.code==0){
                this.commentlist=res.remark_list
            }
        })
    },
    closeAuditdialog(data){
        if(data){
            // console.log(data)
        }
        this.auditShow=false;
    },
    handlehistory(type){
        this.historyPics=this.historyPic[type].pic_list;
        this.score=this.historyPic[type].score;
        this.dialogVisible2=true;
    },
    getHistoryPic(){
        this.postAxios('judge/upgrade/service/list',{netbar_id:this.netbar_id}).then(res=>{
            if(res.code==0){
                this.historyPic=res.data;
            }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  &-container {
    padding: 10px;
    .page-title{
        font-size: 18px;
      line-height: 40px;
      font-weight:bolder;
    }
    .rowcenter{
    text-align: center;
    }
    .filter-item{
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
      margin-left: 10px;
      min-width:120px;
    }
    .mainItem{
        padding:5px;
        .borderItem{
            margin: 10px auto;
            // border:1px solid #99a9bf;
            background: #fff;
            border-radius:5px;
            padding:20px;
            .item-title{
                line-height: 30px;
                margin-bottom:  20px;
                display: flex;
                justify-content: space-between;
                color: cornflowerblue;
                font-size: 14px;
                .name{
                    font-weight: bold;
                    color: #333333;
                    font-size: 18px;
                }
                span:last-child{
                    cursor: pointer;
                }
            }
            .item-content{
                padding: 0 15px;
            }
            .remark{
                margin:20px auto;
                .item{
                    display: flex;
                    padding: 20px 0;
                    border-bottom:1px solid #e5e5e5;
                    &:last-child {
                        border-bottom: none;
                    }
                    .avatar{
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        overflow: hidden;
                        border: 1px solid #868686;
                        margin-right: 10px;
                        img{
                            width: 100%;
                            height: auto;
                        }
                    }
                    .itemmain{
                        flex: 1;
                        .top{
                            display: flex;
                            justify-content: space-between;
                            font-size: 12px;
                            color: #409EFF;
                            .date{
                                color: #868686;
                            }
                        }
                        .remarkcontent{
                            margin-top: 5px;
                        }
                    }
                }
                
            }
            .spaceInfo{
                padding: 0 20px;
                .el-carousel__item h3 {
                    color: #475669;
                    font-size: 14px;
                    opacity: 0.75;
                    line-height: 200px;
                    margin: 0;
                }
                
                .el-carousel__item:nth-child(2n) {
                    background-color: #99a9bf;
                }
                
                .el-carousel__item:nth-child(2n+1) {
                    background-color: #d3dce6;
                }

                .images-container,.name-container{
                    display: flex;
                    align-content: center;
                    justify-content: space-around;
                    .item{
                        flex: 1;
                        margin: 0 10px;
                        img{
                            width: 100%;
                            height: auto;
                        }
                        .name{
                            margin-top: 10px;
                            text-align: center;
                        }
                    }
                    
                }
            }
        }
        .y-scroll{
            padding:20px 0;
            height:620px;
            overflow-y:auto;
        }
        .y-scroll::-webkit-scrollbar{
            display: none;
        }
        .y-scroll2{
            max-height:600px;
            padding: 0 10px;
            overflow-y:auto;
        }
        .y-scroll2::-webkit-scrollbar{
            display: none;
        }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  .nodata{
      margin: 20px;
  }
}
</style>