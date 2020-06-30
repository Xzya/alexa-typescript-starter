
function logInfo(title: string, object: any) {
    console.info(title, JSON.stringify(object, null, 2))
}

function logAssert(title: string, object: any) {
    console.assert(title, JSON.stringify(object, null, 2))
}

function logWarn(title: string, object: any) {
    console.warn(title, JSON.stringify(object, null, 2))
}

function logError(title: string, object: any) {
    console.error(title, JSON.stringify(object, null, 2))
}

export const logHelpers = {
    logInfo,
    logAssert,
    logWarn,
    logError
}