import platesServices from "../../services/plates"
import { useEffect, useState } from "react"
import Loading from "../loading/page"
import PlateCard from "../../components/plateCard/plateCard"
import styles from './page.module.css'
import PlatePopup from "../../components/platePopup/platePopup"
import { useCartContext } from "../../context/userCartContext"

export default function Plates() {

    const { getAvailablePlates, platesList, plateLoading, refetchPlates } = platesServices()
    const [plateSelected, setPlateSelected] = useState(null)
    const { addToCart } = useCartContext()

    useEffect(() => {
        if (refetchPlates) {
            getAvailablePlates()
        }
    }, [refetchPlates])

    const handlePlateSelected = (plate) => {
        setPlateSelected(plate)
    }

    const handleClosePopup = () => {
        setPlateSelected(null)
    }

    const handleAddToCart = (itemToAdd) => {
        addToCart(itemToAdd)
        handleClosePopup()
    }

    if (plateLoading) {
        return (<Loading />)
    }

    //console.log(platesList)


    return (
        <>
            <div>
                {platesList.map((plate) => (
                    <div key={plate._id} className={styles.cardContainer} onClick={() => { handlePlateSelected(plate) }}>
                        <PlateCard plateData={plate} />
                    </div>
                ))}
            </div>

            {plateSelected ? (
                <PlatePopup
                    plateData={plateSelected}
                    onClose={handleClosePopup}
                    onAddToCart={handleAddToCart} />
            ) : null}
        </>
    )
}