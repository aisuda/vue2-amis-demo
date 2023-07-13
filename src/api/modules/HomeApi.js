import service from '..'
/**
 * AXIOS MODULE SAMPLE
 */
const DEFAULT_HEADER = {
    'TEST': "TEST"
}

export default {
    getDataList: (data) => {
        return service({
            method: 'GET',
            url: "urlSample",
            data: data,
            headers: DEFAULT_HEADER
        })
    }
}