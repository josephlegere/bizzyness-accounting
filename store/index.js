import JWTDecode from 'jwt-decode';
import cookieparser from 'cookieparser';

export const actions = {
    async nuxtServerInit({ commit }, { req }) {
        if (process.server && process.static) return;
        if (!req.headers.cookie) return;

        const parsed = cookieparser.parse(req.headers.cookie);
        const accessTokenCookie = parsed.access_token;

        if (!accessTokenCookie) return;

        const decoded = JWTDecode(accessTokenCookie);
        
        if (decoded) {

            let _details = null;
            let uid = decoded.user_id;

            await this.$fireStore
                .collection('users')
                .doc(decoded.user_id)
                .get()
                .then(doc => {
                    let _user = doc.data();
                    _details = {
                        id: `users/${uid}`,
                        account: _user.tenant_group.account,
                        tenantid: _user.tenant_group.tenantid
                    }
                })
                .catch(err => {
                    console.log("Error getting documents", err);
                });

            let { id, account, tenantid } = _details;

            commit('auth/setUser', {
                uid,
                email: decoded.email,
                name: decoded.displayName,
                id,
                account,
                tenantid
            });
        }
    }
}