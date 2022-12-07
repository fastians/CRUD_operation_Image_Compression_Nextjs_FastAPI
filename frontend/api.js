import useInterCeptor from "./interceptors";


const useApiHelper = () => {
    const axios = useInterCeptor();

    const api = {
        compressimage: (data, params = {}) => axios.post(`api/v1/compressimage/`, data, params),
        addPickyimage: (data, params = {}) => axios.post(`api/v1/add-pickyimage/`, data, params),
        pickyimageList: (params = {}) => axios.get(`api/v1/pickyimage-list/`, params),
        pickyimageDetails: (id, params = {}) => axios.get(`api/v1/pickyimage-details/${id}`, params),
        deletePickyimage: (id, params = {}) => axios.delete(`api/v1/delete-pickyimage/${id}`, params),
    }

    return api;
}

export default useApiHelper;