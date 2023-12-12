from flask_restful import Resource, abort
from flask import request

from Common.queryer import Queryer
from Common import QueryBuilder as QB
from collections import defaultdict


class ProjectDetails(Resource):
    def get(self):
        abort(403, message="Forbidden Method")

    def post(self):
        body = request.get_json()
        obj = Queryer(body['endpoint_id'])

        # Get All Projects within Working Group
        query = f''' 
            ?Wg a ?wgClass.  
            ?wgClass rdfs:label "{body['projType']}".
            ?Wg rdfs:label "{body["name"]}".
            
            ?Wg ?hasProjects ?projects.
            ?hasProjects rdfs:label "HasProject (E)".
            
            ?projects rdfs:label ?projLabel
        '''

        vars=["?projLabel"]

        qb = QB.QueryBuilder()
        qb.set_query(query=query, vars=vars)

        response = obj.request(qb.get_query())

        project_list = []
        for val in response:
            project_list.append(val["projLabel"]["value"])
        
        # Get All Cohorts part of Working group 
        query = f'''
                ?Wg a ?wgClass.
                ?wgClass rdfs:label "{body['projType']}".
                ?Wg rdfs:label "{body["name"]}".
                
                ?Wg ?hasWgCohorts ?wgCohorts.
                ?hasWgCohorts rdfs:label "HasCohort (E)".
                
                ?wgCohorts rdfs:label ?wgCohortsName.
    
        '''

        vars = ["?wgCohortsName"]

        qb = QB.QueryBuilder()
        qb.set_query(query=query, vars=vars)

        res = obj.request(qb.get_query())
        all_cohorts = list()
        for val in res:
            all_cohorts.append(val["wgCohortsName"]["value"])
        

        # Get Details for each project 
        proj_details = dict()
        for proj in project_list:
            proj_details[proj] = defaultdict()
            query = f'''
                ?Wg a ?wgClass.  
                ?wgClass rdfs:label "{body['projType']}".
                ?Wg rdfs:label "{body["name"]}".
                
                ?Wg ?hasProjects ?project.
                ?hasProjects rdfs:label "HasProject (E)".
                
                ?project rdfs:label "{proj}".
                ?project ?hasProps ?props.
                ?hasProps rdfs:label ?propsLabel.

                ?props rdfs:label ?val
            '''

            vars = ["?propsLabel", "?val"]

            qb = QB.QueryBuilder()
            qb.set_query(query=query, vars=vars)
            
            res = obj.request(qb.get_query())

            for val in res:
                propLable = val["propsLabel"]["value"]
                propVal = val["val"]["value"]

                if propLable in proj_details[proj].keys():
                    
                    if isinstance(proj_details[proj][propLable], str):
                        temp = proj_details[proj][propLable]
                        proj_details[proj][propLable] = list()
                        proj_details[proj][propLable].append(temp)
                    
                    proj_details[proj][propLable].append(propVal)
                else:
                    proj_details[proj][propLable] = propVal
            
        toReturn = dict()
        data = list()
        
        for proj in project_list:
            proj_cohort = []
            keys = proj_details[proj].keys()

            # Check if it has cohorts
            if "HasCohort (E)" in keys:
                for cohort in all_cohorts:
                    if cohort in proj_details[proj]["HasCohort (E)"]:
                        proj_cohort.append({"val":cohort, "exists":True})
                    else:
                        proj_cohort.append({"val":cohort, "exists":False})

            publication = proj_details[proj]["HasPublication (E)"] if "HasPublication (E)" in keys else ""
            desc = proj_details[proj]["HasBriefDescription (E)"] if "HasBriefDescription (E)" in keys else ""
            pi =  proj_details[proj]["HasPersonRole_ProjectLead (E)"] if "HasPersonRole_ProjectLead (E)" in keys else ""
            brainScanType =  proj_details[proj]["HasBrainScanDataType (E)"] if "HasBrainScanDataType (E)" in keys else ""

            attatch = {
                "desc":desc,
                "publication":publication,
                "cohorts": proj_cohort,
                "person": {
                    "name":pi,
                    "email": "",
                    "education":""
                },
                "brainScanType":brainScanType
            }

            data.append(attatch)
        
        toReturn["headers"] = project_list
        toReturn["data"] = data
        return toReturn