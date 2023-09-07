export class Permission {

    async listDataByPermission(user, getDataFunction, filtros = null) {
        try {

            const { id_company, id_permission } = user;


            if (id_permission == 1) {
                const data = await getDataFunction(null, filtros);
                return data;
            }

            const data = await getDataFunction(id_company, filtros);
            return data;

        } catch (error) {
            throw new Error(error.message);
        }

    }


}