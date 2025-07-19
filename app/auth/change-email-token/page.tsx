"use client";

import {Suspense} from "react";
import ChangeEmailToken from "./ChangeEmailToken";

export const dynamic = "force-dynamic";

export default function ChangeEmailPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ChangeEmailToken />
		</Suspense>
	);
}
