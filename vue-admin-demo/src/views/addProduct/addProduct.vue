<template>
    <div class="app-container">
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :status-icon="true" >
        <el-form-item label="商品名称" prop="productname">
            <el-input v-model="ruleForm.productname"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
            <el-input v-model="ruleForm.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择商品类别">
                <el-option v-for="item in product_type" :key="item" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="库存状态" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请选择库存状态">
                <el-option label="有货" value="有货"></el-option>
                <el-option label="无货" value="无货"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品图片" prop="imgeUrl">
            <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5757/admin/image"
                list-type="picture"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :auto-upload=true>
                <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{this.commit}}</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form> 
    </div>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


<script>
const product_type = ['其他', '瓜果', '零食', '蔬菜']
import * as products from '@/api/products'
export default {
  data() {
    return {
      commit: '立即创建',
      ruleForm: {
        productname: '',
        price: '',
        status: '',
        type: '',
        description: '',
        service: '不支持退换货',
        parameter: '1000g/袋',
        weight: '100g',
        imageUrl: ''
      },
      product_type,
      info: '',
      rules: {
        productname: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请设置价格', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    if (this.$route.params.info) {
      let routerParams = this.$route.params.info
      // 将数据放在当前组件的数据内
      this.info = routerParams;

      this.commit = '修改完成';
      this.ruleForm.productname = this.info.name;
      this.ruleForm.price = this.info.price;
      this.ruleForm.status = this.info.status;
      this.ruleForm.type = this.info.type;
      this.ruleForm.description = this.info.description;
      this.ruleForm.imageUrl = this.info.image;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let data = this.ruleForm
          data.typeno = this.product_type.indexOf(data.type)
          let res;
          if (this.commit === '立即创建') {
            res = await products.addProduct(data);
          } else {
            data.pid = this.info.pid
            res = await products.modifyProduct(data);
          }
          try {
            alert(res.data)
          } catch (error) {
            alert(res.data)
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.imageUrl = res.newPath;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>