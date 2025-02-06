import PlatesDataAccess from '../dataAccess/plates.js'
import { ok, ServerError } from '../helpers/httpReponse.js'

export default class PlatesControllers {
    constructor() {
        this.dataAccess = new PlatesDataAccess()
    }

    async getPlates() {
        try {
            const plates = await this.dataAccess.getPlates()

            return ok(plates)
        } catch (error) {
            return ServerError(error)
        }
    }

    async getAvailablePlates() {
        try {
            const plates = await this.dataAccess.getAvailablePlates()

            return ok(plates)
        } catch (error) {
            return ServerError(error)
        }
    }

    async addPlate(plateData) {
        try {
            const result = await this.dataAccess.addPlate(plateData)

            return ok(result)
        } catch (error) {
            return ServerError(error)
        }
    }

    async deletePlate(plateId) {
        try {
            const result = await this.dataAccess.deletePlate(plateId)

            return ok(result)
        } catch (error) {
            return ServerError(error)
        }
    }
    async updatePlate(plateId, plateData) {
        try {
            const result = await this.dataAccess.updatePlate(plateId, plateData)

            return ok(result)
        } catch (error) {
            return ServerError(error)
        }
    }
}