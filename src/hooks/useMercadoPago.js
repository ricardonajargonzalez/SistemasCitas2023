import { useEffect, useState } from "react";
import useScript from "./useScript";
import { formConfig } from "../App/components/formConfig"; 

export default function useMercadoPago(total,personas) {
    const [resultPayment, setResultPayment] = useState(undefined);
    // const [resultPayment, setResultPayment] = useState(undefined);
       
    // console.log(total);
    const { MercadoPago } = useScript(
        "https://sdk.mercadopago.com/js/v2",
        "MercadoPago"
    );

    const publicKey = "TEST-9d20c7f8-03e4-4c50-b1dd-3c9ac8b913dd";
    const baseurlserver = "https://ricardonajar.com/ApiSC/v1";

    useEffect(() => {
        if (MercadoPago) {
            const mp = new MercadoPago(publicKey);
            const cardForm = mp.cardForm({
                amount: `${total}.00`,
                // amount: '10.00',
                autoMount: true,
                form: formConfig,
                callbacks: {
                    onFormMounted: (error) => {
                        if (error)
                            return console.warn(
                                "Form Mounted handling error: ",
                                error
                            );
                    },

                    onSubmit: (event) => {
                        event.preventDefault();

                        const {
                            paymentMethodId: payment_method_id,
                            issuerId: issuer_id,
                            cardholderEmail: email,
                            amount,
                            token,
                            installments
                            // identificationNumber,
                            // identificationType,
                        } = cardForm.getCardFormData();

                        // console.log()

                        fetch(
                            `${
                                baseurlserver
                            }/process-payment/`,
                            {
                                // entry point backend
                                method: "POST",
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Request-Method":
                                        "GET, POST, DELETE, PUT, OPTIONS",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    token,
                                    issuer_id,
                                    payment_method_id,
                                    transaction_amount: Number(amount),
                                    installments: Number(installments),
                                    description: "Servicios",
                                    payer: {
                                        email,
                                        // identification: {
                                        //     type: identificationType,
                                        //     number: identificationNumber,
                                        // },
                                    },
                                    notification_url : "https://ricardonajar.com/WebHooks/eventos.php?source_news=webhooks",
                                    orden : personas
                                }),
                            }
                        )
                            .then((res) => res.json())
                            .then((data) => setResultPayment(data))
                            .catch((err) => {
                                setResultPayment(err);
                            });


                    },
                    onFetching: (resource) => {
                        // Animate progress bar
                        const progressBar =
                            document.querySelector(".progress-bar");
                        progressBar.removeAttribute("value");

                        return () => {
                            progressBar.setAttribute("value", "0");
                        };
                    },
                },
            });
        }
    }, [MercadoPago]);

    return resultPayment;
}
