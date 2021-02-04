import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../_action/user_action";
//-------------------------------------------------------

export default function Auth(SpecificComponent, pageOption, adminRoute = null) {
    //! pageOption 인자에 따른 라우팅.
    // 1. true => 페이지 접근 가능.
    // 2. false => 페이지 접근 불가능.
    // 3. null => 모든 유저가 접근 가능.

    const dispatch = useDispatch();

    function PaginationUser(url) {
        useEffect(() => {
            const fetchingData = async () => {
                const { payload } = await dispatch(authUser());
                //! 로그인한 상태
                if (!payload.isAuth) {
                    if (pageOption) url.history.push("/");
                } else {
                    if (adminRoute && !payload.isAdmin) url.history.push("/");
                    else {
                        if (!pageOption) url.history.push("/");
                    }
                }
            };

            fetchingData();
        }, []);

        return <SpecificComponent />;
    }

    return PaginationUser;
}
