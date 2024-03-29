

const AuthHandler = (requirePermission,user) =>{

    //if the permission requirnment is anonymous, it is open for everyone 
    if(requirePermission==='anonymous') return true;
    //if the permission requirnment is anonymousOnly, it only provide for anonymous user
    if(requirePermission==='anonymousOnly'){

        if(user.token === ''){
            return true;
        }else{
            return false;
        }      
    } 
    if(requirePermission === 'authenticated'){
        if(user.token === ''){
            return false;
        }else{
            return true;
        } 
    }
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