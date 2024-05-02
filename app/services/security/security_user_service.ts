import UnAuthorizedException from '#exceptions/un_authorized_exception'

export default class SecurityUserService {
  static async checkPermissions(user: any, resource: any) {
    if (!user) {
      throw new UnAuthorizedException('', {
        status: 401,
      })
    }
    if (!resource) {
      throw new UnAuthorizedException('', {
        status: 404,
      })
    } else {
      if (resource.userId !== user.id) {
        throw new UnAuthorizedException('', {
          status: 403,
        })
      }
    }
  }
}
