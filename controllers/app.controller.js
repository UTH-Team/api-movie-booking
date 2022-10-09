const { getErrorMessage, logErrorMessage, getHttpStatusCode, getErrorType } = require("../utils/response.util");

// const NODE_ENVIRONMENT = process.env.NODE_ENV || "development";

function errorHandler(error, request, response, next) {
	const errorMessage = getErrorMessage(error);
	logErrorMessage(errorMessage);

	const errorResponse = {
		statusCode: getHttpStatusCode({ error, response }),
		error: {
			type: getErrorType(error),
			message: getErrorMessage(error)
		}
	};

	// ! NEED IMPORVE
	// if (NODE_ENVIRONMENT !== "production") {
	// 	errorResponse.error.message = errorMessage;
	// }

	response.status(errorResponse.statusCode).send(errorResponse);
}
const responseFormat = (request, response, next)=>{
	const { locals: { data } } = response;
	response.json({
		statusCode: 200,
		data,
	})
}
module.exports = {errorHandler, responseFormat};