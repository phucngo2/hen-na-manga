import React from "react";
import { useQuery } from "@apollo/client";

import SettingElementWrapper from "../setting/SettingElementWrapper";
import MangaList from "../shared/MangaList";
import Icon from "../shared/Icon";
import { LIST_POPULAR_MANGA } from "../../utils/graphql/manga";
import Loading from "../shared/Loading";

const Dashboard = () => {
    const { loading, data } = useQuery(LIST_POPULAR_MANGA);

    const dashboard = [
        {
            title: "Manga Uploaded",
            number: 69,
            icon: "book",
        },
        {
            title: "Account Created",
            number: 390,
            icon: "registers",
        },
        {
            title: "Comment Created",
            number: 1000,
            icon: "comments",
        },
        {
            title: "Revenue",
            number: 0,
            icon: "dollar-sign",
        },
    ];

    return (
        <>
            <h2 className="p-3">
                <Icon icon="chart-line" className="align-self-center me-3" />
                Dashboard
            </h2>
            <div className="w-100 d-flex flex-row justify-content-between align-items-between flex-wrap">
                {dashboard.map((item) => (
                    <SettingElementWrapper
                        className="dashboard-smol-item px-3 py-3"
                        key={item.title}
                    >
                        <h6>{item.title}</h6>
                        <div style={{ fontSize: 24 }}>
                            <b>{item.number}</b>
                        </div>
                    </SettingElementWrapper>
                ))}
            </div>
            {loading ? (
                <Loading />
            ) : (
                <MangaList
                    title={
                        <h3>
                            <Icon
                                icon="fire"
                                className="align-self-center me-3"
                            />
                            Popular
                        </h3>
                    }
                    mangaList={data.listPopularMangas}
                />
            )}
        </>
    );
};

export default Dashboard;
