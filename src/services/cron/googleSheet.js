/* eslint-disable no-async-promise-executor */
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { addLeadService } from '../lead/leads'
import { googleSheets } from '../../../src/devConfig/development.json'
import creds from '../../../src/devConfig/googleSheet.json'
import models from '../../models'
export const getSheetDataService = () => new Promise(async (resolve, reject) => {
    const doc = new GoogleSpreadsheet(googleSheets.leadsAd)

    await doc.useServiceAccountAuth(creds)

    await doc.loadInfo()


    // Array(3).forEach(async (page, index) => {
    const sheet = await doc.sheetsByIndex[0]
    const sheetRows = await sheet.getRows()
    await sheetRows.forEach(async (row, index) => {
        if (row.read !== 'Synced') {
            const updatedValue = {
                flag: 'Active',
                firstName: row.fname,
                email: row.email,
                phone: row.phone,
                projects: row.project,
                location: row.prefferedlocation,
                assignedTo: '',
                stage: 'New',
                campaignname: row.campaignname,
                campaignterm: row.campaignterm,
                campaigncontent: row.campaigncontent,
                source: 'Facebook'
            }
            try {
                await new models.Lead(updatedValue).save((err) => {
                    if (err) throw new Error(err)
                    row.read = 'Synced'
                    row.save()
                })
            } catch (err) {
                console.log(err)
            }
        }
    })

    // })

    resolve(true)

})