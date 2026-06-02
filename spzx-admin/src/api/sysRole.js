import request from '@/utils/request'

const base_url = '/admin/system/sysRole'

// 获取系统角色列表接口
export const GetSysRoleListByPage = (pageNum, pageSize, queryDto) => {
  return request({
    url: `${base_url}/findByPage/${pageNum}/${pageSize}`,
    method: 'post',
    data: queryDto,
  })
}

// 添加角色请求方法
export const SaveSysRole = (data) => {
  return request({
    url: `${base_url}/saveSysRole`,
    method: 'post',
    data
  })
}

// 修改角色
export const UpdateSysRole = (data) => {
  return request({
    url: `${base_url}/updateSysRole`,
    method: 'put',
    data
  })
}

// 删除角色
export const DeleteSysRoleById = (roleId) => {
  return request({
    url: `${base_url}/deleteById/${roleId}`,
    method: 'delete'
  })
}

// 查询所有的角色数据
export const GetAllRoleList = (userId) => {
  return request({
    url: `${base_url}/findAllRoles/${userId}`,
    method: 'get'
  })
}

// 查询指定角色所对应的菜单id
export const GetSysRoleMenuIds = (roleId) => {
  return request({
    url: "/admin/system/sysRoleMenu/findSysRoleMenuByRoleId/" + roleId,
    method: 'get'
  })
}

// 根据角色分配菜单请求方法
export const DoAssignMenuIdToSysRole = (assignMenuDto) => {
  return request({
    url: "/admin/system/sysRoleMenu/doAssign",
    method: 'post',
    data: assignMenuDto
  })
}