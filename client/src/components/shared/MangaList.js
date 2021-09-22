// Libs
import React from "react";

// Components
import MangaItem from "./MangaItem";
import ElementWrapper from "../shared/ElementWrapper";
import CustomedModal from "./Modal";
import Icon from "./Icon";

const MangaList = ({
    title,
    mangaList,
    children,
    itemClassName = "",
    user,
    handleDelete,
    client,
}) => {
    return (
        <ElementWrapper className="py-3">
            {title}
            {children !== null ? children : <></>}
            <div className="row m-0 pt-3 px-1 w-100">
                {mangaList.map((item) => {
                    if (handleDelete) {
                        return (
                            // If have deleteBtn => show with Modal on confirm
                            <div
                                key={`${title} ${item.code}`}
                                className={`manga-item ${itemClassName}`}
                                style={{ paddingTop: 14, paddingRight: 14 }}
                            >
                                <CustomedModal
                                    Component={
                                        <button
                                            className="d-flex justify-content-center align-items-center btn btn-danger rounded-circle p-1"
                                            style={{
                                                color: "white",
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                                height: 28,
                                                width: 28,
                                            }}
                                            onClick={(event) =>
                                                event.preventDefault()
                                            }
                                        >
                                            <Icon
                                                icon="times"
                                                style={{
                                                    color: "white",
                                                }}
                                            />
                                        </button>
                                    }
                                    header="Warning"
                                    content="Are you sure want to delete?"
                                    handleDelete={() =>
                                        handleDelete({
                                            variables: {
                                                userId: user.id,
                                                mangaId: item.id,
                                            },
                                        })
                                    }
                                />

                                <MangaItem
                                    mangaItem={item}
                                    itemClassName={itemClassName}
                                />
                            </div>
                        );
                    }

                    return (
                        <div
                            key={`${title} ${item.code}`}
                            className={`manga-item ${itemClassName}`}
                        >
                            <MangaItem mangaItem={item} />
                        </div>
                    );
                })}
            </div>
        </ElementWrapper>
    );
};

export default MangaList;
