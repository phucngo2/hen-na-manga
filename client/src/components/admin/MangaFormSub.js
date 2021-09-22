import React from "react";
import Icon from "../shared/Icon";

const MangaFormSub = ({ items, setItems, title, className }) => {
    const handleCreateItem = () => {
        setItems([
            ...items,
            {
                key: `${title} ${items.length}`,
                value: "",
            },
        ]);
    };

    const handleItemChange = (key, value) => {
        setItems(
            items.map((item) =>
                item.key !== key ? item : { key: item.key, value: value }
            )
        );
    };

    const handleDeteleItem = (key) => {
        setItems(items.filter((item) => item.key !== key));
    };

    return (
        <div className={`w-50 d-flex flex-column ${className}`}>
            <span style={{ margin: "1%" }}>{title}</span>
            <button
                className="btn btn-success"
                style={{ height: 40, width: 40, margin: "1%" }}
                onClick={handleCreateItem}
            >
                <Icon
                    icon="plus"
                    style={{
                        color: "white",
                    }}
                    className="align-self-center"
                />
            </button>
            {items.length > 0 &&
                items.map((item) => (
                    <div
                        className="w-100 d-flex flex-row"
                        style={{ margin: "1%" }}
                        key={item.key}
                    >
                        <input
                            className="form-control me-2"
                            type="text"
                            value={item.value}
                            onChange={(event) =>
                                handleItemChange(item.key, event.target.value)
                            }
                        />
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDeteleItem(item.key)}
                        >
                            <Icon
                                icon="times"
                                style={{
                                    color: "white",
                                }}
                                className="align-self-center"
                            />
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default MangaFormSub;
