import React from "react";
import { useQuery } from "@apollo/client";

import MangaList from "../shared/MangaList";
import Icon from "../shared/Icon";
import Loading from "../shared/Loading";
import { LIST_RECOMMENDATION } from "../../utils/graphql/manga";

const GalleryRecommendation = ({ manga }) => {
    const { loading, data } = useQuery(LIST_RECOMMENDATION, {
        variables: {
            mangaId: manga.id,
            artist: manga.artist,
            tags: manga.tags,
            category: manga.category,
        },
    });

    if (loading) return <Loading />;
    if (data.listSimilarMangas.length === 0) return <></>;

    return (
        <MangaList
            title={
                <h3>
                    <Icon
                        icon="box-tissue"
                        className="align-self-center me-3"
                    />
                    More Like This
                </h3>
            }
            mangaList={data.listSimilarMangas}
        />
    );
};

export default GalleryRecommendation;
