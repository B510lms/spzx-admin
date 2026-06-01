import request from '@/utils/request'

const base_url = '/admin/system/sysUser'

// 用户列表
export const GetSysUserListByPage = (pageNum, pageSize, queryDto) => {
  return request({
    url: `${base_url}/findByPage/${pageNum}/${pageSize}`,
    method: 'get',
    params: queryDto,
  })
}

// 添加用户
export const SaveSysUser = (sysUser) => {
  return request({
    url: `${base_url}/saveSysUser`,
    method: "post",
    data: sysUser
  })
}

// 修改用户
export const UpdateSysUser = (sysUser) => {
  return request({
    url: `${base_url}/updateSysUser`,
    method: "put",
    data: sysUser
  })
}

// 根据id删除用户
export const DeleteSysUserById = (userId) => {
  return request({
    url: `${base_url}/deleteById/${userId}`,
    method: 'delete'
  })
}

// 给用户分配角色
export const DoAssignRoleToUser = (assignRoleVo) => {
  return request({
    url: `${base_url}/doAssign`,
    method: 'post',
    data: assignRoleVo
  })
}