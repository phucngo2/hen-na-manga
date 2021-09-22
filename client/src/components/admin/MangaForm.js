// Libs
import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useLazyQuery, useMutation, useApolloClient } from "@apollo/client";

import { useForm, useSelectTag } from "../../utils/hooks";
import MangaFormInfo from "./MangaFormInfo";
import MangaFormFiles from "./MangaFormFiles";
import MangaFormCharacters from "./MangaFormCharacters";
import GalleryPageList from "../detail/GalleryPagesList";
import { REQUIRED } from "../../utils/constants";
import {
    GET_MANGA_ADMIN,
    INSERT_MANGA,
    UPDATE_MANGA,
} from "../../utils/graphql/manga";
import Icon from "../shared/Icon";
import Loading from "../shared/Loading";

const MangaForm = () => {
    // Push back to manage page after mutate
    const history = useHistory();
    // To handle Cache
    const client = useApolloClient();
    // Get mangaId, if have id => update
    const location = useLocation();
    const mangaId = location.state ? location.state.mangaId : "";
    const MUTATE_MANGA = mangaId ? UPDATE_MANGA : INSERT_MANGA;

    // Form State
    const initialState = {
        name: "",
        alias: "",
        artist: "",
        group: "",
        language: "",
        category: "",
    };
    const validate = {
        name: REQUIRED,
        artist: REQUIRED,
        language: REQUIRED,
        category: REQUIRED,
    };
    const [characters, setCharacters] = useState([]);
    const [parodies, setParodies] = useState([]);
    const [files, setFiles] = useState([]);
    const [isFilesValid, setIsFilesValid] = useState(true);
    const [tagError, setTagError] = useState("");

    // If have mangaId => get manga to update
    const [fetchManga, result] = useLazyQuery(GET_MANGA_ADMIN, {
        onCompleted: () => {
            if (result.data.getManga) {
                const newValues = {
                    name: result.data.getManga.name,
                    alias: result.data.getManga.alias,
                    artist: result.data.getManga.artist,
                    group: result.data.getManga.group,
                    language: result.data.getManga.language,
                    category: result.data.getManga.category,
                };

                setValues(newValues);
                setCharacters(
                    generateObjArray(
                        result.data.getManga.characters,
                        "Characters"
                    )
                );
                setParodies(
                    generateObjArray(result.data.getManga.parodies, "Parodies")
                );
                setSelectedTags(result.data.getManga.tags);
            }
        },
    });

    useEffect(() => {
        if (mangaId) {
            fetchManga({
                variables: {
                    mangaId: mangaId,
                },
            });
        }
    }, []);

    // GraphQL
    const [mutateManga, { loading, error }] = useMutation(MUTATE_MANGA, {
        onCompleted: async () => {
            // Refectch paginate Manga cache and redirect to manga management page
            await client.refetchQueries({
                updateCache(cache) {
                    cache.evict({ fieldName: "paginateManga" });
                },
            });
            // If have mangaId => reload page to refresh images
            if (mangaId) {
                return window.location.assign("/admin/manga");
            }
            history.push("/admin/manga");
        },
        onError: () => {},
    });

    // Custom Hook to handle form and tag select
    const { errors, values, setValues, onChange, onSubmit } = useForm(
        submitCallback,
        initialState,
        validate
    );
    const { selectedTags, setSelectedTags, handleSelectTag, handleDeleteTag } =
        useSelectTag();

    // Handle Submit
    const handleSubmit = () => {
        let valid = true;

        if (!isFilesValid || (!mangaId && files.length === 0)) {
            setIsFilesValid(false);
            valid = false;
        }

        if (selectedTags.length === 0) {
            setTagError("Please select at least 1 tag!");
            valid = false;
        }

        if (!valid) {
            return;
        }

        const charactersList = characters.reduce((arr, character) => {
            if (character.value.trim() !== "") arr.push(character.value);
            return arr;
        }, []);
        const parodiesList = parodies.reduce((arr, parody) => {
            if (parody.value.trim() !== "") arr.push(parody.value);
            return arr;
        }, []);
        const sortedFiles = sortByFileName([].slice.call(files));

        var variables = {};

        // If have mangaId => update
        if (mangaId) {
            variables = {
                ...values,
                tags: selectedTags,
                characters: charactersList,
                parodies: parodiesList,
                files: sortedFiles,
                id: mangaId,
            };
        } else {
            variables = {
                ...values,
                tags: selectedTags,
                characters: charactersList,
                parodies: parodiesList,
                files: sortedFiles,
            };
        }

        mutateManga({
            variables: variables,
        });
    };

    function submitCallback() {
        handleSubmit();
    }

    if (loading) return <Loading />;
    if (error) console.log(JSON.stringify(error, null, 2));

    // Render
    return (
        <>
            <h2 className="p-3">
                <Icon icon="book" className="align-self-center me-3" />
                Manga Form
            </h2>
            <MangaFormInfo
                values={values}
                onChange={onChange}
                selectedTags={selectedTags}
                handleSelectTag={handleSelectTag}
                handleDeleteTag={handleDeleteTag}
                errors={errors}
                tagError={tagError}
            />
            <MangaFormCharacters
                characters={characters}
                setCharacters={setCharacters}
                parodies={parodies}
                setParodies={setParodies}
            />
            <MangaFormFiles
                isValid={isFilesValid}
                setIsValid={setIsFilesValid}
                setFiles={setFiles}
            />

            {/* Buttons to Go Back & Submit */}
            <div
                className="d-flex flex-row justify-content-center align-items-center py-2"
                style={{ margin: "1%" }}
            >
                <Link
                    className="btn btn-secondary d-flex justify-content-center align-items-center me-2"
                    style={{ color: "white" }}
                    to="/admin/manga"
                >
                    <Icon
                        icon="arrow-left"
                        style={{ color: "white", fontSize: "1.2rem" }}
                        className="align-self-center"
                    />
                    <b className="ps-2">Go Back</b>
                </Link>
                <button
                    className="btn btn-primary d-flex justify-content-center align-items-center"
                    style={{ color: "white" }}
                    onClick={onSubmit}
                >
                    <Icon
                        icon="caret-square-down"
                        style={{ color: "white", fontSize: "1.2rem" }}
                        className="align-self-center"
                    />
                    <b className="ps-2">Submit</b>
                </button>
            </div>
            {result.data && <GalleryPageList manga={result.data.getManga} />}
        </>
    );
};

export default MangaForm;

// Sort pages before upload
function sortByFileName(files) {
    try {
        return files.sort((a, b) =>
            parseInt(a.name.split(".")[0]) > parseInt(b.name.split(".")[0])
                ? 1
                : -1
        );
    } catch (err) {
        return files.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
}

// Generate Array of Object
function generateObjArray(array, title) {
    var items = [];

    for (var item of array) {
        items.push({
            key: `${title} ${items.length}`,
            value: item,
        });
    }

    return items;
}
