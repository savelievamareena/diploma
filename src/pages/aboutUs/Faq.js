import React from "react"
import Header from "../../components/Header";

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import {FaqData} from "../../dataSources/FaqData";
import '../../styles/Pages.css';

export default function Faq() {
    const [expanded, setExpanded] = React.useState("panel0");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

    const panels = FaqData.map((val, key) => {
        let panel = "panel" + key;
        let content = "panel" + key + "d-content";
        let header = "panel" + key + "d-header";

        return(
            <Accordion expanded={expanded === panel} onChange={handleChange(panel)} key={key}>
                <AccordionSummary aria-controls={content} id={header}>
                    <Typography><strong>{val.label}</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {val.content}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        )
    })

    return (
        <div className="admin--wrapper">
            <Header/>
            <div className="accordion-wrapper">
                {panels}
            </div>
        </div>
)}