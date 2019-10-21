<template>
  <div class="tableMneu">
    <div
      class="mask"
      v-if="isShowHeaderBox || menuOpen"
      @click="maskClick"
    ></div>
    <el-table
      ref="tableMenu"
      :data="tableData"
      border
      fit
      style="width: 100%"
      row-key="id"
      default-expand-all
      highlight-current-row
      @row-click="handlerRowClick"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        v-for="col in columns"
        :prop="col.prop"
        :key="col.prop"
        :label="col.label"
        :align="col.align"
        :resizable="col.resizable"
      >
      </el-table-column>
      <el-table-column align="center" :resizable="false" width="40">
        <template slot="header">
           <!-- @click="handleShowHeaderCheckBox" -->
          <i
            class="el-icon-setting icons"
          ></i>
        </template>
        <template slot-scope="scope">
          <i
            class="el-icon-more icons"
            @click.stop="handleRowMore(scope.row, $event)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <el-collapse-transition>
      <div class="headerBox" v-if="isShowHeaderBox">
        <div class="title">
          选择表头显示内容
        </div>
        <div class="main">
          <div class="line" v-for="item in columnsCopy" :key="item.prop + 'cc'">
            <div class="pre">{{ item.label }}</div>
            <el-checkbox
              v-model="headerList[item.prop]"
              :disabled="item.prop == 'name'"
            ></el-checkbox>
          </div>
          <div class="line" style="justify-content: center;">
            <el-button size="mini" @click="isShowHeaderBox = false"
              >取消</el-button
            >
            <el-button type="primary" size="mini" @click="handlerSave"
              >确定</el-button
            >
          </div>
        </div>
      </div>
    </el-collapse-transition>
    <transition name="el-zoom-in-top">
      <div class="menulist" v-show="menuOpen" ref="menulist">
        <div
          class="item"
          v-for="(item, index) in menuLists"
          @click="handleMenuClick(index, item)"
          :key="item + index"
        >
          {{ item }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  computed: {
    tableData() {
      return this.list;
    }
  },
  data() {
    return {
      checkList: [],
      isShowHeaderBox: false,
      menuOpen: false,
      headerList: {
        name: true,
        ower: true,
        per: true,
        type: true
      },
      menuLists: ["编辑", "删除"],
      columns: [
        {
          prop: "name",
          label: "名称",
          width: "200px",
          resizable: false
        }
      ],
      columnsCopy: [
        {
          prop: "name",
          label: "名称",
          width: "200px",
          resizable: false
        }
      ],
      //当前点击的row
      currentRow: {}
    };
  },
  methods: {
    handlerSelect(row) {
      this.$refs.tableMenu.setCurrentRow(row);
    },
    handlerSave() {
      this.isShowHeaderBox = false;
      let arr = [];
      this.columnsCopy.forEach(item => {
        if (this.headerList[item.prop] == true) {
          arr.push(item);
        }
      });
      this.columns = arr;
    },
    maskClick() {
      this.isShowHeaderBox = false;
      this.menuOpen = false;
      this.currentRow = {};
    },
    handlerRowClick(row, column) {
      // console.log(column);
      if (row.type != 3) {
        this.$emit("handlerRowClick", row);
      }
    },
    handleRowMore(row, e) {
      console.log('================编辑==================');
      console.log(row);
      // console.log(e);
      this.menuLists = ["编辑", "删除"];
      this.menuOpen = true;
      this.currentRow = row;
      let s = this.$refs.menulist.style;
      s.top = e.y - 10 - 40 + "px";
      s.left = e.x + 20 + "px";
    },
    handleShowHeaderCheckBox() {
      this.isShowHeaderBox = !this.isShowHeaderBox;
    },
    handleMenuClick(index, name) {
      this.menuOpen = false;
      if (index == 0) {
        this.$emit("handlerEdit", this.currentRow);
      } else if (index == 1) {

        if (name == "删除") {
          this.$confirm("此操作将删除时间区间, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          })
            .then(() => {
              this.$emit("handlerDel", this.currentRow);
            })
            .catch(() => {});
          return;
        }

      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tableMneu {
  width: 100%;
  position: relative;
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    z-index: 9999;
  }
  .icons {
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
  .menulist {
    width: 100px;
    position: absolute;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    width: 70px;
    z-index: 9999;

    .item {
      background-color: rgb(255, 255, 255);
      line-height: 30px;
      text-align: center;
      font-size: 12px;
      color: rgb(102, 102, 102);
      cursor: pointer;
      height: 30px;
    }

    .item:hover {
      color: #409eff;
    }
  }
  .headerBox {
    z-index: 9999;
    position: absolute;
    right: -128px;
    top: 50px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    width: 170px;
    background-color: #fff;
    &::after {
      content: " ";
      position: absolute;
      top: -5px;
      left: 16px;
      width: 0;
      height: 0;
      border-right: 7px solid transparent;
      border-left: 7px solid transparent;
      border-bottom: 7px solid #fff;
    }
    .title {
      margin: 0;
      padding: 8px 16px;
      min-height: 32px;
      border-bottom: 1px solid #e9e9e9;
      color: #303030;
      font-weight: 500;
    }
    .main {
      .line {
        padding: 8px 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 150px;
        .pre {
          flex: 1 1 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
<style lang="scss" >
.tableMneu {
  .el-table th.gutter {
    display: table-cell !important;
  }
  .el-table td,
  .el-table th {
    padding: 8px 0;
  }
  .el-table--border td {
    border-right: none;
  }
}
</style>
