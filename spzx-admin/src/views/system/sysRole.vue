<template>
  <div class="search-div">
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="small">
      <el-form-item label="角色名称">
        <el-input v-model="queryDto.roleName" style="width: 100%" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-row style="display:flex">
        <el-button type="primary" size="small" @click="searchSysRole">搜索</el-button>
        <el-button size="small" @click="resetData">重置</el-button>
      </el-row>
    </el-form>

    <!-- 添加按钮 -->
    <div class="tools-div">
      <el-button type="success" size="small" @click="addShow">添 加</el-button>
    </div>

    <!--- 角色表格数据 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="roleName" label="角色名称" width="180" />
      <el-table-column prop="roleCode" label="角色code" width="180" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" align="center" width="280" #="{ row }">
        <el-button type="primary" size="small" @click="editShow(row)">修改</el-button>
        <el-button type="danger" size="small" @click="deleteById(row)">删除</el-button>
      </el-table-column>
    </el-table>

    <!--分页条-->
    <el-pagination v-model:current-page="pageParams.page" v-model:page-size="pageParams.limit"
      :page-sizes="[2, 4, 6, 8]" @size-change="fetchData" @current-change="fetchData"
      layout="total, sizes, prev, pager, next" :total="total" />
  </div>
  <!-- 页面表单 -->
  <el-dialog v-model="dialogVisible" title="添加或修改角色" width="30%">
    <el-form label-width="120px">
      <el-form-item label="角色名称">
        <el-input v-model="sysRole.roleName" />
      </el-form-item>
      <el-form-item label="角色Code">
        <el-input v-model="sysRole.roleCode" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { GetSysRoleListByPage, SaveSysRole, UpdateSysRole, DeleteSysRoleById } from '@/api/sysRole';
import { ElMessage, ElMessageBox } from 'element-plus';

let total = ref(0)
let list = ref([])
const pageParams = ref({
  page: 1, // 页码
  limit: 2, // 每页记录数
})
const queryDto = ref({
  roleName: ""
})
const dialogVisible = ref(false)
const sysRole = ref({
  id: "",
  roleCode: "",
  roleName: ""
})

onMounted(() => {
  fetchData();
})

const fetchData = async () => {
  const { data, code, message } = await GetSysRoleListByPage(pageParams.value.page, pageParams.value.limit, queryDto.value);
  list.value = data.list;
  total.value = data.total
}

const searchSysRole = () => {
  fetchData();
}

const resetData = () => {
  queryDto.value.roleName = ""
  fetchData();
}

const addShow = () => {
  // 初始化表单数据
  sysRole.value = {
    id: "",
    roleCode: "",
    roleName: ""
  }
  dialogVisible.value = true
}

// 添加角色
const submit = async () => {
  if (!sysRole.value.id) {
    const { code } = await SaveSysRole(sysRole.value);
    if (code === 200) {
      dialogVisible.value = false
      ElMessage.success('操作成功')
      fetchData()
    }
  } else {
    const { code } = await UpdateSysRole(sysRole.value);
    if (code === 200) {
      dialogVisible.value = false
      ElMessage.success('操作成功')
      fetchData()
    }
  }
}

const editShow = (row) => {
  // sysRole.value = row // 这样改变值页面会直接改变 
  // sysRole.value = JSON.parse(JSON.stringify(row)) // deep copy
  sysRole.value = { ...row } // deep copy
  dialogVisible.value = true
}

const deleteById = (row) => {
  ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', 'warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const { code } = await DeleteSysRoleById(row.id)
    if (code === 200) {
      ElMessage.success('删除成功')
      pageParams.value.page = 1
      fetchData()
    }
  })
}
</script>

<style scoped>
.search-div {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}

.tools-div {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}
</style>