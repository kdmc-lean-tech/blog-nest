export const matchesRoles = (roles: string[], rolUser: string): boolean => {
    let status = false;
    roles.map((rol: string) => {
        if (rol === rolUser) {
            status = true;
        }
    });
    return status;
};