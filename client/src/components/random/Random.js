import { useQuery } from "@apollo/client";
import React from "react";
import { Redirect } from "react-router";
import { GET_RANDOM_MANGA_ID } from "../../utils/graphql/manga";
import Loading from "../shared/Loading";

const Random = () => {
    const { loading, data, error } = useQuery(GET_RANDOM_MANGA_ID, {
        fetchPolicy: "network-only",
    });

    if (loading) return <Loading />;
    if (error) return <Redirect to="/" />;

    return <Redirect to={`/g/${data.getRandomMangaId}`} />;
};

export default Random;
