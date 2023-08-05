import { AlertTitle, Box, Button, Card, CardActions, CardContent, Grid, Input, Paper, Stack, TextField, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMercadoPago from "../../hooks/useMercadoPago";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { useSelector } from "react-redux";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';


const allServices = (servicios, personas ) =>{

    let itemAgrupados = []; 
    let total = 0;

    personas.map((personaItem, index) => { 
       let personaIndex = index;
       let items_servicios = [];
       const array_servicios = personas[index].servicios;

       //recorrido de todos los servicios por persona
       items_servicios = array_servicios.map((serviciosItem, index) => { 
         
            
            //buscamos si el servicio ya esta en el arreglo
            let resultarray = buscarServicioRepetido(itemAgrupados,serviciosItem.servicioid); //0 - existe, 1-indice
            if(resultarray[0] == 0){
                //NO EXISTE SE AGREGA AL ARREGLO
                let item = {
                    "nombre": serviciosItem.descripcion,
                    "servicio_id": serviciosItem.servicioid,
                    "servicio:tipo": serviciosItem.tipo,
                    "count" : 1,
                    "precio_unitario": parseFloat(serviciosItem.servicio_precio),
                    "precio_total": parseFloat(serviciosItem.servicio_precio) 
                    };
                    total = total + parseFloat(serviciosItem.servicio_precio);
                    itemAgrupados.push(item);  
            }else{
                //SI EXISTE SE SUMA
                let itemtochange = itemAgrupados[resultarray[1]];  //indice "resultarray[1]""
                let newcount = itemtochange.count + 1;
                let newpreciototal = itemtochange.precio_total + itemtochange.precio_unitario;
                
                itemAgrupados[resultarray[1]].count = newcount;
                itemAgrupados[resultarray[1]].precio_total = newpreciototal;

                total = total + parseFloat(itemtochange.precio_unitario);

            }
              
       });

         
    });

      return [itemAgrupados,total];
}


const buscarServicioRepetido = (pitemAgrupados, pservicioid) =>{
      let existe = 0; //1 existe, 0 no existe
      let indice = null;

      pitemAgrupados.map((servicioitem, index) => { 
          //servicio
          let {servicio_id} = servicioitem;
          if(servicio_id == pservicioid){
              existe = 1;
              indice = index;
          }
      });

      return [existe,indice];
}


export const PagarAgenda = () => {

    const { servicios, personas } = useSelector(state => state.stateWizard);
    const servicioosAgrup = allServices(servicios, personas ); //[0] listadoservicios,[1] total
    // const notify = (texto) => {toast.success(texto)};
  

    const init = {
        cvc: 123,
        cardExpirationMonth: 11,
        cardExpirationYear: 25,
        focus: '',
        cardholderName: 'APRO',
        cardNumber: 4075595716483764,
    };


    const [state, setState] = useState(init);
    const resultPayment = useMercadoPago(`${servicioosAgrup[1]}`,personas);
    const [status, setstatus] = useState(null);
    

    const handleInputChange = (e) => {
        // console.log(e.target.name);

        setState({
            ...state,
            [e.target.dataset.name || e.target.name]: e.target.value,
        });
    };

    const handleInputFocus = (e) => {
        setState({ ...state, focus: e.target.dataset.name || e.target.name });
    };

    const onSubmit = (event) => {
        event.preventDefault();
    }


    useEffect(() => {
       // resultPayment && setstatus(resultPayment.status);
    }, [resultPayment]);

    const navigate = useNavigate();
    

    useEffect(() => {
        //  resultPayment && navigate("/citas/orden/",{replace: true, state: resultPayment });
    },[status]);

    const onclick = () =>{
        navigate( "/citas/orden/",{
            replace: true,
           //sin fondos state: {"id":1311164090,"date_created":"2023-01-09T14:14:38.863-04:00","date_approved":null,"date_last_updated":"2023-01-09T14:14:39.189-04:00","date_of_expiration":null,"money_release_date":null,"money_release_status":null,"operation_type":"regular_payment","issuer_id":"159","payment_method_id":"visa","payment_type_id":"credit_card","payment_method":{"id":"visa","type":"credit_card"},"status":"rejected","status_detail":"cc_rejected_insufficient_amount","currency_id":"MXN","description":null,"live_mode":false,"sponsor_id":null,"authorization_code":null,"money_release_schema":null,"taxes_amount":0,"counter_currency":null,"brand_id":null,"shipping_amount":0,"build_version":"2.126.1","pos_id":null,"store_id":null,"integrator_id":null,"platform_id":null,"corporation_id":null,"collector_id":232169311,"payer":{"first_name":null,"last_name":null,"email":"test_user_80507629@testuser.com","identification":{"number":"32659430","type":"DNI"},"phone":{"area_code":null,"number":null,"extension":null},"type":null,"entity_type":null,"id":"1282535199"},"marketplace_owner":null,"metadata":{},"additional_info":{"available_balance":null,"nsu_processadora":null,"authentication_code":null},"order":{},"external_reference":"mlplesoj9b","transaction_amount":105,"transaction_amount_refunded":0,"coupon_amount":0,"differential_pricing_id":null,"financing_group":null,"deduction_schema":null,"installments":1,"transaction_details":{"payment_method_reference_id":null,"net_received_amount":0,"total_paid_amount":105,"overpaid_amount":0,"external_resource_url":null,"installment_amount":105,"financial_institution":null,"payable_deferral_period":null,"acquirer_reference":null},"fee_details":[],"charges_details":[],"captured":true,"binary_mode":false,"call_for_authorize_id":null,"statement_descriptor":"SERVICIOS","card":{"id":null,"first_six_digits":"407559","last_four_digits":"3764","expiration_month":11,"expiration_year":2025,"date_created":"2023-01-09T14:14:38.000-04:00","date_last_updated":"2023-01-09T14:14:38.000-04:00","cardholder":{"name":"FUND","identification":{"number":null,"type":null}}},"notification_url":"https://ricardonajar.com/WebHooks/eventos.php?source_news=webhooks","refunds":[],"processing_mode":"aggregator","merchant_account_id":null,"merchant_number":null,"acquirer_reconciliation":[],"point_of_interaction":{"type":"UNSPECIFIED","business_info":{"unit":"online_payments","sub_unit":"default"}}} 
        //vecnida   state: {"id":1311792015,"date_created":"2023-01-09T16:01:40.445-04:00","date_approved":null,"date_last_updated":"2023-01-09T16:01:40.612-04:00","date_of_expiration":null,"money_release_date":null,"money_release_status":null,"operation_type":"regular_payment","issuer_id":"159","payment_method_id":"visa","payment_type_id":"credit_card","payment_method":{"id":"visa","type":"credit_card"},"status":"rejected","status_detail":"cc_rejected_bad_filled_date","currency_id":"MXN","description":null,"live_mode":false,"sponsor_id":null,"authorization_code":null,"money_release_schema":null,"taxes_amount":0,"counter_currency":null,"brand_id":null,"shipping_amount":0,"build_version":"2.126.1","pos_id":null,"store_id":null,"integrator_id":null,"platform_id":null,"corporation_id":null,"collector_id":232169311,"payer":{"first_name":null,"last_name":null,"email":"test_user_80507629@testuser.com","identification":{"number":"32659430","type":"DNI"},"phone":{"area_code":null,"number":null,"extension":null},"type":null,"entity_type":null,"id":"1282535199"},"marketplace_owner":null,"metadata":{},"additional_info":{"available_balance":null,"nsu_processadora":null,"authentication_code":null},"order":{},"external_reference":"mlplesoj9b","transaction_amount":105,"transaction_amount_refunded":0,"coupon_amount":0,"differential_pricing_id":null,"financing_group":null,"deduction_schema":null,"installments":1,"transaction_details":{"payment_method_reference_id":null,"net_received_amount":0,"total_paid_amount":105,"overpaid_amount":0,"external_resource_url":null,"installment_amount":105,"financial_institution":null,"payable_deferral_period":null,"acquirer_reference":null},"fee_details":[],"charges_details":[],"captured":true,"binary_mode":false,"call_for_authorize_id":null,"statement_descriptor":"SERVICIOS","card":{"id":null,"first_six_digits":"407559","last_four_digits":"3764","expiration_month":11,"expiration_year":2025,"date_created":"2023-01-09T16:01:40.000-04:00","date_last_updated":"2023-01-09T16:01:40.000-04:00","cardholder":{"name":"EXPI","identification":{"number":null,"type":null}}},"notification_url":"https://ricardonajar.com/WebHooks/eventos.php?source_news=webhooks","refunds":[],"processing_mode":"aggregator","merchant_account_id":null,"merchant_number":null,"acquirer_reconciliation":[],"point_of_interaction":{"type":"UNSPECIFIED","business_info":{"unit":"online_payments","sub_unit":"default"}}}
       //autorizar state: {"id":1311167464,"date_created":"2023-01-09T16:20:07.598-04:00","date_approved":null,"date_last_updated":"2023-01-09T16:20:07.832-04:00","date_of_expiration":null,"money_release_date":null,"money_release_status":null,"operation_type":"regular_payment","issuer_id":"159","payment_method_id":"visa","payment_type_id":"credit_card","payment_method":{"id":"visa","type":"credit_card"},"status":"rejected","status_detail":"cc_rejected_call_for_authorize","currency_id":"MXN","description":null,"live_mode":false,"sponsor_id":null,"authorization_code":null,"money_release_schema":null,"taxes_amount":0,"counter_currency":null,"brand_id":null,"shipping_amount":0,"build_version":"2.126.1","pos_id":null,"store_id":null,"integrator_id":null,"platform_id":null,"corporation_id":null,"collector_id":232169311,"payer":{"first_name":null,"last_name":null,"email":"test_user_80507629@testuser.com","identification":{"number":"32659430","type":"DNI"},"phone":{"area_code":null,"number":null,"extension":null},"type":null,"entity_type":null,"id":"1282535199"},"marketplace_owner":null,"metadata":{},"additional_info":{"available_balance":null,"nsu_processadora":null,"authentication_code":null},"order":{},"external_reference":"mlplesoj9b","transaction_amount":105,"transaction_amount_refunded":0,"coupon_amount":0,"differential_pricing_id":null,"financing_group":null,"deduction_schema":null,"installments":12,"transaction_details":{"payment_method_reference_id":null,"net_received_amount":0,"total_paid_amount":130.67,"overpaid_amount":0,"external_resource_url":null,"installment_amount":10.89,"financial_institution":null,"payable_deferral_period":null,"acquirer_reference":null},"fee_details":[],"charges_details":[],"captured":true,"binary_mode":false,"call_for_authorize_id":null,"statement_descriptor":"SERVICIOS","card":{"id":null,"first_six_digits":"407559","last_four_digits":"3764","expiration_month":11,"expiration_year":2025,"date_created":"2023-01-09T16:20:07.000-04:00","date_last_updated":"2023-01-09T16:20:07.000-04:00","cardholder":{"name":"CALL","identification":{"number":null,"type":null}}},"notification_url":"https://ricardonajar.com/WebHooks/eventos.php?source_news=webhooks","refunds":[],"processing_mode":"aggregator","merchant_account_id":null,"merchant_number":null,"acquirer_reconciliation":[],"point_of_interaction":{"type":"UNSPECIFIED","business_info":{"unit":"online_payments","sub_unit":"default"}}}
       //state: {"id":1311168252,"date_created":"2023-01-09T17:05:00.296-04:00","date_approved":null,"date_last_updated":"2023-01-09T17:05:00.490-04:00","date_of_expiration":null,"money_release_date":null,"money_release_status":null,"operation_type":"regular_payment","issuer_id":"159","payment_method_id":"visa","payment_type_id":"credit_card","payment_method":{"id":"visa","type":"credit_card"},"status":"in_process","status_detail":"pending_contingency","currency_id":"MXN","description":null,"live_mode":false,"sponsor_id":null,"authorization_code":null,"money_release_schema":null,"taxes_amount":0,"counter_currency":null,"brand_id":null,"shipping_amount":0,"build_version":"2.126.1","pos_id":null,"store_id":null,"integrator_id":null,"platform_id":null,"corporation_id":null,"collector_id":232169311,"payer":{"first_name":null,"last_name":null,"email":"test_user_80507629@testuser.com","identification":{"number":"32659430","type":"DNI"},"phone":{"area_code":null,"number":null,"extension":null},"type":null,"entity_type":null,"id":"1282535199"},"marketplace_owner":null,"metadata":{},"additional_info":{"available_balance":null,"nsu_processadora":null,"authentication_code":null},"order":{},"external_reference":"mlplesoj9b","transaction_amount":105,"transaction_amount_refunded":0,"coupon_amount":0,"differential_pricing_id":null,"financing_group":null,"deduction_schema":null,"installments":1,"transaction_details":{"payment_method_reference_id":null,"net_received_amount":0,"total_paid_amount":105,"overpaid_amount":0,"external_resource_url":null,"installment_amount":105,"financial_institution":null,"payable_deferral_period":null,"acquirer_reference":null},"fee_details":[],"charges_details":[],"captured":true,"binary_mode":false,"call_for_authorize_id":null,"statement_descriptor":"SERVICIOS","card":{"id":null,"first_six_digits":"407559","last_four_digits":"3764","expiration_month":11,"expiration_year":2025,"date_created":"2023-01-09T17:05:00.000-04:00","date_last_updated":"2023-01-09T17:05:00.000-04:00","cardholder":{"name":"CONT","identification":{"number":null,"type":null}}},"notification_url":"https://ricardonajar.com/WebHooks/eventos.php?source_news=webhooks","refunds":[],"processing_mode":"aggregator","merchant_account_id":null,"merchant_number":null,"acquirer_reconciliation":[],"point_of_interaction":{"type":"UNSPECIFIED","business_info":{"unit":"online_payments","sub_unit":"default"}}}
    });
    }


    return <Grid sx={{ mt: 10, p: 4 }} container spacing={2}>
        <Grid item xs={12} md={6} lg={8}>
           
           
       
            <Paper sx={{ p: 2, minHeight: '525px', maxHeight: '530px', overflow: 'auto' }} elevation={1}>
                <Typography sx={{ fontFamily: "revert", fontWeight: "bold" }}>Resumen de pedido</Typography>
                <Typography sx={{mb:5}}>Verifique los detalles seleccionado el servicio.</Typography>
                <Button onClick={()=>onclick()}>prueba</Button>

                {  servicioosAgrup[0].map((personaItem, index) => {
                    return <Card sx={{mb:1}} key={index} variant="outlined">
                    <CardContent >
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                           <strong>{personaItem.count} servicio(s) - </strong> {personaItem.nombre}
                        </Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                            Precio unitario: ${personaItem.precio_unitario}
                        </Typography>
                        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
                            <Typography sx={{ position: 'absolute', right: 16, top: -10, fontWeight: "bold" }}>Total: ${personaItem.precio_total}</Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button size="small">ver detalle</Button>
                    </CardActions>
                </Card>
                })
            }
            </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, minHeight: '525px', maxHeight: '530px', overflow: 'auto' }} elevation={1}>
                <Cards
                    cvc={state.cvc}
                    expiry={`${state.cardExpirationMonth}/${state.cardExpirationYear}`}
                    focused={state.focus}
                    name={state.cardholderName}
                    number={state.cardNumber}
                />

                <form style={{ "marginTop": "5px" }} id="form-checkout" onSubmit={(event) => onSubmit(event)}>
                    <TextField fullWidth margin="dense" size="small" label="Numero tarjeta"
                        // type="tel"
                        name="cardNumber"
                        id="form-checkout__cardNumber"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        value={state.cardNumber}
                    />
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <TextField margin="dense" size="small" label="Mes"
                                // type="tel"
                                name="cardExpirationMonth"
                                id="form-checkout__cardExpirationMonth"
                                value={state.cardExpirationMonth}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField margin="dense" size="small" label="Año"
                                name="cardExpirationYear"
                                id="form-checkout__cardExpirationYear"
                                value={state.cardExpirationYear}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField margin="dense" size="small" label="CVC"
                                name="cvc"
                                id="form-checkout__securityCode"
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                value={state.cvc}
                            />
                        </Grid>
                    </Grid>

                    <TextField fullWidth margin="dense" size="small" label="Titular de la cuenta"
                        name="cardholderName"
                        id="form-checkout__cardholderName"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        placeholder="name"
                        value={`${state.cardholderName}`}
                    />
                    <TextField fullWidth margin="dense" size="small" label="Correo electronico"
                        type="email"
                        name="cardholderEmail"
                        id="form-checkout__cardholderEmail"
                        value="thehharo@gmail.com"
                    />
                    <div className="form-control">
                        <select
                            name="issuer"
                            id="form-checkout__issuer"
                            on
                        ></select>
                        <select
                            name="identificationType"
                            id="form-checkout__identificationType"
                        ></select>
                    </div>
                    <div className="form-control">
                        <input
                            // type="hidden"
                            name="identificationNumber"
                            id="form-checkout__identificationNumber"
                        />
                    </div>
                    <div className="form-control">
                        <select
                            name="installments"
                            id="form-checkout__installments"
                        ></select>
                    </div>
                    <div className="form-control">
                        {/* {
                            resultPayment == null ?
                            <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    This is an error alert — <strong>check it out!</strong>
                        </Alert>
                        </Stack>
                            :
                            <Button fullWidth variant="contained" type="submit" id="form-checkout__submit">
                            Pagarr
                           </Button>
                        } */}
                        <Button fullWidth variant="contained" type="submit" id="form-checkout__submit">
                            Pagarr
                           </Button>
                    </div>
                    <progress style={{ "width": "100%" }} value="0" className="progress-bar">
                        Cargando...
                    </progress>
                </form>
                {status}            
            </Paper>
        </Grid>
    </Grid>
}
