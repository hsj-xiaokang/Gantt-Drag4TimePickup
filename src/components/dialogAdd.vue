<template>
  <div class="dialogAdd">
    <el-form
      :model="form"
      ref="form"
      label-width="80px"
      label-position="top"
      :rules="rules"
      size="mini"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="计划周期" prop="planTime" v-show="form.type == 1">
        <el-date-picker
          v-model="form.planTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="里程碑时间" prop="stoneTime" v-show="form.type == 2">
        <el-date-picker
          v-model="form.stoneTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    dialogVal: Boolean,
    owerOptions: Array,
    isChildren: Boolean,
    title: String
  },
  data() {
    return {
      form: {
        name: "",
        planTime: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100个字符",
            trigger: "blur"
          }
        ],
        planTime: [
            { required: true, message: "请输入时间", trigger: "blur" }
        ],
      }
    };
  },
  watch: {
    "form.type"(val) {

        this.rules = {
          name: [
            { required: true, message: "请输入名称", trigger: "blur" },
            {
              min: 1,
              max: 100,
              message: "长度在 1 到 100个字符",
              trigger: "blur"
            }
          ],
          planTime: [
            { required: true, message: "请输入时间", trigger: "blur" }
          ],
        };
      
    },
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("update:dialogVal", false);
          if (this.title == "新建") {
              this.$emit("submit", this.form);
          } else if (this.title == "编辑") {
            console.log("=====addlog=======")
            console.log(this.form);
            this.$emit("handleEditSave", this.form);
          }
        } else {
          return false;
        }
      });
    },
    onCancle() {
      this.$emit("update:dialogVal", false);
      this.$refs.form.resetFields();
      this.form.type = "1";
      this.$emit("onCancle");
    },
    resetFields() {
      this.$refs.form.resetFields();
      this.form.type = "1";
    }
  }
};
</script>

<style lang="scss" scoped>
.dialogAdd {
  .el-form--label-top .el-form-item__label {
    padding: 0px;
  }
}
</style>