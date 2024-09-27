'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { formDataInterface } from './FormDataInterface'


interface FormContextProps {
    formData: formDataInterface
    setFormData: React.Dispatch<React.SetStateAction<formDataInterface>>
    resetFormType: boolean
    setResetFormType: React.Dispatch<React.SetStateAction<boolean>>
    resetFormData: boolean
    setResetFormData: React.Dispatch<React.SetStateAction<boolean>>
    resetFormComercial: boolean
    setResetFormComercial: React.Dispatch<React.SetStateAction<boolean>>
    resetFormVivendia: boolean
    setResetFormVivendia: React.Dispatch<React.SetStateAction<boolean>>
    resetFormExternal: boolean
    setResetFormExternal: React.Dispatch<React.SetStateAction<boolean>>
    resetFormSurro: boolean
    setResetFormSurro: React.Dispatch<React.SetStateAction<boolean>>
    resetFormAll: boolean
    setResetFormAll: React.Dispatch<React.SetStateAction<boolean>>
}

const FormContext = createContext<FormContextProps | undefined>(undefined)

export const initialFormData: formDataInterface = {
    id: 0,
    globaltype: '',
    owner_id: 0,
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
    valuesArrayAddress: [],
    type_kitchen: [],
    propertystatus: '',
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
    combinedSpecifications: [],
    specificationsWithAmounts: {},
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
    type_contact: "",
    closetcount: "",
    status_complete: false
}

export const FormProvider = ({ children }: { children: ReactNode }) => {

    const [formData, setFormData] = useState<formDataInterface>(initialFormData)
    const [resetFormType, setResetFormType] = useState(false)
    const [resetFormData, setResetFormData] = useState(false)
    const [resetFormComercial, setResetFormComercial] = useState(false)
    const [resetFormVivendia, setResetFormVivendia] = useState(false)
    const [resetFormExternal, setResetFormExternal] = useState(false)
    const [resetFormSurro, setResetFormSurro] = useState(false)
    const [resetFormAll, setResetFormAll] = useState(false)

    useEffect(() => {
        if (resetFormAll === true) {
            setResetFormType(true)
            setResetFormData(true)
            setResetFormComercial(true)
            setResetFormVivendia(true)
            setResetFormExternal(true)
            setResetFormSurro(true)
            setFormData(initialFormData)
        }

    }, [resetFormAll])

    return (
        <FormContext.Provider value={{ formData, setFormData, resetFormType, setResetFormType, resetFormData, setResetFormData, resetFormComercial, setResetFormComercial, resetFormVivendia, setResetFormVivendia, resetFormExternal, setResetFormExternal, resetFormSurro, setResetFormSurro, resetFormAll, setResetFormAll }}>
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


