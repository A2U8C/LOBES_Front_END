import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import SummaryTable from "../../components/SummaryTable";
import {
  Autocomplete,
  Box,
  IconButton,
  Skeleton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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

async function getTableData(cols) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    name: "PD WG",
    endpoint_id: "https://endpoint.linkedearth.isi.edu/enigma_pd/query",
    projType: "WorkingGroup (E)",
    cols: cols,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  var url = "https://enigma-flask-api-mdm4nsgoyq-wl.a.run.app/";
  const data = fetch(url + "covariate/summary", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));

  return data;
}

function Summary() {
  const [options, setOptions] = useState([]);
  const [isOptionsLoading, setIsOptionsLoading] = useState(true);
  const [selected, setSelected] = useState();
  const [results, setResults] = useState();
  const [isTableLoading, setIsTableLoading] = useState(true);

  // Fetch Results Data
  useEffect(() => {
    const fetchData = async () => {
      setIsTableLoading(true);
      const cols = [
        "n",
        "Age (y), mean (SD)",
        "Female %",
        "DURILL (y), mean (SD)",
      ];
      const data = await getTableData(cols);
      setResults(data);
      setIsTableLoading(false);
    };

    setTimeout(fetchData, 2000);
  }, []);

  // Trigger on selecting covar to add
  const handleButtonClick = (covar) => {
    if (results.headers.includes(covar) || covar === undefined) {
      return;
    }

    const fetchData = async () => {
      setIsTableLoading(true);
      const cols = [...results.headers, covar];
      const data = await getTableData(cols);
      setResults(data);
      setIsTableLoading(false);
    };

    setTimeout(fetchData, 2000);
  };

  const fetchOptions = () => {
    const fetchData = async () => {
      setIsOptionsLoading(true);
      const data = await getOptions();
      setOptions(data);
      setIsOptionsLoading(false);
    };

    setTimeout(fetchData, 2000);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Header title="Summary Table" />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            minWidth: 250,
            px: 2,
            py: 3,
          }}
        >
          <Autocomplete
            options={options}
            loading={isOptionsLoading}
            fullWidth
            onChange={(event, newValue) => setSelected(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Covariate" variant="outlined" />
            )}
            onOpen={fetchOptions} // Fetch data dynamically when Autocomplete opens
          />
          <IconButton
            onClick={() => {
              handleButtonClick(selected);
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      {isTableLoading ? (
        <Skeleton variant="rounded" animation="wave" sx={{ height: 550 }} />
      ) : (
        <SummaryTable data={results} />
      )}
    </>
  );
}

export default Summary;
