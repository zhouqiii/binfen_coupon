<template>
  <div class="index">
    <div v-for="(item,index) in fileList" :key="index">
      <div class="file_class" >
        <div class="img_div_class">
          <img src="../assets/icon/w.png" />
        </div>
        <div class="img_file_class">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "programmeInfo",
    data() {
      return {
        fileList: [],
      };
    },

    methods: {
    //   handleCheckedCitiesChange(ruleForm) {
    //     let temp = "";
    //     for (let item of ruleForm.childProductIdArray){
    //       temp = temp + item+","
    //     }
    //     //如果temp长度超过1，去掉最后一个","   2222,aaa,bbb,
    //     if(temp.length > 1){
    //       temp = temp.substring(0,temp.length-1);
    //     }
    //     ruleForm.childProductId = temp;
    //     console.log("ruleForm.childProductId---"+ruleForm.childProductId);
    //   },


    //   getChildProductList(){
    //     console.log(this.ruleForm);
    //     listChild(this.ruleForm).then(res => {
    //       this.childProductList = res.data;
    //     });
    //   },

    //   editForm(ruleForm){
    //     this.$router.push({
    //       path:'/programmeEdit',
    //       name:'programmeEdit',
    //       params:{
    //         ruleForm : ruleForm
    //       }
    //     })
    //   },
    //   resetForm(formName) {
    //     this.$refs[formName].resetFields();
    //     this.$router.push("programmeList");
    //   },

    //   //----上产文件方法start-
    //   submitUpload(event) {
    //     event.preventDefault();
    //     this.$refs.upload.submit();
    //   },
    //   changeMe(file,fileList){
    //     this.fileList=fileList;
    //   },
    //   handleRemove(file, fileList) {
    //     console.log(file, fileList);
    //   },
    //   handlePreview(file) {
    //     console.log(file);
    //   }

    //   //----上传文件方法end

    // },
    // created() {
    //   console.log("-=-=-=->"+this.$route.params.id)
    //   this.ruleForm.id = this.$route.params.id;
    //   infoProgramme(this.ruleForm).then(res => {
    //     this.ruleForm = res.data;
    //     this.fileList = res.data.zipFileList;

    //   });
    },
    created() {
      // console.log("-=-=-=->"+this.$route.params)
      // this.ruleForm.id = this.$route.params.id;
      // infoProgramme(this.ruleForm).then(res => {
      //   this.ruleForm = res.data;
        this.fileList = [
      {"programmeId":"DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "fileName":"Redis on Windows Release Notes.docx",
      "filePath":"C:\\upload\\DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "name":"Redis on Windows Release Notes.docx","pageSize":5,"id":21,"pageNum":1,
      "url":"C:\\upload\\DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "fileId":"DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE"
      },
      {"programmeId":"DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "fileName":"Redis on Windows.docx",
      "filePath":"C:\\upload\\DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "name":"Redis on Windows.docx","pageSize":5,"id":22,"pageNum":1,
      "url":"C:\\upload\\DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "fileId":"DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE"
      },
      {"programmeId":"DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "fileName":"EventLog.dll",
      "filePath":"C:\\upload\\DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "name":"EventLog.dll","pageSize":5,"id":23,"pageNum":1,
      "url":"C:\\upload\\DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "fileId":"DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE" 
      },
      {"programmeId":"DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "fileName":"redis.windows-service.conf",
      "filePath":"C:\\upload\\DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "name":"redis.windows-service.conf","pageSize":5,"id":24,"pageNum":1,
      "url":"C:\\upload\\DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "fileId":"DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE"
      },
      {"programmeId":"DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "fileName":"redis.windows.conf",
      "filePath":"C:\\upload\\DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "name":"redis.windows.conf","pageSize":5,"id":25,"pageNum":1,
      "url":"C:\\upload\\DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE",
      "fileId":"DSMS-001-002-MLIFE-MLIFE-APPS,MLIFE-PHONE" 
      }
    ]

      // });
    }
  };
</script>

<style scoped>
  .file_class{
    border-width: 0px;
    /* position: absolute;
    left: 0px;
    top: 0px; */
    background: inherit;
    background-color: rgba(242, 242, 242, 1);
    border-radius: 4px;
    -moz-box-shadow: none;
    box-shadow: none;

    width: 130px;
    height: 119px;
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: center;
    line-height: normal;
  }
  .img_div_class{
    /* border-width: 0px; */
    width: 130px;
    height: 40px;
    margin-top: 20px;
  }
  .img_file_class{
    /* top: 30px; */
  }
</style>
