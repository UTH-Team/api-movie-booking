const { CRASH_APP_BY_SYNTAX, NOT_FOUND } = require("./constants")
const typeError = require("./constants/types_error")

function getErrorMessage(error) {
	const {original, fields, stack } = error
	// error from Sequelize ORM
	if(original) {
		const { code } = original
		const keyOfFields = Object.keys(fields)
		return code + " " + keyOfFields
	}

	if(process.env.NODE_ENV !== "production") {
		if (stack) {
			return stack;
		}
	
		if (typeof error.toString === "function") {
			return error.toString();
		}
	}

	return error.message
}

function isErrorStatusCode(statusCode) {
	return statusCode >= 400 && statusCode < 600;
}

function getErrorType({error, response}) {
	// SEQUELIZE
	const {original} = error
	if (original) return original.code

	const statusCodeFromError = error.status ||  error.statsCode
	if(isErrorStatusCode(statusCodeFromError)) return typeError[statusCodeFromError]
	return typeError[500]
	
}

function logErrorMessage(error) {
	console.error(error);
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