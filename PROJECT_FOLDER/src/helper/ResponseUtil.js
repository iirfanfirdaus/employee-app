const responseError = (res, statusCode, error, detail) => {
    res.status(statusCode).json({
        status_code: statusCode,
        message: error,
        detail
    });
}

const ok = (res, message, data) => {
    res.status(200).json({
        status_code: 200,
        message,
        data,
    });
}

const searchOk = (res, page, perPage, totalRows, totalPages, data) => {
    res.append('Access-Control-Expose-Headers', 'Page, Per-Page, Total-Rows, Total-Pages')
    res.append('Page', page)
    res.append('Per-Page', perPage)
    res.append('Total-Rows', totalRows)
    res.append('Total-Pages', totalPages)
    const message = data.length > 0 ? "Data ditemukan" : "Data tidak ditemukan"
    res.status(200).json({
        status_code: 200,
        message,
        data,
    });
}

const badRequest = (res, error, detail) => {
    responseError(res, 400, error, detail)
}

const unauthorized = (res, error, detail) => {
    responseError(res, 401, error, detail)
}

const forbidden = (res, error, detail) => {
    responseError(res, 403, error, detail)
}


const internalServerErr = (res, error, detail) => {
    responseError(res, 500, error, detail)
}

module.exports = { 
    ok,
    searchOk,
    badRequest, 
    unauthorized, 
    forbidden, 
    internalServerErr,
    responseError
}