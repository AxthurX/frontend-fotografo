import Link from 'next/link';

export interface Album {
	id: number;
	image: string;
	photographer_image: string;
	photographer_name: string;
	status?: string;
	title: string;
	location: string;
	date: string;
}

const AlbumTable = ({ albums }: { albums: Album[] }) => {
	return (
		<div className='grid grid-cols-3'>
			{albums.map((album) => (
				<Link key={album.id} href={`/albums/${album.id}`}>
					<div className='mb-[25px] h-[320px] w-[350px] cursor-pointer rounded-lg border-gray-200 border-b shadow-md'>
						<div
							className='mb-2 w-full rounded-sm bg-center bg-cover bg-gray-200 px-[10px] pt-[150px] pb-[10px]'
							style={{ backgroundImage: `url(${album.image})` }}
						>
							<div className='flex items-center gap-2'>
								<div
									className='relative size-12 rounded-full border-2 border-[#8aedfe] bg-center bg-cover'
									style={{
										backgroundImage: `url(${album.photographer_image})`,
									}}
								>
									{album.status && (
										<div className='absolute inset-0 mx-auto mt-[35px] flex w-[33px] items-center justify-center rounded-sm bg-[#8aedfe] p-[3px] font-bold text-black text-xs'>
											{album.status}
										</div>
									)}
								</div>
								<p className='font-bold capitalize'>
									{album.photographer_name}
								</p>
							</div>
						</div>

						<div className='flex flex-col px-2'>
							<h3 className='font-semibold text-lg'>{album.title}</h3>
							<div className='text-gray-600 text-sm'>
								<b className='font-semibold text-gray-500'>{album.location}</b>
								<b className='font-semibold text-gray-500'>{album.date}</b>
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default AlbumTable;
