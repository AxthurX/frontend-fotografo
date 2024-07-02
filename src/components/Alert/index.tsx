import { ReactNode } from 'react';

interface IAlertComponent {
	label?: string;
	title?: string;
	color?: 'success' | 'error' | 'warning';
	disableCloseBttn?: boolean;
	children?: ReactNode;
}

const AlertComponent = ({
	title,
	label,
	color,
	disableCloseBttn = false,
	children,
}: IAlertComponent) => {
	return (
		<div
			className={`${
				color === 'success'
					? 'border-calpolygreen-700 bg-calpolygreen-800 text-calpolygreen-800'
					: color === 'error'
						? 'bg-red-200 border-2 border-red-500 border-opacity-50'
						: color === 'warning'
							? 'border-beige-400'
							: ''
			} relative mb-4 scale-95 transform border-t-4 p-4 transition-opacity duration-500 ease-in-out  hover:opacity-100 dark:border-opacity-70 dark:bg-gray-800 dark:text-opacity-80`}
			role='alert'
		>
			<div className='flex items-center '>
				<div className='flex-shrink-0 '>
					<svg
						className={`h-6 w-6 ${
							color === 'success' ? 'text-green-500' : ''
						} ${color === 'error' ? 'text-red-500' : ''} ${
							color === 'warning' ? 'text-yellow-500' : ''
						}`}
						aria-hidden='true'
						fill='currentColor'
						viewBox='0 0 20 20'
					>
						<path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
					</svg>
				</div>
				<div className='text-md ml-3 font-bold'>{title}</div>
			</div>
			<div className='ml-9 mt-2 text-sm'>{label}</div>
			<div className='ml-9 mt-2 text-sm'>{children}</div>

			{disableCloseBttn === false ? (
				<button
					type='button'
					className={`${
						color === 'success'
							? 'bg-green-50 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700'
							: color === 'error'
								? 'bg-red-50 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
								: color === 'warning'
									? 'bg-yellow-50 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-400 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700'
									: ''
					} absolute right-2 top-2 rounded-lg p-1.5 transition-colors duration-300 ease-in-out`}
					data-dismiss-target='#alert-border-3'
					aria-label='Close'
				>
					<svg
						className='h-3 w-3'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 14 14'
					>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
						/>
					</svg>
				</button>
			) : null}
		</div>
	);
};

export default AlertComponent;
