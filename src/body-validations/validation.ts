import { query, body, param } from 'express-validator';

export function articleIdValidation(): any {
	return [
		param('articleId')
		.exists()
		.withMessage('articleId does not exists')
		.isInt()
		.withMessage('articleId must be an integer'),
	];
}

export function fromAndToUserValidation(): any {
	return [
		body('fromUser').exists().withMessage('fromUser does not exists'),
		body('toUser').exists().withMessage('toUser does not exists'),
		body('fromUser.userId')
			.exists()
			.withMessage('fromUserId does not exists')
			.isInt()
			.withMessage('fromUserId must be an integer'),
		body('toUser.userId')
			.exists()
			.withMessage('toUserId does not exists')
			.isInt()
			.withMessage('toUserId must be an integer'),
		body('fromUser.brandId')
			.exists()
			.withMessage('fromUserBrandId does not exists')
			.isInt()
			.withMessage('fromUserBrandId must be an integer'),
		body('toUser.brandId')
			.exists()
			.withMessage('toUserBrandId does not exists')
			.isInt()
			.withMessage('toUserBrandId must be an integer'),
	];
}

export function groupCreateValidation(): any {
	return [
		body('groupName').exists().withMessage('groupName does not exists'),
		body('groupName').notEmpty().withMessage('groupName can not be empty'),
	];
}

export function groupUpdateValidation(): any {
	return [
		body('groupId').exists().withMessage('groupId does not exists'),
		body('groupId')
			.notEmpty()
			.withMessage('groupId can not be empty')
			.isInt()
			.withMessage('groupId must be an integer'),
	];
}

export function groupIdUserIdValidation(): any {
	return [
		query('groupId')
			.notEmpty()
			.withMessage('groupId can not be empty')
			.isInt()
			.withMessage('groupId must be an integer'),
		query('userId')
			.exists()
			.withMessage('userId does not exists')
			.isInt()
			.withMessage('userId must be an integer'),
	];
}

export function groupNameRegExpValidation(): any {
	return [
		query('groupNameRegExp')
			.notEmpty()
			.withMessage('groupNameRegExp can not be empty')
			.isString()
			.withMessage('groupNameRegExp must be a string'),
	].concat(paginationValidation());
}

export function groupUserValidation(): any {
	return [
		body('groupId').exists().withMessage('groupId does not exists'),
		body('userInfo').exists().withMessage('userInfo does not exists'),
		body('groupId')
			.notEmpty()
			.withMessage('groupId can not be empty')
			.isInt()
			.withMessage('groupId must be an integer'),
		body('userInfo.userId')
			.exists()
			.withMessage('userId does not exists')
			.isInt()
			.withMessage('userId must be an integer'),
		body('userInfo.brandId')
			.exists()
			.withMessage('userBrandId does not exists')
			.isInt()
			.withMessage('userBrandId must be an integer'),
	];
}

export function fromOrToUserValidation(): any {
	return [
		query('toUserId')
			.if(query('fromUserId').not().exists())
			.exists()
			.withMessage('Only one out of fromUserId and toUserId must be provided')
			.isInt()
			.withMessage('toUserId must be an integer'),
		query('fromUserId')
			.if(query('toUserId').not().exists())
			.exists()
			.withMessage('Only one out of fromUserId and toUserId must be provided')
			.isInt()
			.withMessage('fromUserId must be an integer'),
		query('fromUserId')
			.if(query('toUserId').exists())
			.not()
			.exists()
			.withMessage('Only one out of fromUserId and toUserId must be provided'),
	].concat(paginationValidation());
}

// Also contains pagination validation
// todo change the name to userIdPagination
export function fromOrToGroupValidation(): any {
	return [
		query('toGroupId')
			.if(query('fromGroupId').not().exists())
			.exists()
			.withMessage('Only one out of fromGroupId and toGroupId must be provided')
			.isInt()
			.withMessage('toGroupId must be an integer'),
		query('fromGroupId')
			.if(query('toGroupId').not().exists())
			.exists()
			.withMessage('Only one out of fromGroupId and toGroupId must be provided')
			.isInt()
			.withMessage('fromGroupId must be an integer'),
		query('fromGroupId')
			.if(query('toGroupId').exists())
			.not()
			.exists()
			.withMessage(
				'Only one out of fromGroupId and toGroupId must be provided',
			),
	].concat(paginationValidation());
}

export function userIdvalidation(): any {
	return [
		query('userId')
			.exists()
			.withMessage('userId does not exists')
			.isInt()
			.withMessage('userId must be an integer'),
	].concat(paginationValidation());
}

export function groupIdAndPaginationValidation(): any {
	return [
		param('groupId')
			.exists()
			.withMessage('groupId does not exists')
			.isInt()
			.withMessage('groupId must be an integer'),
	].concat(paginationValidation());
}

export function userIdParamvalidation(): any {
	return [
		param('userId')
			.exists()
			.withMessage('userId does not exists')
			.isInt()
			.withMessage('userId must be an integer'),
	].concat(paginationValidation());
}

export function groupIdParamvalidation(): any {
	return [
		param('groupId')
			.exists()
			.withMessage('groupId does not exists')
			.isInt()
			.withMessage('groupId must be an integer'),
	];
}

export function groupIdvalidation(): any {
	return [
		query('groupId')
			.exists()
			.withMessage('groupId does not exists')
			.isInt()
			.withMessage('groupId must be an integer'),
	];
}

function paginationValidation(): any {
	return [
		query('offset')
			.if(query('offset').exists())
			.isInt()
			.withMessage('offset must be an integer'),
		query('numOfRecords')
			.if(query('numOfRecords').exists())
			.isInt()
			.withMessage('numOfRecords must be an integer'),
	];
}

export function groupdIdsValidation(): any {
	return [
		query('groupIds')
			.exists()
			.withMessage('groupIds does not exists')
			.notEmpty()
			.withMessage('groupIds must not be empty'),
	];
}

export function groupsdIdsValidation(): any {
	return [
		query('groupsIds')
			.exists()
			.withMessage('groupsIds does not exists')
			.notEmpty()
			.withMessage('groupsIds must not be empty'),
	];
}

export function userIdsGroupdIdsValidation(): any {
	return [
		query('userIds')
			.if(query('userIds').exists())
			.notEmpty()
			.withMessage('userIds can not be empty'),
		query('groupIds')
			.if(query('groupIds').exists())
			.notEmpty()
			.withMessage('groupIds can not be empty'),
	];
}

export function tokensValidation(): any {
	return [
		query('userIds')
			.exists()
			.withMessage('tokens does not exists')
			.notEmpty()
			.withMessage('tokens must not be empty'),
	];
}
