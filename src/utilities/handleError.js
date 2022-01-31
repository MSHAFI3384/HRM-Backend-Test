import logger from '../logger';

export const handle_server_error = async (error, req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let errorMessage = error.message !== '' ? JSON.stringify(error.message) : error.msg !== '' ? JSON.stringify(error.msg) : 'Error not identified'
      logger.error(`Endpoint - ${req.originalUrl}[${req.method}]- Error : {message : ${errorMessage}, stack : ${JSON.stringify(error.stack)}}`)
      let errorObj;
      if (!error.errorType || error.errorType !== 'API.Error') {
        errorObj = {
          error: 'Internal Server Error',
          code: error.status ? parseInt(error.status) : 500,
          errorCode: "INTERNAL_SERVER_ERROR",
          message: error.message,
          Endpoint: req.originalUrl
        }
      }
      if (error.errorType && error.errorType === 'API.Error') {
        errorObj = {
          error: error.errorType,
          code: parseInt(error.ec.status),
          errorCode: error.ec.errorCode,
          message: error.msg,
          Endpoint: req.originalUrl
        }
      }
      return resolve(errorObj)
    } catch (error) {
      return reject({
        error: 'Internal Server Error',
        code: error.status ? parseInt(error.status) : 500,
        errorCode: "INTERNAL_SERVER_ERROR",
        message: error.message,
        Endpoint: req.originalUrl
      })
    }
  })
}

export const SUCCESS = { status: "success" }

export const USER_NOT_FOUND = {
  status: 400,
  errorCode: "USER_NOT_FOUND",
  errorMessage: "User not found",
}

export const MISSING_PARAMETER = {
  status: 400,
  errorCode: "MISSING_PARAMETER",
  errorMessage: "Parameters Missing",
}

export const PASSWORD_INCORRECT = {
  status: 401,
  errorCode: "PASSWORD_INCORRECT",
  errorMessage: "Incorrect Password",
}

export const USER_ALREADY_EXIST = {
  status: 409,
  errorCode: "USER_ALREADY_EXIST",
  errorMessage: "User already exist",
}