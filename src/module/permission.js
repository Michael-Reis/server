export class Permission {

    async listDataByPermission(user, getDataFunction) {
        try {

            const { id_empresa, id_permissao } = user;

            if (id_permissao == 1) {
                const data = await getDataFunction();
                return data;
            }

            const data = await getDataFunction(id_empresa);
            return data;

        } catch (error) {
            throw new Error(error.message);
        }

    }


}