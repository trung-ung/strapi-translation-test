module.exports = async (ctx, next) => {
  // for GET request, group comes from query
  if (ctx.request.query.group === ctx.state.user.role.name) {
    return await next()
  }
  // for POST | PUT request, group comes from body (read more about body-parser)
  if (ctx.request.body.group === ctx.state.user.role.name) {
    return await next()
  }

  // for DELETE request, first fetch the entity, then compare entity group and user role name
  const entity = await strapi.services.translation.findOne(ctx.params)
  if (entity.group === ctx.state.user.role.name) {
    return await next()
  }

  ctx.unauthorized(
    `Sorry you don't have the permission to perform this action!!!`
  )
}
