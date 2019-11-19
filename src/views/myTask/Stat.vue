<template>
  <div class="stat-container" >
    <div class="page-title"><span>{{netbarInfo.name}} </span> 检查项目</div>
    <div class='toptip' v-if='statinfo.mgr_stat&&statinfo.necess_stat&&statinfo.service_stat&&statinfo.env_stat'>
      已全部填写完成前往<span @click='goback' style="color:#409EFF;cursor: pointer;">评审</span>
    </div>
    <el-tabs type="border-card" v-model="tabs">
      <!-- 必要检查项目 -->
      <el-tab-pane name='0' 
        v-loading.fullscreen="loding"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <span class="tablabel" slot="label">必要检查项目<span class="tabstate" :class="{'complete':statinfo.necess_stat}">{{statinfo.necess_stat?'已填完':'未填完'}}</span></span>
        <el-upload
        class="avatar-uploader"
        action="https://data.jesport.com/filecenter/image/upload"
        :show-file-list="false"
        name='img'
        :on-success="handleImgSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <el-tag type="success" v-if='inspect_pic.necess'>已上传</el-tag>
        </el-upload>
        <el-button size="small" type="success" v-if='inspect_pic.necess' style="float:right" @click="watchPic('necess')">查看图片</el-button>
        <div class="mainItem">
          <!-- 总体要求 -->
          <div class="borderItem">
            <div class="item-title">总体要求</div>
            <div v-for="(item,index) in inspectlist['总体要求']" :key='index' class="items">
              <div class="name">{{item.title}}</div>
              <div class="itemstate">
                <i class="el-icon-info" v-if='item.set_item_id==null'>未填写</i>
                <i class="el-icon-error" style="color:red;"  v-if='item.set_item_id!=null&&item.set_item_id==0'/>
                <i class="el-icon-success" style="color:green;"  v-if='item.set_item_id!=null && item.set_item_id==1'/>
              </div>
              <div class="button">
                <el-button size='mini' type='success' @click='handleSubmitnecess(item.item_id,1)'>通过</el-button>
                <el-button size='mini' type='danger' @click='handleSubmitnecess(item.item_id,0)'>不通过</el-button>
              </div>
            </div>
          </div>
          <!-- 场所环境与配置 -->
          <div class="borderItem">
            <div class="item-title">场所环境与配置</div>
            <div v-for="(item,index) in inspectlist['场所环境与配置']" :key='index' class="items">
              <div class="name">{{item.title}}</div>
              <div class="itemstate">
                <i class="el-icon-info" v-if='item.set_item_id==null'>未填写</i>
                <i class="el-icon-error" style="color:red;"  v-if='item.set_item_id!=null&&item.set_item_id==0'/>
                <i class="el-icon-success" style="color:green;"  v-if='item.set_item_id!=null && item.set_item_id==1'/>
              </div>
              <div class="button">
                <el-button size='mini' type='success' @click='handleSubmitnecess(item.item_id,1)'>通过</el-button>
                <el-button size='mini' type='danger' @click='handleSubmitnecess(item.item_id,0)'>不通过</el-button>
              </div>
            </div>
          </div>
          <!-- 设备硬件与软件 -->
          <div class="borderItem">
            <div class="item-title">设备硬件与软件</div>
            <div v-for="(item,index) in inspectlist['硬件与软件']" :key='index' class="items">
              <div class="name">{{item.title}}</div>
              <div class="itemstate">
                <i class="el-icon-info" v-if='item.set_item_id==null'>未填写</i>
                <i class="el-icon-error" style="color:red;"  v-if='item.set_item_id!=null&&item.set_item_id==0'/>
                <i class="el-icon-success" style="color:green;"  v-if='item.set_item_id!=null && item.set_item_id==1'/>
              </div>
              <div class="button">
                <el-button size='mini' type='success' @click='handleSubmitnecess(item.item_id,1)'>通过</el-button>
                <el-button size='mini' type='danger' @click='handleSubmitnecess(item.item_id,0)'>不通过</el-button>
              </div>
            </div>
          </div>
          <!-- 服务质量 -->
          <div class="borderItem">
            <div class="item-title">服务质量</div>
            <div v-for="(item,index) in inspectlist['服务质量']" :key='index' class="items">
              <div class="name">{{item.title}}</div>
              <div class="itemstate">
                <i class="el-icon-info" v-if='item.set_item_id==null'>未填写</i>
                <i class="el-icon-error" style="color:red;"  v-if='item.set_item_id!=null&&item.set_item_id==0'/>
                <i class="el-icon-success" style="color:green;"  v-if='item.set_item_id!=null && item.set_item_id==1'/>
              </div>
              <div class="button">
                <el-button size='mini' type='success' @click='handleSubmitnecess(item.item_id,1)'>通过</el-button>
                <el-button size='mini' type='danger' @click='handleSubmitnecess(item.item_id,0)'>不通过</el-button>
              </div>
            </div>
          </div>
          <!-- end -->
        </div>
        </el-tab-pane>
      <!-- 管理 -->
      <el-tab-pane name='228' :label="'管理能力检查'+statinfo.mgr_stat">
        <span class="tablabel" slot="label">管理能力检查<span class="tabstate" :class="{'complete':statinfo.mgr_stat}">{{statinfo.mgr_stat?'已填完':'未填完'}}</span></span>
        <el-upload
        class="avatar-uploader"
        action="https://data.jesport.com/filecenter/image/upload"
        :show-file-list="false"
        name='img'
        :on-success="handleImgSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <el-tag type="success" v-if='inspect_pic.mgr'>已上传</el-tag>
        </el-upload>
        <el-button size="small" type="success" v-if='inspect_pic.mgr' style="float:right" @click="watchPic('mgr')">查看图片</el-button>
        <div class="borderItem">
          <div class="c1title">
            <div class="name">{{manageData.title}}({{manageData.score}}分)</div>
            <div class="itemstate">得分 : {{manageData.newScore}}</div>
          </div>
          <div v-for="(xx,index2) in manageData.sub" :key='index2' :name="xx.item_id" class="content2">
            <div class="items">
              <div class="name">{{xx.title}}({{xx.score}})</div>
              <div class="itemstate">
                <span>得分 : {{xx.score}}</span>
                <el-button size='mini' :type="xx.set_item_id?'danger':'success'" @click='setScore(xx)' v-if="xx['sub'].length==0">{{xx.set_item_id?'已打分':'打分'}}</el-button>
              </div>
              
            </div>
            <div class="content3">
              <div class="items" v-for="(yy,index3) in xx['sub']" :key='index3'>
                <div class="name">{{yy.title}}({{yy.score}})</div>
                <div class="itemstate">得分 : {{yy.set_score}}</div>
                <div class="button" v-if="yy['sub'].length==0">
                  <el-button size='mini' :type="yy.set_item_id?'danger':'success'" @click='setScore(yy)'>{{yy.set_item_id?'已打分':'打分'}}</el-button>
                </div>
              </div>
            </div>
             
          </div>
         
        </div>
      </el-tab-pane>
      <!-- 环境 -->
      <el-tab-pane name='229'>
        <span class="tablabel" slot="label">现场环境检查<span class="tabstate" :class="{'complete':statinfo.env_stat}">{{statinfo.env_stat?'已填完':'未填完'}}</span></span>
        <el-upload
          class="avatar-uploader"
          action="https://data.jesport.com/filecenter/image/upload"
          :show-file-list="false"
          name='img'
          :on-success="handleImgSuccess"
          >
          <el-button size="small" type="primary">点击上传</el-button>
          <el-tag type="success" v-if='inspect_pic.env'>已上传</el-tag>
        </el-upload><el-button size="small" type="success" v-if='inspect_pic.env' style="float:right" @click="watchPic('env')">查看图片</el-button>
        
        <div v-for='(item,index) in spaceList' :key='index'  class="borderItem">
            <div class="c1title">
              <div class="name">{{item.title}}({{item.score}})</div>
              <div class="itemstate">得分 : {{item.newScore}}</div>
            </div>
            <div v-for="(xx,index2) in item['sub']" :key='index2' class="content">
                <div class="items">
                  <div class="name">{{xx.title}}({{xx.score}})</div>
                  <div class="itemstate">得分 : {{xx.newScore}}</div>
                </div>
                <div v-for="(yy,index3) in xx['sub']" :key='index3' class="content2">
                  <div class="items">
                    <div class="name">{{yy.title}}({{yy.score}})</div>
                    <div class="itemstate">得分 : {{yy.newScore}}</div>
                  </div>
                  <div>
                    <div class="content3">
                      <div class="items " v-for="(zz,index4) in yy['sub']" :key='index4'>
                        <div class="name">{{zz.title}}({{zz.score}})</div>
                        <div class="itemstate">得分 : {{zz.set_score}}</div>
                        <div class="button">
                          <el-button size='mini' :type="zz.set_item_id?'danger':'success'" @click='setScore(zz)'>{{zz.set_item_id?'已打分':'打分'}}</el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </el-tab-pane>
      <!-- 服务质量 -->
      <el-tab-pane name='230'>
        <span class="tablabel" slot="label">服务质量检查<span class="tabstate" :class="{'complete':statinfo.service_stat}">{{statinfo.service_stat?'已填完':'未填完'}}</span></span>
        <el-upload
        class="avatar-uploader"
        action="https://data.jesport.com/filecenter/image/upload"
        :show-file-list="false"
        name='img'
        :on-success="handleImgSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <el-tag type="success" v-if='inspect_pic.service'>已上传</el-tag>
        </el-upload>
        <el-button size="small" type="success" v-if='inspect_pic.service' style="float:right" @click="watchPic('service')">查看图片</el-button>
        <div class="borderItem">
          <div class="c1title">
            <div class="name">{{serveData.title}}({{serveData.score}}分)</div>
            <div class="itemstate">得分 : {{serveData.newScore}}</div>
          </div>
          <div v-for="(xx,index2) in serveData.sub" :key='index2' class="content">
              <div class="items">
                <div class="name">{{xx.title}}({{xx.score}})</div>
                <div class="itemstate">得分 : {{xx.newScore}}</div>
              </div>
              <div v-for="(yy,index3) in xx['sub']" :key='index3' class="content2">
                <div class="items">
                  <div class="name">{{yy.title}}({{yy.score}})</div>
                  <div class="itemstate">得分 : {{yy.newScore}}</div>
                  <div class="button" v-if='yy.sub.length==0'>
                    <el-button size='mini' :type="yy.set_item_id?'danger':'success'" @click='setScore(yy)'>{{yy.set_item_id?'已打分':'打分'}}</el-button>
                  </div>
                </div>
                <div v-if='yy.sub.length!=0' class="content3">
                  <div class="items" v-for="(zz,index4) in yy['sub']" :key='index4'>
                    <div class="name">{{zz.title}}({{zz.score}})</div>
                    <div class="itemstate">得分 : {{zz.set_score}}</div>
                    <div class="button">
                      <el-button size='mini' :type="zz.set_item_id?'danger':'success'" @click='setScore(zz)'>{{zz.set_item_id?'已打分':'打分'}}</el-button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 打分弹窗 -->
    <el-dialog
      title="打分"
      :visible.sync="setScorePoup"
      width="50%"
      :before-close="handleClose">
      <el-form>
        <el-form-item  label-position="top">
          <template scope-slot="title">
            <div>{{nowitem.title}}</div>
          </template>
          <el-radio-group v-model="optionsid" size='medium'>
            <el-radio border 
            v-for='(item,index) in options' 
            :key='index' 
            :label='item.id' 
            style="width:100%;margin:10px auto;">
            {{item.title}}({{item.score}}分)
            </el-radio>
          </el-radio-group>

          <!-- <el-select v-model="optionsid" placeholder="选择分数" style="width:100%">
            <el-option v-for='(item,index) in options' :key='index' :value='item.id' :label="item.title+'('+item.score+'分)'">
              <span>{{item.title}}</span><span>({{item.score}}分)</span>
            </el-option>
          </el-select> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 显示图片 -->
    <el-dialog :visible.sync="picShow">
        <img width="100%" :src="upload_pic" alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Stat',
  data() {
    return {
      loding:false,
      netbarInfo:{},
      tabs:0,
      netbar_id:0,
      mgr_stat:false,
      statinfo:{},
      inspectlist:[],
      spaceList:[],
      spaceshow:[0],
      spaceshow2:0,
      fileList:[],
      nowitem:{},
      options:[],
      optionsid:'',
      manageData:{},
      serveData:{},
      setScorePoup:false,
      upload_pic:'',
      picShow:false,
      inspect_pic:{}
    }
  },
  watch: {
    tabs:function(val){
      this.handleGetlist(val);
    }
  },
  created(){
    var data=this.$route.query;
    this.netbar_id=Number(data.netbarid);
    this.getNetbarInfo();
    this.getNetbarState();
  },
  methods:{
    watchPic(type){
      this.upload_pic=this.inspect_pic[type];
      if(this.upload_pic){
        this.picShow=true;
      }
    },
    goback(){
      this.$router.back(-1);
    },
    handleSubmitnecess(id,score){
      var data={
        type: "necess",
        sub_type: "necess",
        netbar_id: this.netbar_id,
        item_id: id,
        option_id: 0,
        score:score,
        pic:''
        }
        this.postAxios('judge/inspect/handler',data).then(res=>{
          if(res.code!=0){
            this.$message.error("无法操作");
            return false;
          }
           this.$message.success('提交成功');
            var val=this.tabs;
            this.handleGetlist(val);
        })
    },
    handleGetlist(val){
      if(val==0){
        this.getinspectlist();
      }
      if(val==229){
        this.getspaceList();
      }
      if(val==228){
        this.getmanageList();
      }
      if(val==230){
        this.getserveList();
      }
      this.getNetbarState();
    },
    handleImgSuccess(res){
      var data={
        type: "upload",
        sub_type: this.getType(),
        netbar_id: this.netbar_id,
        item_id: 0,
        option_id: 0,
        score:0,
        pic:res.errMsg
      }
      this.postAxios('judge/inspect/handler',data).then(res=>{
        if(res.code!=0){
          this.$message.error("无法操作");
          return false;
        }
        this.$message.success('提交成功');
        var val=this.tabs;
        this.handleGetlist(val);
        this.handleClose();
        
      })
    },
    getType(){
      var val= this.tabs;
      if(val==0){
        return 'necess'
      }
      if(val==228){
        return 'mgr'
      }
      if(val==230){
        return 'service'
      }
      if(val==229){
        return 'env'
      }
    },
    handleSubmit(){
      var list=this.options,data={
        type: "grade",
        sub_type: "mgr",
        netbar_id: this.netbar_id,
        item_id: this.nowitem.item_id,
        option_id: 0,
        score:0,
        pic:''
        }
      for(let item of list){
        if(item.id==this.optionsid){
          data.option_id=item.id;
          data.score=item.score;
          break;
        }
      }
      this.postAxios('judge/inspect/handler',data).then(res=>{
        if(res.code!=0){
          this.$message.error("无法操作");
          return false;
        }
        if(res.code==0){
          this.$message.success('提交成功');
          var val=this.tabs;
          this.handleGetlist(val);
          this.handleClose();
        }
      })
    },
    handleClose(){
      this.options=[];
      this.optionsid='';
      this.setScorePoup=false;
    },
    // 打分获取选项
    setScore(item){
      this.nowitem=item;
      var id=item.item_id;
      this.postAxios('judge/inspect/item/options',{item_id:id}).then(res=>{
        if(res.code==0){
          var list=res.option_list
          this.options=list;
          this.optionsid=list[0].id;
          if(item.set_score>0){
            list.forEach(element => {
              element.score==item.set_score?this.optionsid=element.id:'';
            });
          }
          this.setScorePoup=true
        }else{
          this.$message.error('无法操作')
        }
        
      })
    },
    getNetbarInfo(){
      var that=this;
      this.postAxios('common/netbar/info',{netbar_id:this.netbar_id}).then(res=>{
        if(res.code==0){
          this.netbarInfo=res.info;
        }
      });
    },
    getNetbarState(){
      var that=this;
      this.postAxios('judge/inspect/item/stat',{netbar_id:this.netbar_id}).then(res=>{
        if(res.code!=0){
          this.$message({
            type:'danger',
            message:res.msg,
            duration:2000,
            onClose:function(){
              that.$router.back(-1);
            }
          })
        }
        var list=res.data.inspect_pic;
        var inspect_pic={}
        list.forEach(item=>{
          let obj=item;
          inspect_pic[Object.keys(item)[0]]=item[Object.keys(item)[0]];
        })
        this.inspect_pic=inspect_pic
        this.statinfo=res.data;
        // this.$forceUpdate();
      });
    },
    // 必要检查项目
    getinspectlist(){
      this.postAxios('judge/inspect/item/list',{item_id:0,netbar_id:this.netbar_id}).then(res=>{
        if(res.code!=0){return false}
        var list=res.data;
        list['硬件与软件']=list['设备硬件与软件']?list['设备硬件与软件']:list['硬件与软件'];
        // console.log(list)
        this.inspectlist=list;
        this.loading=true;
      })
    },
    // 场所环境
    getspaceList(){
      this.postAxios('judge/inspect/item/list',{item_id:229,netbar_id:this.netbar_id}).then(res=>{
        var list=[];
        list.push(res.data)
        let score=0
        list.forEach(item=>{
          let score1=0;
          item.sub.forEach(xx=>{
            let score2=0;
            xx.sub.forEach(yy=>{
              let score3=0;
              yy.sub.forEach(zz=>{
                score3=Number((score3+zz.set_score).toFixed(1))
              })
              yy.newScore=score3;
              score2=Number((score2+score3).toFixed(1));
            })
            xx.newScore=score2;
            score1=Number((score1+score2).toFixed(1));
          })
          item.newScore=score1;
          score=Number((score+score1).toFixed(1));
        })
        this.spaceList=list
      })
    },
    // 管理能力
    getmanageList(){
      this.postAxios('judge/inspect/item/list',{item_id:228,netbar_id:this.netbar_id}).then(res=>{
        let data=res.data;
        let score=0;
        data.sub.forEach(item=>{
          let score1=0;
          if(item.sub.length==0){
            score=item.set_score
          }
          item.sub.forEach(xx=>{
            score1=Number((score1+xx.set_score).toFixed(1));
          })
          item.newScore=score1;
          score=Number((score+score1).toFixed(1));
        })
        data.newScore=score;
        this.manageData=data;
      })
    },
    // 服务质量
    getserveList(){
       this.postAxios('judge/inspect/item/list',{item_id:230,netbar_id:this.netbar_id}).then(res=>{
        let data=res.data;
        let score=0
        data.sub.forEach(item=>{
          let score1=0;
          item.sub.forEach(xx=>{
            if(xx.sub.length>0){
              let score2=0;
              xx.sub.forEach(yy=>{
                score2=Number((score2+yy.set_score).toFixed(1));
              })
              xx.newScore=score2;
              score1=Number((score1+score2).toFixed(1));
            }else{
              xx.newScore=xx.set_score;
              score1=Number((score1+xx.set_score).toFixed(1));
            }
            
          })
          item.newScore=score1;
          score=Number((score+score1).toFixed(1));
        })
        data.newScore=score;
        this.serveData=data;
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .stat {
  &-container {
    padding: 30px;
    .toptip{
      margin: 20px auto;
    }
    .page-title{
      margin-bottom: 30px;
      font-size: 14px;
      span{
        font-size: 18px;
        font-weight:bolder;
      }
    }
    .tablabel{
      font-weight: bold;
      font-size: 16px;
      .tabstate{
        background:#909399;
        font-size: 14px;
        font-weight: normal;
        margin-left: 5PX;
        border-radius: 3px;
        padding: 2px;
        color:#ffffff;
      }
      .complete{
        background:#f56c6c;
      }
    }
    .borderItem{
      margin: 10px auto;
      background: #fff;
      border-radius:5px;
      padding:0 10px;
      .item-title{
          line-height: 30px;
          margin-bottom:  20px;
          display: flex;
          justify-content: space-between;
          color: #333333;
          font-size: 18px;
          font-weight: bold;
          border-bottom: 1px solid #e5e5e5;
          .name{
              font-weight: bold;
              color: #333333;
              font-size: 18px;
          }
          span:last-child{
              cursor: pointer;
          }
      }
      .c1title{
        width: 100%;
        display: flex;
        height: 40px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
        .name{
          flex: 1;
          font-size: 18px;
          font-weight: bold;
        }
        .itemstate{
          margin: 0 20px;
        }
      }
      .content{
        width: 95%;
        margin: 0 auto;
        .items{
          border-bottom: 1px solid #e5e5e5;
          font-size: 18px;
          font-weight: normal;
        }
      }
      .content2{
        width: 95%;
        margin: 0 auto;
        .items{
          font-size: 16px;
          border-bottom: 1px solid #e5e5e5;
          font-weight: 300;
        }
      }
      .content3{
        width: 95%;
        margin: 0 auto;
        .items{
          border-bottom: none;
          font-weight: normal;
        }
      }
    }
    .items{
      width: 100%;
      display: flex;
      height: 40px;
      justify-content: space-between;
      align-items: center;
      .name{
        flex: 1;
      }
      .itemstate{
        margin: 0 20px;
      }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  
}
</style>


