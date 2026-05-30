import request from '@/utils/request'

const base_url = '/admin/system/sysRole'

// 获取系统角色列表接口
export const GetSysRoleListByPage = (pageNum , pageSize , queryDto) => {
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
