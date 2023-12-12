import React, { useEffect, useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Fab,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

async function getOptions() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: "PD WG",
    endpoint_id: "https://endpoint.linkedearth.isi.edu/enigma_pd/query",
    projType: "WorkingGroup (E)",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  var url = "https://enigma-flask-api-mdm4nsgoyq-wl.a.run.app/";
  const data = fetch(url + "covariate", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));

  return data;
}
function QueryBlock({
  options,
  queryBlocks,
  setQueryBlocks,
  id,
  optionsLoading,
}) {
  const [inputValues, setInputValues] = useState({
    cov1: "",
    cov2: "",
  });

  const updateQB = (index, key, newValue) => {
    var copyQueryBlocks = [...queryBlocks];
    copyQueryBlocks[index] = {
      ...copyQueryBlocks[index],
      values: {
        ...copyQueryBlocks[index].values,
        [key]: newValue,
      },
    };
    setQueryBlocks(copyQueryBlocks);
  };

  return (
    <Box width="100%" sx={{ px: 3, py: 2, display: "flex", gap: 2 }}>
      {/* 1st Autocomplete  */}
      <Autocomplete
        options={options}
        loading={optionsLoading}
        value={queryBlocks[id].values["cov1"]}
        onChange={(_, newVal) => {
          updateQB(id, "cov1", newVal);
        }}
        inputValue={inputValues["cov1"]}
        onInputChange={(_, newInputVal) => {
          var updatedInputVal = {
            ...inputValues,
            cov1: newInputVal,
          };
          setInputValues(updatedInputVal);
        }}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} required label="Covariate" />
        )}
      />

      {/* AND/OR Button  */}
      <Button
        variant="contained"
        sx={{ fontWeight: "bolder" }}
        onClick={() => {
          updateQB(
            id,
            "opr",
            queryBlocks[id].values.opr === "and" ? "or" : "and"
          );
        }}
      >
        {queryBlocks[id].values.opr}
      </Button>

      {/* 2nd Autocomplete  */}
      <Autocomplete
        options={options}
        loading={optionsLoading}
        fullWidth
        value={queryBlocks[id].values["cov2"]}
        onChange={(_, newVal) => {
          updateQB(id, "cov2", newVal);
        }}
        inputValue={inputValues["cov2"]}
        onInputChange={(_, newInputVal) => {
          var updatedInputVal = {
            ...inputValues,
            cov2: newInputVal,
          };
          setInputValues(updatedInputVal);
        }}
        renderInput={(params) => (
          <TextField {...params} required label="Covariate" />
        )}
      />
    </Box>
  );
}

function QuerySelector({ setResults, setIsLoading }) {
  // Get Options Here
  const [isOptionsLoading, setIsOptionsLoading] = useState(true);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsOptionsLoading(true);
      const data = await getOptions();

      // console.log(data);
      setOptions(data);
      setIsOptionsLoading(false);
    };

    setTimeout(fetchData, 2000);
  }, []);

  const [queryBlocks, setQueryBlocks] = useState([
    {
      id: 0,
      component: <QueryBlock options={options} />,
      values: {
        cov1: options.length ? options[0] : "",
        opr: "and",
        cov2: options.length ? options[0] : "",
      },
    },
  ]);

  const [middleOperators, setMiddleOperators] = useState([]);

  const addQueryBlock = () => {
    // Add to Query Blocks List
    const newBlocks = [
      ...queryBlocks,
      {
        id: queryBlocks.length,
        component: <QueryBlock options={options} />,
        values: {
          cov1: options[0],
          opr: "and",
          cov2: options[0],
        },
      },
    ];

    setQueryBlocks(newBlocks);

    // Add Middle Operator value
    const newData = [...middleOperators, "and"];
    setMiddleOperators(newData);
  };

  const deleteQueryBlock = (index) => {
    if (queryBlocks.length <= 1) {
      return;
    }

    var updateVal = [...queryBlocks];
    updateVal.splice(index, 1);
    setQueryBlocks(updateVal);

    // Delete from middle operator
    var updatedMiddleOpe = [...middleOperators];
    if (updateVal.length === 0) {
      updatedMiddleOpe = [];
    } else if (index === updatedMiddleOpe.length) {
      updatedMiddleOpe.splice(index - 1, 1);
    } else {
      updatedMiddleOpe.splice(index, 1);
    }
    setMiddleOperators(updatedMiddleOpe);
  };

  const changeMiddleOperator = (index) => {
    const newData = [...middleOperators];
    newData[index] = newData[index] === "and" ? "or" : "and";
    setMiddleOperators(newData);
  };

  const handelSearch = async () => {
    var body = JSON.stringify({
      name: "PD WG",
      endpoint_id: "https://endpoint.linkedearth.isi.edu/enigma_pd/query",
      projType: "WorkingGroup (E)",
      covars: [].concat(...queryBlocks.map((obj) => obj.values)),
      midOprs: [].concat(...middleOperators),
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: body,
      redirect: "follow",
    };

    setIsLoading(true);
    var url = "https://enigma-flask-api-mdm4nsgoyq-wl.a.run.app/";
    // Send To back end and get response
    fetch(url + "covariate/search", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setResults(result);
      })
      .catch((error) => console.log("error", error));

    setIsLoading(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          overflowY: "scroll",
          height: 350,
        }}
      >
        {queryBlocks.map((block, index) => {
          const QueryComponent = React.cloneElement(block.component, {
            options: options,
            queryBlocks: queryBlocks,
            setQueryBlocks: setQueryBlocks,
            id: index,
            optionsLoading: isOptionsLoading,
          });
          return (
            <Box key={index}>
              {index > 0 && (
                <Button
                  variant="contained"
                  sx={{ px: 3 }}
                  onClick={() => {
                    changeMiddleOperator(index - 1);
                  }}
                >
                  <Typography sx={{ fontSize: 15, fontWeight: "bolder" }}>
                    {middleOperators[index - 1]}
                  </Typography>
                </Button>
              )}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {QueryComponent}
                <IconButton
                  sx={{ height: 50, width: 50 }}
                  onClick={() => deleteQueryBlock(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          right: 50,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Fab color="secondary" onClick={addQueryBlock}>
          <AddIcon />
        </Fab>

        <Fab
          color="secondary"
          onClick={handelSearch}
          disabled={queryBlocks?.length < 1}
        >
          <SendIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default QuerySelector;
