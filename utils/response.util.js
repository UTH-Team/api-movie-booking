const { CRASH_APP_BY_SYNTAX, CRASH_APP_MAGIC } = require("./constants")

function getErrorMessage(error) {
	const {original, fields, stack } = error
	// error from Sequelize ORM
	if(original) {
		const { code } = original
		const keyOfFields = Object.keys(fields)
		return code + " " + keyOfFields
	}

	if (stack) {
		return stack;
	}

	if (typeof error.toString === "function") {
		return error.toString();
	}
	return "";
}
function getErrorType(error) {
	// SEQUELIZE
	const {original, stack } = error
	if (original) return original.code

	// CRASH_APP
	if (stack) return CRASH_APP_BY_SYNTAX

	return CRASH_APP_MAGIC
}
function logErrorMessage(error) {
	console.error(error);
}

function isErrorStatusCode(statusCode) {
	return statusCode >= 400 && statusCode < 600;
}
function getHttpStatusCode({ error, response }) {
	const statusCodeFromError = error.status || error.statusCode;
	if (isErrorStatusCode(statusCodeFromError)) {
		return statusCodeFromError;
	}

	const statusCodeFromResponse = response.statusCode;
	if (isErrorStatusCode(statusCodeFromResponse)) {
		return statusCodeFromResponse;
	}

	return 500;
}
module.exports = {
	getErrorMessage,
	getErrorType,
	logErrorMessage,
	isErrorStatusCode,
	getHttpStatusCode
}