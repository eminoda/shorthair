const TEXT = require('./text');
const debug = require('debug')('utils');
exports.httpResult = (status, result) => {
	status = status && status.toLowerCase();
	debug('status %s', status);
	debug('result', result);
	const ret = {
		success: true
	};
	if (status == 'delete') {
		if (result.ok) {
			ret.resultMsg = TEXT.SUCCESS_DELETE;
			if (!result.deletedCount) {
				ret.resultMsg = TEXT.ERROR_NO_DELETE;
				ret.success = false;
			}
		} else {
			ret.resultMsg = TEXT.ERROR_DELETE;
			ret.success = false;
		}
	} else if (status == 'post') {
		if (result.id || result._id) {
			ret.resultMsg = TEXT.SUCCESS_CREATE;
		} else if (result.ok) {
			ret.resultMsg = TEXT.SUCCESS_UPDATE;
			if (!result.nModified) {
				ret.resultMsg = TEXT.ERROR_NO_UPDATE;
				ret.success = false;
			}
		} else {
			ret.resultMsg = TEXT.ERROR_UPDATE;
			ret.success = false;
		}
	} else if (status == 'get') {
		ret.resultMsg = TEXT.SUCCESS_SHOW;
		ret.success = true;
	}
	ret.data = result;
	return ret;
};
