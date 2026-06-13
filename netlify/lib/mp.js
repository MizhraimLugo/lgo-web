// Cliente del SDK oficial de Mercado Pago (v3.x) para las Netlify Functions.
// El MP_ACCESS_TOKEN vive SOLO en el servidor (variable de entorno).
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

let _client;
function client() {
  if (!_client) {
    _client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
      options: { timeout: 8000 }
    });
  }
  return _client;
}

export function preferenceApi() { return new Preference(client()); }
export function paymentApi() { return new Payment(client()); }

/** ¿Estamos en sandbox? (credenciales de prueba). */
export function esSandbox() { return (process.env.MP_ENV || 'sandbox') === 'sandbox'; }
