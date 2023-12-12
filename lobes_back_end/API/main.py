from flask import Flask
from flask_restful import Api
import os

# Import Resources
from Resources.Test import Test
from Resources.Cohorts import CohortList, Cohort, CohortDetails
from Resources.CohortProjects import CohortProject, CohortProjectList,CohortCovariateVariables
from flask_cors import CORS



from Resources.Projects import ProjectDetails
from Resources.Covariates import CovariatePropertyList,CovariateCohortList, all_CovariatesList,CovariateIntersectionCohorts, CovariatesSummary


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#@app.route("/")
#@cross_origin()
api = Api(app)


# Register All Resources Below

api.add_resource(Test, "/")

# Cohort URLS
api.add_resource(CohortList,'/cohorts') #Done
api.add_resource(CohortProjectList, '/cohorts/<string:cohort_name>/projects')#Done
api.add_resource(CohortDetails, '/cohorts/<string:cohort_name>/details')#Done


api.add_resource(Cohort,'/cohorts/<string:cohort_name>') #Done
api.add_resource(CohortProject, '/cohorts/<string:cohort_name>/projects/<string:cohort_project_name>')#Done


api.add_resource(ProjectDetails,'/projects') #Done


api.add_resource(all_CovariatesList, '/covariate')#Do
api.add_resource(CovariatePropertyList, '/covariate/<string:covariate_name>')#Do
api.add_resource(CovariateCohortList, '/covariate/<string:covariate_name>/covarProp/<string:covariate_prop_name>')#Done
api.add_resource(CovariatesSummary, '/covariate/summary')



api.add_resource(CovariateIntersectionCohorts, '/covariate/search')#Done





api.add_resource(CohortCovariateVariables, '/covariateCohortList/<string:cohort_name_full>')#Do

if __name__ == "__main__":
    # app.run(host="0.0.0.0", port=8080)
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))