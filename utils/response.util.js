const { CRASH_APP_BY_SYNTAX, NOT_FOUND } = require("./constants")

function getErrorMessage(error) {
	const {original, fields, stack } = error
	const statusCodeFromError = error.status ||  error.statsCode
	// error from Sequelize ORM
	if(original) {
		const { code } = original
		const keyOfFields = Object.keys(fields)
		return code + " " + keyOfFields
	}
	if(statusCodeFromError === 404){
		return error.message
	}
	if (stack) {
		return stack;
	}

	if (typeof error.toString === "function") {
		return error.toString();
	}
	return "";
}
function getErrorType({error, response}) {
	// SEQUELIZE
	const {original, stack } = error
	if (original) return original.code
	const statusCodeFromError = error.status ||  error.statsCode
	if(statusCodeFromError === 404 ) return NOT_FOUND
	// CRASH_APP
	if (stack) return CRASH_APP_BY_SYNTAX

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
	if (error.original){
		return 400;
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