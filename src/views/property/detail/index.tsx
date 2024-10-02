// MUI Imports
'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import MuiStep from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import type { StepProps } from '@mui/material/Step'

// Third-party Imports
import classnames from 'classnames'



import 'swiper/css';
import 'swiper/css/autoplay';

import CustomAvatar from '@core/components/mui/Avatar'

import StepCollectionType from './StepCollectionType'
import StepCollectionData from './StepCollectionData'
import StepInternalFeatures from './StepInternalFeatures'
import StepSurroundings from './StepSurroundings'
import StepExternalFeatures from './StepExternalFeatures'

// Styled Component Imports
import StepperWrapper from '@core/styles/stepper'

// Type Imports
// import type { PropertiesType } from '@/types/apps/propertyTypes'

type PropertyDetailProps = {
    id: string;
    propertyData: any;
}

// Vars
const steps = [
    {
        icon: 'tabler-category-2',
        title: 'Tipo',
        subtitle: 'Tipo de Captación'
    },
    {
        icon: 'tabler-file-text',
        title: 'Datos',
        subtitle: 'Datos de Captación'
    },
    {
        icon: 'tabler-armchair',
        title: 'Interno',
        subtitle: 'Caracteristicas Internas'
    },
    {
        icon: 'tabler-tree',
        title: 'Externo',
        subtitle: 'Caracteristicas Externas'
    },
    {

        icon: 'tabler-map-pin',
        title: 'Alrededores',
        subtitle: 'Alrededores'
    }
]

const Step = styled(MuiStep)<StepProps>({
    '&.Mui-completed .step-title , &.Mui-completed .step-subtitle': {
        color: 'var(--mui-palette-text-disabled)'
    }
})

const getStepContent = (step: number, handleNext: () => void, handlePrev: () => void, id: string, propertyData: any) => {

    const Tag =
        step === 0
            ? StepCollectionType
            : step === 1
                ? StepCollectionData
                : step === 2
                    ? StepInternalFeatures
                    : step === 3
                        ? StepExternalFeatures
                        : StepSurroundings

    return <Tag activeStep={step} handleNext={handleNext} handlePrev={handlePrev} steps={steps} id={id} propertyData={propertyData} />
}


const PropertyDetail = ({ id, propertyData }: PropertyDetailProps) => {

    // States
    const [activeStep, setActiveStep] = useState<number>(0)

    const handleNext = () => {
        if (activeStep !== steps.length - 1) {
            setActiveStep(activeStep + 1)
        } else {
            alert('Finalizado..!!')
        }
    }

    const handlePrev = () => {
        if (activeStep !== 0) {
            setActiveStep(activeStep - 1)
        }
    }


    return (


        <Card className='flex flex-col lg:flex-row'>
            <CardContent className='max-lg:border-be lg:border-ie lg:min-is-[300px]'>
                <StepperWrapper>
                    <Stepper
                        activeStep={activeStep}
                        orientation='vertical'
                        connector={<></>}
                        className='flex flex-col gap-4 min-is-[220px]'
                    >
                        {steps.map((label, index) => {
                            return (
                                <Step key={index} onClick={() => setActiveStep(index)}>
                                    <StepLabel icon={<></>} className='p-1 cursor-pointer'>
                                        <div className='step-label'>
                                            <CustomAvatar
                                                variant='rounded'
                                                skin={activeStep === index ? 'filled' : 'light'}
                                                {...(activeStep >= index && { color: 'primary' })}
                                                {...(activeStep === index && { className: 'shadow-primarySm' })}
                                                size={38}
                                            >
                                                <i className={classnames(label.icon as string, '!text-[22px]')} />
                                            </CustomAvatar>
                                            <div className='flex flex-col'>
                                                <Typography color='text.primary' className='step-title'>
                                                    {label.title}
                                                </Typography>
                                                <Typography className='step-subtitle'>{label.subtitle}</Typography>
                                            </div>
                                        </div>
                                    </StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>
                </StepperWrapper>
            </CardContent>

            <CardContent className='flex-1 pbs-6'>
                {getStepContent(activeStep, handleNext, handlePrev, id, propertyData)}
            </CardContent>


        </Card>


    )
}

export default PropertyDetail
