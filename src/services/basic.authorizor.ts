// import {
//   AuthorizationContext,
//   AuthorizationDecision,
//   AuthorizationMetadata,
// } from '@loopback/authorization';

// Instance level authorizer
// Can be also registered as an authorizer, depends on users' need.
// export async function basicAuthorization(
//   authorizationCtx: AuthorizationContext,
//   metadata: AuthorizationMetadata,
// ): Promise<AuthorizationDecision> {
// No access if authorization details are missing
// let currentUser: UserProfile;
// if (authorizationCtx.principals.length > 0) {
//   const user = _.pick(authorizationCtx.principals[0], ['id']);
//   currentUser = {[securityId]: user.id};
// } else {
//   return AuthorizationDecision.DENY;
// }

/**
 * Allow access only to model owners, using route as source of truth
 *
 * eg. @post('/users/{userId}/orders', ...) returns `userId` as args[0]
 */
// if (currentUser[securityId] === authorizationCtx.invocationContext.args[0]) {
//authorizationCtx.invocationContext.args[0] = _id of concert
// return AuthorizationDecision.ALLOW;
// }

// return AuthorizationDecision.DENY;
// }
