import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions";

import SettingElementWrapper from "./SettingElementWrapper";
import Icon from "../shared/Icon";
import {
    GET_USER_INFO,
    UPDATE_USER_AVATAR,
    UPDATE_USER_PROFILE,
    DELETE_USER,
} from "../../utils/graphql/user";
import Loading from "../shared/Loading";
import ProfileInfo from "./ProfileInfo";
import ProfileAvatar from "./ProfileAvatar";

const Profile = ({ user }) => {
    const userInfo = useQuery(GET_USER_INFO, {
        variables: {
            userId: user.id,
        },
    });

    const [updateAvatar, updateAvatarResult] = useMutation(UPDATE_USER_AVATAR, {
        onCompleted: () => {
            window.location.reload();
        },
        onError: (err) => {
            console.log(JSON.stringify(err, null, 2));
        },
    });

    const [updateProfile, updateProfileResult] = useMutation(
        UPDATE_USER_PROFILE,
        {
            onError: () => {},
        }
    );

    const dispatch = useDispatch();
    const [deleteUser] = useMutation(DELETE_USER, {
        onCompleted: () => {
            dispatch(logout());
            window.location.assign("/");
        },
        variables: {
            userId: user.id,
        },
        onError: () => {},
    });

    if (
        userInfo.loading ||
        updateAvatarResult.loading ||
        updateAvatarResult.loading
    )
        return <Loading />;

    if (!userInfo.loading && !userInfo.data) {
        return window.location.reload();
    }

    return (
        <>
            <h2 className="p-3">
                <Icon icon="user-circle" className="align-self-center me-3" />
                Profile
            </h2>
            <SettingElementWrapper className="form-wrapper">
                <ProfileAvatar
                    userAvatar={user.avatar}
                    updateAvatar={updateAvatar}
                    userId={user.id}
                />
                <ProfileInfo
                    userInfo={userInfo.data.getUser}
                    updateProfile={updateProfile}
                    userId={user.id}
                    updateResult={updateProfileResult}
                    deleteUser={deleteUser}
                />
            </SettingElementWrapper>
        </>
    );
};

export default Profile;
