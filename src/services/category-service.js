import { myAxios } from "./constants"

export const loadAllCategories = () => {
    return myAxios.get('/api/categories/')
        .then((response) => {
            return response.data
        })
}
