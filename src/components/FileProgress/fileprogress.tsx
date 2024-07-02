import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { sendStatus } from "../../lib/file/sendFiles";

interface UploadProgressProps {
	statusList: Array<sendStatus>;
}

export default function UploadProgress({ statusList }: UploadProgressProps) {
	const [status, setStatus] = useState<Array<sendStatus>>([]);

	useEffect(() => {
		setStatus(statusList);
	}, [statusList]);

	return (
		<>
			{status && status.length > 0 && (
				<div className="fixed bottom-4 right-4 z-50 flex max-h-[468px] max-w-full justify-end !border-t-0 shadow-lg max-sm:right-0 max-sm:mx-2">
					<details className="group w-auto max-w-full rounded-lg border border-sage-300 bg-beige-100 open:rounded-br-none [&_summary]:rounded-[0.4rem] [&_summary]:open:rounded-b-none">
						<summary className="block cursor-pointer items-center justify-center bg-beige-300 py-3 text-base font-medium">
							<div className="flex items-center">
								<span className="grow px-3 font-semibold">
									Progresso de envio
								</span>
								<ChevronDown className="ml-2 mr-2 inline-block group-open:rotate-180" />
							</div>
						</summary>
						<div className="max-h-[418px] overflow-y-auto">
							{status.map((statusObj: sendStatus, index) => (
								<div key={index}>
									<div className="flex items-center !border-t border-sage-200 p-3 last:border-0">
										{statusObj.sending ? (
											<div
												className="radial-progress h-10 min-h-[40px] w-10 min-w-[40px]"
												style={
													{
														"--value": statusObj.sent,
														"--size": "2.5rem",
														"--thickness": "4px",
													} as React.CSSProperties
												}
											>
												<div className="text-xs">{statusObj.sent}%</div>
											</div>
										) : (
											<span className="loading loading-spinner loading-lg"></span>
										)}
										<div className="shrink">
											<p className="px-4">{statusObj.name}</p>
											<p className="px-4 text-sm">{statusObj.status}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</details>
				</div>
			)}
		</>
	);
}
