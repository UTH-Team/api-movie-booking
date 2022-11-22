const types = require("./constants/types_error")
const chalk = require("chalk")
const messages = require("./responses/error.response")
function getErrorMessage(error) {
	const {original, fields, stack } = error
	// error from Sequelize ORM
	if(original) {
		const { code } = original
		const keyOfFields = Object.keys(fields)
		if(code === "ER_DUP_ENTRY"){
			return messages[keyOfFields].notAvailable
		}
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
	if (original) return error.name;

	const statusCodeFromError = error.status ||  error.statsCode
	if(isErrorStatusCode(statusCodeFromError)) return types[statusCodeFromError]
	return types[500]
	
}
const getCurrentTime = () => {
	const date = new Date(Date.now());
	return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

function logErrorMessage(error) {
	console.error(chalk.blue(getCurrentTime()), chalk.red(error));
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