import { Mongo } from "../database/mongo.js"
import { ObjectId } from "mongodb"

const collectionName = "plates"

export default class PlatesDataAccess {
    async getPlates() {
        const result = await Mongo.db
            .collection(collectionName)
            .find({})
            .toArray()


        return result
    }

    async getAvailablePlates() {
        const result = await Mongo.db
            .collection(collectionName)
            .find({ available: true })
            .toArray()


        return result
    }

    async addPlate(plateData) {
        const result = await Mongo.db
            .collection(collectionName)
            .insertOne(plateData)

        return result
    }

    async deletePlate(plateId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(plateId) })

        return result
    }

    async updatePlate(plateId, plateData) {
        if (plateData.password) {
            const salt = crypto.randomBytes(16)

            crypto.pbkdf2(plateData.password, salt, 310000, 16, 'sha256', async (err, hashedPassword) => {
                if (err) {
                    throw new Error('Error during hashing password')
                }
                plateData = { ...plateData, password: hashedPassword, salt }

                const result = await Mongo.db
                    .collection(collectionName)
                    .findOneAndUpdate(
                        { _id: new ObjectId(plateId) },
                        { $set: plateData }

                    )
                return result
            })

        } else {
            const result = await Mongo.db
                .collection(collectionName)
                .findOneAndUpdate(
                    { _id: new ObjectId(plateId) },
                    { $set: plateData }

                )
            return result
        }

    }
}
