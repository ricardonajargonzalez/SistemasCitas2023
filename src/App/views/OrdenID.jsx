import { CreditCard, HighlightOff } from "@mui/icons-material";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom"
import success from "../../assets/img/success.png";
import remove32px from "../../assets/img/remove-32px.png";
import success32px from "../../assets/img/success-32px.png";
import warning32px from "../../assets/img/warning-32px.png";


// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import * as Icons from '@fortawesome/fontawesome-free-solid';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";





export const OrdenID = () => {

    const location = useLocation();
    const status = location.state.status;
    const status_detail = location.state.status_detail;

    const transaction_details = location.state.transaction_details;
    const installment_amount = transaction_details.installment_amount;
    const total_paid_amount = transaction_details.total_paid_amount;
    const card = location.state.card;
    const payment_method_id = location.state.payment_method_id;
    const installments = location.state.installments;

    const color_approved = '#26B36A';
    const color_rejected = '#F23D4F';
    const color_peding = '#FFC048';
    let mensaje;

    switch (status_detail) {
        case 'accredited':
            mensaje = "¡Listo! Se acreditó tu pago!";
            break;
        case 'cc_rejected_insufficient_amount':
            mensaje = "por que no tienes saldo suficiente";
            break;
        case 'cc_rejected_bad_filled_date':
            mensaje = "por que la tarjeta esta vencida";
            break;
        case 'cc_rejected_bad_filled_other':
            mensaje = "por que los datos de la tarjeta estan incorrectos";
            break;
        case 'cc_rejected_bad_filled_security_code':
            mensaje = "porque el codigo de seguridad es incorrecto";
            break;
        case 'cc_rejected_blacklist':
            mensaje = "porqu eno pudimos procesar tu pago";
            break;
        case 'cc_rejected_call_for_authorize':
            mensaje = `por que debes autorizar ante ${payment_method_id} el pago de $${total_paid_amount}`;
            break;
        case 'cc_rejected_card_disabled':
            mensaje = `por que tu tarjeta de ${payment_method_id} no esta activa`;
            break;
        case 'cc_rejected_card_error':
            mensaje = "porque no pudimos procesar tu pago";
            break;
        case 'cc_rejected_duplicated_payment':
            mensaje = "porque ya hiciste un pago por ese valor";
            break;
        case 'cc_rejected_high_risk':
            mensaje = "usa otra tarjeta u otro medio de pago";
            break;
        case 'cc_rejected_invalid_installments':
            mensaje = `porque ${payment_method_id} no procesa pagos en ${installments} cuotas`;
            break;
        case 'cc_rejected_max_attempts':
            mensaje = "porque llegaste al limite de intentos permitidos";
            break;
        case 'cc_rejected_other_reason':
            mensaje = `porque ${payment_method_id} no procesó el pago`;
            break;
        case 'pending_contingency':
            mensaje = "Estamos procesando tu pago. No te preocupes, menos de 2 días hábiles te avisaremos por e-mail si se acreditó.";
            break;
    }



    return (



        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                    background: status == 'approved' ? color_approved :
                        status == 'in_process' ? color_peding : color_rejected,
                    height: 190
                }}
            >

                <Grid xs={1} md={1}>
                    {/* rejected */}
                    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }} >
                        <Avatar sx={{ bgcolor: '#ffff', width: '65px', height: '65px' }}>
                            <CreditCard fontSize="large" color="info" />
                        </Avatar>
                        {status == 'approved' ?
                            <img style={{ "width": "25px", position: 'absolute', right: -4, top: 40, border: 'solid 1px #ffff', borderRadius: '50%' }} src={success32px} />
                            :
                            status == 'in_process' ?
                                <img style={{ "width": "25px", position: 'absolute', right: -4, top: 40, border: 'solid 1px #ffff', borderRadius: '50%' }} src={warning32px} />
                                :
                                <img style={{ "width": "25px", position: 'absolute', right: -4, top: 40, border: 'solid 1px #ffff', borderRadius: '50%' }} src={remove32px} />
                        }
                    </Box>
                </Grid>


                {status == 'approved' ?
                    <>
                        <Typography sx={{ fontFamily: "revert", fontWeight: '600', color: '#ffffff', fontSize: 20 }}>{mensaje}</Typography>
                        <Typography sx={{ fontFamily: "revert", color: '#ffffff' }}>Operacion: {location.state.id}</Typography>
                    </>
                    : status == 'in_process' ?
                        <>
                            <Typography sx={{ fontFamily: "revert", fontWeight: '600', color: '#ffffff', fontSize: 20 }}>{`${mensaje}`}</Typography>
                            <Typography sx={{ fontFamily: "revert", color: '#ffffff' }}>detalle: {status_detail}</Typography>
                        </>
                        :
                        <>
                            <Typography sx={{ fontFamily: "revert", fontWeight: '600', color: '#ffffff', fontSize: 20 }}>{`Se rechazó el pago ${mensaje}`}</Typography>
                            <Typography sx={{ fontFamily: "revert", color: '#ffffff' }}>detalle: {status_detail}</Typography>
                        </>
                }

                {/* success */}
                {/* <img style={{ "width": "80px" }} src={success} /> */}
                {/* <Typography sx={{ fontFamily: "revert", fontWeight: '600', color: '#ffffff', fontSize: 20 }}>{mensaje}</Typography> */}
                {/* <Typography sx={{ fontFamily: "revert", color: '#ffffff' }}>Operacion: {location.state.id}</Typography> */}
            </Grid>

            <Paper sx={{
                p: 2,
                width: { xs: '98%', md: '80%' },
                ml: 'auto', mr: 'auto', mt: -2,
            }} elevation={1}>
                <Grid container>
                    <Grid xs={12} md={1} item>
                        <img src="http://img.mlstatic.com/org-img/MP3/API/logos/visa.gif" />
                    </Grid>
                    <Grid xs={12} md={11} item>
                        <Typography sx={{ fontFamily: "revert" }}>{`Pagaste: ${installments}x $${installment_amount} (Total: $${total_paid_amount} ${location.state.currency_id})`} </Typography>
                        <Typography sx={{ fontSize: 13 }}>{`${payment_method_id} ****${card.last_four_digits}`} </Typography>
                    </Grid>
                </Grid>


            </Paper>
        </>

        //  <div>OrdenID {location.state.id}</div>
    )
}
