

const AuthHandler = (requirePermission,user) =>{

    //if the permission requirnment is anonymous, it is open for everyone 
    if(requirePermission==='anonymous') return true;
    //if user is system root, user can use any api
    if(user.rolePermission.find(element => element === "system:root") !== undefined) return true;

    //if user have require permission
    if(user.rolePermission.find(element => element === requirePermission) === undefined) {
        return false;
    }else{
        return true;
    }
}

export default AuthHandler;