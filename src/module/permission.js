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

    checkUserPermissionForUserDeletion(user, usersToDelete) {

        const userMe = usersToDelete.find(userDelete => userDelete.uuid === user.uuid);

        if (userMe) {
            throw new Error("Você não pode se deletar");
        }

        if (user.id_permission === 1) {
            return; // Permissão concedida
        }

        if (user.id_permission !== 2) {
            throw new Error("Você não tem permissão para deletar usuário");
        }

        const usersFromOtherCompanies = usersToDelete.filter(userDelete => userDelete.id_company !== user.id_company);
        const superAdmins = usersToDelete.filter(userDelete => userDelete.id_permission === 1);

        if (usersFromOtherCompanies.length > 0) {
            throw new Error("Você não tem permissão para deletar usuário de outra companhia");
        }

        if (superAdmins.length > 0) {
            throw new Error("Você não tem permissão para deletar usuário administrador global");
        }
    }


}