import api from './api'

const ApiService = {
    fetchData(param) {
        // return null
        return new Promise((resolve, reject) => {
            api(param)
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    console.log("🚀 ~ returnnewPromise ~ errors:", errors)
                    reject(errors)
                })
        })
    },
}

export default ApiService
