import { handle_server_error } from "../utilities/handleError"
import { omit } from 'lodash'
import config from '../devConfig/development.json';

export const checkPaginationOrCount = async (req, res, next) => {
  try {
    let query = {
      pagination: {},
      fields: {},
      query: {}
    }
    if (req.query["$limit"] && req.query["$limit"] === '-1') {
      query["pagination"] = {}
    } else {
      query["pagination"]["limit"] = req.query["$limit"] ? parseInt(req.query["$limit"]) : config.pagination.limit
      query["pagination"]["skip"] = req.query["$skip"] ? parseInt(req.query["$skip"]) : config.pagination.skip
    }
    if (req.query["$skip"] && req.query["$skip"] === '-1') {
      query["count"] = true
    }
    if (req.query["$select"]) {
      query["fields"] = req.query["$select"]
    }
    if (req.query["$sort"]) {
      let keys = Object.keys(req.query["$sort"])
      query["pagination"]["sort"] = {}
      query["pagination"]["sort"][keys[0]] = parseInt(req.query["$sort"][keys[0]])
    }
    let updatedQueries = omit(req.query, ['$limit', '$skip', 'pagination', 'count', '$select', '$sort'])

    for (const [key, value] of Object.entries(updatedQueries)) {
      switch (value) {
        case 'true':
          updatedQueries[key] = true
          break;
        case 'false':
          updatedQueries[key] = false
          break;
      }
      if (key === '$regex') {
        if (!updatedQueries["$or"] || updatedQueries["$or"].length === 0) {
          updatedQueries["$or"] = []
        }
        updatedQueries[key].map((item, i) => {
          let obj = {}
          for (const [regkey, value] of Object.entries(item)) {
            obj[regkey] = new RegExp(value, 'i');
          }
          updatedQueries["$or"].push(obj)
        })
        updatedQueries = omit(updatedQueries, ['$regex'])
      }
    }
    query["query"] = updatedQueries
    req.query = query
    next()
  } catch (err) {
    let error = await handle_server_error(err, req);
    return res.status(error.code).json(error);
  }

}