import React from "react";
import Header from "../../components/Header";
import { Paper } from "@mui/material";
import InfoTabs from "../../components/InfoTabs";

function Projects() {
  const data = {
    headers: ["PD proj FS", "PD proj TBSS"],
    data: [
      {
        desc: "FreeSurfer (FS)",
        // publication:
        //   "Https://movementdisorders.onlinelibrary.wiley.com/doi/10.1002/mds.28706? cf chl jschl tk =pmd EfevNtCgW4tJo4HD1owtwNl4aHqISn6t jYZVzAbTTw-1635285429-0-gqNtZGzNAiWjcnBszQqR",
        publication: {
          name: "International Multicenter Analysis of Brain Structure Across Clinical Stages of Parkinson's Disease",
          url: "Https://movementdisorders.onlinelibrary.wiley.com/doi/10.1002/mds.28706? cf chl jschl tk =pmd EfevNtCgW4tJo4HD1owtwNl4aHqISn6t jYZVzAbTTw-1635285429-0-gqNtZGzNAiWjcnBszQqR",
        },
        cohorts: [
          {
            val: "CHRISTCHURCH",
            exists: true,
          },
          {
            val: "ROME",
            exists: true,
          },
          {
            val: "ARMENIA",
            exists: false,
          },
          {
            val: "GRAZ",
            exists: true,
          },
          {
            val: "VUMC2",
            exists: false,
          },
          {
            val: "SHANGHAI",
            exists: false,
          },
          {
            val: "UPENN",
            exists: true,
          },
          {
            val: "STANFORD",
            exists: true,
          },
          {
            val: "STELLENBOSCH",
            exists: false,
          },
          {
            val: "AMSTERDAM",
            exists: true,
          },
          {
            val: "BERN",
            exists: true,
          },
          {
            val: "CAMPINAS",
            exists: true,
          },
          {
            val: "NW-ENGLAND",
            exists: false,
          },
          {
            val: "OXFORD",
            exists: true,
          },
          {
            val: "PPMI",
            exists: true,
          },
          {
            val: "RADBOUD",
            exists: false,
          },
          {
            val: "TAIWAN",
            exists: true,
          },
          {
            val: "UCSF",
            exists: false,
          },
          {
            val: "UKBB",
            exists: false,
          },
          {
            val: "UVA",
            exists: false,
          },
          {
            val: "COGTIPS",
            exists: false,
          },
          {
            val: "BRISBANE",
            exists: false,
          },
          {
            val: "CHARLOTTESVILLE",
            exists: true,
          },
          {
            val: "DONDERS",
            exists: true,
          },
          {
            val: "LIEGE",
            exists: true,
          },
          {
            val: "MILAN",
            exists: true,
          },
          {
            val: "NEUROCON",
            exists: true,
          },
          {
            val: "ONJAPAN",
            exists: true,
          },
          {
            val: "TAO WU",
            exists: false,
          },
          {
            val: "UDAL",
            exists: false,
          },
        ],
        person: {
          name: "Ysbrand van der Werf",
          email: "",
          education: "",
        },
        brainScanType: "T1-Weighted MRI",
        summary: {
          headers: [
            "Site",
            "Cohorts",
            "n",
            "Age (y), mean (SD)",
            "Female %",
            "DURILL (y), mean (SD)",
          ],
          subHeaders: ["", "", "HC", "PD", "HC", "PD", "HC", "PD", "HC", "PD"],
          rows: [
            {
              Site: "Amsterdam",
              Cohorts: ["Amsterdam I", "Amsterdam II"],
              n: [
                {
                  HC: "44",
                  PD: "138",
                },
                {
                  HC: "0",
                  PD: "61",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "56.5 (9.48)",
                  PD: "63.1 (10.81)",
                },
                {
                  HC: "NA",
                  PD: "62.5 (7.08)",
                },
              ],
              "Female %": [
                {
                  HC: "39",
                  PD: "38",
                },
                {
                  HC: "NA",
                  PD: "39",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "2.1 (3.39)",
                },
                {
                  HC: "NA",
                  PD: "5.3 (3.54)",
                },
              ],
            },
            {
              Site: "Bern",
              Cohorts: ["BE I", "BEII"],
              n: [
                {
                  HC: "32",
                  PD: "52",
                },
                {
                  HC: "30",
                  PD: "3",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "54.1 (9.78)",
                  PD: "62.9 (10.38)",
                },
                {
                  HC: "68.2 (4.59)",
                  PD: "59.7 (6.66)",
                },
              ],
              "Female %": [
                {
                  HC: "30",
                  PD: "52",
                },
                {
                  HC: "70",
                  PD: "67",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "12.4 (4.29)",
                },
                {
                  HC: "NA",
                  PD: "11.3 (7.57)",
                },
              ],
            },
            {
              Site: "Campinas",
              Cohorts: ["UNICAMP"],
              n: [
                {
                  HC: "138",
                  PD: "110",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "58.9 (7.91)",
                  PD: "59.9 (10.2)",
                },
              ],
              "Female %": [
                {
                  HC: "63",
                  PD: "34",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "7.3 (6.41)",
                },
              ],
            },
            {
              Site: "Chang Gung",
              Cohorts: ["CGU"],
              n: [
                {
                  HC: "223",
                  PD: "327",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "61 (7.28)",
                  PD: "60.1 (9.63)",
                },
              ],
              "Female %": [
                {
                  HC: "54",
                  PD: "43",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "8.7 (6.33)",
                },
              ],
            },
            {
              Site: "Charlottesville",
              Cohorts: ["UVA I", "UVA II", "UVA III"],
              n: [
                {
                  HC: "0",
                  PD: "116",
                },
                {
                  HC: "0",
                  PD: "37",
                },
                {
                  HC: "0",
                  PD: "24",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "63.7 (8.52)",
                },
                {
                  HC: "NA",
                  PD: "62.4 (9.59)",
                },
                {
                  HC: "NA",
                  PD: "70.8 (6.77)",
                },
              ],
              "Female %": [
                {
                  HC: "NA",
                  PD: "14",
                },
                {
                  HC: "NA",
                  PD: "29",
                },
                {
                  HC: "NA",
                  PD: "26",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "89.7 (5.09)",
                },
                {
                  HC: "NA",
                  PD: "8.7 (3.64)",
                },
                {
                  HC: "NA",
                  PD: "7.7 (3.23)",
                },
              ],
            },
            {
              Site: "Christchurch",
              Cohorts: ["PDNZ"],
              n: [
                {
                  HC: "39",
                  PD: "209",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "67.5 (8.52)",
                  PD: "69.4 (7.77)",
                },
              ],
              "Female %": [
                {
                  HC: "33",
                  PD: "26",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "5.7 (5.57)",
                },
              ],
            },
            {
              Site: "Donders",
              Cohorts: ["Donders"],
              n: [
                {
                  HC: "23",
                  PD: "59",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "62.7 (10.29)",
                  PD: "60.8 (10.07)",
                },
              ],
              "Female %": [
                {
                  HC: "48",
                  PD: "44",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "4.4 (3.79)",
                },
              ],
            },
            {
              Site: "Graz",
              Cohorts: ["PROMOVE/ASPS I", "PROMOVE/ASPS II"],
              n: [
                {
                  HC: "124",
                  PD: "100",
                },
                {
                  HC: "0",
                  PD: "23",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "63.4 (10.07)",
                  PD: "63.2 (10.15)",
                },
                {
                  HC: "NA",
                  PD: "64 (9.9)",
                },
              ],
              "Female %": [
                {
                  HC: "27",
                  PD: "29",
                },
                {
                  HC: "NA",
                  PD: "22",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "4.7 (4.77)",
                },
                {
                  HC: "NA",
                  PD: "4 (5.69)",
                },
              ],
            },
            {
              Site: "Liege",
              Cohorts: ["Liege I", "Liege II"],
              n: [
                {
                  HC: "33",
                  PD: "30",
                },
                {
                  HC: "43",
                  PD: "45",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "65.8 (4.29)",
                  PD: "65.9 (6.61)",
                },
                {
                  HC: "64.8 (8.33)",
                  PD: "66.9 (8.24)",
                },
              ],
              "Female %": [
                {
                  HC: "45",
                  PD: "37",
                },
                {
                  HC: "49",
                  PD: "44",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "7.2 (5.32)",
                },
                {
                  HC: "NA",
                  PD: "6 (3.93)",
                },
              ],
            },
            {
              Site: "Milan",
              Cohorts: ["Milan"],
              n: [
                {
                  HC: "10",
                  PD: "44",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "53.3 (10.53)",
                  PD: "57.8 (7.71)",
                },
              ],
              "Female %": [
                {
                  HC: "70",
                  PD: "32",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "11.4 (3.38)",
                },
              ],
            },
            {
              Site: "NEUROCON",
              Cohorts: ["NEUROCON"],
              n: [
                {
                  HC: "15",
                  PD: "27",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "66.7 (11.74)",
                  PD: "68.7 (10.55)",
                },
              ],
              "Female %": [
                {
                  HC: "80",
                  PD: "37",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "NA",
                },
              ],
            },
            {
              Site: "NW‐England",
              Cohorts: ["NW‐England I", "NW‐England II"],
              n: [
                {
                  HC: "22",
                  PD: "32",
                },
                {
                  HC: "13",
                  PD: "14",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "70 (7.27)",
                  PD: "69.9 (8.58)",
                },
                {
                  HC: "64.6 (4.13)",
                  PD: "65 (5.67)",
                },
              ],
              "Female %": [
                {
                  HC: "45",
                  PD: "19",
                },
                {
                  HC: "38",
                  PD: "29",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "6.8 (4.42)",
                },
                {
                  HC: "NA",
                  PD: "9.2 (6.02)",
                },
              ],
            },
            {
              Site: "ON Japan",
              Cohorts: ["ON Japan"],
              n: [
                {
                  HC: "15",
                  PD: "30",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "63.3 (5.25)",
                  PD: "67.6 (6.81)",
                },
              ],
              "Female %": [
                {
                  HC: "53",
                  PD: "57",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "NA",
                },
              ],
            },
            {
              Site: "Oxford",
              Cohorts: ["Oxford DISCOVERY"],
              n: [
                {
                  HC: "57",
                  PD: "115",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "65.6 (8.2)",
                  PD: "63.9 (10.05)",
                },
              ],
              "Female %": [
                {
                  HC: "39",
                  PD: "36",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "2.3 (1.58)",
                },
              ],
            },
            {
              Site: "Pennsylvania",
              Cohorts: ["UDALL/U19"],
              n: [
                {
                  HC: "11",
                  PD: "112",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "70.1 (5.86)",
                  PD: "66.4 (7.87)",
                },
              ],
              "Female %": [
                {
                  HC: "55",
                  PD: "32",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "7.3 (5.48)",
                },
              ],
            },
            {
              Site: "PPMI",
              Cohorts: ["PPMI 1‐21"],
              n: [
                {
                  HC: "163",
                  PD: "347",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "63.6 (16.73)",
                  PD: "62.9 (8.19)",
                },
              ],
              "Female %": [
                {
                  HC: "36",
                  PD: "35",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "0.6 (0.52)",
                },
              ],
            },
            {
              Site: "Rome SLF",
              Cohorts: ["Rome SLF"],
              n: [
                {
                  HC: "125",
                  PD: "239",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "36.6 (10.63)",
                  PD: "62.7 (10.19)",
                },
              ],
              "Female %": [
                {
                  HC: "41",
                  PD: "37",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "0.6 (0.52)",
                },
              ],
            },
            {
              Site: "Stanford",
              Cohorts: ["Stanford"],
              n: [
                {
                  HC: "11",
                  PD: "44",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "65.6 (6.47)",
                  PD: "68.6 (8.49)",
                },
              ],
              "Female %": [
                {
                  HC: "82",
                  PD: "50",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "5.6 (3.44)",
                },
              ],
            },
            {
              Site: "Tao Wu",
              Cohorts: ["Tao Wu"],
              n: [
                {
                  HC: "20",
                  PD: "19",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "64.8 (5.58)",
                  PD: "65 (4.45)",
                },
              ],
              "Female %": [
                {
                  HC: "40",
                  PD: "47",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "5.3 (4)",
                },
              ],
            },
            {
              Site: "Total",
              Cohorts: [""],
              n: [
                {
                  HC: "1182",
                  PD: "2357",
                },
              ],
              "Age (y), mean (SD)": [
                {
                  HC: "59.4 (12.31)",
                  PD: "63.4 (9.77)",
                },
              ],
              "Female %": [
                {
                  HC: "46",
                  PD: "36",
                },
              ],
              "DURILL (y), mean (SD)": [
                {
                  HC: "NA",
                  PD: "5.5 (5.47)",
                },
              ],
            },
          ],
        },
      },
      {
        desc: "Tract-based spatial-statistics (TBSS)",
        publication: { name: "", url: "#" },
        cohorts: [
          {
            val: "CHRISTCHURCH",
            exists: true,
          },
          {
            val: "ROME",
            exists: true,
          },
          {
            val: "ARMENIA",
            exists: false,
          },
          {
            val: "GRAZ",
            exists: true,
          },
          {
            val: "VUMC2",
            exists: true,
          },
          {
            val: "SHANGHAI",
            exists: false,
          },
          {
            val: "UPENN",
            exists: true,
          },
          {
            val: "STANFORD",
            exists: true,
          },
          {
            val: "STELLENBOSCH",
            exists: true,
          },
          {
            val: "AMSTERDAM",
            exists: false,
          },
          {
            val: "BERN",
            exists: false,
          },
          {
            val: "CAMPINAS",
            exists: true,
          },
          {
            val: "NW-ENGLAND",
            exists: false,
          },
          {
            val: "OXFORD",
            exists: true,
          },
          {
            val: "PPMI",
            exists: true,
          },
          {
            val: "RADBOUD",
            exists: true,
          },
          {
            val: "TAIWAN",
            exists: true,
          },
          {
            val: "UCSF",
            exists: true,
          },
          {
            val: "UKBB",
            exists: true,
          },
          {
            val: "UVA",
            exists: true,
          },
          {
            val: "COGTIPS",
            exists: true,
          },
          {
            val: "BRISBANE",
            exists: false,
          },
          {
            val: "CHARLOTTESVILLE",
            exists: false,
          },
          {
            val: "DONDERS",
            exists: false,
          },
          {
            val: "LIEGE",
            exists: false,
          },
          {
            val: "MILAN",
            exists: false,
          },
          {
            val: "NEUROCON",
            exists: false,
          },
          {
            val: "ONJAPAN",
            exists: false,
          },
          {
            val: "TAO WU",
            exists: false,
          },
          {
            val: "UDAL",
            exists: false,
          },
        ],
        person: {
          name: "Conor Owens-Walton",
          email: "",
          education: "",
        },
        brainScanType: "DWI MRI",
      },
    ],
  };
  return (
    <>
      <Header title="Projects" />

      <Paper>
        <InfoTabs headers={data.headers} data={data.data} />
      </Paper>
    </>
  );
}

export default Projects;
