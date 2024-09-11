'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { formDataInterface } from './FormDataInterface'


interface FormContextProps {
    formData: formDataInterface
    setFormData: React.Dispatch<React.SetStateAction<formDataInterface>>
}

const FormContext = createContext<FormContextProps | undefined>(undefined)

export const FormProvider = ({ children }: { children: ReactNode }) => {
    const initialFormData: formDataInterface = {
        name: '',
        cellphone: '',
        owner_identification: '',
        owner_email: '',
        authorizes_publishing: '',
        department: '',
        city: '',
        neighborhood: '',
        coownershipname: '',
        property_type: '',
        destination_property: '',
        charge: '',
        canyon: 0,
        sale_value: 0,
        administration_value: 0,
        include_administration: '',
        built_area: 0,
        private_area: 0,
        year_of_construction: '',
        stratum: 0,
        address: '',
        coveredfinishes: [],
        height: 0,
        depth: 0,
        front: 0,
        type_kitchen: [],
        propertystatus: [],
        electric_connection: [],
        others: [],
        winery: "",
        type_floor: [],
        has_a_balcony: "",
        has_a_terrace: "",
        has_air_conditioner: "",
        has_central_air: "",
        dressingroomcount: 0,
        surveillance: [],
        number_of_bathrooms: 0,
        number_of_parking_spaces: 0,
        linenclosetcount: 0,
        bathtub: "",
        jacuzzi: "",
        chimney: "",
        closet: "",
        linencloset: "",
        dressingroom: "",
        dining: "",
        diningroom: "",
        penthouse: "",
        yard: "",
        clotheszone: "",
        hall: "",
        lounge: "",
        deck: "",
        duplex: "",
        loft: "",
        securitydoor: "",
        number_of_rooms: 0,
        useful_room: '',
        exposedbrick: '',
        number_of_levels: 0,
        floor_number: 0,
        otherspecifications: [],
        specificationsAmount: {},
        parking_lot: '',
        surveillanceExternal: [],
        commonzones: [],
        industrial_park: '',
        parking_bay: '',
        communal_bathrooms: '',
        public_toilets: '',
        level_dock: '',
        idepressed_dock: '',
        floor_load_capacity: '',
        bridgecrane: '',
        digital_access_in_building: '',
        facade: [],
        quantity_load_capacity: 0,
        unit_type: '',
        otherspecificationsDings: [],
        landmarks: "",
        observations: "",
        collector_name: "",
        collection_medium: "",
        collection_date: "",
        closetcount: ""
    }
    const [formData, setFormData] = useState<formDataInterface>(initialFormData)

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    )
}

export const useForm = () => {
    const context = useContext(FormContext)

    if (context === undefined) {
        throw new Error('useForm debe ser usado dentro de un FormProvider')
    }

    return context
}


