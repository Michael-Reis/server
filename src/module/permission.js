export class Permission {

    async listDataByPermission(user, getDataFunction) {
        try {

            const { id_company , id_permission } = user;

            if (id_permission == 1) {
                const data = await getDataFunction();
                return data;
            }

            const data = await getDataFunction(id_company);
            return data;

        } catch (error) {
            throw new Error(error.message);
        }

    }


}