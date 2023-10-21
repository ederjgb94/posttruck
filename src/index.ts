interface TruckData {
	name: string;
	latitude: number;
	longitude: number;
}

export interface Env {
	mikv: KVNamespace;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

		if (request.method === 'POST' || request.method === 'PUT') {
			try {
				const data: TruckData = await request.json(); // Analiza el cuerpo de la solicitud como JSON
				const truckName = data.name;
				const latitude = data.latitude;
				const longitude = data.longitude;

				// Almacena los datos en el espacio de nombres KV
				await env.mikv.put(truckName, JSON.stringify({ latitude, longitude }));

				return new Response("Data stored successfully");
			} catch (error) {
				return new Response("Error parsing JSON data", { status: 400 });
			}
		} else {
			return new Response("Invalid request method", { status: 405 });
		}
	},
};