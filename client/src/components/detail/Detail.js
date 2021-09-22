// Libs
import React from "react";
import { Switch, Route } from "react-router-dom";
import { useLocation, Redirect, useHistory } from "react-router";
import { useQuery } from "@apollo/client";

// Components
import Gallery from "./Gallery";
import PageDetail from "./PageDetail";
import PageWrapper from "../shared/PageWrapper";
import "./Detail.css";
import { GET_MANGA } from "../../utils/graphql/manga";
import Loading from "../shared/Loading";
import { INTEGER_REGEX } from "../../utils/constants";

const Detail = () => {
    const location = useLocation();
    const history = useHistory();

    if (!INTEGER_REGEX.test(location.pathname.split("/")[2])) {
        history.push("/");
    }

    const mangaCode = parseInt(location.pathname.split("/")[2]);

    const { loading, data, error } = useQuery(GET_MANGA, {
        variables: {
            mangaCode: mangaCode,
        },
    });

    if (loading) {
        return <Loading />;
    }

    if (error || !data || !data.getMangaDetail) {
        console.log(JSON.stringify(error, null, 2));
        return <Redirect to="/" />;
    }

    return (
        <PageWrapper>
            <Switch>
                {/* Gallery Page */}
                <Route
                    path="/g/:mangaCode"
                    exact
                    render={(props) => (
                        <Gallery
                            key={props.match.params.mangaCode}
                            manga={data.getMangaDetail}
                        />
                    )}
                ></Route>

                {/* Manga Page */}
                <Route
                    path="/g/:mangaCode/read"
                    exact
                    render={(props) => (
                        <PageDetail
                            key={`${props.match.params.mangaCode}/read`}
                            manga={data.getMangaDetail}
                        />
                    )}
                ></Route>
            </Switch>
        </PageWrapper>
    );
};

export default Detail;
