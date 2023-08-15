import { http } from './config';

export default {

    listar: () => {
        return http.get('links')
    },

    create: (link) => {
        return http.post('new', link)
    },

    apagar: (link) => {
        return http.delete(`links/${link._id}`, {data: link})
    }
}