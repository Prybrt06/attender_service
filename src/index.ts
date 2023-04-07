import * as dotenv from 'dotenv'
dotenv.config();

import { app } from "./server";

app.listen(3001, () => {
	console.log("Server starts at http://localhost:3001");
});