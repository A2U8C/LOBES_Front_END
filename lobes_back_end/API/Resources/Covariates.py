from flask_restful import Resource, abort
from flask import request

from Common.queryer import Queryer
from Common import QueryBuilder as QB

from .Cohorts import CohortList

# from collections import defaultdict

from constants import missing_datasets

# Needs to be changed
dict_covar = {}
dict_covar["Has cognitive (E)"] = ['WordListLearningTask (E)', 'DigitSpanBackward (E)',
                                   'Rey_OsterriethComplexFigureTest (E)', 'SWCT (E)', 'SentencesConstruction (E)',
                                   'PhonologicalAndSemanticVerbalFluencyTest (E)', 'TrialMakingTestA-B (E)',
                                   'Reys15WordTest (E)', 'DigitSpanForward (E)', 'MoCA (E)', 'MMSE (E)',
                                   'OtherCognitiveCovariates (E)', 'WCST-SF (E)', 'PD_DementiaDiagnosis (E)',
                                   'MildCognitiveImpairmentDiagnosis (E)', 'Name (E)']
dict_covar["Has PD Demographics (E)"] = ['MDS-UPDRSTotal (E)', 'CityDwelling (E)', 'SCOPA-Sleep (E)', 'SubjectSES (E)',
                                         'SCOPA-Cognition (E)', 'OtherMotorEvaluation (E)', 'Iq (E)', 'UPDRSTotal (E)',
                                         'Sex (E)', 'SideOfOnset (E)', 'OtherMedUseLifetime (E)', 'MDS-UPDRS-3 (E)',
                                         'MDS-UPDRS-2 (E)', 'MDS-UPDRS-1 (E)', 'Comorbidities (E)', 'UPSIT (E)',
                                         'Age (E)', 'PDMedicationUseLifetime (E)', 'MDS-UPDRS-4 (E)',
                                         'HoehnAndYahrStage (E)', 'RBDDiagnosis (E)', 'UPDRS-1 (E)', 'UPDRS-2 (E)',
                                         'RaceEthnicity (E)', 'Handedness (E)', 'UPDRS-3 (E)', 'SCOPA-Autonomic (E)',
                                         'SCOPA-Motor (E)', 'Education (E)', 'PatientMedicationOnOffDuringUPDRS (E)',
                                         'Durill (E)', 'OtherDemographics (E)', 'UPDRS-4 (E)', 'MaritalStatus (E)',
                                         'PDMotorSubtype (E)', 'SubjID (E)', 'DiagnosisConfirmed (E)', 'SE-ADLS (E)',
                                         'OtherPDDiagnosisData (E)', 'Occupation (E)', 'OtherEnvironmentalFactors (E)',
                                         'SCOPA-Psychiatric (E)', 'RSGE-PD (E)', 'AgeOfPDOnset (E)', 'Dx (E)',
                                         'LEDDScore (E)', 'PDMedicationUseCurrent (E)', 'OtherMedUseCurrent (E)',
                                         'Name (E)']
dict_covar["Has neuropsychiatric (E)"] = ['SASDQ (E)', 'RBD1Q (E)', 'RBDSQ (E)', 'STAXI (E)', 'BAI (E)', 'TAS-20 (E)',
                                          'IDS (E)', 'ISI (E)', 'ESS (E)', 'WOQ (E)', 'GDI (E)', 'UM-PDHQ (E)',
                                          'QPE (E)', 'PANNS (E)', 'KSS (E)', 'HAMA (E)', 'STAI (E)',
                                          'OtherNeuropsychiatricCovariates (E)', 'SHAPS (E)', 'AES (E)', 'BDI (E)',
                                          'PSQI (E)', 'MADRS (E)', 'PAS (E)', 'PDSS (E)', 'SAPS-PD (E)', 'QUIP-rs (E)',
                                          'AS (E)', 'HRDS (E)', 'PPRS (E)', 'Name (E)']


class CovariatePropertyList(Resource):
    def get(self, covariate_name):
        abort(403, message="Forbidden Method")

    def post(self, covariate_name):

        covariate_name = covariate_name.replace("_", " ")
        return dict_covar[covariate_name] if covariate_name in dict_covar.keys() else {}


# Needs to be changed
all_covariates = {"Cognitive": "Has cognitive (E)", "Demographic": "Has PD Demographics (E)",
                  "Neuro Psychiatric": "Has neuropsychiatric (E)"}


class all_CovariatesList(Resource):
    def get(self):
        abort(403, message="Forbidden Method")

    def post(self):

         # Get the list of all covariates

         # TODO: Do we need subgrouping (group according to covar type)
        pd_covariates = ["Cognitive (E)", "Demographics (E)", "Neuropsychiatric (E)"]
        covar_list = []
        body = request.get_json()

        for covar in pd_covariates:
            obj = Queryer(body['endpoint_id'])
            qb = QB.QueryBuilder()

            query = f''' 
                ?project ?pred ?projectClass.
                ?project rdfs:label "{covar}".

                ?projectClass rdfs:label ?label
            '''

            qb.set_query(query=query, vars = ["?label"])
            response = obj.request(qb.get_query())
            
            for val in response:
                n =  val["label"]["value"].replace("(E)","").rstrip()
                if n not in covar_list:
                    # Temp fix for Durill
                    if n == "IllnessDuration":
                        covar_list.append("Durill")
                        continue
                    covar_list.append(n)

        return covar_list


class CovariateCohortList(Resource):
    def get(self, covariate_name, covariate_prop_name):
        abort(403, message="Forbidden Method")

    def post(self, covariate_name, covariate_prop_name):
        body = request.get_json()
        obj = Queryer(body['endpoint_id'])

        covariate_name = covariate_name.replace("_", " ")
        covariate_prop_name = covariate_prop_name.replace("_", " ")


        query = f'''
            ?project a ?projectClass.
            ?projectClass rdfs:label "{body['projType']}".

            ?projectName rdfs:label "{body['name']}" . 
            ?project ?hasCohort ?cohortURI.

  			?cohortURI ?propName ?ProjNameURI . 
  			?propName rdfs:label "{covariate_name}".

  			?ProjNameURI ?propCogName ?propProperty .
  			?propCogName rdfs:label "{covariate_prop_name}" .
  			
  			filter(?propProperty != false && ?propProperty != "FALSE") .

  			?cohortURI rdfs:label ?cohortName .

        '''

        vars = ['?cohortName']

        qb = QB.QueryBuilder()
        qb.set_query(query=query, vars=vars)

        response = obj.request(qb.get_query())

        print(qb.get_query())

        # dict_cohort_part={}
        # all_cohorts=CohortList().post()
        # all_cohorts=[i["cohortName"]["value"] for i in all_cohorts]
        # givenpresent=[i["cohortName"]["value"] for i in response]
        # givenabsent=list(set(all_cohorts)-missing_datasets-set(givenpresent))
        # dict_cohort_part["GivenPresent"]=givenpresent
        # dict_cohort_part["GivenAbsent"]=givenabsent
        # dict_cohort_part["Missing"]=list(missing_datasets)

        dict_cohort_part = {}
        cohortList_post = CohortList().post()
        all_cohorts = cohortList_post["presentCohorts"] + cohortList_post["Missing"]
        # print(all_cohorts)
        dict_cohort_part["all_cohorts"] = list(all_cohorts)

        givenpresent = [i["cohortName"]["value"] for i in response]
        givenabsent = list(set(all_cohorts) - missing_datasets - set(givenpresent))
        dict_cohort_part["GivenPresent"] = givenpresent
        dict_cohort_part["GivenAbsent"] = givenabsent
        dict_cohort_part["Missing"] = list(missing_datasets)

        return dict_cohort_part



class CovariateIntersectionCohorts(Resource):
    def get(self):
        abort(403, message="Forbidden Method")

    def post(self):
        body = request.get_json()

        obj = Queryer(body['endpoint_id'])


        pd_covars = ["Has PD Demographics (E)","Has cognitive (E)","Has neuropsychiatric (E)"]

        individual_quries = list()

        for covars in body['covars']:
            covar1 = covars["cov1"]
            covar2 = covars["cov2"]

            covar1_cohorts = set()
            covar2_cohorts = set()

            # Checking for all 3 Covariate types
            # TODO: Change to get value from response 
            for covar_type in pd_covars:      
                query = f'''
                    ?project ?pred ?projectClass.  
                    ?projectClass rdfs:label "{body["projType"]}".
                    
                    ?project rdfs:label "{body["name"]}".
                    
                    ?project ?hasCohorts ?cohortURI.
                    ?hasCohorts rdfs:label "HasCohort (E)".
                    
                    ?cohortURI rdfs:label ?cohortName.
                    ?cohortURI ?hasCovar ?covarURI.
                    ?hasCovar rdfs:label "{covar_type}".
                    
                    ?covarURI ?hasProps ?props . 
                    ?hasProps rdfs:label "{covar1} (E)".
                '''

                qb = QB.QueryBuilder()
                qb.set_query(query=query, vars = ["?cohortName" ,"?props"])

                res = obj.request(qb.get_query())

                if(len(res)):
                    for val in res:
                        keys = val["props"].keys()
                        if "datatype" in keys: 
                            if val["props"]["datatype"].split("#")[-1] == "boolean":
                                if val["props"]["value"].lower() == "true":
                                    covar1_cohorts.add(val["cohortName"]["value"])
                    
                    break
            
            for covar_type in pd_covars:
                query = f'''
                ?project ?pred ?projectClass.  
                ?projectClass rdfs:label "{body["projType"]}".
                
                ?project rdfs:label "{body["name"]}".
                
                ?project ?hasCohorts ?cohortURI.
                ?hasCohorts rdfs:label "HasCohort (E)".
                
                ?cohortURI rdfs:label ?cohortName.
                ?cohortURI ?hasCovar ?covarURI.
                ?hasCovar rdfs:label "{covar_type}".
                
                ?covarURI ?hasProps ?props . 
                ?hasProps rdfs:label "{covar2} (E)".
                '''
        
                qb = QB.QueryBuilder()
                qb.set_query(query=query, vars = ["?cohortName" ,"?props"])

                res = obj.request(qb.get_query())

                if(len(res)):
                    for val in res:
                        keys = val["props"].keys()
                        if "datatype" in keys: 
                            if val["props"]["datatype"].split("#")[-1] == "boolean":
                                if val["props"]["value"].lower() == "true":
                                    covar2_cohorts.add(val["cohortName"]["value"])
                        
                    break

            if covars["opr"] == "and":
                new_set = covar1_cohorts.intersection(covar2_cohorts)
            else:
                new_set = covar1_cohorts.union(covar2_cohorts)
            
            individual_quries.append(new_set)
        

        toReturn = set()

        if not len(body["midOprs"]):
            return list(individual_quries.pop())
    
        for i in range(len(body['midOprs'])):
            opr = body['midOprs'][i]

            if not len(toReturn):
                if opr == "and":
                    toReturn = individual_quries[i].intersection(individual_quries[i+1])
                else:
                    toReturn = individual_quries[i].union(individual_quries[i+1])
            else:
                 if opr == "and":
                    toReturn = toReturn.intersection(individual_quries[i+1])
                 else:
                    toReturn = toReturn.union(individual_quries[i+1])

        return list(toReturn)

        # f_val=""
        # if len(cohort_dict.keys())==0:
        #     return {}

        # for i in cohort_dict.keys():
        #     val=""
        #     # if i=="Has neuropsychiatric (E)":
        #     cov_label=i.split(" ")[1]+"Name"
        #     cov_uri="has"+i.split(" ")[1]+"URI"
        #     cov_prop=i.split(" ")[1]+"Prop"

        #     val +=f'''
                
        #         ?cohortURI ?{cov_label} ?{cov_uri} .
        #         ?{cov_label} rdfs:label "{i}".
        #         '''

        #     mid_el=i.split(" ")[1]+"_URI"
        #     for ind,j in enumerate(cohort_dict[i]):
        #         val+=f'''
        #         ?{cov_uri} ?{cov_prop}_{str(ind)} ?{mid_el} . 
        #         ?{cov_prop}_{str(ind)} rdfs:label "{j}" .
        #         '''
        #     val+=f'''
        #         filter(?{mid_el} = true) .
        #         '''

        #     f_val+=val


        # query = f'''
        #             ?project a ?projectClass.
        #             ?projectClass rdfs:label "{body['projType']}".
        
        #             ?projectName rdfs:label "{body['name']}" . 
        #             ?project ?hasCohort ?cohortURI.
                    
        #             ?cohortURI rdfs:label ?cohortName .'''+f_val

        # vars = ['?cohortName']

        # qb = QB.QueryBuilder()
        # qb.set_query(query=query, vars=vars)

        # print(qb.get_query())

        # response = obj.request(qb.get_query())

        # dict_cohort_part = {}
        # array_coh=[i["cohortName"]["value"] for i in response]
        # dict_cohort_part["all_present"] = array_coh

        # name_val=""
        # for k in cohort_dict.keys():
        #     name_val+=k+": "
        #     for ind,v in enumerate(cohort_dict[k]):
        #         name_val+=(" " if ind==0 else ", ")+v
        #     name_val+="!@#$!@#"

        # dict_cohort_part["name_val"]=name_val
        # print(name_val)
        # return dict_cohort_part

        # return "ok"
        #return []


class CovariatesSummary(Resource):
    def post(self):
        data = {
  "headers": [
    "Site",
    "Cohorts",
    "n",
    "Age (y), mean (SD)",
    "Female %",
    "DURILL (y), mean (SD)"
  ],
  "subHeaders": [
    "",
    "",
    "HC",
    "PD",
    "HC",
    "PD",
    "HC",
    "PD",
    "HC",
    "PD",
  ],

  "rows": [
    {
      "Site": "Amsterdam",
      "Cohorts": ["Amsterdam I", "Amsterdam II"],
      "n": [
        { "HC": "44", "PD": "138" },
        { "HC": "0", "PD": "61" }
      ],

      "Age (y), mean (SD)": [
        { "HC": "56.5 (9.48)", "PD": "63.1 (10.81)" },
        { "HC": "NA", "PD": "62.5 (7.08)" }
      ],

      "Female %": [
        { "HC": "39", "PD": "38" },
        { "HC": "NA", "PD": "39" }
      ],

      "DURILL (y), mean (SD)": [
        { "HC": "NA", "PD": "2.1 (3.39)" },
        { "HC": "NA", "PD": "5.3 (3.54)" }
      ]
    },
    {
      "Site": "Bern",
      "Cohorts": ["BE I", "BEII"],
      "n": [
        { "HC": "32", "PD": "52" },
        { "HC": "30", "PD": "3" }
      ],

      "Age (y), mean (SD)": [
        { "HC": "54.1 (9.78)", "PD": "62.9 (10.38)" },
        { "HC": "68.2 (4.59)", "PD": "59.7 (6.66)" }
      ],

      "Female %": [
        { "HC": "30", "PD": "52" },
        { "HC": "70", "PD": "67" }
      ],

      "DURILL (y), mean (SD)": [
        { "HC": "NA", "PD": "12.4 (4.29)" },
        { "HC": "NA", "PD": "11.3 (7.57)" }
      ]
    },
    {
      "Site": "Campinas",
      "Cohorts": ["UNICAMP"],
      "n": [{ "HC": "138", "PD": "110" }],

      "Age (y), mean (SD)": [{ "HC": "58.9 (7.91)", "PD": "59.9 (10.2)" }],

      "Female %": [{ "HC": "63", "PD": "34" }],

      "DURILL (y), mean (SD)": [{ "HC": "NA", "PD": "7.3 (6.41)" }]
    },
    {
      "Site": "Chang Gung",
      "Cohorts": ["CGU"],
      "n": [{ "HC": "223", "PD": "327" }],

      "Age (y), mean (SD)": [{ "HC": "61 (7.28)", "PD": "60.1 (9.63)" }],

      "Female %": [{ "HC": "54", "PD": "43" }],

      "DURILL (y), mean (SD)": [{ "HC": "NA", "PD": "8.7 (6.33)" }]
    },
    {
      "Site": "Charlottesville",
      "Cohorts": ["UVA I", "UVA II", "UVA III"],
      "n": [
        { "HC": "0", "PD": "116" },
        { "HC": "0", "PD": "37" },
        { "HC": "0", "PD": "24" }
      ],

      "Age (y), mean (SD)": [
        { "HC": "NA", "PD": "63.7 (8.52)" },
        { "HC": "NA", "PD": "62.4 (9.59)" },
        { "HC": "NA", "PD": "70.8 (6.77)" }
      ],

      "Female %": [
        { "HC": "NA", "PD": "14" },
        { "HC": "NA", "PD": "29" },
        { "HC": "NA", "PD": "26" }
      ],

      "DURILL (y), mean (SD)": [
        { "HC": "NA", "PD": "89.7 (5.09)" },
        { "HC": "NA", "PD": "8.7 (3.64)" },
        { "HC": "NA", "PD": "7.7 (3.23)" }
      ]
    },

    {
      "Site": "Christchurch",
      "Cohorts": ["PDNZ"],
      "n": [{ "HC": "39", "PD": "209" }],

      "Age (y), mean (SD)": [{ "HC": "67.5 (8.52)", "PD": "69.4 (7.77)" }],

      "Female %": [{ "HC": "33", "PD": "26" }],

      "DURILL (y), mean (SD)": [{ "HC": "NA", "PD": "5.7 (5.57)" }]
    },
    {
      "Site": "Donders",
      "Cohorts": ["Donders"],
      "n": [{ "HC": "23", "PD": "59" }],

      "Age (y), mean (SD)": [{ "HC": "62.7 (10.29)", "PD": "60.8 (10.07)" }],

      "Female %": [{ "HC": "48", "PD": "44" }],

      "DURILL (y), mean (SD)": [{ "HC": "NA", "PD": "4.4 (3.79)" }]
    },
    {
      "Site": "Graz",
      "Cohorts": ["PROMOVE/ASPS I", "PROMOVE/ASPS II"],
      "n": [
        { "HC": "124", "PD": "100" },
        { "HC": "0", "PD": "23" }
      ],

      "Age (y), mean (SD)": [
        { "HC": "63.4 (10.07)", "PD": "63.2 (10.15)" },
        { "HC": "NA", "PD": "64 (9.9)" }
      ],

      "Female %": [
        { "HC": "27", "PD": "29" },
        { "HC": "NA", "PD": "22" }
      ],

      "DURILL (y), mean (SD)": [
        { "HC": "NA", "PD": "4.7 (4.77)" },
        { "HC": "NA", "PD": "4 (5.69)" }
      ]
    },

    {
      "Site": "Liege",
      "Cohorts": ["Liege I", "Liege II"],
      "n": [
        { "HC": "33", "PD": "30" },
        { "HC": "43", "PD": "45" }
      ],

      "Age (y), mean (SD)": [
        { "HC": "65.8 (4.29)", "PD": "65.9 (6.61)" },
        { "HC": "64.8 (8.33)", "PD": "66.9 (8.24)" }
      ],

      "Female %": [
        { "HC": "45", "PD": "37" },
        { "HC": "49", "PD": "44" }
      ],

      "DURILL (y), mean (SD)": [
        { "HC": "NA", "PD": "7.2 (5.32)" },
        { "HC": "NA", "PD": "6 (3.93)" }
      ]
    },
    {
      "Site": "Milan",
      "Cohorts": ["Milan"],
      "n": [{ "HC": "10", "PD": "44" }],

      "Age (y), mean (SD)": [{ "HC": "53.3 (10.53)", "PD": "57.8 (7.71)" }],

      "Female %": [{ "HC": "70", "PD": "32" }],

      "DURILL (y), mean (SD)": [{ "HC": "NA", "PD": "11.4 (3.38)" }]
    },

    {
      "Site": "NEUROCON",
      "Cohorts": ["NEUROCON"],
      "n": [{ "HC": "15", "PD": "27" }],

      "Age (y), mean (SD)": [{ "HC": "66.7 (11.74)", "PD": "68.7 (10.55)" }],

      "Female %": [{ "HC": "80", "PD": "37" }],

      "DURILL (y), mean (SD)": [{ "HC": "NA", "PD": "NA" }]
    },
    {
      "Site": "NW‐England",
      "Cohorts": ["NW‐England I", "NW‐England II"],
      "n": [
        { "HC": "22", "PD": "32" },
        { "HC": "13", "PD": "14" }
      ],

      "Age (y), mean (SD)": [
        { "HC": "70 (7.27)", "PD": "69.9 (8.58)" },
        { "HC": "64.6 (4.13)", "PD": "65 (5.67)" }
      ],

      "Female %": [
        { "HC": "45", "PD": "19" },
        { "HC": "38", "PD": "29" }
      ],

      "DURILL (y), mean (SD)": [
        { "HC": "NA", "PD": "6.8 (4.42)" },
        { "HC": "NA", "PD": "9.2 (6.02)" }
      ]
    },
    {
      "Site": "ON Japan",
      "Cohorts": ["ON Japan"],
      "n": [{ "HC": "15", "PD": "30" }],

      "Age (y), mean (SD)": [{ "HC": "63.3 (5.25)", "PD": "67.6 (6.81)" }],

      "Female %": [{ "HC": "53", "PD": "57" }],

      "DURILL (y), mean (SD)": [{ "HC": "NA", "PD": "NA" }]
    },
    {
      "Site": "Oxford",
      "Cohorts": ["Oxford DISCOVERY"],
      "n": [{ "HC": "57", "PD": "115" }],

      "Age (y), mean (SD)": [{ "HC": "65.6 (8.2)", "PD": "63.9 (10.05)" }],

      "Female %": [{ "HC": "39", "PD": "36" }],

      "DURILL (y), mean (SD)": [{ "HC": "NA", "PD": "2.3 (1.58)" }]
    },

    {
      "Site": "Pennsylvania",
      "Cohorts": ["UDALL/U19"],
      "n": [{ "HC": "11", "PD": "112" }],

      "Age (y), mean (SD)": [{ "HC": "70.1 (5.86)", "PD": "66.4 (7.87)" }],

      "Female %": [{ "HC": "55", "PD": "32" }],

      "DURILL (y), mean (SD)": [{ "HC": "NA", "PD": "7.3 (5.48)" }]
    },
    {
      "Site": "PPMI",
      "Cohorts": ["PPMI 1‐21"],
      "n": [{ "HC": "163", "PD": "347" }],

      "Age (y), mean (SD)": [{ "HC": "63.6 (16.73)", "PD": "62.9 (8.19)" }],

      "Female %": [{ "HC": "36", "PD": "35" }],

      "DURILL (y), mean (SD)": [{ "HC": "NA", "PD": "0.6 (0.52)" }]
    },
    {
      "Site": "Rome SLF",
      "Cohorts": ["Rome SLF"],
      "n": [{ "HC": "125", "PD": "239" }],

      "Age (y), mean (SD)": [{ "HC": "36.6 (10.63)", "PD": "62.7 (10.19)" }],

      "Female %": [{ "HC": "41", "PD": "37" }],

      "DURILL (y), mean (SD)": [{ "HC": "NA", "PD": "0.6 (0.52)" }]
    },
    {
      "Site": "Stanford",
      "Cohorts": ["Stanford"],
      "n": [{ "HC": "11", "PD": "44" }],

      "Age (y), mean (SD)": [{ "HC": "65.6 (6.47)", "PD": "68.6 (8.49)" }],

      "Female %": [{ "HC": "82", "PD": "50" }],

      "DURILL (y), mean (SD)": [{ "HC": "NA", "PD": "5.6 (3.44)" }]
    },
    {
      "Site": "Tao Wu",
      "Cohorts": ["Tao Wu"],
      "n": [{ "HC": "20", "PD": "19" }],

      "Age (y), mean (SD)": [{ "HC": "64.8 (5.58)", "PD": "65 (4.45)" }],

      "Female %": [{ "HC": "40", "PD": "47" }],

      "DURILL (y), mean (SD)": [{ "HC": "NA", "PD": "5.3 (4)" }]
    },
    {
      "Site": "Total",
      "Cohorts": [""],
      "n": [{ "HC": "1182", "PD": "2357" }],

      "Age (y), mean (SD)": [{ "HC": "59.4 (12.31)", "PD": "63.4 (9.77)" }],

      "Female %": [{ "HC": "46", "PD": "36" }],

      "DURILL (y), mean (SD)": [{ "HC": "NA", "PD": "5.5 (5.47)" }]
    }
  ]
}

        body = request.get_json()
        cols = body["cols"]
        # print(cols)
        for col in cols:
            
            if col not in data["headers"]:
                data["headers"].append(col)
                data["subHeaders"].extend(["HC","PD"])
            
            for index, row in enumerate(data["rows"]):
                if col in row.keys():
                    continue
                
                else:
                    new_data = []
                    for _ in range(len(row["Cohorts"])):
                        new_data.append({ "HC": "42.8", "PD": "65.3" })
                    
                    row[col] = new_data
                      
                data["rows"][index] = row

        # print(data)

        return data