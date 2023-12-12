from flask_restful import Resource, abort
from flask import request

from Common.queryer import Queryer
from Common import QueryBuilder as QB
# from flask_cors import CORS, cross_origin
# from constants import missing_datasets

from collections import OrderedDict


# Get the property values of cohort
# @cross_origin()
class Cohort(Resource):
    def get(self, cohort_name: str) -> str:
        return cohort_name.replace('_', ' ')

    def post(self, cohort_name: str):
        body = request.get_json()
        obj = Queryer(body['endpoint_id'])
        cohort_name = cohort_name.replace('_', ' ')

        query = f'''
            ?project a ?projectClass.
            ?projectClass rdfs:label "{body['projType']}".
            ?projectName rdfs:label "{body['name']}" .

            ?project ?hasCohort ?cohort.
            ?hasCohort rdfs:label "HasCohort (E)".

            ?cohort rdfs:label ?cohortName.
            ?cohort ?hasProp ?propsURI.
            ?hasProp rdfs:label ?props.

            ?cohort ?cohortprop ?propsval .
            ?cohortprop rdfs:label ?props .

            filter(?cohortName = "{cohort_name}")
        '''
        vars = ['?props', '?propsval']

        qb = QB.QueryBuilder()
        qb.set_query(query=query, vars=vars)

        response = obj.request(qb.get_query())

        return response


# Get List of Cohorts part of a project or Working Group

# @cross_origin()
class CohortList(Resource):
    def get(self):
        abort(403, message="Forbidden Method")

    def post(self):
        body = request.get_json()
        obj = Queryer(body['endpoint_id'])
        
        # Get all cohorts which have no data in it
        query = f'''
            ?project a ?projectClass.
            ?projectClass rdfs:label "{body['projType']}".
            ?project rdfs:label "{body['name']}".

            ?project ?hasCohorts ?cohortURI.
            ?hasCohorts rdfs:label "HasCohort (E)".
            ?cohortURI rdfs:label ?cohortName.
            ?cohortURI ?hasProps ?props.
        '''

        vars = ["?cohortName", "(COUNT(?props) as ?propsCount)"]
        mods = {
            "GROUP BY": "?cohortName"
        }

        qb = QB.QueryBuilder()
        qb.set_query(query=query, vars=vars, modifiers = mods)
        response = obj.request(qb.get_query())

        # print(response)
        missing = []
        for val in response:
            if int(val["propsCount"]["value"]) <= 12:
                missing.append(val["cohortName"]["value"])
        

        # Get all cohorts with their project distribution   
        query = f'''
            ?project a ?projectClass.  
            ?projectClass rdfs:label "{body['projType']}".
            
            ?project rdfs:label "{body["name"]}".
            
            ?project ?hasCohorts ?cohortURI.
            ?hasCohorts rdfs:label "HasCohort (E)".
            ?cohortURI rdfs:label ?cohortName.
            
            optional {{ 
                ?cohortURI ?isPartOfProject ?proj.
                ?isPartOfProject rdfs:label "IsPartOfProject (E)".
                ?proj rdfs:label ?projName.
            }}
        '''

        vars = ["?cohortName", "(GROUP_CONCAT(?projName; SEPARATOR=',') AS ?projNames)"]

        qb = QB.QueryBuilder()
        qb.set_query(query=query, vars=vars, modifiers = mods)
        response = obj.request(qb.get_query())
        
        total = len(response)
        # Get all cohorts with their distribution in projects
        projects = OrderedDict()
        independent = []

        for val in response:
            if val["cohortName"]["value"] in missing:
                continue

            if "projNames" in val.keys():
                projs = val["projNames"]["value"].split(",")

                for proj in projs:
                    if proj in projects.keys():
                        projects[proj].append(val["cohortName"]["value"])
                    else:
                        new_val = [val["cohortName"]["value"]]
                        projects[proj] = new_val
            else:
                independent.append(val["cohortName"]["value"])

        independent.extend(missing)

        # Format toReturn
        toReturn = dict({
            "projects":[]
        })

        for val in projects.keys():
            new_val = {
                "name": val,
                "cohorts": projects[val]
            }
            toReturn["projects"].append(new_val)
        
        toReturn["projects"].append({
            "name":"Not Listed In Project",
            "cohorts": independent
        })

        # toReturn["projects"].append({
        #     "name":"missing",
        #     "cohorts": missing
        # })

        toReturn["total"] = total
        return toReturn


# @cross_origin()
class CohortDetails(Resource):
    def get(self, cohort_name: str) -> str:
        return cohort_name.replace('_', ' ')

    def post(self, cohort_name: str):
        body = request.get_json()
        obj = Queryer(body['endpoint_id'])
        cohort_name = cohort_name.replace('_', ' ')
        
        query = f'''
              ?projectClass rdfs:label "{body['projType']}".
  
                ?project rdfs:label "{body['name']}".

                ?project ?hasCohorts ?cohortURI.
                ?hasCohorts rdfs:label "HasCohort (E)".

                ?cohortURI rdfs:label "{cohort_name}".

                ?cohortURI ?hasCovar ?covarURI.
                ?hasCovar rdfs:label ?label.

                optional {{ ?covarURI rdfs:label ?propLabel }}
        '''

        vars = ["?label", "?covarURI", "?propLabel"]

        
        qb = QB.QueryBuilder()
        qb.set_query(query=query, vars=vars)

        response = obj.request(qb.get_query())
        # print(response)
        
        # Updated
        formatedResp = dict()
        toReturn = dict()

        # Format response 
        for val in response:
            prop = val["label"]["value"].replace("(E)","").rstrip()

            if val["covarURI"]["type"] == "uri":
                propVal = val["propvalue"]["value"]
            else:
                propVal = val["covarURI"]["value"].replace("_"," ")

            if prop in formatedResp.keys():
                if isinstance(formatedResp[prop], str):
                    temp = formatedResp[prop]
                    formatedResp[prop] = list()
                    formatedResp[prop].append(temp)
                    formatedResp[prop].append(propVal)
                
                elif type(formatedResp[prop]) is list:
                    formatedResp[prop].append(propVal)
            else:
                 formatedResp[prop] = propVal

        # print(formatedResp)
        keys = formatedResp.keys()

        # Add values to return dict
        toReturn["name"] = cohort_name
        toReturn["totalParticipants"] = formatedResp["HasNumberOfParticipants"].split(".")[0] if "HasNumberOfParticipants" in keys else None
        toReturn["meanAge"] = formatedResp["HasAge Mean"] if "HasAge Mean" in keys else None
        toReturn["desc"] = formatedResp["HasBriefDescription"] if "HasBriefDescription" in keys else ""
        
        # Projects formatter 
        project = list()
        if "IsPartOfProject" in keys:
            if not isinstance(formatedResp["IsPartOfProject"], str):
                for proj in formatedResp["IsPartOfProject"]:
                    temp = {"name" : proj , "cohortProjects":[]}
                    
                    # Define temp vars
                    projGrp = list()
                    objs  = dict()
                    
                    # Get Cohort Projects under proj
                    for cohortProjs in formatedResp["HasCohortProject"]:
                        if proj.split(" ")[-1].lower() in cohortProjs.lower():
                            
                            # Add Cohort Project Groups to proj group list
                            if "grp" in cohortProjs:
                                projGrp.append({
                                    "name" : cohortProjs, 
                                    "url" : "#"
                                    })
                                
                                continue

                            objs["name"] = cohortProjs
                    
                    objs["projGroups"] = projGrp

                    temp["cohortProjects"].append(objs)
                    project.append(temp)
            else:
                proj = formatedResp["IsPartOfProject"]
                temp = {
                    "name": proj,
                    "cohortProjects":[]
                }

                # Define temp vars
                projGrp = list()
                objs  = dict()

                for cohortProjs in formatedResp["HasCohortProject"]:
                    if proj.split(" ")[-1].lower() in cohortProjs.lower():
                        if "grp" in cohortProjs:
                            projGrp.append({
                                "name":cohortProjs,
                                "url":"#"
                            })
                            continue
                        
                        objs["name"] = cohortProjs
                    
                objs["projGroups"] = projGrp
                temp["cohortProjects"].append(objs)
                project.append(temp)
                

        toReturn["projects"] = project

        # Get person details 
        if "HasPersonRole MainPrincipalInvestigator" in keys:

            query = f'''
                ?project a ?projectClass.
                ?projectClass rdfs:label "{body['projType']}".

                ?projectName rdfs:label "{body['name']}" . 
                
                ?project ?hasCohort ?cohort.
                ?cohort ?hasPrincipalInvestigator ?principalInvestigator.
                ?principalInvestigator rdfs:label "{formatedResp["HasPersonRole MainPrincipalInvestigator"]}".
                
                ?principalInvestigator ?hasProp ?props.
                #?hasProp rdfs:label ?propsLabel
            '''
            # qb = QB.QueryBuilder()
            qb.set_query(query = query, vars = ["?props"])

            res = obj.request(qb.get_query())
            person = {
                "name": formatedResp["HasPersonRole MainPrincipalInvestigator"],
                "email": "",
                "degree":""
            }
            
            # Format Response and add to return dict if not empty 
            # TODO: Check the response format and re-format to fit return dict 
            toReturn["person"] = person

        # List of all covariates available in the cohort 
        covTypes = ["Has PD Demographics" , "Has cognitive", "Has neuropsychiatric"]
        covariates = list()

        for cov in covTypes:
            if cov in keys:
                query = f''' 
                    ?project a ?projectClass.
                    ?projectClass rdfs:label "{body['projType']}".

                    ?projectName rdfs:label "{body["name"]}".
                    
                    ?project ?hasCohorts ?cohort.
                    ?cohort rdfs:label "{cohort_name}".
                    
                    ?cohort ?hasCov ?cov.
                    ?hasCov rdfs:label "{cov} (E)".
                    
                    ?cov ?hasProps ?props.
                    ?hasProps rdfs:label ?hasPropsLabel
                '''
                qb = QB.QueryBuilder()
                qb.set_query(query=query, vars =["?hasPropsLabel", "?props"])
                res = obj.request(qb.get_query())
                # print(res)
                # Format results
                temp = {
                    "title": cov.split(" ")[-1].lower(),
                    "content": {
                        "cols" : []
                    }
                }
                
                rows = list()
                for value in res:
                    val = value["hasPropsLabel"]["value"].replace("(E)","").rstrip()
                    desc = ""

                    if value["props"]["value"].lower() == "true":
                        rows.append({
                            "val":val,
                            "desc":desc,
                            "exists" : True
                        })

                    elif value["props"]["value"].lower() == "false":
                         rows.append({
                            "val":val,
                            "desc":desc,
                            "exists" : False
                        })
                
                temp["content"]["cols"].append({
                    "name":"Standard Properties",
                    "rows": rows
                })

                covariates.append(temp)

        toReturn["covariates"] = covariates

        return toReturn