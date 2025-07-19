"use client";

import {Suspense} from "react";
import VerifyToken from "./VerifyToken";

export const dynamic = "force-dynamic";

export default function VerifyPageWrapper() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<VerifyToken />
		</Suspense>
	);
}
