import React from "react";

import SettingElementWrapper from "../setting/SettingElementWrapper";
import MangaFormSub from "./MangaFormSub";

const MangaFormCharacters = ({
    characters,
    setCharacters,
    parodies,
    setParodies,
}) => {
    return (
        <SettingElementWrapper className="px-3 manga-form-width">
            <div className="w-100 py-3 d-flex flex-row">
                <MangaFormSub
                    items={characters}
                    setItems={setCharacters}
                    title="Characters"
                    key="Characters"
                    className="me-2"
                />
                <MangaFormSub
                    items={parodies}
                    setItems={setParodies}
                    title="Parodies"
                    key="Parodies"
                    className="ms-2"
                />
            </div>
        </SettingElementWrapper>
    );
};

export default MangaFormCharacters;
