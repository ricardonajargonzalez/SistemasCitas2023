import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const FORM_ID = 'payment-form';


export const Button_Pagar_MP = (preferencia) => {
    const { id } = useParams(); // id de product
    const [preferenceId, setpreferenceId] = useState(null);


    useEffect(() => {
        setpreferenceId(preferencia);
      }, [id]);


useEffect(() => {

  if (preferenceId) {
    console.log("buttton");
    // con el preferenceId en mano, inyectamos el script de mercadoPago
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://www.mercadopago.com.mx/integrations/v1/web-payment-checkout.js';
    script.setAttribute('data-preference-id', preferenceId);
    const form = document.getElementById(FORM_ID);
    form.appendChild(script);
  }
},[preferenceId]);


  return (
    <form id={FORM_ID} method="GET" />
  )
}


// const [preferenceId, setPreferenceId] = useState(null);
  
// // useEffect(() => {
// //   // luego de montarse el componente, le pedimos al backend el preferenceId
// //   axios.post('/api/orders', { productId: id }).then((order) => {
// //     setPreferenceId(order.preferenceId);
// //   });
// // }, [id]);

// useEffect(() => {
// //   if (preferencia) {
//     // con el preferenceId en mano, inyectamos el script de mercadoPago
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src =
//       'https://www.mercadopago.com.mx/integrations/v1/web-payment-checkout.js';
//     script.setAttribute('data-preference-id', preferencia);
//     const form = document.getElementById(FORM_ID);
//     form.appendChild(script);
// //   }
// }, [preferencia]);

// return (<Grid container sx={{ mt: 10, p: 4 }} spacing={2}>
//               <form id={FORM_ID} method="GET" />
//     </Grid>)