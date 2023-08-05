import { DeleteOutline, Drafts, ExpandMore, Inbox, Person } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system';
import React from 'react';
import { Personas } from '../components/Personas';
import ServiciosPaquetes from '../components/ServiciosPaquetes';

export const ServiciosPersonas = () => {


  return (
    <Grid sx={{ mt: 10, p: 2 }} container spacing={2}>
      {/* inicio componente personas */}
      <Grid item xs={12} md={4}>
        <Personas />
      </Grid>
      {/* fin componente persona */}
      {/* inicio componente servicios y paquetes  */}
      <Grid item xs={12} md={8}>
        <ServiciosPaquetes />
      </Grid>
      {/* fin componente servicios y paquetes */}
    </Grid>
  )
}
