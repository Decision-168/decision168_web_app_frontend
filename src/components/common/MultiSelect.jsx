import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

const MultiSelect = ({ data, labelKey, valueKey, parentCallback }) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [availableOptions, setAvailableOptions] = useState(data);

    console.log(selectedValues);

    const handleSelectionChange = (event, newValues) => {
        setSelectedValues(newValues);
        setAvailableOptions(data.filter((option) => !newValues.includes(option)));
        parentCallback(newValues); // Pass selected values to the parent component if needed
    };

    return (
        <React.Fragment>
            <h5 style={{ marginBottom: "1rem", textAlign: "left" }}>
                You selected:{" "}
                <span style={{ color: "dodgerblue", fontWeight: "800" }}>
                    {selectedValues
                        .map((value, i, arr) =>
                            arr.length > 1 && arr.length - 1 === i ? ` and ${value[labelKey]}.` : value[labelKey]
                        )
                        .join(", ") || "Nothing yet"}
                </span>
            </h5>
            <Autocomplete
                multiple
                value={selectedValues}
                style={{ width: "40%" }}
                options={availableOptions}
                getOptionLabel={(option) => option[labelKey]}
                getOptionSelected={(option, value) => option[valueKey] === value[valueKey]}
                onChange={handleSelectionChange}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                renderInput={(params) => {
                    return <TextField label={`Select ${labelKey}`} {...params} />;
                }}
            ></Autocomplete>
        </React.Fragment>
    );
};

export default MultiSelect;
